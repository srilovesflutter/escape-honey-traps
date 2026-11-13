import { catalog, findLesson } from '@/content';
import { BackRow, Body, Button, Card, Eyebrow, Heading, Screen, Small, Strong, Title } from '@/components/ui';
import { tap } from '@/lib/device';
import { useProgress } from '@/progress/ProgressProvider';
import { useTheme } from '@/theme/ThemeProvider';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export default function LessonScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const lesson = id ? findLesson(id) : undefined;
  const ui = catalog.ui.lesson;
  const { markLessonOpened, markLessonQuiz, state } = useProgress();
  const { colors, fonts } = useTheme();
  const [phase, setPhase] = useState<'read' | 'takeaways' | 'quiz' | 'done'>('read');
  const [cardIndex, setCardIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    if (lesson) markLessonOpened(lesson.id);
  }, [lesson, markLessonOpened]);

  if (!lesson) {
    return (
      <Screen mode="stack">
        <BackRow label={ui.back} fallback="/" />
        <Title>{ui.missingTitle}</Title>
        <Body>{ui.missingBody}</Body>
      </Screen>
    );
  }

  const record = state.lessons[lesson.id];
  const card = lesson.cards[cardIndex];
  const question = lesson.quiz[questionIndex];

  function finish(nextCorrect: number) {
    if (!lesson) return;
    markLessonQuiz(lesson.id, nextCorrect, lesson.quiz.length);
    setCorrectCount(nextCorrect);
    setPhase('done');
  }

  return (
    <Screen mode="stack">
      <BackRow label={ui.back} fallback="/" />
      <Eyebrow>{ui.cardProgress(phase === 'quiz' || phase === 'done' ? lesson.cards.length : cardIndex + 1, lesson.cards.length)}</Eyebrow>
      <Title>{lesson.title}</Title>

      {phase === 'read' && card ? (
        <View style={{ gap: 16 }}>
          <Card>
            <Heading>{card.title}</Heading>
            {card.paragraphs.map((paragraph) => (
              <Body key={paragraph}>{paragraph}</Body>
            ))}
            {card.aside ? (
              <View style={{ backgroundColor: colors.goldSoft, borderRadius: 12, padding: 12, gap: 4 }}>
                <Text style={{ fontFamily: fonts.bodySemibold, fontSize: 13, color: colors.gold }}>{card.aside.label}</Text>
                <Text style={{ fontFamily: fonts.body, fontSize: 15, lineHeight: 22, color: colors.ink }}>{card.aside.text}</Text>
              </View>
            ) : null}
          </Card>
          <Button
            label={cardIndex === lesson.cards.length - 1 ? ui.takeaways : ui.next}
            onPress={() => {
              if (cardIndex === lesson.cards.length - 1) setPhase('takeaways');
              else setCardIndex((value) => value + 1);
            }}
          />
        </View>
      ) : null}

      {phase === 'takeaways' ? (
        <View style={{ gap: 16 }}>
          <Card tone="accent">
            <Heading>{ui.takeawaysHeading}</Heading>
            {lesson.takeaways.map((item) => (
              <Text key={item} style={{ fontFamily: fonts.body, fontSize: 16, lineHeight: 24, color: colors.ink }}>
                {`•  ${item}`}
              </Text>
            ))}
          </Card>
          <Button label={ui.startQuiz} onPress={() => setPhase('quiz')} />
        </View>
      ) : null}

      {phase === 'quiz' && question ? (
        <View style={{ gap: 12 }}>
          <Small tone="ink">{ui.questionProgress(questionIndex + 1, lesson.quiz.length)}</Small>
          <Heading>{question.prompt}</Heading>
          {question.options.map((option, index) => {
            const selected = picked === index;
            const show = revealed;
            const isCorrect = index === question.correctIndex;
            const background = !show
              ? selected
                ? colors.accentSoft
                : colors.bgElevated
              : isCorrect
                ? colors.goodSoft
                : selected
                  ? colors.dangerSoft
                  : colors.bgElevated;
            const border = !show ? (selected ? colors.accent : colors.line) : isCorrect ? colors.good : selected ? colors.danger : colors.line;
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
                style={{
                  borderWidth: 1.5,
                  borderColor: border,
                  backgroundColor: background,
                  borderRadius: 14,
                  padding: 14,
                }}
              >
                <Text style={{ fontFamily: fonts.body, fontSize: 16, lineHeight: 22, color: colors.ink }}>{option}</Text>
              </Pressable>
            );
          })}
          {hint ? <Small tone="warning">{ui.chooseFirst}</Small> : null}
          {revealed ? (
            <Card tone={picked === question.correctIndex ? 'good' : 'warning'}>
              <Strong>{picked === question.correctIndex ? ui.correct : ui.notQuite}</Strong>
              <Body>{question.explanation}</Body>
            </Card>
          ) : null}
          {!revealed ? (
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
          ) : (
            <Button
              label={questionIndex === lesson.quiz.length - 1 ? ui.seeScore : ui.nextQuestion}
              onPress={() => {
                const nextCorrect = correctCount + (picked === question.correctIndex ? 1 : 0);
                if (questionIndex === lesson.quiz.length - 1) {
                  finish(nextCorrect);
                  return;
                }
                setCorrectCount(nextCorrect);
                setQuestionIndex((value) => value + 1);
                setPicked(null);
                setRevealed(false);
                setHint(false);
              }}
            />
          )}
        </View>
      ) : null}

      {phase === 'done' ? (
        <View style={{ gap: 16 }}>
          <Card tone="accent">
            <Heading>{ui.score(correctCount, lesson.quiz.length)}</Heading>
            <Body>{correctCount === lesson.quiz.length ? ui.allClear : ui.keepExplanations}</Body>
            <Small tone="ink">
              {ui.best(Math.max(record?.bestCorrect ?? 0, correctCount), lesson.quiz.length)}
            </Small>
          </Card>
          <Button
            label={ui.review}
            variant="secondary"
            onPress={() => {
              setPhase('read');
              setCardIndex(0);
            }}
          />
          <Button
            label={ui.retry}
            variant="secondary"
            onPress={() => {
              setPhase('quiz');
              setQuestionIndex(0);
              setPicked(null);
              setRevealed(false);
              setCorrectCount(0);
              setHint(false);
            }}
          />
          <BackRow label={ui.backToLessons} fallback="/" />
        </View>
      ) : null}
    </Screen>
  );
}
