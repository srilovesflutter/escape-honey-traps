import { catalog } from '@/content';
import type { Scenario, ScenarioChoice, ScenarioMessage, Tone } from '@/content/types';
import { useProgress } from '@/progress/ProgressProvider';
import { useTheme } from '@/theme/ThemeProvider';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View, type ScrollViewInstance } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackRow, Button, ChoiceButton, Small, Strong } from '@/components/ui';

type LogItem =
  | { type: 'messages'; key: string; messages: ScenarioMessage[] }
  | { type: 'you'; key: string; text: string }
  | { type: 'feedback'; key: string; tone: Tone; text: string }
  | { type: 'ending'; key: string; title: string; body: string };

function freshLog(scenario: Scenario): LogItem[] {
  const start = scenario.nodes.find((node) => node.id === scenario.start);
  if (!start) return [];
  return [{ type: 'messages', key: start.id, messages: start.messages }];
}

export function ScenarioPlayer({ scenario }: { scenario: Scenario }) {
  const { colors, fonts } = useTheme();
  const insets = useSafeAreaInsets();
  const { markScenario } = useProgress();
  const scrollRef = useRef<ScrollViewInstance>(null);
  const saved = useRef(false);
  const [nodeId, setNodeId] = useState(scenario.start);
  const [chosen, setChosen] = useState<ScenarioChoice | null>(null);
  const [log, setLog] = useState<LogItem[]>(() => freshLog(scenario));
  const ui = catalog.ui.scenario;
  const node = scenario.nodes.find((item) => item.id === nodeId);
  const ended = log.some((item) => item.type === 'ending');

  useEffect(() => {
    if (log.length <= 1 && !chosen) return;
    const timer = setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 40);
    return () => clearTimeout(timer);
  }, [log, chosen]);

  useEffect(() => {
    if (!ended || saved.current) return;
    saved.current = true;
    const feedback = log.filter((item) => item.type === 'feedback');
    const safer = feedback.filter((item) => item.type === 'feedback' && item.tone === 'safer').length;
    markScenario(scenario.id, safer, feedback.length);
  }, [ended, log, markScenario, scenario.id]);

  function choose(choice: ScenarioChoice) {
    setChosen(choice);
    setLog((prev) => [
      ...prev,
      { type: 'you', key: `${nodeId}-${choice.id}-you`, text: choice.label },
      { type: 'feedback', key: `${nodeId}-${choice.id}-feedback`, tone: choice.tone, text: choice.feedback },
    ]);
  }

  function continueDrill() {
    if (!chosen) return;
    const next = scenario.nodes.find((item) => item.id === chosen.next);
    if (!next) return;
    setNodeId(next.id);
    setChosen(null);
    setLog((prev) => {
      const items = [...prev];
      if (next.messages.length) items.push({ type: 'messages', key: next.id, messages: next.messages });
      if (next.ending) {
        items.push({
          type: 'ending',
          key: `${next.id}-ending`,
          title: next.ending.title,
          body: next.ending.body,
        });
      }
      return items;
    });
  }

  function restart() {
    saved.current = false;
    setNodeId(scenario.start);
    setChosen(null);
    setLog(freshLog(scenario));
  }

  const feedbackCount = log.filter((item) => item.type === 'feedback').length;
  const saferCount = log.filter((item) => item.type === 'feedback' && item.tone === 'safer').length;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: Math.max(insets.top, 12) }}>
      <View style={{ paddingHorizontal: 20, gap: 10, paddingBottom: 10 }}>
        <BackRow label={ui.back} fallback="/practice" />
        <View
          style={{
            backgroundColor: colors.warningSoft,
            borderRadius: 14,
            padding: 12,
            gap: 4,
            borderWidth: 1,
            borderColor: colors.line,
          }}
        >
          <Text style={{ fontFamily: fonts.bodyBold, fontSize: 13, letterSpacing: 0.6, color: colors.warning }}>
            {ui.bannerTitle.toUpperCase()}
          </Text>
          <Text style={{ fontFamily: fonts.body, fontSize: 14, lineHeight: 20, color: colors.ink }}>{ui.bannerBody}</Text>
        </View>
        <View>
          <Strong>{ui.fictional(scenario.contactName)}</Strong>
          <Small>{scenario.contactDetail}</Small>
        </View>
      </View>
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1, minHeight: 0 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 28 + insets.bottom, gap: 12 }}
        showsVerticalScrollIndicator={false}
      >
        {log.map((item) => {
          if (item.type === 'messages') {
            return item.messages.map((message, index) =>
              message.from === 'note' ? (
                <Text
                  key={`${item.key}-note-${index}`}
                  style={{ fontFamily: fonts.bodyItalic, fontSize: 14, lineHeight: 20, color: colors.muted }}
                >
                  {message.text}
                </Text>
              ) : (
                <View key={`${item.key}-contact-${index}`} style={{ alignSelf: 'flex-start', maxWidth: '92%', gap: 4 }}>
                  <Text style={{ fontFamily: fonts.bodySemibold, fontSize: 12, color: colors.muted }}>{scenario.contactName}</Text>
                  <View style={{ backgroundColor: colors.bgElevated, borderRadius: 16, borderWidth: 1, borderColor: colors.line, padding: 12 }}>
                    <Text style={{ fontFamily: fonts.body, fontSize: 16, lineHeight: 23, color: colors.ink }}>{message.text}</Text>
                  </View>
                </View>
              ),
            );
          }
          if (item.type === 'you') {
            return (
              <View key={item.key} style={{ alignSelf: 'flex-end', maxWidth: '92%', gap: 4 }}>
                <Text style={{ fontFamily: fonts.bodySemibold, fontSize: 12, color: colors.muted, textAlign: 'right' }}>{ui.you}</Text>
                <View style={{ backgroundColor: colors.accent, borderRadius: 16, padding: 12 }}>
                  <Text style={{ fontFamily: fonts.body, fontSize: 16, lineHeight: 23, color: colors.accentInk }}>{item.text}</Text>
                </View>
              </View>
            );
          }
          if (item.type === 'feedback') {
            const toneColor = item.tone === 'safer' ? colors.good : item.tone === 'risky' ? colors.danger : colors.warning;
            const toneBg = item.tone === 'safer' ? colors.goodSoft : item.tone === 'risky' ? colors.dangerSoft : colors.warningSoft;
            return (
              <View key={item.key} style={{ backgroundColor: toneBg, borderRadius: 16, padding: 12, gap: 4, borderWidth: 1, borderColor: colors.line }}>
                <Text style={{ fontFamily: fonts.bodySemibold, fontSize: 13, color: toneColor }}>{ui.tones[item.tone]}</Text>
                <Text style={{ fontFamily: fonts.body, fontSize: 15, lineHeight: 22, color: colors.ink }}>{item.text}</Text>
              </View>
            );
          }
          return (
            <View key={item.key} style={{ backgroundColor: colors.accentSoft, borderRadius: 16, padding: 14, gap: 6 }}>
              <Text style={{ fontFamily: fonts.display, fontSize: 22, lineHeight: 28, color: colors.ink }}>{item.title}</Text>
              <Text style={{ fontFamily: fonts.body, fontSize: 16, lineHeight: 24, color: colors.inkSoft }}>{item.body}</Text>
              <Text style={{ fontFamily: fonts.bodySemibold, fontSize: 14, color: colors.ink }}>{ui.summary(saferCount, feedbackCount)}</Text>
            </View>
          );
        })}
        <View style={{ gap: 10, paddingTop: 4 }}>
          {ended ? (
            <Button label={ui.again} onPress={restart} />
          ) : chosen ? (
            <Button label={ui.continue} onPress={continueDrill} />
          ) : (
            node?.choices?.map((choice) => <ChoiceButton key={choice.id} label={choice.label} onPress={() => choose(choice)} />)
          )}
        </View>
      </ScrollView>
    </View>
  );
}
