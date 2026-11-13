export type Locale = 'en' | 'hi' | 'te';

export type Tone = 'safer' | 'mixed' | 'risky';

export type BandId = 'none' | 'watch' | 'pause' | 'leave';

export type LessonCard = {
  title: string;
  paragraphs: string[];
  aside?: { label: string; text: string };
};

export type QuizQuestion = {
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type Teaser = {
  id: string;
  lessonId: string;
  prompt: string;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
};

export type Lesson = {
  id: string;
  minutes: number;
  title: string;
  summary: string;
  cards: LessonCard[];
  takeaways: string[];
  quiz: QuizQuestion[];
};

export type ScenarioMessage = {
  from: 'contact' | 'note';
  text: string;
};

export type ScenarioChoice = {
  id: string;
  label: string;
  tone: Tone;
  feedback: string;
  next: string;
};

export type ScenarioNode = {
  id: string;
  messages: ScenarioMessage[];
  choices?: ScenarioChoice[];
  ending?: { title: string; body: string };
};

export type Scenario = {
  id: string;
  title: string;
  summary: string;
  setting: string;
  lengthLabel: string;
  contactName: string;
  contactDetail: string;
  start: string;
  nodes: ScenarioNode[];
};

export type CheckItem = {
  id: string;
  group: string;
  label: string;
  weight: 1 | 2 | 3;
  advice: string;
};

export type HelpAction = {
  label: string;
  url: string;
};

export type HelpResource = {
  id: string;
  name: string;
  summary: string;
  note: string;
  actions: HelpAction[];
};

export type HelpStep = {
  title: string;
  body: string;
};

export type PolicySection = {
  heading: string;
  paragraphs: string[];
};

export type UiText = {
  appName: string;
  tagline: string;
  tabs: { learn: string; practice: string; check: string; help: string };
  theme: {
    system: string;
    light: string;
    dark: string;
    switchLabel: (current: string) => string;
  };
  learn: {
    lede: string;
    localNote: string;
    progress: (done: number, total: number) => string;
    lessonsHeading: string;
    notStarted: string;
    inProgress: string;
    done: string;
    meta: (minutes: number, questions: number) => string;
    reset: string;
    resetConfirm: string;
    weeklyTipTitle: string;
  };
  lesson: {
    back: string;
    cardProgress: (index: number, total: number) => string;
    next: string;
    takeaways: string;
    takeawaysHeading: string;
    startQuiz: string;
    questionProgress: (index: number, total: number) => string;
    check: string;
    chooseFirst: string;
    correct: string;
    notQuite: string;
    nextQuestion: string;
    seeScore: string;
    score: (correct: number, total: number) => string;
    best: (correct: number, total: number) => string;
    allClear: string;
    keepExplanations: string;
    review: string;
    retry: string;
    backToLessons: string;
    missingTitle: string;
    missingBody: string;
  };
  practice: {
    title: string;
    lede: string;
    notTried: string;
    lastRun: (safer: number, total: number) => string;
  };
  scenario: {
    bannerTitle: string;
    bannerBody: string;
    fictional: (name: string) => string;
    you: string;
    continue: string;
    again: string;
    back: string;
    summary: (safer: number, total: number) => string;
    tones: Record<Tone, string>;
    missingTitle: string;
    missingBody: string;
  };
  check: {
    title: string;
    lede: string;
    notSaved: string;
    clear: string;
    selected: (count: number) => string;
    because: string;
    openHelp: string;
    bands: Record<BandId, { title: string; body: string }>;
  };
  help: {
    title: string;
    lede: string;
    stepsHeading: string;
    afterStepsTitle: string;
    afterStepsBody: string;
    resourcesHeading: string;
    couldNotOpen: string;
    childTitle: string;
    childBody: string;
    childAction: string;
    privacyTitle: string;
    privacyBody: string;
    privacyAction: string;
    limitsTitle: string;
    limitsBody: string;
  };
  privacy: { back: string };
  settings: {
    title: string;
    back: string;
    openLabel: string;
    appearance: string;
    reminders: string;
    remindersNote: string;
    dailyTitle: string;
    dailyBody: string;
    weeklyTitle: string;
    weeklyBody: string;
    inactivityTitle: string;
    inactivityBody: string;
    timeLabel: string;
    permissionTitle: string;
    permissionBody: string;
    allow: string;
    notNow: string;
    denied: string;
    webNote: string;
    notificationTitle: string;
    sampleNow: string;
  };
  teaser: {
    back: string;
    eyebrow: string;
    check: string;
    chooseFirst: string;
    correct: string;
    notQuite: string;
    openLesson: string;
    missingTitle: string;
    missingBody: string;
  };
  notFound: { title: string; body: string; action: string };
};
