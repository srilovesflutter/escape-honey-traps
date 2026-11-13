import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import * as Linking from 'expo-linking';

export function tap() {
  if (Platform.OS !== 'android') return;
  Haptics.selectionAsync().catch(() => {});
}

export async function openExternal(url: string): Promise<boolean> {
  try {
    await Linking.openURL(url);
    return true;
  } catch {
    return false;
  }
}
