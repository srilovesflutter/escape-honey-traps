import { catalog } from '@/content';
import { Body, Button, Card, Eyebrow, HeaderActions, Heading, Screen, Small, Title } from '@/components/ui';
import { openExternal, tap } from '@/lib/device';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

export default function HelpScreen() {
  const router = useRouter();
  const ui = catalog.ui.help;
  const [error, setError] = useState<string | null>(null);

  async function open(url: string) {
    tap();
    const ok = await openExternal(url);
    setError(ok ? null : ui.couldNotOpen);
  }

  return (
    <Screen>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <View style={{ flex: 1, gap: 8 }}>
          <Eyebrow>{catalog.ui.appName}</Eyebrow>
          <Title>{ui.title}</Title>
        </View>
        <HeaderActions />
      </View>
      <Body>{ui.lede}</Body>
      <Eyebrow>{ui.stepsHeading}</Eyebrow>
      {catalog.helpSteps.map((step, index) => (
        <Card key={step.title}>
          <Small tone="ink">{String(index + 1).padStart(2, '0')}</Small>
          <Heading>{step.title}</Heading>
          <Body>{step.body}</Body>
        </Card>
      ))}
      <Card tone="warning">
        <Heading>{ui.afterStepsTitle}</Heading>
        <Body>{ui.afterStepsBody}</Body>
      </Card>
      <Eyebrow>{ui.resourcesHeading}</Eyebrow>
      {error ? <Small tone="warning">{error}</Small> : null}
      {catalog.helpResources.map((resource) => (
        <Card key={resource.id}>
          <Heading>{resource.name}</Heading>
          <Body>{resource.summary}</Body>
          <Small>{resource.note}</Small>
          <View style={{ gap: 8 }}>
            {resource.actions.map((action) => (
              <Button key={action.url} label={action.label} variant="secondary" onPress={() => void open(action.url)} />
            ))}
          </View>
        </Card>
      ))}
      <Card tone="warning">
        <Heading>{ui.childTitle}</Heading>
        <Body>{ui.childBody}</Body>
        <Button label={ui.childAction} variant="secondary" onPress={() => void open('tel:1098')} />
      </Card>
      <Card>
        <Heading>{ui.privacyTitle}</Heading>
        <Body>{ui.privacyBody}</Body>
        <Button label={ui.privacyAction} variant="secondary" onPress={() => router.push('/privacy')} />
      </Card>
      <Card>
        <Heading>{ui.limitsTitle}</Heading>
        <Body>{ui.limitsBody}</Body>
        <Small>{`Android package ${Constants.expoConfig?.android?.package ?? 'com.escapehoneytraps.app'} · version ${Constants.expoConfig?.version ?? ''}`}</Small>
      </Card>
    </Screen>
  );
}
