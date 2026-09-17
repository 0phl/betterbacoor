import { guides } from './guides';

type Destination =
  | { next: string; guide?: never; variant?: never }
  | { next?: never; guide: string; variant: string };
export type FinderOption = {
  id: string;
  label: string;
  detail: string;
} & Destination;
export interface FinderQuestion {
  title: string;
  description: string;
  options: FinderOption[];
}
export const finderQuestions: Record<string, FinderQuestion> = {
  start: {
    title: 'What do you need help with?',
    description:
      'Choose a service. We’ll help you find the right preparation checklist.',
    options: [
      {
        id: 'business',
        label: 'A business permit',
        detail: 'Start a business or renew an existing permit.',
        next: 'business',
      },
      {
        id: 'civil',
        label: 'A birth, marriage, or death record',
        detail:
          'Get a copy from the local registry. This is not a PSA-issued certificate.',
        guide: 'civil-registry',
        variant: 'copy',
      },
      {
        id: 'work',
        label: 'A working permit',
        detail: 'Prepare for the city’s online Mayor’s Working Permit.',
        guide: 'working-permit',
        variant: 'prepare',
      },
      {
        id: 'senior',
        label: 'A Senior Citizen ID',
        detail: 'A first ID, a transfer to Bacoor, or a lost ID.',
        next: 'senior',
      },
    ],
  },
  business: {
    title: 'Is this a new business or a renewal?',
    description: 'The city asks for different documents for each application.',
    options: [
      {
        id: 'new',
        label: 'New business',
        detail: 'Prepare to apply for your first permit for this business.',
        guide: 'business-permit',
        variant: 'new',
      },
      {
        id: 'renewal',
        label: 'Renewal',
        detail: 'Prepare the records for an existing business permit.',
        guide: 'business-permit',
        variant: 'renewal',
      },
    ],
  },
  senior: {
    title: 'What do you need for your Senior Citizen ID?',
    description:
      'Choose the situation that matches your application. OSCA will check your eligibility and documents.',
    options: [
      {
        id: 'new',
        label: 'First Senior Citizen ID',
        detail: 'Apply for an ID for the first time.',
        guide: 'senior-citizen-id',
        variant: 'new',
      },
      {
        id: 'transfer',
        label: 'Transfer my ID to Bacoor',
        detail: 'You have an OSCA ID from another city or municipality.',
        next: 'transfer',
      },
      {
        id: 'lost',
        label: 'Replace a lost ID',
        detail: 'Prepare the lost-ID requirements listed by OSCA.',
        guide: 'senior-citizen-id',
        variant: 'lost',
      },
    ],
  },
  transfer: {
    title: 'Do you have a Certificate of Cancellation?',
    description:
      'This is issued by the OSCA office of your former city or municipality. The Charter lists a separate route if you do not have it.',
    options: [
      {
        id: 'with-certificate',
        label: 'Yes, I have the certificate',
        detail: 'Use the transfer checklist with the cancellation certificate.',
        guide: 'senior-citizen-id',
        variant: 'transfer',
      },
      {
        id: 'without-certificate',
        label: 'No, I do not have it',
        detail:
          'See the alternative documents and ask OSCA to confirm the transfer arrangements.',
        guide: 'senior-citizen-id',
        variant: 'transfer-no-cancellation',
      },
    ],
  },
};

// Accept only choices reachable from the start. Stale or invalid saved answers
// cannot select an unrelated checklist or skip a question.
export function resolveFinder(input: unknown) {
  let question = finderQuestions.start;
  const answers: string[] = [];
  const trail: string[] = [];
  if (Array.isArray(input)) {
    for (const value of input.slice(0, 4)) {
      const option = question.options.find(item => item.id === value);
      if (!option) break;
      answers.push(option.id);
      trail.push(option.label);
      if (option.next) {
        question = finderQuestions[option.next];
      } else {
        const guide = guides.find(item => item.slug === option.guide)!;
        const variant = guide.variants.find(
          item => item.id === option.variant
        )!;
        return { answers, trail, question: null, guide, variant };
      }
    }
  }
  return { answers, trail, question, guide: null, variant: null };
}

export const finderStorageKey = 'betterbacoor:service-finder:v1';
export function readFinderAnswers() {
  try {
    return resolveFinder(
      JSON.parse(localStorage.getItem(finderStorageKey) ?? '[]')
    ).answers;
  } catch {
    return [];
  }
}
