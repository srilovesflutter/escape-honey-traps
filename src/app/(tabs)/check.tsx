import { catalog } from '@/content';
import { Body, Button, Card, Eyebrow, HeaderActions, Screen, Small, Strong, Title } from '@/components/ui';
import { scoreChecklist } from '@/lib/scoreChecklist';
import { tap } from '@/lib/device';
import { useTheme } from '@/theme/ThemeProvider';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export default function CheckScreen() {
  const router = useRouter();
  const { colors, fonts } = useTheme();
  const [selected, setSelected] = useState<string[]>([]);
  const ui = catalog.ui.check;
  const result = useMemo(() => scoreChecklist(catalog.checkItems, selected), [selected]);
  const band = ui.bands[result.band];
  const advice = [...result.serious, ...result.selected.filter((item) => item.weight < 3)].slice(0, 4);

  function toggle(id: string) {
    tap();
    setSelected((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  return (
    <Screen
      footer={
        <View style={{ gap: 4 }}>
          <Strong>{band.title}</Strong>
          <Small tone="ink">{selected.length === 0 ? ui.notSaved : ui.selected(selected.length)}</Small>
        </View>
      }
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <View style={{ flex: 1, gap: 8 }}>
          <Eyebrow>{catalog.ui.appName}</Eyebrow>
          <Title>{ui.title}</Title>
        </View>
        <HeaderActions />
      </View>
      <Body>{ui.lede}</Body>
      <Card tone={result.band === 'leave' ? 'danger' : result.band === 'pause' ? 'warning' : result.band === 'watch' ? 'accent' : 'default'}>
        <HeadingLike title={band.title} />
        <Body>{band.body}</Body>
        {advice.length > 0 ? (
          <View style={{ gap: 8 }}>
            <Strong>{ui.because}</Strong>
            {advice.map((item) => (
              <Text key={item.id} style={{ fontFamily: fonts.body, fontSize: 15, lineHeight: 22, color: colors.inkSoft }}>
                {item.advice}
              </Text>
            ))}
          </View>
        ) : null}
        {result.band === 'leave' || result.band === 'pause' ? (
          <Button label={ui.openHelp} onPress={() => router.navigate('/help')} />
        ) : null}
      </Card>
      {selected.length > 0 ? (
        <Button label={ui.clear} variant="quiet" onPress={() => setSelected([])} />
      ) : (
        <Small>{ui.notSaved}</Small>
      )}
      {catalog.checkGroups.map((group) => (
        <View key={group.id} style={{ gap: 10 }}>
          <Eyebrow>{group.title}</Eyebrow>
          {catalog.checkItems
            .filter((item) => item.group === group.id)
            .map((item) => {
              const on = selected.includes(item.id);
              return (
                <Pressable
                  key={item.id}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: on }}
                  onPress={() => toggle(item.id)}
                  style={{
                    minHeight: 52,
                    borderRadius: 14,
                    borderWidth: 1.5,
                    borderColor: on ? colors.accent : colors.line,
                    backgroundColor: on ? colors.accentSoft : colors.bgElevated,
                    padding: 14,
                    flexDirection: 'row',
                    gap: 12,
                    alignItems: 'flex-start',
                  }}
                >
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      borderWidth: 1.5,
                      borderColor: on ? colors.accent : colors.muted,
                      backgroundColor: on ? colors.accent : 'transparent',
                      marginTop: 2,
                    }}
                  />
                  <Text style={{ flex: 1, fontFamily: fonts.body, fontSize: 16, lineHeight: 22, color: colors.ink }}>
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
        </View>
      ))}
    </Screen>
  );
}

function HeadingLike({ title }: { title: string }) {
  const { colors, fonts } = useTheme();
  return <Text style={{ fontFamily: fonts.display, fontSize: 26, lineHeight: 32, color: colors.ink }}>{title}</Text>;
}
