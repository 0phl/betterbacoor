import type { ServiceGuide } from './guides';

const requirements = [
  'A completed application form from the OSCA Information Desk, signed by the senior citizen applicant.',
  'Original and readable photocopy of one listed document: PSA birth certificate, baptismal certificate, SSS/GSIS UMID, TIN ID, PhilHealth ID, driver’s license, voter’s ID, or an unexpired Philippine passport, PRC ID, or postal ID.',
  'A recent 1×1 ID photograph.',
  'A barangay certificate for the OSCA ID application.',
];
const steps = [
  {
    title: 'Get and complete the OSCA form',
    detail:
      'Get the form at the OSCA main office or OSCA desk at MSBR, lower ground floor of the main building. The senior citizen applicant signs the form.',
  },
  {
    title: 'Submit your documents for screening',
    detail:
      'OSCA checks that the application and supporting documents are complete and valid, then verifies the information against its records.',
  },
  {
    title: 'Complete ID processing at MSBR',
    detail:
      'Proceed to the MSBR office on the lower ground floor of the main building for data gathering, data input, and ID capture. Follow the staff’s instructions.',
  },
  {
    title: 'Receive and acknowledge your ID',
    detail:
      'Wait for OSCA to record and release the processed ID. Sign to acknowledge receipt as instructed by the office.',
  },
];
const note =
  'For dual citizens naturalized abroad, the Charter also lists the Petition for Reacquisition of Philippine Citizenship, Identification Certificate, Order of Approval, and Oath of Allegiance. If applying through a representative, it lists a clear printed photo of the applicant holding a newspaper with its date visible and the representative holding the authorization letter, plus a photocopy of the representative’s valid ID. Confirm these arrangements with OSCA before visiting.';

export const seniorGuide: ServiceGuide = {
  slug: 'senior-citizen-id',
  title: 'Prepare for your Senior Citizen ID.',
  summary:
    'Find the documents and steps for a new ID, a transfer to Bacoor, or a lost Senior Citizen ID.',
  category: 'SENIOR CITIZENS',
  keywords:
    'senior citizen elderly OSCA ID new replacement lost transfer nakatatanda nawala lipat',
  office: 'Office of the Senior Citizens Affairs (OSCA)',
  email: 'osca@bacoor.gov.ph',
  contactSourceUrl: 'https://bacoor.gov.ph/city-and-units-heads/',
  eligibility:
    'The Charter describes this service for people aged 60 and above: Filipino citizens, including dual citizens with the required status documents, with at least six months of residence in Bacoor. OSCA checks eligibility and documents.',
  fee: 'The Charter lists no fee for the ID service steps. Supporting documents, notarization, or postage may have separate costs; confirm these with the issuing office.',
  timing:
    'The Charter lists 35 minutes for its timed steps. Data input and ID capture depend on MIS processing time, so this is not a guaranteed total visit or release time.',
  sourceUrl: 'https://bacoor.gov.ph/downloads/arta/CitizensCharter2026.pdf',
  sourceLabel:
    'Citizen’s Charter 2026 · printed pages 28.2–28.5 (PDF pages 657–660)',
  verified: '2026-09-17',
  variants: [
    {
      id: 'new',
      label: 'First Senior Citizen ID',
      sourcePage: 657,
      requirements,
      note,
      steps,
    },
    {
      id: 'transfer',
      label: 'Transfer with a cancellation certificate',
      sourcePage: 658,
      requirements: [
        ...requirements,
        'A Certificate of Cancellation from the OSCA office of your former city or municipality.',
      ],
      note,
      steps,
    },
    {
      id: 'transfer-no-cancellation',
      label: 'Transfer without a cancellation certificate',
      sourcePage: 658,
      requirements: [
        ...requirements,
        'Three photocopies of the OSCA ID from your former city or municipality, and the original ID to surrender.',
        'A Certificate of Transfer to Bacoor from OSCA Bacoor.',
        'An Order of Payment from the City Finance Department and a postal receipt from PhilPost. Ask OSCA how to complete this transfer route.',
      ],
      note,
      steps,
    },
    {
      id: 'lost',
      label: 'Replace a lost ID',
      sourcePage: 659,
      requirements: [
        'A completed application form from the OSCA Information Desk, signed by the senior citizen applicant.',
        'A notarized Affidavit of Loss.',
        'One recent 1×1 ID photograph.',
      ],
      note: 'These are the lost-ID requirements in section E of the Charter. If using a representative, confirm section D with OSCA: it lists a clear printed photo of the applicant holding a dated newspaper and the representative holding the authorization letter, plus a photocopy of the representative’s valid ID. For damaged IDs or corrections, ask OSCA which process applies.',
      steps,
    },
  ],
};
