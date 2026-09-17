import { bilingualSearch } from './search';
import { translate } from '../i18n';
import { seniorGuide } from './senior-guide';

export interface GuideVariant {
  id: string;
  label: string;
  requirements: string[];
  steps: { title: string; detail: string }[];
  note: string;
  sourcePage?: number;
}

export interface ServiceGuide {
  slug: string;
  title: string;
  summary: string;
  category: string;
  keywords: string;
  office: string;
  email: string;
  contactSourceUrl?: string;
  eligibility?: string;
  fee: string;
  timing: string;
  sourceUrl: string;
  sourceLabel: string;
  verified: string;
  actionUrl?: string;
  actionLabel?: string;
  variants: GuideVariant[];
}

export const charterUrl =
  'https://bacoor.gov.ph/downloads/arta/CitizensCharter2026.pdf';

export const guides: ServiceGuide[] = [
  {
    slug: 'business-permit',
    title: 'Business permits, made clearer.',
    summary:
      'Starting a business or renewing? Build your document checklist and understand the city’s application process.',
    category: 'BUSINESS & LIVELIHOOD',
    keywords: 'business permits new renewal BOSS BPLD mayor license negosyo',
    office: 'Business Permits and Licensing Department',
    email: 'bplo@bacoor.gov.ph',
    fee: 'Assessed by the city. Taxes and fees depend on your business and applicable clearances; there is no single fixed total.',
    timing:
      'The Charter lists separate schedules for walk-in and online processing. Incomplete requirements, clearances, and payment confirmation affect the total.',
    sourceUrl: charterUrl,
    sourceLabel:
      'Citizen’s Charter 2026 · printed pages 6.2–6.15 (PDF pages 162–175)',
    verified: '2026-09-16',
    actionUrl: 'https://boss.bacoor.gov.ph/',
    actionLabel: 'Continue to the city’s BOSS application',
    variants: [
      {
        id: 'new',
        label: 'New business',
        sourcePage: 162,
        requirements: [
          'Business registration or legal-personality documents: DTI, SEC, CDA, or franchise documentation as applicable, plus your basis for tax assessment such as capitalization.',
          'If renting: your lease contract and a photocopy of your lessor’s business permit.',
          'Photocopies of the property title (TCT) and land/building tax declarations (two copies); an occupancy permit where required.',
          'A business-location sketch and a full front-view photograph of your establishment (two copies).',
          'Employee counts for PESO: total employees and the number who live in Bacoor.',
        ],
        note: 'Some industries need extra clearances. The Charter lists sector-specific requirements on pages 6.3–6.4. Confirm what applies to your business with BPLD; this checklist covers the general requirements.',
        steps: [
          {
            title: 'Choose online or in-person application',
            detail:
              'For the online route, apply through BOSS and upload the required documents. For walk-in applications, submit your requirements to obtain the Unified Business Permit Application and New Business Permit Clearance forms.',
          },
          {
            title: 'Complete the city’s review and clearances',
            detail:
              'The walk-in process includes zoning, building, health, and environment steps. The online process also routes documents for review and assessment. Follow the instructions for your business activity.',
          },
          {
            title: 'Review your assessment and pay',
            detail:
              'Check the assessed charges and pay through the authorized city channel. Keep the official receipt or payment reference.',
          },
          {
            title: 'Follow the release instructions',
            detail:
              'Complete the remaining city checks and follow the permit-release or delivery instructions. A prepared checklist is not an issued permit.',
          },
        ],
      },
      {
        id: 'renewal',
        label: 'Renewal',
        sourcePage: 163,
        requirements: [
          'Your previous business permit or Statement of Account (SOA).',
          'The basis for tax computation: the applicable BIR return listed in the Charter (1701Q/1701A, 2550M/2550Q/2551Q) or audited financial statements.',
          'A sworn declaration of gross sales or receipts; itemized sales by branch if your business has multiple locations.',
          'For PESO: current job vacancies, if any, total employees, and the number of employees residing in Bacoor.',
        ],
        note: 'These are the renewal requirements published in the 2026 Charter. Confirm applicable tax records and any industry-specific requirements with BPLD before submission.',
        steps: [
          {
            title: 'Submit your renewal application',
            detail:
              'Submit the renewal form and supporting requirements through the city’s available BOSS route or at the Business One-Stop Shop.',
          },
          {
            title: 'Check the city assessment',
            detail:
              'Review the tax and fee assessment for the renewal before making payment.',
          },
          {
            title: 'Pay and keep your receipt',
            detail:
              'Use the city’s authorized payment instructions and retain your receipt or reference.',
          },
          {
            title: 'Receive the renewed permit',
            detail:
              'Follow the city’s clearance and release instructions for your application.',
          },
        ],
      },
    ],
  },
  {
    slug: 'civil-registry',
    title: 'Get a copy of a civil record.',
    summary:
      'Prepare to request a local birth, marriage, or death record from the Bacoor City Civil Registry.',
    category: 'DOCUMENTS & RECORDS',
    keywords:
      'birth certificate marriage death civil registry records documents requirements PSA',
    office: 'Office of the City Civil Registry',
    email: 'ccr@bacoor.gov.ph',
    fee: 'The Charter lists ₱110 for a certified true copy, ₱300 for a transcription, and ₱55 for a security seal. Your total depends on the document(s) requested; confirm the applicable charges with the office.',
    timing:
      '45 minutes is the Charter’s listed processing total for this service. This is not an appointment or guaranteed waiting time.',
    sourceUrl: charterUrl,
    sourceLabel:
      'Citizen’s Charter 2026 · printed pages 9.26–9.27 (PDF pages 318–319)',
    verified: '2026-09-16',
    variants: [
      {
        id: 'copy',
        label: 'Local record copy',
        sourcePage: 318,
        requirements: [
          'A valid government-issued ID.',
          'An authorization letter or special power of attorney, as listed in the Charter. Ask the registry which is needed for your request.',
          'Any additional supporting documents requested by the registry for your case.',
        ],
        note: 'This service provides a copy or transcription from the local registry, not a PSA-issued certificate. Confirm which version the receiving school, employer, or agency needs. If the local record is unavailable, the Charter says the office will advise you to obtain a PSA copy for verification.',
        steps: [
          {
            title: 'Submit the request form',
            detail:
              'Give the completed request form to the City Civil Registry. The records section checks whether the record is available.',
          },
          {
            title: 'Pay the assessed fee',
            detail:
              'If the record is available, follow the payment instructions and obtain an official receipt.',
          },
          {
            title: 'Present the official receipt',
            detail:
              'The registry reviews and signs the requested civil-registry document.',
          },
          {
            title: 'Receive your document',
            detail:
              'Complete the release log and collect your document from the records section.',
          },
        ],
      },
    ],
  },
  {
    slug: 'working-permit',
    title: 'Get ready for your working permit.',
    summary:
      'Understand where to start with Bacoor’s online Mayor’s Working Permit and prepare for the city’s application.',
    category: 'WORK & EMPLOYMENT',
    keywords: 'working work employee employment mayor permit trabaho',
    office: 'Bacoor eGov working-permit support',
    email: 'e-gov@bacoor.gov.ph',
    fee: 'Check the charges shown in the official application before paying. This guide does not quote a fixed total.',
    timing:
      'Processing depends on the application and required checks. No turnaround time is promised here.',
    sourceUrl: 'https://strikeas1.bacoor.gov.ph/',
    sourceLabel: 'Bacoor City eGov · Online Mayor’s Working Permit',
    verified: '2026-09-16',
    actionUrl: 'https://strikeas1.bacoor.gov.ph/',
    actionLabel: 'Open the official working-permit application',
    variants: [
      {
        id: 'prepare',
        label: 'Before you apply',
        requirements: [
          'Have access to the email address you will use for city account verification.',
          'Review the official application’s current requirements and charges.',
          'Keep your application and payment references for follow-up.',
        ],
        note: 'This is a preparation list, not the city’s complete document checklist. Use the requirements presented in the official application for your case.',
        steps: [
          {
            title: 'Register or sign in',
            detail:
              'The city portal supports account registration with email verification.',
          },
          {
            title: 'Follow the city application',
            detail:
              'Complete the application and required checks through the official system.',
          },
          {
            title: 'Monitor your application',
            detail:
              'Use your city account to follow the application’s progress and instructions.',
          },
        ],
      },
    ],
  },
  seniorGuide,
];

export function findGuides(query: string) {
  const words = bilingualSearch(query).split(/\s+/).filter(Boolean);
  return guides.filter(guide =>
    words.every(word =>
      bilingualSearch(
        `${guide.title} ${guide.summary} ${guide.keywords} ${translate(guide.title, 'fil')} ${translate(guide.summary, 'fil')}`
      ).includes(word)
    )
  );
}
