import type { Teaser } from '@/content/types';

/** Hypothetical questions for lock-screen reminders. No explicit wording. */
export const teasers: Teaser[] = [
  {
    id: 'whatsapp-tonight',
    lessonId: 'early-signs',
    prompt: 'A new match messages first and wants to move to WhatsApp tonight. Sweet, or a setup?',
    quiz: {
      question: 'What is the safer move?',
      options: [
        'Move now so you do not lose the chat',
        'Stay on the app where you met until you have a reason to trust them',
        'Send more photos so they feel sure of you',
      ],
      correctIndex: 1,
      explanation: 'Leaving the app drops its reporting tools. A real person can wait.',
    },
  },
  {
    id: 'never-video',
    lessonId: 'early-signs',
    prompt: 'They are always abroad and can never do a live video call. Why?',
    quiz: {
      question: 'A repeated excuse to avoid a live call means what?',
      options: [
        'You should apologise for doubting them',
        'It is a reason to slow down, not to trust faster',
        'More still photos will settle it',
      ],
      correctIndex: 1,
      explanation: 'Still photos are easy to reuse. A live call you can steer is a check, not an insult.',
    },
  },
  {
    id: 'money-week',
    lessonId: 'common-scripts',
    prompt: 'You met a week ago and now they need money for an emergency. Romance, or a red flag?',
    quiz: {
      question: 'They promise to repay you on Friday. What helps?',
      options: [
        'Send a small amount as a test',
        'Pay the link they call official',
        'Do not pay. A new contact does not route an urgent fee through you',
      ],
      correctIndex: 2,
      explanation: 'A small payment is still a payment. Their link is still their link.',
    },
  },
  {
    id: 'camera-anger',
    lessonId: 'sextortion',
    prompt: 'They want the camera on, and they get angry if you say no. Care, or pressure?',
    quiz: {
      question: 'A week of messages means you should turn the camera on. True or false?',
      options: ['True. Time together is proof', 'False. You can refuse, and anger is information', 'True, if you keep your clothes on'],
      correctIndex: 1,
      explanation: 'Length of a chat is not a safety check. You can leave when a limit is pushed.',
    },
  },
  {
    id: 'linkedin-systems',
    lessonId: 'workplace',
    prompt: 'A flirty note on LinkedIn asks how your work systems are approved. Networking, or a setup?',
    quiz: {
      question: 'What belongs in that chat?',
      options: [
        'A short explanation of who can approve payments',
        'Nothing internal. Follow up only on your work email, and tell security if they push',
        'The answer, after dinner',
      ],
      correctIndex: 1,
      explanation: 'Flattery does not make a work question safe. Report the approach even if you refused.',
    },
  },
  {
    id: 'army-abroad',
    lessonId: 'common-scripts',
    prompt: 'The profile says they serve overseas and cannot meet for months. Does that story hold?',
    quiz: {
      question: 'A job that explains every delay is what?',
      options: [
        'Proof they are who they say',
        'A reason to ask for a live check, and to refuse money while you wait',
        'A reason to send support funds',
      ],
      correctIndex: 1,
      explanation: 'A distant job is a common cover for “I cannot meet, but I need help”. You do not have to fund the story.',
    },
  },
  {
    id: 'customs-gift',
    lessonId: 'common-scripts',
    prompt: 'A gift they “sent” is stuck in customs unless you pay a fee. Would you pay?',
    quiz: {
      question: 'Who should pay a real customs fee?',
      options: [
        'You, if they send a link',
        'Not you. Strangers do not route official fees through a new romance',
        'You, but only a small test amount',
      ],
      correctIndex: 1,
      explanation: 'The fee story is the request. Keep screenshots and do not pay.',
    },
  },
  {
    id: 'crypto-flirt',
    lessonId: 'common-scripts',
    prompt: 'Flirting turns into a crypto tip only you can join. Opportunity, or a trap?',
    quiz: {
      question: 'Money talk from a new romantic contact is what?',
      options: [
        'A sign to invest a little and see',
        'A stop sign, including trading groups and gift cards',
        'Fine if they have a polished profile',
      ],
      correctIndex: 1,
      explanation: 'Romance plus an investment is a known pairing. Do not move money to find out.',
    },
  },
  {
    id: 'read-the-code',
    lessonId: 'common-scripts',
    prompt: 'They ask you to read out a code that just arrived on your phone. Why would they need it?',
    quiz: {
      question: 'A one-time code is safe to share with someone you like. True or false?',
      options: ['True, if they delete it after', 'False. That code can open an account', 'True, if it is only six digits'],
      correctIndex: 1,
      explanation: 'No bank, parcel service, or partner needs the code sent to your phone.',
    },
  },
  {
    id: 'keep-us-secret',
    lessonId: 'early-signs',
    prompt: 'Two days in, they ask you not to tell your family. Why the secrecy?',
    quiz: {
      question: 'A request to hide the relationship is what?',
      options: [
        'A normal wish for privacy',
        'Pressure. Tell one safe person anyway',
        'Fine until you have met in person',
      ],
      correctIndex: 1,
      explanation: 'Secrecy is how later pressure stays private. One trusted person is a safety plan.',
    },
  },
  {
    id: 'day-one-devotion',
    lessonId: 'early-signs',
    prompt: '“I have never felt this before” arrives on day one. Warm, or too fast?',
    quiz: {
      question: 'Love-bombing in this course means what?',
      options: [
        'Only expensive gifts',
        'Intense early devotion, and guilt when you slow down',
        'Any compliment',
      ],
      correctIndex: 1,
      explanation: 'You can enjoy the warmth and still keep an ordinary pace.',
    },
  },
  {
    id: 'broken-camera',
    lessonId: 'early-signs',
    prompt: 'The camera is “broken” again, but they still want to leave the app. What is missing?',
    quiz: {
      question: 'No result in an image search means the profile is genuine. True or false?',
      options: ['True', 'False. No match is not proof', 'True if the photos look recent'],
      correctIndex: 1,
      explanation: 'A search can catch a reused photo. It cannot certify a stranger.',
    },
  },
  {
    id: 'second-amount',
    lessonId: 'already-trapped',
    prompt: 'The first payment “went to the wrong desk”. They need the same amount again. Send more?',
    quiz: {
      question: 'Money already sent is a reason to do what?',
      options: [
        'Pay again so the first amount is not wasted',
        'Stop, call the bank, and keep the chat',
        'Delete the chat and decide later',
      ],
      correctIndex: 1,
      explanation: 'The first transfer is a loss to report, not a deposit on the next one.',
    },
  },
  {
    id: 'only-you-can-help',
    lessonId: 'common-scripts',
    prompt: 'They are stuck on a distant site and only you can help today. Convenient?',
    quiz: {
      question: 'The useful part of that message is what?',
      options: [
        'The detail of the crisis',
        'The request that you pay, today, in secret',
        'How long you have been talking',
      ],
      correctIndex: 1,
      explanation: 'You do not have to disprove the story. No money, keep any screenshots, end contact.',
    },
  },
  {
    id: 'between-us-list',
    lessonId: 'workplace',
    prompt: '“Keep this vendor list between us” arrives after one nice dinner. A favour, or a work problem?',
    quiz: {
      question: 'An internal list is fine to send if it is not a password. True or false?',
      options: ['True', 'False. Internal stays internal', 'True after you have met twice'],
      correctIndex: 1,
      explanation: '“Between us” means there is no business record. Warmth is not an approval step.',
    },
  },
  {
    id: 'one-glance',
    lessonId: 'workplace',
    prompt: 'One glance at an internal screen, then dinner is on them. Harmless?',
    quiz: {
      question: 'You refused the glance. Is there anything to report?',
      options: [
        'No. Nothing was handed over',
        'Yes. The ask itself is what security needs',
        'Only if money was offered',
      ],
      correctIndex: 1,
      explanation: 'Reporting an approach you refused is a success, not a confession.',
    },
  },
  {
    id: 'they-know-your-trip',
    lessonId: 'footprint',
    prompt: 'They already know your team, your trip, and that you are away alone. Where did they learn that?',
    quiz: {
      question: 'Which post helps a stranger build a story about you?',
      options: [
        'A photo of lunch with no place named',
        'A badge photo, a boarding pass, and a note that you are travelling alone',
        'A shared article with no personal detail',
      ],
      correctIndex: 1,
      explanation: 'Employer, travel, and being alone are easy to reuse. You can stop posting those.',
    },
  },
  {
    id: 'recovery-fee',
    lessonId: 'recovery',
    prompt: 'A new number says they can get your money back if you pay them first. Rescue, or another demand?',
    quiz: {
      question: 'Someone who guarantees recovery for an upfront fee is what?',
      options: [
        'The official follow-up to a helpline call',
        'Another demand. Stay with your bank, 1930, and the portal',
        'Safe if they know the amount',
      ],
      correctIndex: 1,
      explanation: 'Knowing the amount does not make them an investigator. Do not pay a retainer in chat.',
    },
  },
  {
    id: 'call-it-a-gift',
    lessonId: 'already-trapped',
    prompt: 'They ask you to tell the bank the transfer was a gift. Why would that matter?',
    quiz: {
      question: 'How should you describe a payment you were pushed into?',
      options: [
        'As a gift, so the bank leaves it alone',
        'As a payment you were talked into. Keep the record',
        'Do not call the bank at all',
      ],
      correctIndex: 1,
      explanation: 'Calling it a gift hides the problem from the people who can help.',
    },
  },
  {
    id: 'story-shifts',
    lessonId: 'early-signs',
    prompt: 'The photos look like a magazine, and the job title changed when you asked. What does that suggest?',
    quiz: {
      question: 'When the basic story shifts, what helps?',
      options: [
        'Believe the newest version and move on',
        'Treat the inconsistency as a reason to pause',
        'Ask for ten more photos',
      ],
      correctIndex: 1,
      explanation: 'A shifting name, city, or job is the sign. Extra photos do not repair it.',
    },
  },
  {
    id: 'after-the-call',
    lessonId: 'sextortion',
    prompt: 'After a private call, they say pay or other people will see it. Pay, or stop?',
    quiz: {
      question: 'Paying a smaller amount first usually does what?',
      options: [
        'Ends it',
        'Shows that threats work, and the demand often returns',
        'Creates a record that protects you',
      ],
      correctIndex: 1,
      explanation: 'Do not pay and do not send more. Keep the messages, then use Help.',
    },
  },
  {
    id: 'delete-the-chat',
    lessonId: 'already-trapped',
    prompt: 'They say deleting the chat will make this smaller. Does it?',
    quiz: {
      question: 'When should you block them?',
      options: [
        'Immediately, before any screenshots',
        'After you have saved the profile, the thread, and the payment details',
        'Only after you pay',
      ],
      correctIndex: 1,
      explanation: 'Deleting the chat removes what a bank or the police may need. Mute it, but keep it.',
    },
  },
  {
    id: 'gift-card-code',
    lessonId: 'common-scripts',
    prompt: 'A stranger wants you to buy a gift card and read them the code. Is that ever a favour?',
    quiz: {
      question: 'A gift card code is what?',
      options: ['A normal way to help someone abroad', 'Cash that is almost impossible to recover', 'Safe if the amount is small'],
      correctIndex: 1,
      explanation: 'Do not buy or read out a gift card for someone you have not met.',
    },
  },
  {
    id: 'see-your-phone',
    lessonId: 'footprint',
    prompt: 'Someone you just met asks you to install an app that lets them see your phone. Why?',
    quiz: {
      question: 'What is that app?',
      options: [
        'A trust exercise',
        'A way for them to control the phone. Do not install it',
        'Fine for one evening',
      ],
      correctIndex: 1,
      explanation: 'No romantic contact needs remote access to your phone.',
    },
  },
  {
    id: 'only-telegram',
    lessonId: 'early-signs',
    prompt: 'They will talk only on Telegram, not on the app where you met. What do you lose by moving?',
    quiz: {
      question: 'Moving off the original app on day one does what?',
      options: [
        'Makes the relationship more real',
        'Drops the app’s reporting tools and makes private pressure easier',
        'Is required if their signal is bad',
      ],
      correctIndex: 1,
      explanation: 'You can stay where you met. Pressure to leave is part of the pattern.',
    },
  },
  {
    id: 'warmth-and-a-request',
    lessonId: 'what-it-is',
    prompt: 'The warmth feels real, and so does the request for money. Can both be true?',
    quiz: {
      question: 'Which pairing is the warning?',
      options: [
        'Any message from a stranger',
        'Warmth that arrives with a request for money, secrecy, photos, or access',
        'A slow friendship that asks for nothing',
      ],
      correctIndex: 1,
      explanation: 'The feeling can be real while the request is the trap. You are allowed to stop.',
    },
  },
  {
    id: 'recruiter-access',
    lessonId: 'workplace',
    prompt: 'A recruiter flatters your access, then asks who else can approve a payment. An interview?',
    quiz: {
      question: 'Who can be approached because of work?',
      options: [
        'Only senior executives',
        'Anyone whose job can reach money, data, or a system',
        'Only people who post about work every day',
      ],
      correctIndex: 1,
      explanation: 'Ordinary access is enough. Keep work questions on a work channel.',
    },
  },
  {
    id: 'parcel-code',
    lessonId: 'common-scripts',
    prompt: 'They say a parcel cannot move unless you confirm a one-time code. Do parcels work that way?',
    quiz: {
      question: 'Who should you contact about a code on your phone?',
      options: [
        'The person who asked you to read it',
        'Nobody. The code stays with you. Contact the company yourself if you are unsure',
        'A friend, who can read it out for you',
      ],
      correctIndex: 1,
      explanation: 'Codes are keys. A parcel story does not change that.',
    },
  },
  {
    id: 'small-test',
    lessonId: 'recovery',
    prompt: 'Paying a smaller amount “just to test them” still sends money. What does that teach them?',
    quiz: {
      question: 'A test payment usually means what?',
      options: [
        'They will repay you and stop',
        'They learn that you will pay',
        'The bank will automatically reverse it',
      ],
      correctIndex: 1,
      explanation: 'Stop further payments. Call the bank, then 1930, and keep the record.',
    },
  },
  {
    id: 'photos-not-proof',
    lessonId: 'early-signs',
    prompt: 'More photos arrive, but still no live call you can steer. Are photos proof?',
    quiz: {
      question: 'Extra polished photos are worth what?',
      options: ['Proof they are real', 'Little. They are not a live check you control', 'Enough if there are three of them'],
      correctIndex: 1,
      explanation: 'Ask for a live call at a time you choose, or pause. Do not trade trust for more pictures.',
    },
  },
  {
    id: 'cannot-report',
    lessonId: 'sextortion',
    prompt: 'They say joining the call means you cannot report what happened next. Is that true?',
    quiz: {
      question: 'You joined willingly. Can you still report a threat?',
      options: [
        'No. Joining means you agreed to anything that followed',
        'Yes. A private call is not permission for a threat',
        'Only if you never paid',
      ],
      correctIndex: 1,
      explanation: 'You can report. Keep the thread, stop replying, and use the Help tab.',
    },
  },
  {
    id: 'family-saw-it',
    lessonId: 'already-trapped',
    prompt: 'Your family was contacted, so you want to erase the chat. What should you keep instead?',
    quiz: {
      question: 'Family being pulled in is a reason to do what?',
      options: [
        'Delete everything so they see less',
        'Save the thread, the numbers, and the payment details, then stop replying',
        'Pay so the messages stop',
      ],
      correctIndex: 1,
      explanation: 'The record is what the bank and the portal need. You can tell one person without showing images.',
    },
  },
  {
    id: 'gift-and-a-request',
    lessonId: 'workplace',
    prompt: 'A trip and a gift show up in the same message as a question about your job. Coincidence?',
    quiz: {
      question: 'A favour tied to a work request is what?',
      options: [
        'Just being friendly',
        'Still a work request. Refuse it and tell security',
        'Fine if you do not send a file',
      ],
      correctIndex: 1,
      explanation: 'The gift does not change the ask. Report the approach.',
    },
  },
  {
    id: 'public-badge',
    lessonId: 'footprint',
    prompt: 'A badge photo and a boarding pass are on your public profile. Who else can see them?',
    quiz: {
      question: 'What is the practical change?',
      options: [
        'Delete every account',
        'Stop posting employer, travel, and “I am alone” details',
        'Only accept messages from verified badges',
      ],
      correctIndex: 1,
      explanation: 'You do not have to disappear. You can stop handing strangers the details a story needs.',
    },
  },
];
