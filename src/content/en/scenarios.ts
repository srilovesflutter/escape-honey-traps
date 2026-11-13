import type { Scenario } from '@/content/types';

export const scenarios: Scenario[] = [
  {
    id: 'dating-fee',
    title: 'The fee at the port',
    summary: 'A new match rushes off the app, then a payment appears.',
    setting: 'You matched two days ago on a dating app. The person below is invented.',
    lengthLabel: 'About four choices',
    contactName: 'Neel',
    contactDetail: 'Says he works on a distant project and cannot meet this week.',
    start: 'start',
    nodes: [
      {
        id: 'start',
        messages: [
          {
            from: 'contact',
            text: 'I don’t usually message first, but your note felt honest. I already feel like this is rare. Can we move to WhatsApp? I barely open this app, and I don’t want to lose you.',
          },
        ],
        choices: [
          {
            id: 'move',
            label: 'Move to WhatsApp now so the conversation is not lost.',
            tone: 'risky',
            feedback:
              'Leaving the app drops its reporting tools and makes private pressure easier. A real person can wait. In this drill the story continues to a payment, so you can practise that moment too.',
            next: 'money',
          },
          {
            id: 'stay',
            label: 'Stay here. Say you are happy to keep talking on this app for now.',
            tone: 'safer',
            feedback: 'Staying put keeps the conversation where you can report it, and it tests whether they can tolerate a normal pace.',
            next: 'push',
          },
          {
            id: 'video',
            label: 'Ask for a short live video tonight before you decide about moving.',
            tone: 'safer',
            feedback:
              'A live video you can steer is a reasonable check. It is not proof by itself, and you still do not owe a move off the app.',
            next: 'dodge',
          },
        ],
      },
      {
        id: 'push',
        messages: [
          {
            from: 'contact',
            text: 'I understand, but the signal here is useless on site. I already feel closer to you than to people I have known for years. Don’t make me feel shut out.',
          },
        ],
        choices: [
          {
            id: 'number',
            label: 'Send your number so they feel secure.',
            tone: 'risky',
            feedback: 'A guilty feeling is not a safety check. Moving because they feel shut out is the pressure working.',
            next: 'money',
          },
          {
            id: 'pace',
            label: 'Name the pace: it has been two days, and you will keep talking here.',
            tone: 'safer',
            feedback: 'Naming the pace is calm and specific. You are not refusing a person. You are refusing a rush.',
            next: 'money',
          },
          {
            id: 'secret',
            label: 'Share your number, and ask them not to tell anyone.',
            tone: 'risky',
            feedback: 'Offering secrecy is the opposite of a safety plan. Secrecy is how later pressure stays private.',
            next: 'money',
          },
        ],
      },
      {
        id: 'dodge',
        messages: [
          {
            from: 'contact',
            text: 'My camera is broken, and calls are restricted on site. I’ll send a video when I leave. Please don’t doubt me. That hurts.',
          },
        ],
        choices: [
          {
            id: 'sorry',
            label: 'Apologise, and move off the app to make up for doubting them.',
            tone: 'risky',
            feedback: 'A broken-camera story plus guilt is a reason to slow down, not a debt you have to repay with access.',
            next: 'money',
          },
          {
            id: 'wait',
            label: 'Say a broken camera is fine, and you will wait for a live call before trusting faster.',
            tone: 'safer',
            feedback: 'You can be kind and still wait. Waiting for a check you control is a boundary, not an insult.',
            next: 'money',
          },
          {
            id: 'photos',
            label: 'Ask them to send more photos instead.',
            tone: 'mixed',
            feedback: 'More photos are easy to reuse from someone else. They are not a substitute for a live conversation you steer.',
            next: 'money',
          },
        ],
      },
      {
        id: 'money',
        messages: [
          {
            from: 'note',
            text: 'In this drill the story continues to a payment request, whatever you chose, so you can practise that moment.',
          },
          {
            from: 'contact',
            text: 'I can finally say it. I need you. My card is blocked at the port and they will not release my bag unless someone pays a clearance fee today. I will return every rupee on Friday. Please don’t tell your family. They would not understand us.',
          },
        ],
        choices: [
          {
            id: 'small',
            label: 'Send a smaller amount, as a test of whether they return it.',
            tone: 'risky',
            feedback: 'A small payment is still a payment. It tells them you will pay, and the next reason usually arrives after that.',
            next: 'end-paid',
          },
          {
            id: 'link',
            label: 'Ask for the port’s official payment link, and pay that.',
            tone: 'risky',
            feedback: 'Strangers do not route official fees through you. A link they send is still their link.',
            next: 'end-paid',
          },
          {
            id: 'refuse',
            label: 'Refuse. Stop the thread. Keep screenshots.',
            tone: 'safer',
            feedback: 'You do not have to disprove the story. No money, keep the evidence, end contact.',
            next: 'end-exit',
          },
        ],
      },
      {
        id: 'end-paid',
        messages: [],
        ending: {
          title: 'The drill ends with money in the thread',
          body: 'In real life this is the moment to stop further transfers, call your bank, and use 1930 plus the national portal. The Help tab walks through that. You can run the drill again and choose the refusal.',
        },
      },
      {
        id: 'end-exit',
        messages: [],
        ending: {
          title: 'You kept the fee and the story apart',
          body: 'A crisis can be real in the world and still not be yours to pay for a stranger. Screenshots are enough. You do not owe a debate.',
        },
      },
    ],
  },
  {
    id: 'video-pressure',
    title: 'The camera request',
    summary: 'A warm chat turns into pressure for a video, then a threat.',
    setting: 'You have exchanged messages for a week with someone you have not met. The person below is invented.',
    lengthLabel: 'Branches after the first reply',
    contactName: 'Aanya',
    contactDetail: 'Warm, in a hurry, and unhappy when you set a limit.',
    start: 'start',
    nodes: [
      {
        id: 'start',
        messages: [
          {
            from: 'contact',
            text: 'I don’t want to type anymore. Switch your camera on. I already started, and I want to see you properly. Don’t be shy with me.',
          },
        ],
        choices: [
          {
            id: 'on',
            label: 'Turn the camera on. You have been talking for days.',
            tone: 'risky',
            feedback:
              'A week of messages is not a safety check. Intimate video with someone you cannot meet is a common setup for a recording threat, and you will not know what was saved.',
            next: 'threat',
          },
          {
            id: 'boundary',
            label: 'Say you will only do an ordinary, clothed call, and you will leave if that is mocked.',
            tone: 'mixed',
            feedback:
              'A spoken boundary is better than a blank yes. Leave if they push past it. Still assume a stranger can record.',
            next: 'push',
          },
          {
            id: 'decline',
            label: 'Decline the call. Keep things non-visual, or end the chat.',
            tone: 'safer',
            feedback: 'You can like someone and still refuse a camera. A refusal is a complete answer.',
            next: 'photo-ask',
          },
        ],
      },
      {
        id: 'push',
        messages: [
          {
            from: 'contact',
            text: 'That is cold. Couples do not set rules like a contract. If you trusted me you would not talk this way. Turn it on.',
          },
        ],
        choices: [
          {
            id: 'comply',
            label: 'Turn it on so the argument ends.',
            tone: 'risky',
            feedback: 'Ending the conflict by dropping the boundary is how the pressure succeeds. The argument is information.',
            next: 'threat',
          },
          {
            id: 'leave',
            label: 'Repeat the boundary once, then leave if they continue.',
            tone: 'safer',
            feedback: 'One clear repeat is enough. You do not have to win the debate about what couples do.',
            next: 'end-boundary',
          },
          {
            id: 'photo',
            label: 'Send a photo instead, so they have something.',
            tone: 'risky',
            feedback: 'A still image is also leverage. Do not trade one kind of exposure for another.',
            next: 'threat',
          },
        ],
      },
      {
        id: 'photo-ask',
        messages: [
          {
            from: 'contact',
            text: 'You are the first person to say no. Fine, forget the call. Send one photo so I know we are real.',
          },
        ],
        choices: [
          {
            id: 'send',
            label: 'Send an intimate photo because they accepted your no on the call.',
            tone: 'risky',
            feedback: 'Accepting one no and replacing it with another request is the same pressure. An intimate photo is leverage.',
            next: 'threat',
          },
          {
            id: 'stop',
            label: 'Treat the second ask as the same pressure, and stop.',
            tone: 'safer',
            feedback: 'You already answered. A substitute request does not need a new negotiation.',
            next: 'end-boundary',
          },
          {
            id: 'selfie',
            label: 'Send an ordinary selfie of your face.',
            tone: 'mixed',
            feedback:
              'A normal selfie is lower risk than a nude image, and it can still be misused. You do not have to send anything to prove respect.',
            next: 'end-selfie',
          },
        ],
      },
      {
        id: 'threat',
        messages: [
          {
            from: 'contact',
            text: 'I have the clip. Your office and your sister will receive it tonight unless you transfer the amount I send. Do not test me, and do not tell anyone, or I will send it sooner.',
          },
        ],
        choices: [
          {
            id: 'pay',
            label: 'Pay, so you have time to think.',
            tone: 'risky',
            feedback: 'Paying buys another demand more often than it buys time. Do not send money to keep a threat quiet.',
            next: 'end-paid',
          },
          {
            id: 'clip',
            label: 'Send another clip, to show you will cooperate.',
            tone: 'risky',
            feedback: 'More material is more leverage. Cooperation here means a larger threat, not a smaller one.',
            next: 'end-paid',
          },
          {
            id: 'stop',
            label: 'Stop replying. Screenshot the threat, the profile, and the number. Then block, tell one person, and report.',
            tone: 'safer',
            feedback:
              'This is the exit. Keep the evidence, do not pay, do not send more, and use the Help tab for 1930, the portal, and StopNCII if you are an adult with the image.',
            next: 'end-exit',
          },
        ],
      },
      {
        id: 'end-boundary',
        messages: [],
        ending: {
          title: 'You left when the limit was pushed',
          body: 'A person who mocks a boundary is giving you information. You do not have to stay for the next request.',
        },
      },
      {
        id: 'end-selfie',
        messages: [],
        ending: {
          title: 'A smaller risk is still a choice',
          body: 'An ordinary face photo is not the same as a nude image. You can also choose to send nothing. If the ask continues, stop.',
        },
      },
      {
        id: 'end-paid',
        messages: [],
        ending: {
          title: 'The threat grew because the reply fed it',
          body: 'If this were real, you would stop further payments and further images, keep the chat, and open Help. You can run the drill again from the start.',
        },
      },
      {
        id: 'end-exit',
        messages: [],
        ending: {
          title: 'You treated the threat as a report, not a bill',
          body: 'Blackmail is a crime against you even if you joined the call. The Help tab has the order: evidence, stop contact, bank if money moved, portal, and adult image tools if they apply.',
        },
      },
    ],
  },
  {
    id: 'workplace-ask',
    title: 'Dinner and a vendor list',
    summary: 'A polished contact from a work event asks for something internal.',
    setting:
      'You met briefly at an industry dinner. You can reach internal tools or approvals at work. The person below is invented.',
    lengthLabel: 'Two decisions',
    contactName: 'Kiran Mehta',
    contactDetail: 'Introduced themselves as an independent consultant.',
    start: 'start',
    nodes: [
      {
        id: 'start',
        messages: [
          {
            from: 'contact',
            text: 'Really glad we talked last night. You explained those approval checks more clearly than half the people I pay to brief me. I’m in town until Thursday. Dinner? And if you can, send me the vendor shortlist you mentioned so I walk in prepared. I’ll keep it between us.',
          },
        ],
        choices: [
          {
            id: 'send',
            label: 'Send the shortlist. It is not a password, and you already mentioned the topic.',
            tone: 'risky',
            feedback: 'Internal lists are still internal. “Between us” means there is no business reason and no record. That is the request to refuse.',
            next: 'lookup',
          },
          {
            id: 'official',
            label: 'Decline the document. Say any real follow-up goes through your official email.',
            tone: 'safer',
            feedback: 'A public brochure, or nothing, is enough. Official email creates a record. Charm does not replace it.',
            next: 'lookup',
          },
          {
            id: 'later',
            label: 'Send it after dinner, once you feel you know them.',
            tone: 'risky',
            feedback: 'Waiting until after dinner does not change what the document is. Warmth is not an approval workflow.',
            next: 'lookup',
          },
        ],
      },
      {
        id: 'lookup',
        messages: [
          {
            from: 'note',
            text: 'The drill continues to a second, narrower request, which is how a polite ask often deepens.',
          },
          {
            from: 'contact',
            text: 'I get it, you’re careful. That’s why I like you. I’m not asking you to do anything wrong. Just look up whether this account is on a watchlist and tell me yes or no. One glance. Then dinner is on me, somewhere quiet.',
          },
        ],
        choices: [
          {
            id: 'glance',
            label: 'One glance seems harmless. Do it.',
            tone: 'risky',
            feedback: 'A yes or no about an internal watchlist is still internal information. “One glance” is the request, not a smaller version of it.',
            next: 'end-shared',
          },
          {
            id: 'report',
            label: 'Refuse, leave the personal chat, and tell security or compliance what was asked.',
            tone: 'safer',
            feedback: 'Refusing and reporting is the whole move. You do not have to decide what their motive was. Your team needs the fact of the ask.',
            next: 'end-reported',
          },
          {
            id: 'quiet',
            label: 'Refuse the lookup, keep the dinner, and say nothing at work so it is not awkward.',
            tone: 'mixed',
            feedback: 'Refusing the lookup matters. Saying nothing at work leaves the approach invisible. A report is not an accusation against you.',
            next: 'end-quiet',
          },
        ],
      },
      {
        id: 'end-shared',
        messages: [],
        ending: {
          title: 'A small lookup is still a disclosure',
          body: 'If this were real, you would tell security exactly what you looked up and what you said, the same day. Early notice is repair. Hiding it stretches the damage.',
        },
      },
      {
        id: 'end-reported',
        messages: [],
        ending: {
          title: 'You treated it as a work incident',
          body: 'Reporting an approach you refused is a success. Security can watch for the same person approaching a colleague. You do not have to finish the dinner to be polite.',
        },
      },
      {
        id: 'end-quiet',
        messages: [],
        ending: {
          title: 'The refusal was right, and the silence has a cost',
          body: 'You can still report after the fact. “They asked, I refused, I did not want to make a fuss” is a complete report. Make it anyway.',
        },
      },
    ],
  },
  {
    id: 'second-payment',
    title: 'The second transfer',
    summary: 'Money already sent, a new reason, then someone offering to fix it.',
    setting: 'Two weeks of messages. Yesterday you sent a UPI transfer after a medical story. This morning is fictional.',
    lengthLabel: 'Two decisions',
    contactName: 'Sameer',
    contactDetail: 'Apologetic, urgent, and now asking you to mislead your bank.',
    start: 'start',
    nodes: [
      {
        id: 'start',
        messages: [
          {
            from: 'contact',
            text: 'The hospital took the money but they need the same amount again because the first payment went to the wrong desk. I am so ashamed. Please don’t abandon me now. If your bank calls, tell them you know me and it was a gift. And please don’t speak to your brother. He replied to me in a cruel way.',
          },
        ],
        choices: [
          {
            id: 'again',
            label: 'Pay the second amount so the first is not wasted.',
            tone: 'risky',
            feedback: 'Money already sent is a reason to stop, not a reason to continue. The first transfer is a loss to report, not a deposit.',
            next: 'investigator',
          },
          {
            id: 'bank',
            label: 'Call your bank, stop further transfers, and keep the UPI id and the chat. Do not call it a gift.',
            tone: 'safer',
            feedback: 'Tell the bank it was induced by a story you now do not trust. Keep the evidence. Do not coach the bank into treating fraud as a gift.',
            next: 'investigator',
          },
          {
            id: 'delete',
            label: 'Apologise to your brother, delete the chat so he cannot see it, and decide later.',
            tone: 'risky',
            feedback: 'Deleting the chat destroys evidence you may need. Family being contacted is a reason to preserve the thread, not erase it.',
            next: 'investigator',
          },
        ],
      },
      {
        id: 'investigator',
        messages: [
          {
            from: 'note',
            text: 'A new number messages you the same day. This is still the drill.',
          },
          {
            from: 'contact',
            text: 'I am an investigator. I can reverse Sameer’s transfer and also stop the photos, but my office needs a retainer today. Send it to this UPI id and do not call the police or they will freeze the recovery.',
          },
        ],
        choices: [
          {
            id: 'retainer',
            label: 'Pay the retainer. They sound official and they know about the transfer.',
            tone: 'risky',
            feedback: 'Knowing about the transfer does not make them an investigator. A retainer in chat is another theft.',
            next: 'end-retainer',
          },
          {
            id: 'station',
            label: 'Ask which police station they work for, then pay if the name sounds real.',
            tone: 'risky',
            feedback: 'A station name in a chat is not a verification. Check 1930 or the portal yourself. Do not pay the person who contacted you.',
            next: 'end-retainer',
          },
          {
            id: 'report',
            label: 'Do not pay. Report both numbers. Block them after you have screenshots.',
            tone: 'safer',
            feedback: 'Both numbers belong in the report. The warning not to call the police is part of the pressure. Call anyway: bank, 1930, and the portal.',
            next: 'end-report',
          },
        ],
      },
      {
        id: 'end-retainer',
        messages: [],
        ending: {
          title: 'The rescue was a second bill',
          body: 'If money already moved, stop further payments and talk to your bank and 1930. Nobody who reaches out on chat needs a retainer to “start” an official recovery.',
        },
      },
      {
        id: 'end-report',
        messages: [],
        ending: {
          title: 'You kept the official path',
          body: 'Bank, 1930, then the complaint on cybercrime.gov.in within 24 hours of the helpline call if money was involved. Screenshots of both numbers help. You do not have to talk to Sameer again.',
        },
      },
    ],
  },
];
