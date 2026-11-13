import { BackRow, Body, Heading, Screen, Small, Title } from '@/components/ui';
import { catalog } from '@/content';
import { View } from 'react-native';

export default function PrivacyScreen() {
  const policy = catalog.privacy;
  return (
    <Screen mode="stack">
      <BackRow label={catalog.ui.privacy.back} fallback="/help" />
      <Title>{policy.title}</Title>
      <Small>Updated {policy.updated}</Small>
      <Body>{policy.intro}</Body>
      {policy.sections.map((section) => (
        <View key={section.heading} style={{ gap: 8 }}>
          <Heading>{section.heading}</Heading>
          {section.paragraphs.map((paragraph) => (
            <Body key={paragraph}>{paragraph}</Body>
          ))}
        </View>
      ))}
    </Screen>
  );
}
