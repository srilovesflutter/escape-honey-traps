import type { CheckItem } from '@/content/types';

export const checkGroups: { id: string; title: string }[] = [
  { id: 'pace', title: 'Pace and secrecy' },
  { id: 'identity', title: 'Identity' },
  { id: 'pressure', title: 'Money, images, and threats' },
  { id: 'work', title: 'Work and access' },
];

export const checkItems: CheckItem[] = [
  {
    id: 'fast-affection',
    group: 'pace',
    label: 'The affection got very intense within a few days.',
    weight: 1,
    advice: 'Intense affection in the first days is a reason to slow down, not a reason to leave the app or send money.',
  },
  {
    id: 'leave-app',
    group: 'pace',
    label: 'They want to leave the app for WhatsApp, Telegram, or SMS quickly.',
    weight: 1,
    advice: 'You can stay on the app where you met until you have an independent reason to trust them.',
  },
  {
    id: 'secrecy',
    group: 'pace',
    label: 'They ask you to keep the relationship secret from friends or family.',
    weight: 2,
    advice: 'A request to hide the relationship is a pressure tactic. Tell someone you trust anyway.',
  },
  {
    id: 'cannot-meet',
    group: 'pace',
    label: 'There is always a reason they cannot meet, or cannot do a normal live video.',
    weight: 2,
    advice: 'Repeated excuses to avoid a live video or a real meeting are a reason to pause, not to apologise for doubting them.',
  },
  {
    id: 'thin-profile',
    group: 'identity',
    label: 'The profile is very new, thin, or the photos look borrowed.',
    weight: 2,
    advice: 'A thin or borrowed-looking profile is a reason to verify before you invest trust. It is not proof by itself.',
  },
  {
    id: 'shifting-story',
    group: 'identity',
    label: 'Their job, city, name, or other basics have shifted when you asked.',
    weight: 2,
    advice: 'When the basic story shifts, believe the inconsistency. Ask once more, then stop if it does not settle.',
  },
  {
    id: 'money',
    group: 'pressure',
    label: 'They have asked for money, a gift card, crypto, or for you to move funds.',
    weight: 3,
    advice: 'Do not send money or pass funds on. If you already did, call your bank and 1930, and open Help.',
  },
  {
    id: 'otp',
    group: 'pressure',
    label: 'They have asked for a one-time code, a password, or a remote-access app.',
    weight: 3,
    advice: 'Never share a code, password, or remote-access app. Stop, and secure the account with the company yourself.',
  },
  {
    id: 'intimate',
    group: 'pressure',
    label: 'They are pushing for intimate photos or a nude or sexual video call.',
    weight: 3,
    advice: 'You can refuse. If you already sent something or joined a call, do not send more, and open Help.',
  },
  {
    id: 'threat',
    group: 'pressure',
    label: 'They have threatened to share images, or to contact your family, friends, or workplace.',
    weight: 3,
    advice: 'A threat is already enough to stop. Do not pay. Keep the messages and open Help.',
  },
  {
    id: 'work-interest',
    group: 'work',
    label: 'They are unusually interested in the systems, clients, or approvals you can reach.',
    weight: 2,
    advice: 'Unusual interest in your access is a work concern even when the conversation feels personal.',
  },
  {
    id: 'work-access',
    group: 'work',
    label: 'They asked you to share internal documents, screens, a badge, or credentials, or to skip a process.',
    weight: 3,
    advice: 'Do not share documents, screens, badges, or credentials, and do not skip a process. Tell security what was asked.',
  },
  {
    id: 'work-gift',
    group: 'work',
    label: 'A gift, trip, or favour is tied to a request about your work.',
    weight: 2,
    advice: 'A gift tied to a work request is still a work request. Refuse it and report the approach.',
  },
];
