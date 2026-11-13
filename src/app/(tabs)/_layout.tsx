import { catalog } from '@/content';
import { useTheme } from '@/theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const { colors, fonts } = useTheme();
  const insets = useSafeAreaInsets();
  const tabs = catalog.ui.tabs;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.tab,
          borderTopColor: colors.line,
          borderTopWidth: 1,
          height: 64 + insets.bottom,
          paddingTop: 4,
          paddingBottom: insets.bottom + 8,
        },
        tabBarLabelStyle: {
          fontFamily: fonts.bodySemibold,
          fontSize: 11,
          lineHeight: 14,
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: tabs.learn,
          tabBarAccessibilityLabel: tabs.learn,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" color={typeof color === 'string' ? color : colors.muted} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: tabs.practice,
          tabBarAccessibilityLabel: tabs.practice,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles-outline" color={typeof color === 'string' ? color : colors.muted} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="check"
        options={{
          title: tabs.check,
          tabBarAccessibilityLabel: tabs.check,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkbox-outline" color={typeof color === 'string' ? color : colors.muted} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="help"
        options={{
          title: tabs.help,
          tabBarAccessibilityLabel: tabs.help,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="help-buoy-outline" color={typeof color === 'string' ? color : colors.muted} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
