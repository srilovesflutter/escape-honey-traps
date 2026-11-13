import { catalog } from '@/content';
import type { Teaser } from '@/content/types';
import * as Notifications from 'expo-notifications';
import { AndroidImportance, AndroidNotificationVisibility } from 'expo-notifications/build/NotificationChannelManager.types';
import { Platform } from 'react-native';

export const REMINDER_CHANNEL = 'reminders';
const HORIZON_DAYS = 16;
const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;

export type ReminderSettings = {
  dailyEnabled: boolean;
  weeklyEnabled: boolean;
  inactivityEnabled: boolean;
  hour: number;
  minute: number;
  anchorDay: number;
};

export const defaultReminderSettings = (): ReminderSettings => ({
  dailyEnabled: false,
  weeklyEnabled: false,
  inactivityEnabled: false,
  hour: 20,
  minute: 0,
  anchorDay: dayNumber(new Date()),
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export function dayNumber(date: Date): number {
  return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000);
}

export function dateFromDay(day: number, hour: number, minute: number): Date {
  const utc = day * 86400000;
  const date = new Date(utc);
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), hour, minute, 0, 0);
}

export function teaserForDay(day: number, anchorDay: number): Teaser {
  const list = catalog.teasers;
  const offset = ((day - anchorDay) % list.length + list.length) % list.length;
  return list[offset];
}

function needsRuntimePermission(): boolean {
  return Platform.OS === 'android' && Number(Platform.Version) >= 33;
}

export async function notificationsAllowed(): Promise<boolean> {
  if (Platform.OS !== 'android') return false;
  if (!needsRuntimePermission()) return true;
  const status = await Notifications.getPermissionsAsync();
  return status.granted;
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (Platform.OS !== 'android') return false;
  if (!needsRuntimePermission()) return true;
  const status = await Notifications.requestPermissionsAsync();
  return status.granted;
}

async function ensureChannel(): Promise<void> {
  if (Platform.OS !== 'android') return;
  await Notifications.setNotificationChannelAsync(REMINDER_CHANNEL, {
    name: 'Learning reminders',
    importance: AndroidImportance.DEFAULT,
    sound: null,
    vibrationPattern: [0],
    lockscreenVisibility: AndroidNotificationVisibility.PUBLIC,
  });
}

async function cancelId(id: string): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(id).catch(() => {});
}

export async function sendSampleTeaser(settings: ReminderSettings): Promise<void> {
  if (Platform.OS !== 'android') return;
  await ensureChannel();
  const teaser = teaserForDay(dayNumber(new Date()), settings.anchorDay);
  await Notifications.scheduleNotificationAsync({
    identifier: 'sample-teaser',
    content: {
      title: catalog.ui.settings.notificationTitle,
      body: teaser.prompt,
      sound: false,
      data: { teaserId: teaser.id },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 2,
      channelId: REMINDER_CHANNEL,
    },
  });
}

export async function syncReminders(settings: ReminderSettings): Promise<void> {
  if (Platform.OS !== 'android') return;
  await ensureChannel();
  const today = dayNumber(new Date());
  for (let offset = 0; offset < HORIZON_DAYS + 2; offset += 1) {
    await cancelId(`daily-${today + offset}`);
  }
  for (let week = 0; week < 10; week += 1) {
    const day = today + ((7 - new Date().getDay()) % 7) + week * 7;
    await cancelId(`weekly-${day}`);
  }
  await cancelId('inactivity-nudge');

  const allowed = await notificationsAllowed();
  if (!allowed) return;

  const now = new Date();
  if (settings.dailyEnabled) {
    for (let offset = 0; offset < HORIZON_DAYS; offset += 1) {
      const day = today + offset;
      const when = dateFromDay(day, settings.hour, settings.minute);
      if (when.getTime() <= now.getTime() + 30_000) continue;
      const teaser = teaserForDay(day, settings.anchorDay);
      await Notifications.scheduleNotificationAsync({
        identifier: `daily-${day}`,
        content: {
          title: catalog.ui.settings.notificationTitle,
          body: teaser.prompt,
          sound: false,
          data: { teaserId: teaser.id },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: when,
          channelId: REMINDER_CHANNEL,
        },
      });
    }
  } else if (settings.weeklyEnabled) {
    for (let week = 0; week < 8; week += 1) {
      const daysUntilSunday = (7 - now.getDay()) % 7;
      const day = today + daysUntilSunday + week * 7;
      const when = dateFromDay(day, settings.hour, settings.minute);
      if (when.getTime() <= now.getTime() + 30_000) continue;
      const teaser = teaserForDay(day, settings.anchorDay);
      await Notifications.scheduleNotificationAsync({
        identifier: `weekly-${day}`,
        content: {
          title: catalog.ui.settings.notificationTitle,
          body: teaser.prompt,
          sound: false,
          data: { teaserId: teaser.id },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: when,
          channelId: REMINDER_CHANNEL,
        },
      });
    }
  }

  if (settings.inactivityEnabled) {
    const when = new Date(Date.now() + THREE_DAYS_MS);
    await Notifications.scheduleNotificationAsync({
      identifier: 'inactivity-nudge',
      content: {
        title: 'Continue your course',
        body: 'Your lessons are still on this phone.',
        sound: false,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: when,
        channelId: REMINDER_CHANNEL,
      },
    });
  }
}
