import type { ServiceGuide } from './guides';

const sourceUrl =
  'https://bacoor.gov.ph/downloads/arta/CitizensCharter2026.pdf';
const contactSourceUrl = 'https://bacoor.gov.ph/city-and-units-heads/';

export const opportunityGuides: ServiceGuide[] = [
  {
    slug: 'education-support',
    title: 'Prepare to ask about education support.',
    summary:
      'Find the city scholarship process and ask about current applications.',
    category: 'EDUCATION & EMPLOYMENT',
    keywords:
      'education scholarship student school enrollment tuition assistance edukasyon pag aaral iskolar pag-aaral',
    office: 'Office of Social Welfare and Development · Scholarship Unit',
    email: 'cswd@bacoor.gov.ph',
    contactSourceUrl,
    eligibility:
      'The Charter identifies qualified students residing in Bacoor. Ask the Scholarship Unit about current eligibility and intake dates.',
    fee: 'The Charter lists no fee for the scholarship service steps.',
    timing:
      'This is a multi-stage process. The Charter lists annual assistance release and processing within a year; it does not confirm an open intake or an award date.',
    sourceUrl,
    sourceLabel:
      'Citizen’s Charter 2026 · printed pages 36.57–36.58 (PDF pages 1110–1111)',
    verified: '2026-09-29',
    actionUrl: 'https://bacoor.gov.ph/category/announcement/',
    actionLabel: 'Check dated city announcements',
    variants: [
      {
        id: 'prepare',
        label: 'Scholarship preparation',
        sourcePage: 1110,
        requirements: [
          'A Certificate of Enrollment.',
          'The student’s valid school ID.',
          'Confirm with CSWD how to establish Bacoor residency for the current application.',
        ],
        note: 'This guide covers the city Scholarship Unit process. Other scholarships have their own rules. Confirm that applications are open and check the issuing office, publication date, and deadline before preparing additional documents.',
        steps: [
          {
            title: 'Ask about the current intake',
            detail:
              'Contact CSWD to confirm eligibility, dates, and the Bacoor Action Center handling your application.',
          },
          {
            title: 'Attend the intake interview',
            detail:
              'Bring the confirmed documents to the designated Action Center for the interview and assessment.',
          },
          {
            title: 'Follow the Scholarship Unit’s instructions',
            detail:
              'The city consolidates applications and reviews approval. Ask the office how to follow up and receive assistance if approved.',
          },
        ],
      },
    ],
  },
  {
    slug: 'peso-employment',
    title: 'Prepare for jobseeker assistance.',
    summary:
      'Ask PESO about job referral, placement, and current opportunities.',
    category: 'EDUCATION & EMPLOYMENT',
    keywords:
      'PESO job employment work resume referral placement jobseeker trabaho hanap trabaho aplikante manggagawa',
    office: 'Public Employment Service Office (PESO)',
    email: 'peso@bacoor.gov.ph',
    contactSourceUrl,
    eligibility:
      'The Charter includes job seekers, students, out-of-school youth, migratory workers, PWDs, returning OFWs, and displaced workers. Employers assess qualifications for each vacancy.',
    fee: 'The Charter lists no fee for PESO referral steps and provides the NSRP form for free.',
    timing:
      'The Charter lists 58 minutes for the PESO steps. Matching, employer interviews, and hiring depend on vacancies and employer decisions; a job is not guaranteed.',
    sourceUrl,
    sourceLabel:
      'Citizen’s Charter 2026 · printed pages 33.14–33.17 (PDF pages 987–990)',
    verified: '2026-09-29',
    variants: [
      {
        id: 'prepare',
        label: 'Job referral preparation',
        sourcePage: 987,
        requirements: [
          'Two copies of your updated resume, to submit directly to PESO.',
          'One completed National Skills Registration Program (NSRP) form, available free from PESO.',
        ],
        note: 'Ask PESO about current vacancies and recruitment schedules. Submit your resume and personal information directly to the responsible office or employer; BetterBacoor only saves checklist ticks.',
        steps: [
          {
            title: 'Ask PESO about vacancies',
            detail:
              'Contact PESO or visit its bulletin board to find current opportunities matching your interests.',
          },
          {
            title: 'Register with PESO',
            detail:
              'Complete the registration and NSRP forms provided by PESO and submit two updated resumes to its staff.',
          },
          {
            title: 'Follow the referral instructions',
            detail:
              'PESO checks matching employers and job availability. If a referral is available, follow the staff’s instructions on interview time, location, and preparation.',
          },
        ],
      },
    ],
  },
];
