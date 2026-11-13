import { Button, Screen, Title, Body } from '@/components/ui';
import { catalog } from '@/content';
import { useRouter } from 'expo-router';

export default function NotFound() {
  const router = useRouter();
  const ui = catalog.ui.notFound;
  return (
    <Screen mode="stack">
      <Title>{ui.title}</Title>
      <Body>{ui.body}</Body>
      <Button label={ui.action} onPress={() => router.replace('/')} />
    </Screen>
  );
}
