import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

const PROGRESS_KEY = 'escape-honey-traps.progress.v1';

export type LessonRecord = {
  opened: boolean;
  completed: boolean;
  bestCorrect: number;
  total: number;
};

export type ScenarioRecord = {
  completed: boolean;
  safer: number;
  total: number;
};

export type ProgressState = {
  lessons: Record<string, LessonRecord>;
  scenarios: Record<string, ScenarioRecord>;
};

type ProgressValue = {
  ready: boolean;
  state: ProgressState;
  markLessonOpened: (id: string) => void;
  markLessonQuiz: (id: string, correct: number, total: number) => void;
  markScenario: (id: string, safer: number, total: number) => void;
  reset: () => void;
};

const empty = (): ProgressState => ({ lessons: {}, scenarios: {} });

const ProgressContext = createContext<ProgressValue | null>(null);

function parse(raw: string | null): ProgressState {
  if (!raw) return empty();
  try {
    const value = JSON.parse(raw) as Partial<ProgressState>;
    return {
      lessons: value.lessons && typeof value.lessons === 'object' ? value.lessons : {},
      scenarios: value.scenarios && typeof value.scenarios === 'object' ? value.scenarios : {},
    };
  } catch {
    return empty();
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(empty);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    AsyncStorage.getItem(PROGRESS_KEY)
      .then((raw) => {
        if (!cancelled) setState(parse(raw));
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const persist = useCallback((recipe: (current: ProgressState) => ProgressState) => {
    setState((current) => {
      const next = recipe(current);
      AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(next)).catch(() => {});
      return next;
    });
  }, []);

  const markLessonOpened = useCallback(
    (id: string) => {
      persist((current) => {
        const prev = current.lessons[id];
        if (prev?.opened) return current;
        return {
          ...current,
          lessons: {
            ...current.lessons,
            [id]: {
              opened: true,
              completed: prev?.completed ?? false,
              bestCorrect: prev?.bestCorrect ?? 0,
              total: prev?.total ?? 0,
            },
          },
        };
      });
    },
    [persist],
  );

  const markLessonQuiz = useCallback(
    (id: string, correct: number, total: number) => {
      persist((current) => {
        const prev = current.lessons[id];
        return {
          ...current,
          lessons: {
            ...current.lessons,
            [id]: {
              opened: true,
              completed: true,
              bestCorrect: Math.max(prev?.bestCorrect ?? 0, correct),
              total,
            },
          },
        };
      });
    },
    [persist],
  );

  const markScenario = useCallback(
    (id: string, safer: number, total: number) => {
      persist((current) => ({
        ...current,
        scenarios: {
          ...current.scenarios,
          [id]: { completed: true, safer, total },
        },
      }));
    },
    [persist],
  );

  const reset = useCallback(() => {
    const next = empty();
    setState(next);
    AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(next)).catch(() => {});
  }, []);

  const value = useMemo(
    () => ({ ready, state, markLessonOpened, markLessonQuiz, markScenario, reset }),
    [ready, state, markLessonOpened, markLessonQuiz, markScenario, reset],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const value = useContext(ProgressContext);
  if (!value) throw new Error('useProgress must be used within ProgressProvider');
  return value;
}
