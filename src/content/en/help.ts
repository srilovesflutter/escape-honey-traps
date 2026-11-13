import type { HelpResource, HelpStep } from '@/content/types';

export const helpSteps: HelpStep[] = [
  {
    title: 'Do not pay',
    body: 'A payment rarely ends the threat. It shows that threats work. Do not send money, a gift card, crypto, or a smaller amount “to test them”.',
  },
  {
    title: 'Do not send more',
    body: 'Another photo, video, or identity document is more leverage. You do not have to prove you will cooperate.',
  },
  {
    title: 'Keep the evidence, then stop talking',
    body: 'Screenshot the profile, the thread, usernames, phone numbers, UPI or account IDs, transaction references, and links. Write down dates. Then stop replying. Block them after the screenshots, not before.',
  },
  {
    title: 'Do not delete the chat',
    body: 'Deleting it feels like relief and removes what a bank or the police may need. You can mute the thread so you are not reading threats while you keep it.',
  },
  {
    title: 'If money moved, call the bank and 1930',
    body: 'Tell the bank it was a fraud-induced transfer. Do not describe it as a gift if it was not. Then call 1930 and finish the complaint on cybercrime.gov.in within 24 hours, using the acknowledgement number you receive.',
  },
  {
    title: 'Report even if no money moved',
    body: 'Threats, fake profiles, impersonation, and intimate-image abuse can be reported on cybercrime.gov.in. You can report even if you joined the call or sent an image. The portal also lets citizens search some suspect identifiers.',
  },
  {
    title: 'Intimate images, if you are an adult',
    body: 'StopNCII.org can fingerprint images that are still on your device so participating platforms can block copies. The picture is not uploaded. Read the eligibility rules on that site. It does not cover the whole internet, and it is not for anyone under 18. Also report on the national portal.',
  },
  {
    title: 'If work was involved',
    body: 'Tell security or compliance what was asked and what, if anything, you shared. Say so early. Reporting an approach is a success, not a confession.',
  },
  {
    title: 'Tell one person',
    body: 'Secrecy is part of the pressure. Choose someone safe. You can tell them what happened without showing them the images.',
  },
  {
    title: 'If you feel in danger tonight',
    body: 'Call 112. Leave if you need to. The online report can wait until you are safe.',
  },
];

export const helpResources: HelpResource[] = [
  {
    id: 'helpline-1930',
    name: '1930 · National Cyber Crime Helpline',
    summary: 'Call this for cyber crime, especially if money has moved.',
    note: 'The national portal lists 1930 as the cyber crime helpline. Calls are answered by state or UT police. For a payment you were pushed into, call 1930 and then complete the complaint on cybercrime.gov.in within 24 hours using the acknowledgement sent to you. Reporting sooner gives banks a better chance to hold the money. Recovery is not guaranteed.',
    actions: [{ label: 'Call 1930', url: 'tel:1930' }],
  },
  {
    id: 'portal',
    name: 'cybercrime.gov.in',
    summary: 'The Government of India’s National Cyber Crime Reporting Portal.',
    note: 'Use it to report cyber crime, including threats, fake profiles, impersonation, and intimate-image abuse. Complaints are handled by law enforcement. Give accurate details. This is not a substitute for 112 if you are in immediate danger.',
    actions: [{ label: 'Open the portal', url: 'https://cybercrime.gov.in/' }],
  },
  {
    id: 'stopncii',
    name: 'StopNCII.org',
    summary: 'A free tool for adults to fingerprint their own intimate images.',
    note: 'Operated by the Revenge Porn Helpline, part of the UK charity SWGfL, and available internationally. You must be the person in the image, 18 or older when it was taken, and 18 or older now, and you must still have the file. Hashing happens on your device. The image is not uploaded. Only participating platforms are covered. Do not use it for an image of anyone under 18.',
    actions: [{ label: 'Open StopNCII.org', url: 'https://stopncii.org/' }],
  },
  {
    id: 'emergency-112',
    name: '112 · Emergency help',
    summary: 'Police, fire, and ambulance through the Emergency Response Support System.',
    note: 'Use 112 if you are in immediate danger, not only for an online report. Listed by the National Commission for Women and by the cybercrime portal as the national emergency number.',
    actions: [{ label: 'Call 112', url: 'tel:112' }],
  },
  {
    id: 'women-181',
    name: '181 · Women Helpline',
    summary: 'A 24-hour helpline for women, or for someone calling on a woman’s behalf.',
    note: 'The Ministry of Women and Child Development describes 181 as a toll-free helpline that can connect callers with emergency services and One Stop Centres. The ministry says it operates in every state and union territory except West Bengal. If 181 does not connect, use 112 or 1930. You can ask to remain anonymous, though basic details may help in an emergency.',
    actions: [{ label: 'Call 181', url: 'tel:181' }],
  },
  {
    id: 'ncw-14490',
    name: '14490 · NCW women helpline',
    summary: 'Listed by the National Commission for Women as a 24×7 women helpline.',
    note: 'This number appears on ncw.gov.in alongside 181, 112, and 1930. If it does not connect, use 181 or 112.',
    actions: [{ label: 'Call 14490', url: 'tel:14490' }],
  },
  {
    id: 'icall',
    name: 'iCall · counselling',
    summary: 'Free phone and email counselling from the Tata Institute of Social Sciences. Not the police.',
    note: 'iCall’s site lists 9152987821 and 022-25521111, Monday to Saturday, 8:00 am to 9:00 pm, and email icall@tiss.edu. It says calls and email can be anonymous. Hours can change. Confirm on icallhelpline.org if you can. This is emotional support, not a crime report.',
    actions: [
      { label: 'Call 9152987821', url: 'tel:9152987821' },
      { label: 'Call 022-25521111', url: 'tel:02225521111' },
      { label: 'Email iCall', url: 'mailto:icall@tiss.edu' },
      { label: 'Open icallhelpline.org', url: 'https://icallhelpline.org/' },
    ],
  },
];
