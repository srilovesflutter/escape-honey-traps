import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { AppState, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  defaultReminderSettings,
  notificationsAllowed,
  requestNotificationPermission,
  syncReminders,
  teaserForDay,
  dayNumber,
  type ReminderSettings,
} from '@/reminders/schedule';

const STORAGE_KEY = 'escape-honey-traps.reminders.v1';

type RemindersValue = {
  ready: boolean;
  settings: ReminderSettings;
  permissionGranted: boolean;
  todayTeaserId: string;
  setDailyEnabled: (enabled: boolean) => Promise<void>;
  setWeeklyEnabled: (enabled: boolean) => Promise<void>;
  setInactivityEnabled: (enabled: boolean) => Promise<void>;
  setTime: (hour: number, minute: number) => Promise<void>;
  requestAccess: () => Promise<boolean>;
};

const RemindersContext = createContext<RemindersValue | null>(null);

function parse(raw: string | null): ReminderSettings {
  const base = defaultReminderSettings();
  if (!raw) return base;
  try {
    const value = JSON.parse(raw) as Partial<ReminderSettings>;
    return {
      dailyEnabled: Boolean(value.dailyEnabled),
      weeklyEnabled: Boolean(value.weeklyEnabled),
      inactivityEnabled: Boolean(value.inactivityEnabled),
      hour: typeof value.hour === 'number' ? value.hour : base.hour,
      minute: typeof value.minute === 'number' ? value.minute : base.minute,
      anchorDay: typeof value.anchorDay === 'number' ? value.anchorDay : base.anchorDay,
    };
  } catch {
    return base;
  }
}

export function RemindersProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<ReminderSettings>(defaultReminderSettings);
  const [ready, setReady] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const persist = useCallback(async (next: ReminderSettings) => {
    setSettings(next);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
    await syncReminders(next).catch(() => {});
  }, []);

  useEffect(() => {
    let cancelled = false;
    AsyncStorage.getItem(STORAGE_KEY)
      .then(async (raw) => {
        const loaded = parse(raw);
        if (cancelled) return;
        setSettings(loaded);
        const allowed = await notificationsAllowed().catch(() => false);
        if (!cancelled) setPermissionGranted(allowed);
        if (allowed) await syncReminders(loaded).catch(() => {});
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const refresh = () => {
      if (!settings.inactivityEnabled) return;
      syncReminders(settings).catch(() => {});
    };
    refresh();
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') refresh();
    });
    return () => sub.remove();
  }, [ready, settings]);

  const requestAccess = useCallback(async () => {
    if (Platform.OS !== 'android') return false;
    const granted = await requestNotificationPermission();
    setPermissionGranted(granted);
    return granted;
  }, []);

  const setDailyEnabled = useCallback(
    async (enabled: boolean) => {
      await persist({ ...settings, dailyEnabled: enabled });
    },
    [persist, settings],
  );

  const setWeeklyEnabled = useCallback(
    async (enabled: boolean) => {
      await persist({ ...settings, weeklyEnabled: enabled });
    },
    [persist, settings],
  );

  const setInactivityEnabled = useCallback(
    async (enabled: boolean) => {
      await persist({ ...settings, inactivityEnabled: enabled });
    },
    [persist, settings],
  );

  const setTime = useCallback(
    async (hour: number, minute: number) => {
      await persist({ ...settings, hour, minute });
    },
    [persist, settings],
  );

  const todayTeaserId = teaserForDay(dayNumber(new Date()), settings.anchorDay).id;

  const value = useMemo(
    () => ({
      ready,
      settings,
      permissionGranted,
      todayTeaserId,
      setDailyEnabled,
      setWeeklyEnabled,
      setInactivityEnabled,
      setTime,
      requestAccess,
    }),
    [
      ready,
      settings,
      permissionGranted,
      todayTeaserId,
      setDailyEnabled,
      setWeeklyEnabled,
      setInactivityEnabled,
      setTime,
      requestAccess,
    ],
  );

  return <RemindersContext.Provider value={value}>{children}</RemindersContext.Provider>;
}

export function useReminders() {
  const value = useContext(RemindersContext);
  if (!value) throw new Error('useReminders must be used within RemindersProvider');
  return value;
}
