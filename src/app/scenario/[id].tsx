import { ScenarioPlayer } from '@/components/ScenarioPlayer';
import { BackRow, Body, Screen, Title } from '@/components/ui';
import { catalog, findScenario } from '@/content';
import { useLocalSearchParams } from 'expo-router';

export default function ScenarioScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const scenario = id ? findScenario(id) : undefined;
  const ui = catalog.ui.scenario;

  if (!scenario) {
    return (
      <Screen mode="stack">
        <BackRow label={ui.back} fallback="/practice" />
        <Title>{ui.missingTitle}</Title>
        <Body>{ui.missingBody}</Body>
      </Screen>
    );
  }

  return <ScenarioPlayer key={scenario.id} scenario={scenario} />;
}
