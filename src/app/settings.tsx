import { catalog } from '@/content';
import { BackRow, Body, Button, Card, Eyebrow, Heading, Screen, Small } from '@/components/ui';
import { useReminders } from '@/reminders/RemindersProvider';
import { notificationsAllowed, sendSampleTeaser } from '@/reminders/schedule';
import { useTheme, type Preference } from '@/theme/ThemeProvider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform, Pressable, Switch, Text, View } from 'react-native';

export default function SettingsScreen() {
  const ui = catalog.ui.settings;
  const theme = useTheme();
  const reminders = useReminders();
  const [showClock, setShowClock] = useState(false);
  const [pending, setPending] = useState<'daily' | 'weekly' | 'inactivity' | null>(null);
  const [denied, setDenied] = useState(false);
  const { settings } = reminders;

  const clock = new Date();
  clock.setHours(settings.hour, settings.minute, 0, 0);
  const timeLabel = clock.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' });

  async function enable(kind: 'daily' | 'weekly' | 'inactivity') {
    const allowed = await notificationsAllowed();
    const mustAsk = Platform.OS === 'android' && Number(Platform.Version) >= 33 && !allowed;
    if (mustAsk) {
      setPending(kind);
      setDenied(false);
      return;
    }
    if (kind === 'daily') await reminders.setDailyEnabled(true);
    if (kind === 'weekly') await reminders.setWeeklyEnabled(true);
    if (kind === 'inactivity') await reminders.setInactivityEnabled(true);
  }

  async function confirmPermission() {
    const granted = await reminders.requestAccess();
    const kind = pending;
    setPending(null);
    if (!granted) {
      setDenied(true);
      return;
    }
    if (kind === 'daily') await reminders.setDailyEnabled(true);
    if (kind === 'weekly') await reminders.setWeeklyEnabled(true);
    if (kind === 'inactivity') await reminders.setInactivityEnabled(true);
  }

  return (
    <Screen mode="stack">
      <BackRow label={ui.back} fallback="/" />
      <Heading>{ui.title}</Heading>

      <Eyebrow>{ui.appearance}</Eyebrow>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {(['system', 'light', 'dark'] as Preference[]).map((option) => {
          const selected = theme.preference === option;
          const label = option === 'system' ? catalog.ui.theme.system : option === 'light' ? catalog.ui.theme.light : catalog.ui.theme.dark;
          return (
            <Pressable
              key={option}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => theme.setPreference(option)}
              style={{
                flex: 1,
                minHeight: 48,
                borderRadius: 14,
                borderWidth: 1.5,
                borderColor: selected ? theme.colors.accent : theme.colors.line,
                backgroundColor: selected ? theme.colors.accentSoft : theme.colors.bgElevated,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontFamily: theme.fonts.bodySemibold, color: theme.colors.ink }}>{label}</Text>
            </Pressable>
          );
        })}
      </View>

      <Eyebrow>{ui.reminders}</Eyebrow>
      <Body>{ui.remindersNote}</Body>
      {Platform.OS !== 'android' ? <Small>{ui.webNote}</Small> : null}
      {pending ? (
        <Card tone="accent">
          <Heading>{ui.permissionTitle}</Heading>
          <Body>{ui.permissionBody}</Body>
          <Button label={ui.allow} onPress={() => void confirmPermission()} />
          <Button label={ui.notNow} variant="quiet" onPress={() => setPending(null)} />
        </Card>
      ) : null}
      {denied ? <Small tone="warning">{ui.denied}</Small> : null}

      <Card>
        <Row
          title={ui.dailyTitle}
          body={ui.dailyBody}
          value={settings.dailyEnabled}
          onChange={(value) => {
            if (value) void enable('daily');
            else void reminders.setDailyEnabled(false);
          }}
        />
        <Pressable accessibilityRole="button" onPress={() => setShowClock(true)} style={{ minHeight: 44, justifyContent: 'center' }}>
          <Small tone="ink">{ui.timeLabel}</Small>
          <Text style={{ fontFamily: theme.fonts.display, fontSize: 28, color: theme.colors.ink }}>{timeLabel}</Text>
        </Pressable>
        {showClock && Platform.OS === 'android' ? (
          <DateTimePicker
            value={clock}
            mode="time"
            is24Hour={false}
            onChange={(event, date) => {
              setShowClock(false);
              if (event.type === 'set' && date) void reminders.setTime(date.getHours(), date.getMinutes());
            }}
          />
        ) : null}
        {settings.dailyEnabled ? (
          <Button label={ui.sampleNow} variant="secondary" onPress={() => void sendSampleTeaser(settings)} />
        ) : null}
        {showClock && Platform.OS !== 'android' ? (
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Button label="Earlier" variant="secondary" onPress={() => void reminders.setTime((settings.hour + 23) % 24, settings.minute)} />
            <Button label="Later" variant="secondary" onPress={() => void reminders.setTime((settings.hour + 1) % 24, settings.minute)} />
          </View>
        ) : null}
      </Card>

      <Card>
        <Row
          title={ui.weeklyTitle}
          body={ui.weeklyBody}
          value={settings.weeklyEnabled}
          onChange={(value) => {
            if (value) void enable('weekly');
            else void reminders.setWeeklyEnabled(false);
          }}
        />
      </Card>
      <Card>
        <Row
          title={ui.inactivityTitle}
          body={ui.inactivityBody}
          value={settings.inactivityEnabled}
          onChange={(value) => {
            if (value) void enable('inactivity');
            else void reminders.setInactivityEnabled(false);
          }}
        />
      </Card>

    </Screen>
  );
}

function Row({
  title,
  body,
  value,
  onChange,
}: {
  title: string;
  body: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  const { colors, fonts } = useTheme();
  return (
    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={{ fontFamily: fonts.bodySemibold, fontSize: 17, color: colors.ink }}>{title}</Text>
        <Text style={{ fontFamily: fonts.body, fontSize: 15, lineHeight: 22, color: colors.inkSoft }}>{body}</Text>
      </View>
      <Switch
        accessibilityRole="switch"
        value={value}
        onValueChange={onChange}
        trackColor={{ true: colors.accent, false: colors.line }}
        thumbColor={colors.bgElevated}
      />
    </View>
  );
}
