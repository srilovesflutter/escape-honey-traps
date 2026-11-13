import { ProgressProvider, useProgress } from '@/progress/ProgressProvider';
import { RemindersProvider } from '@/reminders/RemindersProvider';
import { ThemeProvider, useTheme } from '@/theme/ThemeProvider';
import { Stack, useRouter } from 'expo-router';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, type ReactNode } from 'react';
import { Platform, View } from 'react-native';

if (Platform.OS === 'web' && typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = 'html, body, #root { height: 100%; } body { margin: 0; overflow: hidden; background: #241C16; }';
  document.head.appendChild(style);
}

SplashScreen.preventAutoHideAsync().catch(() => {});

function Frame({ children }: { children: ReactNode }) {
  const { colors } = useTheme();
  if (Platform.OS !== 'web') {
    return <View style={{ flex: 1, backgroundColor: colors.bg }}>{children}</View>;
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#241C16', alignItems: 'center' }}>
      <View style={{ flex: 1, width: '100%', maxWidth: 480, backgroundColor: colors.bg }}>{children}</View>
    </View>
  );
}

function OpenTeaserFromNotification() {
  const last = Notifications.useLastNotificationResponse();
  const router = useRouter();
  const handled = useRef<string | null>(null);

  useEffect(() => {
    if (!last) return;
    const teaserId = last.notification.request.content.data?.teaserId;
    if (typeof teaserId !== 'string') return;
    const key = `${last.notification.request.identifier}:${teaserId}`;
    if (handled.current === key) return;
    handled.current = key;
    router.push({ pathname: '/teaser/[id]', params: { id: teaserId } });
  }, [last, router]);

  return null;
}

function Navigator() {
  const theme = useTheme();
  const progress = useProgress();

  useEffect(() => {
    if (theme.ready && progress.ready) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [theme.ready, progress.ready]);

  if (!theme.ready || !progress.ready) return null;

  return (
    <Frame>
      <StatusBar style={theme.scheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.bg },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="lesson/[id]" />
        <Stack.Screen name="scenario/[id]" />
        <Stack.Screen name="privacy" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="teaser/[id]" />
      </Stack>
      <OpenTeaserFromNotification />
    </Frame>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <RemindersProvider>
          <Navigator />
        </RemindersProvider>
      </ProgressProvider>
    </ThemeProvider>
  );
}
