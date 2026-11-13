import { catalog, findLesson, findTeaser } from '@/content';
import { BackRow, Body, Button, Card, Eyebrow, Heading, Screen, Small, Strong, Title } from '@/components/ui';
import { tap } from '@/lib/device';
import { useTheme } from '@/theme/ThemeProvider';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text } from 'react-native';

export default function TeaserScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const teaser = id ? findTeaser(id) : undefined;
  const ui = catalog.ui.teaser;
  const router = useRouter();
  const { colors, fonts } = useTheme();
  const [picked, setPicked] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [hint, setHint] = useState(false);

  if (!teaser) {
    return (
      <Screen mode="stack">
        <BackRow label={ui.back} fallback="/" />
        <Title>{ui.missingTitle}</Title>
        <Body>{ui.missingBody}</Body>
      </Screen>
    );
  }

  const lesson = findLesson(teaser.lessonId);
  const quiz = teaser.quiz;

  return (
    <Screen mode="stack">
      <BackRow label={ui.back} fallback="/" />
      <Eyebrow>{ui.eyebrow}</Eyebrow>
      <Title>{teaser.prompt}</Title>
      <Heading>{quiz.question}</Heading>
      {quiz.options.map((option, index) => {
        const selected = picked === index;
        const isCorrect = index === quiz.correctIndex;
        const background = !revealed ? (selected ? colors.accentSoft : colors.bgElevated) : isCorrect ? colors.goodSoft : selected ? colors.dangerSoft : colors.bgElevated;
        const border = !revealed ? (selected ? colors.accent : colors.line) : isCorrect ? colors.good : selected ? colors.danger : colors.line;
        return (
          <Pressable
            key={option}
            accessibilityRole="button"
            disabled={revealed}
            onPress={() => {
              tap();
              setPicked(index);
              setHint(false);
            }}
            style={{ borderWidth: 1.5, borderColor: border, backgroundColor: background, borderRadius: 14, padding: 14 }}
          >
            <Text style={{ fontFamily: fonts.body, fontSize: 16, lineHeight: 22, color: colors.ink }}>{option}</Text>
          </Pressable>
        );
      })}
      {hint ? <Small tone="warning">{ui.chooseFirst}</Small> : null}
      {revealed ? (
        <Card tone={picked === quiz.correctIndex ? 'good' : 'warning'}>
          <Strong>{picked === quiz.correctIndex ? ui.correct : ui.notQuite}</Strong>
          <Body>{quiz.explanation}</Body>
        </Card>
      ) : (
        <Button
          label={ui.check}
          onPress={() => {
            if (picked === null) {
              setHint(true);
              return;
            }
            setRevealed(true);
          }}
        />
      )}
      {lesson ? (
        <Button
          label={ui.openLesson}
          variant="secondary"
          onPress={() => router.push({ pathname: '/lesson/[id]', params: { id: lesson.id } })}
        />
      ) : null}
    </Screen>
  );
}
