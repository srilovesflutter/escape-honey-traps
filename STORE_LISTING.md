# Google Play listing draft

Internal testing track. Android only.

| Field | Value |
| --- | --- |
| App name | Escape Honey Traps |
| Package name | `com.escapehoneytraps.app` |
| Version name | 1.1.0 |
| Version code | 3 |
| Category | Education |
| Tags (optional) | Education, safety |
| Default language | English (India), `en-IN` if the console offers it, otherwise English |
| Price | Free |
| Ads | No |
| In-app purchases | No |
| Target age | 18 and over. Do not opt into Designed for Families. |
| Privacy policy URL | https://srilovesflutter.github.io/escape-honey-traps/privacy/ |

## Short description (63 characters)

Recognise romance scams, sextortion, and workplace honey traps.

## Full description

Escape Honey Traps is a calm course for adults who want to recognise a honey trap and leave it.

A honey trap uses romance, flirtation, or intimacy to push you toward money, private images, secrecy, or access you would not give with a clear head. The lessons cover romance scams, fake dating and social profiles, pressure on WhatsApp, Instagram, and LinkedIn, sextortion and video-call blackmail, and approaches aimed at people in banking, technology, and other jobs with access to systems or data.

What you can do in the app:

- Read eight short lessons, each with a quiz. Your progress stays on the phone.
- Practise replies in fictional training conversations. The drills are labelled as exercises inside this app. They are not a messaging app, and nothing you tap is sent to anyone.
- Tick what is true of a contact you are unsure about and read a plain-language risk note. Those ticks are not saved.
- Open an emergency guide if you are being blackmailed: do not pay, keep the evidence, stop contact, and use real reporting routes.
- Turn on optional reminders. A daily one asks a short hypothetical question. Tapping it opens one practice question. Nothing about you is put on the lock screen.

India’s National Cyber Crime Helpline 1930 and the National Cyber Crime Reporting Portal (cybercrime.gov.in) are included, with notes on when to call. StopNCII.org is included for adults who still have an intimate image and want participating platforms to block copies. Emergency number 112, women’s helplines, and iCall counselling are listed with the limits published by those organisations.

The app is educational and victim-supportive. It does not teach anyone how to run a scam or approach another person. It is not the police, a bank, or a lawyer, and it cannot promise that money or images will be recovered.

English only in this version. The text is structured so Hindi and Telugu can be added later.

No account. No ads. No tracking. Lesson progress and your light or dark theme stay on the device.

## Content rating notes

Answer the Play questionnaire from the app that actually ships, not from a hope that it is “just education”. Suggested reading of this version:

- Designed for ages 18 and over. Not a children’s app. Do not enrol in the Families programme.
- No violence depicted. Lessons discuss threats, blackmail, and coercion in non-graphic language.
- Sexual content: references to intimate images, nude or sexual video calls, and sextortion, as things a person might be pressured into or threatened with. There is no nudity, no sexual imagery, no user-generated content, and no photo upload. If the form asks whether the app contains sexual content or references to sexual activity, answer in line with those references rather than “none”.
- No profanity, gambling, drugs, or alcohol focus.
- Users cannot interact with each other. There is no chat with real people, no location sharing, and no digital purchases.
- The practice tab is a scripted, fictional drill with a persistent “Training exercise” banner.

A likely outcome is a Teen or Mature rating because of the sexual-coercion references. Accept the rating the questionnaire produces. Do not lower the target age to get a milder badge.

## Data safety form

Google’s “collected” means transmitted off the device.

- Permissions: INTERNET (Expo runtime; progress is not uploaded), VIBRATE, POST_NOTIFICATIONS (Android 13+, asked only after a reminder is turned on), and RECEIVE_BOOT_COMPLETED (restores a local schedule after restart). Storage and “draw over other apps” are blocked. No push token is requested.
- Data collected: No.
- Data shared: No.
- No account creation, so account-deletion requirements for accounts do not apply.
- Data stored only on device: theme preference, lesson progress, best quiz scores, the last finished practice result, reminder on/off choices, the reminder time, and the time the app was last opened (used only to schedule a nudge after three quiet days). The red-flag checklist is not stored.
- Notifications are local. The app does not create a push token and does not contact a push server. Lock-screen text is a hypothetical practice question, not personal information. Notification permission is requested only when a reminder is turned on, and only on Android 13 or newer.
- Encryption in transit is not applicable to app data, because the app does not transmit its own data. Buttons may open the system browser or dialer.
- Users can delete progress with “Reset progress on this phone” on the Learn tab, or by uninstalling.
- No ads, no analytics SDK, no crash SDK.

## Graphics in this repo

- App icon and Android adaptive icon: `assets/`
- Feature graphic, 1024×500 PNG, no transparency: `store/feature-graphic.png`
- Phone screenshots for the listing are captured from the running app and saved with the release notes for this version. Use at least two. Recommended order: Learn, a lesson, Practice, a training drill (the banner must be visible), Check, Help.

## Internal testing upload

1. Host the privacy policy and put the URL in Play Console.
2. Create the app with package name `com.escapehoneytraps.app`. This cannot be changed later.
3. Bump `expo.version` and `expo.android.versionCode` in `app.json` before every upload after the first. Play rejects a repeated version code.
4. Build an Android App Bundle with `npx eas-cli@latest build -p android --profile production`, or upload a locally built `.aab` signed with your upload key.
5. On the internal testing track, add tester email addresses. The first upload also starts Play App Signing. Keep the upload keystore. Losing it means you cannot ship updates as the same app.

The preview profile (`npx eas-cli@latest build -p android --profile preview`) produces an APK you can install without Play. Use the production profile for the internal-testing AAB.
