import type { PolicySection } from '@/content/types';

export const privacy = {
  title: 'Privacy policy',
  updated: '13 November 2026',
  intro:
    'Escape Honey Traps is a free educational Android app, with no ads and no in-app purchases. It helps you recognise romance scams, sextortion, fake profiles, and workplace approaches, and it points you to public helplines. This policy describes the app on Google Play with package name com.escapehoneytraps.app.',
  sections: [
    {
      heading: 'Data stays on your device',
      paragraphs: [
        'The app stores a small amount of information in local storage on your phone, using the device’s app storage (AsyncStorage). That information is your theme choice (match the phone, light, or dark), which lessons you have opened, whether you finished a lesson quiz, your best quiz score for each lesson, and the result of the last time you finished a practice drill.',
        'This information is not sent to the developer, to an analytics service, or to any other server. The app has no account, no login, and no cloud sync.',
      ],
    },
    {
      heading: 'The red-flag checklist is not saved',
      paragraphs: [
        'Ticks on the Check tab stay in memory while that screen is open. They are not written to storage. Leave the screen or close the app and they are gone. Do not type a person’s name, phone number, or other identifier into the app. The checklist has no free-text field.',
      ],
    },
    {
      heading: 'What the app does not collect',
      paragraphs: [
        'The app does not ask for your name, phone number, contacts, photos, messages, location, or payment details. It does not read your SMS, email, or social accounts. It does not include advertising, crash-reporting SDKs, or analytics SDKs.',
        'The course works without a network connection. If your phone has no data, the lessons, drills, checklist, and the written steps in Help still open.',
        'The installed Android app declares an internet permission, which the Expo runtime includes, and a vibration permission so a tap can be felt. It does not use the internet permission to upload your progress, checklist, or anything you read. It does not ask for your photos, files, contacts, location, or permission to draw over other apps.',
      ],
    },
    {
      heading: 'Calls and links you choose to open',
      paragraphs: [
        'Help contains buttons that open your phone’s dialer (for example tel:1930) or your browser (for example https://cybercrime.gov.in/ and https://stopncii.org/). The app hands the link to the system. It does not receive what you later say to a helpline, a bank, or a website, and it does not upload screenshots or images.',
        'Those organisations have their own privacy practices. Read theirs before you send them personal information.',
      ],
    },
    {
      heading: 'Children',
      paragraphs: [
        'The app is intended for adults aged 18 and over. It is not directed at children, and it should not be installed for a child. It discusses sextortion and intimate images in plain, non-explicit language because adults need that information. It does not allow anyone to upload photos.',
      ],
    },
    {
      heading: 'Reminders',
      paragraphs: [
        'If you turn reminders on, the app schedules them on this phone. There is no push server and no notification token. The app stores whether each reminder is on, the time you chose, and the time you last opened the app so a nudge can be set for three days later.',
        'A daily or Sunday reminder shows a short hypothetical question, for example “Sweet, or a setup?”. It is a practice prompt, not a message about your life. It does not include names, photos, checklist answers, or explicit wording. Tapping it opens one practice question and an explanation inside the app. A separate nudge after three quiet days only says to continue the course.',
        'On Android 13 and newer, the app asks for notification permission only when you turn a reminder on, and only after this explanation. Older Android versions do not show that permission prompt. You can turn every reminder off in Settings.',
      ],
    },
    {
      heading: 'How to delete what is stored',
      paragraphs: [
        'On the Learn tab, “Reset progress on this phone” deletes lesson and drill progress stored by the app. Turning reminders off in Settings cancels the scheduled notifications. Uninstalling the app deletes its local storage, including the theme, reminder choices, and the last-opened time. There is no account to delete and no copy held by the developer.',
      ],
    },
    {
      heading: 'Changes',
      paragraphs: [
        'If a later version stores or transmits anything new, this policy will change and the Play listing will point at the updated policy before that version is what new users install. The version you are reading was written for version 1.1.0 of the app.',
      ],
    },
    {
      heading: 'Contact',
      paragraphs: [
        'There is no account to access, correct, or export. Questions about this policy can be sent to the email address published on the Google Play listing for Escape Honey Traps. Please do not send intimate images or account passwords to that address.',
      ],
    },
  ] satisfies PolicySection[],
};
