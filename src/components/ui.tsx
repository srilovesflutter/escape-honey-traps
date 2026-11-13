import { catalog } from '@/content';
import { tap } from '@/lib/device';
import { useTheme } from '@/theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { type ReactNode } from 'react';
import { Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function Screen({
  children,
  mode = 'tab',
  footer,
}: {
  children: ReactNode;
  mode?: 'tab' | 'stack';
  footer?: ReactNode;
}) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const top = Math.max(insets.top, Platform.OS === 'web' ? 12 : 0);
  const bottom = mode === 'stack' ? Math.max(insets.bottom, 12) : 0;
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: top }}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 28 + bottom, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
      {footer ? (
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: colors.line,
            backgroundColor: colors.bgElevated,
            paddingHorizontal: 20,
            paddingTop: 12,
            paddingBottom: Math.max(insets.bottom, 12),
            gap: 8,
          }}
        >
          {footer}
        </View>
      ) : null}
    </View>
  );
}

export function Eyebrow({ children }: { children: string }) {
  const { colors, fonts } = useTheme();
  return (
    <Text
      style={{
        fontFamily: fonts.bodySemibold,
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0.8,
        textTransform: 'uppercase',
        color: colors.accent,
      }}
    >
      {children}
    </Text>
  );
}

export function Display({ children }: { children: string }) {
  const { colors, fonts } = useTheme();
  return (
    <Text style={{ fontFamily: fonts.display, fontSize: 34, lineHeight: 40, color: colors.ink, letterSpacing: -0.4 }}>
      {children}
    </Text>
  );
}

export function Title({ children }: { children: string }) {
  const { colors, fonts } = useTheme();
  return (
    <Text style={{ fontFamily: fonts.display, fontSize: 28, lineHeight: 34, color: colors.ink }}>{children}</Text>
  );
}

export function Heading({ children }: { children: string }) {
  const { colors, fonts } = useTheme();
  return (
    <Text style={{ fontFamily: fonts.display, fontSize: 22, lineHeight: 28, color: colors.ink }}>{children}</Text>
  );
}

export function Body({ children }: { children: ReactNode }) {
  const { colors, fonts } = useTheme();
  return (
    <Text style={{ fontFamily: fonts.body, fontSize: 17, lineHeight: 26, color: colors.inkSoft }}>{children}</Text>
  );
}

export function Small({ children, tone = 'muted' }: { children: ReactNode; tone?: 'muted' | 'ink' | 'warning' }) {
  const { colors, fonts } = useTheme();
  const color = tone === 'ink' ? colors.ink : tone === 'warning' ? colors.warning : colors.muted;
  return <Text style={{ fontFamily: fonts.body, fontSize: 14, lineHeight: 20, color }}>{children}</Text>;
}

export function Strong({ children }: { children: ReactNode }) {
  const { colors, fonts } = useTheme();
  return (
    <Text style={{ fontFamily: fonts.bodySemibold, fontSize: 16, lineHeight: 22, color: colors.ink }}>{children}</Text>
  );
}

export function Card({
  children,
  tone = 'default',
}: {
  children: ReactNode;
  tone?: 'default' | 'accent' | 'good' | 'warning' | 'danger';
}) {
  const { colors } = useTheme();
  const background =
    tone === 'accent'
      ? colors.accentSoft
      : tone === 'good'
        ? colors.goodSoft
        : tone === 'warning'
          ? colors.warningSoft
          : tone === 'danger'
            ? colors.dangerSoft
            : colors.bgElevated;
  return (
    <View
      style={{
        backgroundColor: background,
        borderColor: colors.line,
        borderWidth: 1,
        borderRadius: 18,
        padding: 16,
        gap: 10,
      }}
    >
      {children}
    </View>
  );
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled,
}: {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'quiet';
  disabled?: boolean;
}) {
  const { colors, fonts } = useTheme();
  const background = variant === 'primary' ? colors.accent : 'transparent';
  const color = variant === 'primary' ? colors.accentInk : colors.accent;
  const borderColor = variant === 'secondary' ? colors.accent : 'transparent';
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={() => {
        tap();
        onPress();
      }}
      style={({ pressed }) => ({
        minHeight: 48,
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: background,
        borderWidth: variant === 'secondary' ? 1.5 : 0,
        borderColor,
        opacity: disabled ? 0.45 : pressed ? 0.85 : 1,
      })}
    >
      <Text style={{ fontFamily: fonts.bodySemibold, fontSize: 16, lineHeight: 22, color, textAlign: 'center' }}>
        {label}
      </Text>
    </Pressable>
  );
}

export function ChoiceButton({ label, onPress }: { label: string; onPress: () => void }) {
  const { colors, fonts } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => {
        tap();
        onPress();
      }}
      style={({ pressed }) => ({
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: colors.line,
        backgroundColor: pressed ? colors.accentSoft : colors.bgElevated,
        paddingHorizontal: 14,
        paddingVertical: 14,
      })}
    >
      <Text style={{ fontFamily: fonts.body, fontSize: 16, lineHeight: 22, color: colors.ink }}>{label}</Text>
    </Pressable>
  );
}

export function GearButton() {
  const router = useRouter();
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={catalog.ui.settings.openLabel}
      onPress={() => {
        tap();
        router.push('/settings');
      }}
      style={{
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: colors.line,
        backgroundColor: colors.bgElevated,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Ionicons name="settings-outline" size={20} color={colors.accent} />
    </Pressable>
  );
}

export function HeaderActions() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <GearButton />
      <ThemeButton />
    </View>
  );
}

export function ThemeButton() {
  const { preference, cyclePreference, colors, fonts } = useTheme();
  const label =
    preference === 'light' ? catalog.ui.theme.light : preference === 'dark' ? catalog.ui.theme.dark : catalog.ui.theme.system;
  const icon = preference === 'light' ? 'sunny-outline' : preference === 'dark' ? 'moon-outline' : 'phone-portrait-outline';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={catalog.ui.theme.switchLabel(label)}
      onPress={() => {
        tap();
        cyclePreference();
      }}
      style={{
        minHeight: 44,
        paddingHorizontal: 10,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: colors.line,
        backgroundColor: colors.bgElevated,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
      }}
    >
      <Ionicons name={icon} size={16} color={colors.accent} />
      <Text style={{ fontFamily: fonts.bodySemibold, fontSize: 13, color: colors.ink }}>{label}</Text>
    </Pressable>
  );
}

export function BackRow({ label, fallback }: { label: string; fallback: '/' | '/practice' | '/help' }) {
  const router = useRouter();
  const { colors, fonts } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={() => {
        tap();
        if (router.canGoBack()) router.back();
        else router.replace(fallback);
      }}
      style={{ flexDirection: 'row', alignItems: 'center', gap: 2, minHeight: 44, alignSelf: 'flex-start' }}
    >
      <Ionicons name="chevron-back" size={22} color={colors.accent} />
      <Text style={{ fontFamily: fonts.bodySemibold, fontSize: 16, color: colors.accent }}>{label}</Text>
    </Pressable>
  );
}

export function ProgressTrack({ value }: { value: number }) {
  const { colors } = useTheme();
  const width = `${Math.max(0, Math.min(1, value)) * 100}%` as `${number}%`;
  return (
    <View style={{ height: 6, borderRadius: 99, backgroundColor: colors.line, overflow: 'hidden' }}>
      <View style={{ width, height: 6, borderRadius: 99, backgroundColor: colors.accent }} />
    </View>
  );
}
