import type { ServiceGuide } from './guides';

export const communityGuides: ServiceGuide[] = [
  {
    slug: 'pwd-id',
    title: 'Prepare for your PWD ID.',
    summary:
      'Start with Bacoor’s official Citizen Portal to apply for or renew a PWD ID.',
    category: 'IDS & ASSISTANCE',
    keywords:
      'PWD disability person persons disabilities ID renewal kapansanan may kapansanan',
    office: 'Bacoor City eGov · Citizen Portal',
    eligibility:
      'The portal offers PWD ID application and renewal. The city reviews identity verification and the requirements shown for your case.',
    fee: 'Creating a portal account is free. Check the official PWD ID service for any applicable charges; the public landing page does not give a full fee schedule.',
    timing:
      'City review is required. The public portal landing page does not give a PWD ID processing time; follow the official application instructions.',
    sourceUrl: 'https://portal.bacoor.gov.ph/',
    sourceLabel:
      'Bacoor City eGov Citizen Portal · PWD ID and How it works sections',
    verified: '2026-09-29',
    actionUrl: 'https://portal.bacoor.gov.ph/',
    actionLabel: 'Open the official Citizen Portal',
    variants: [
      {
        id: 'prepare',
        label: 'Before you apply',
        requirements: [
          'Have access to the email address or mobile number you will use for your city account.',
          'Review the portal’s valid-ID and live-selfie verification instructions.',
          'Check the current PWD ID requirements inside the official system for your application or renewal.',
        ],
        note: 'This is a preparation list. A complete PWD ID document checklist is not linked on the public portal page when checked; use the instructions inside the official service.',
        steps: [
          {
            title: 'Create or sign in to your account',
            detail:
              'Use the official Citizen Portal and enter your email address or mobile number as instructed for registration.',
          },
          {
            title: 'Complete city identity verification',
            detail:
              'Follow the government portal’s valid-ID and live-selfie process, then wait for city review.',
          },
          {
            title: 'Open PWD ID from your dashboard',
            detail:
              'After verification, access the PWD ID service from your dashboard to apply or renew. Follow its current requirements and application instructions.',
          },
        ],
      },
    ],
  },
  {
    slug: 'solo-parent-id',
    title: 'Prepare for your Solo Parent ID.',
    summary:
      'Confirm your category and documents with CSWD before preparing a Solo Parent ID application.',
    category: 'IDS & ASSISTANCE',
    keywords: 'solo parent single parent ID magulang nag-iisang magulang',
    office: 'Office of Social Welfare and Development',
    email: 'cswd@bacoor.gov.ph',
    contactSourceUrl: 'https://bacoor.gov.ph/city-and-units-heads/',
    eligibility:
      'The Charter lists different solo-parent categories with different evidence. CSWD determines which category and requirements apply to your situation.',
    fee: 'The Charter lists no fee for the service steps. Supporting documents may have separate costs; confirm these with the issuing office.',
    timing:
      'Assessment, orientation, and ID release depend on complete documents and the office’s instructions. Confirm the schedule with CSWD.',
    sourceUrl: 'https://bacoor.gov.ph/downloads/arta/CitizensCharter2026.pdf',
    sourceLabel:
      'Citizen’s Charter 2026 · printed pages 36.24–36.31 (PDF pages 1077–1084)',
    verified: '2026-09-29',
    variants: [
      {
        id: 'prepare',
        label: 'Before you apply',
        sourcePage: 1077,
        requirements: [
          'Ask CSWD which solo-parent category and current documents apply to your circumstances.',
          'Read the Charter pages for your category before obtaining affidavits or paying for notarization.',
          'Prepare children’s birth documents and original or certified supporting evidence only as required for your category.',
        ],
        note: 'This is a preparation guide, not a universal document checklist or a decision about eligibility. Requirements vary by category; confirm the applicable list with CSWD.',
        steps: [
          {
            title: 'Confirm your category with CSWD',
            detail:
              'Explain your circumstances to the official office and ask which category-specific requirements and application form to use.',
          },
          {
            title: 'Submit the applicable documents',
            detail:
              'Prepare the evidence CSWD identifies for your case and submit it through the office’s application process.',
          },
          {
            title: 'Attend assessment and orientation',
            detail:
              'Attend the assessment and orientation as instructed by CSWD, then follow its ID release instructions.',
          },
        ],
      },
    ],
  },
  {
    slug: 'medical-assistance',
    title: 'Prepare a medical-assistance request.',
    summary:
      'Review the Charter’s medical documents and ask CSWD how to submit your request for assessment.',
    category: 'IDS & ASSISTANCE',
    keywords:
      'medical assistance hospital medicine prescription laboratory tulong medikal gamot ospital',
    office: 'Office of Social Welfare and Development',
    email: 'cswd@bacoor.gov.ph',
    contactSourceUrl: 'https://bacoor.gov.ph/city-and-units-heads/',
    eligibility:
      'The Charter describes assistance for Bacoor residents in crisis who cannot meet their needs. CSWD assesses each case.',
    fee: 'The Charter lists no fee for the service steps. Supporting documents may have separate costs; confirm these with the issuing office.',
    timing:
      'Release depends on assessment and approval. Approved cash assistance is released weekly or as scheduled; ask CSWD about guarantee-letter and release instructions.',
    sourceUrl: 'https://bacoor.gov.ph/downloads/arta/CitizensCharter2026.pdf',
    sourceLabel:
      'Citizen’s Charter 2026 · printed pages 36.3–36.8 (PDF pages 1056–1061); medical requirements on PDF page 1057',
    verified: '2026-09-29',
    variants: [
      {
        id: 'prepare',
        label: 'Before you apply',
        sourcePage: 1057,
        requirements: [
          'One copy of a clinical abstract or medical certificate signed by the attending physician, with the physician’s license number, dated within three months.',
          'One copy of the applicable signed hospital bill, laboratory request, or prescription, with the physician’s license number.',
          'If already discharged: one copy of a promissory note for the unpaid bill.',
          'One photocopy each of the authorized person’s and patient’s valid IDs; ask CSWD about the barangay clearance listed when an ID is unavailable.',
          'One copy of a personal letter addressed to the Mayor requesting assistance.',
        ],
        note: 'The Charter also states that the applicant must be a registered Bacoor voter. Ask CSWD how this applies to your case and what it needs to confirm; this guide does not add a voter-document requirement.',
        steps: [
          {
            title: 'Confirm where to start',
            detail:
              'Ask CSWD which Bacoor Action Center or office handles your case and which documents apply before visiting.',
          },
          {
            title: 'Complete intake and submit documents',
            detail:
              'Attend the intake interview and submit your documents through the official office. Follow the staff’s instructions for missing requirements.',
          },
          {
            title: 'Wait for the case assessment',
            detail:
              'CSWD reviews the request and may conduct a home visit when needed. Assistance and the amount depend on the city’s assessment and approval.',
          },
          {
            title: 'Follow the assistance release instructions',
            detail:
              'Follow CSWD’s instructions for approved assistance. The Charter says guarantee letters and burial assistance are sent directly by email to the hospital, laboratory clinic, or funeral provider.',
          },
        ],
      },
    ],
  },
  {
    slug: 'burial-assistance',
    title: 'Prepare a burial-assistance request.',
    summary:
      'Review the funeral and civil-record documents listed by the city before asking CSWD for assistance.',
    category: 'IDS & ASSISTANCE',
    keywords:
      'burial funeral death assistance tulong libing pagpapalibing namatay',
    office: 'Office of Social Welfare and Development',
    email: 'cswd@bacoor.gov.ph',
    contactSourceUrl: 'https://bacoor.gov.ph/city-and-units-heads/',
    eligibility:
      'The Charter describes assistance for Bacoor residents in crisis who cannot meet their needs. CSWD assesses each case.',
    fee: 'The Charter lists no fee for the service steps. Supporting documents may have separate costs; confirm these with the issuing office.',
    timing:
      'Release depends on assessment and approval. Approved cash assistance is released weekly or as scheduled; ask CSWD about guarantee-letter and release instructions.',
    sourceUrl: 'https://bacoor.gov.ph/downloads/arta/CitizensCharter2026.pdf',
    sourceLabel:
      'Citizen’s Charter 2026 · printed pages 36.3–36.8 (PDF pages 1056–1061); burial requirements on PDF page 1056',
    verified: '2026-09-29',
    variants: [
      {
        id: 'prepare',
        label: 'Before you apply',
        sourcePage: 1056,
        requirements: [
          'One copy of a signed funeral contract.',
          'If already buried with an unpaid balance: one copy of a signed balance certification or promissory note.',
          'One copy of a death certificate with a registry number.',
          'One copy of a personal letter addressed to the Mayor requesting assistance.',
          'A photocopy of the authorized person’s valid ID.',
          'The deceased person’s valid ID showing a Bacoor address; if no valid ID is available, a barangay clearance.',
        ],
        note: 'The Charter also states that the applicant must be a registered Bacoor voter. Ask CSWD how this applies to your case and what it needs to confirm; this guide does not add a voter-document requirement.',
        steps: [
          {
            title: 'Confirm where to start',
            detail:
              'Ask CSWD which Bacoor Action Center or office handles your case and which documents apply before visiting.',
          },
          {
            title: 'Complete intake and submit documents',
            detail:
              'Attend the intake interview and submit your documents through the official office. Follow the staff’s instructions for missing requirements.',
          },
          {
            title: 'Wait for the case assessment',
            detail:
              'CSWD reviews the request and may conduct a home visit when needed. Assistance and the amount depend on the city’s assessment and approval.',
          },
          {
            title: 'Follow the assistance release instructions',
            detail:
              'Follow CSWD’s instructions for approved assistance. The Charter says guarantee letters and burial assistance are sent directly by email to the hospital, laboratory clinic, or funeral provider.',
          },
        ],
      },
    ],
  },
];
