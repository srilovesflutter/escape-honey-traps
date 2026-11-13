import { catalog } from '@/content';
import { Body, Card, Eyebrow, HeaderActions, Screen, Small, Title } from '@/components/ui';
import { useProgress } from '@/progress/ProgressProvider';
import { useTheme } from '@/theme/ThemeProvider';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function PracticeScreen() {
  const router = useRouter();
  const { colors, fonts } = useTheme();
  const { state } = useProgress();
  const ui = catalog.ui.practice;

  return (
    <Screen>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <View style={{ flex: 1, gap: 8 }}>
          <Eyebrow>{catalog.ui.appName}</Eyebrow>
          <Title>{ui.title}</Title>
        </View>
        <HeaderActions />
      </View>
      <Card tone="warning">
        <Body>{ui.lede}</Body>
      </Card>
      {catalog.scenarios.map((scenario) => {
        const record = state.scenarios[scenario.id];
        return (
          <Pressable
            key={scenario.id}
            accessibilityRole="button"
            onPress={() => router.push({ pathname: '/scenario/[id]', params: { id: scenario.id } })}
            style={{
              backgroundColor: colors.bgElevated,
              borderColor: colors.line,
              borderWidth: 1,
              borderRadius: 18,
              padding: 16,
              gap: 8,
            }}
          >
            <Text style={{ fontFamily: fonts.display, fontSize: 22, lineHeight: 28, color: colors.ink }}>{scenario.title}</Text>
            <Text style={{ fontFamily: fonts.body, fontSize: 15, lineHeight: 22, color: colors.inkSoft }}>{scenario.summary}</Text>
            <Small>
              {scenario.lengthLabel}
              {' · '}
              {record?.completed ? ui.lastRun(record.safer, record.total) : ui.notTried}
            </Small>
          </Pressable>
        );
      })}
    </Screen>
  );
}
