import { checkGroups, checkItems } from '@/content/en/checklist';
import { helpResources, helpSteps } from '@/content/en/help';
import { lessons } from '@/content/en/lessons';
import { privacy } from '@/content/en/privacy';
import { scenarios } from '@/content/en/scenarios';
import { teasers } from '@/content/en/teasers';
import { ui } from '@/content/en/ui';

/**
 * English is the shipped locale. Add Hindi or Telugu by creating
 * src/content/hi or src/content/te with the same shape and registering
 * it in `catalogs` below. getCatalog() falls back to English.
 */
const en = {
  locale: 'en' as const,
  ui,
  lessons,
  scenarios,
  checkGroups,
  checkItems,
  helpSteps,
  helpResources,
  privacy,
  teasers,
};

type EnglishCatalog = typeof en;

const catalogs: { en: EnglishCatalog; hi?: EnglishCatalog; te?: EnglishCatalog } = { en };

export type Locale = keyof typeof catalogs;

export function getCatalog(locale: Locale = 'en'): EnglishCatalog {
  return catalogs[locale] ?? catalogs.en;
}

export const catalog = getCatalog('en');

export function findLesson(id: string) {
  return catalog.lessons.find((lesson) => lesson.id === id);
}

export function findScenario(id: string) {
  return catalog.scenarios.find((scenario) => scenario.id === id);
}

export function findTeaser(id: string) {
  return catalog.teasers.find((teaser) => teaser.id === id);
}

function assertCatalog(value: EnglishCatalog) {
  const lessonIds = new Set<string>();
  for (const lesson of value.lessons) {
    if (lessonIds.has(lesson.id)) throw new Error(`Duplicate lesson ${lesson.id}`);
    lessonIds.add(lesson.id);
    for (const question of lesson.quiz) {
      if (question.correctIndex < 0 || question.correctIndex >= question.options.length) {
        throw new Error(`Bad quiz index in ${lesson.id}`);
      }
    }
  }
  const teaserIds = new Set<string>();
  for (const teaser of value.teasers) {
    if (teaserIds.has(teaser.id)) throw new Error(`Duplicate teaser ${teaser.id}`);
    teaserIds.add(teaser.id);
    if (!lessonIds.has(teaser.lessonId)) throw new Error(`Teaser ${teaser.id} has unknown lesson`);
    const quiz = teaser.quiz;
    if (quiz.correctIndex < 0 || quiz.correctIndex >= quiz.options.length) {
      throw new Error(`Bad teaser quiz in ${teaser.id}`);
    }
  }
  if (value.teasers.length < 30) throw new Error('Need at least 30 teasers');
  for (const scenario of value.scenarios) {
    const nodeIds = new Set(scenario.nodes.map((node) => node.id));
    if (!nodeIds.has(scenario.start)) throw new Error(`Missing start in ${scenario.id}`);
    for (const node of scenario.nodes) {
      for (const choice of node.choices ?? []) {
        if (!nodeIds.has(choice.next)) {
          throw new Error(`${scenario.id}: ${node.id} points at missing node ${choice.next}`);
        }
      }
      if (!node.choices?.length && !node.ending) {
        throw new Error(`${scenario.id}: ${node.id} is a dead end`);
      }
    }
  }
}

assertCatalog(catalog);
