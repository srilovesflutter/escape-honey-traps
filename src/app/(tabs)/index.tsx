import { catalog, findTeaser } from '@/content';
import { Body, Button, Card, Display, Eyebrow, HeaderActions, ProgressTrack, Screen, Small, Strong } from '@/components/ui';
import { useProgress } from '@/progress/ProgressProvider';
import { useReminders } from '@/reminders/RemindersProvider';
import { useTheme } from '@/theme/ThemeProvider';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export default function LearnScreen() {
  const router = useRouter();
  const { colors, fonts } = useTheme();
  const { state, reset } = useProgress();
  const reminders = useReminders();
  const today = findTeaser(reminders.todayTeaserId);
  const [confirmReset, setConfirmReset] = useState(false);
  const ui = catalog.ui;
  const done = catalog.lessons.filter((lesson) => state.lessons[lesson.id]?.completed).length;

  return (
    <Screen>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <View style={{ flex: 1, gap: 8 }}>
          <Eyebrow>{ui.tagline}</Eyebrow>
          <Display>{ui.appName}</Display>
        </View>
        <HeaderActions />
      </View>
      <Body>{ui.learn.lede}</Body>
      {today ? (
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push({ pathname: '/teaser/[id]', params: { id: today.id } })}
        >
          <Card tone="accent">
            <Eyebrow>{ui.learn.weeklyTipTitle}</Eyebrow>
            <Body>{today.prompt}</Body>
          </Card>
        </Pressable>
      ) : null}
      <Card tone="accent">
        <Strong>{ui.learn.progress(done, catalog.lessons.length)}</Strong>
        <ProgressTrack value={catalog.lessons.length === 0 ? 0 : done / catalog.lessons.length} />
        <Small tone="ink">{ui.learn.localNote}</Small>
      </Card>
      <Eyebrow>{ui.learn.lessonsHeading}</Eyebrow>
      {catalog.lessons.map((lesson, index) => {
        const record = state.lessons[lesson.id];
        const status = record?.completed ? ui.learn.done : record?.opened ? ui.learn.inProgress : ui.learn.notStarted;
        return (
          <Pressable
            key={lesson.id}
            accessibilityRole="button"
            onPress={() => router.push({ pathname: '/lesson/[id]', params: { id: lesson.id } })}
            style={{
              backgroundColor: colors.bgElevated,
              borderColor: colors.line,
              borderWidth: 1,
              borderRadius: 18,
              padding: 16,
              gap: 8,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}>
              <Text style={{ fontFamily: fonts.bodySemibold, fontSize: 13, color: colors.accent }}>
                {String(index + 1).padStart(2, '0')}
              </Text>
              <Text style={{ fontFamily: fonts.bodySemibold, fontSize: 13, color: record?.completed ? colors.good : colors.muted }}>
                {status}
              </Text>
            </View>
            <Text style={{ fontFamily: fonts.display, fontSize: 22, lineHeight: 28, color: colors.ink }}>{lesson.title}</Text>
            <Text style={{ fontFamily: fonts.body, fontSize: 15, lineHeight: 22, color: colors.inkSoft }}>{lesson.summary}</Text>
            <Small>{ui.learn.meta(lesson.minutes, lesson.quiz.length)}</Small>
          </Pressable>
        );
      })}
      <Button
        label={confirmReset ? ui.learn.resetConfirm : ui.learn.reset}
        variant="quiet"
        onPress={() => {
          if (!confirmReset) {
            setConfirmReset(true);
            return;
          }
          reset();
          setConfirmReset(false);
        }}
      />
    </Screen>
  );
}
