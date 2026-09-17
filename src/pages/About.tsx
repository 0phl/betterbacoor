import { t, useLanguage } from '../i18n';
import {
  ArrowUpRight,
  BookOpen,
  HeartHandshake,
  ShieldCheck,
} from 'lucide-react';
import { PageIntro } from '../components/PageIntro';
import { PageMeta } from '../components/PageMeta';

export function About() {
  useLanguage();
  return (
    <div className="page-shell py-12 sm:py-16 lg:py-20">
      <PageMeta
        title={t('About')}
        description={t(
          'Built by the community, for the community. Learn how BetterBacoor makes useful public information easier to find.'
        )}
      />
      <PageIntro
        eyebrow={t('A little more connected. A little better informed.')}
        title={t('For Bacoor. For all of us.')}
        description={t(
          'Finding a service or getting a simple answer should be easy. BetterBacoor brings useful public information together so our community can spend less time searching and more time getting things done.'
        )}
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {[
          {
            icon: HeartHandshake,
            title: 'Community comes first',
            text: 'An independent, volunteer-built guide for people who live, work, and build a life in Bacoor. Free to browse, with no BetterBacoor account needed.',
          },
          {
            icon: BookOpen,
            title: 'Useful, understandable information',
            text: 'Read service guides, prepare a personal checklist, and browse the city’s Charter here. Official sources stay attached to the information you use.',
          },
          {
            icon: ShieldCheck,
            title: 'Sources you can see',
            text: 'Every government resource includes its original source. Open the Source section to see where the information comes from and confirm details with the responsible office.',
          },
        ].map(({ icon: Icon, title, text }) => (
          <section className="resource-card" key={title}>
            <Icon size={27} className="text-civic-700" aria-hidden="true" />
            <h2>{t(title)}</h2>
            <p className="resource-summary">{t(text)}</p>
          </section>
        ))}
      </div>
      <section className="mt-10 rounded-xl border border-civic-200 bg-civic-50 p-7 sm:p-9">
        <p className="eyebrow">{t('THE BETTERGOV COMMUNITY')}</p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight">
          {t('Better public information is something we can build together.')}
        </h2>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600">
          {t(
            'BetterBacoor is inspired by BetterGov.ph and the independent Better LGU projects across the Philippines. We share a belief that open information and thoughtful technology can make everyday life easier for our communities.'
          )}
        </p>
        <div className="mt-5 flex flex-wrap gap-x-7 gap-y-2">
          <a
            href="https://lgu.bettergov.ph/"
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            {t('Meet the Better LGU community')}{' '}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <a
            href="https://about.bettergov.ph/projects/"
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            {t('Explore BetterGov projects')}{' '}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </section>
      <section className="mt-10 max-w-3xl">
        <h2 className="text-xl font-bold tracking-tight">
          {t('Your checklist stays with you')}
        </h2>
        <p className="mt-4 leading-7 text-slate-600">
          {t(
            'Service checklists save only the items you tick in this browser. They are not sent to a server or shared across devices. Use Reset checklist to remove your saved progress. No account, personal details, or document uploads are needed.'
          )}
        </p>
      </section>
      <section className="mt-10 max-w-3xl">
        <h2 className="text-xl font-bold tracking-tight">
          {t('Independent and community-run')}
        </h2>
        <p className="mt-4 leading-7 text-slate-600">
          {t(
            'BetterBacoor is not operated by or endorsed by the City Government of Bacoor. Applications, payments, and submissions take place on the linked government websites. We do not collect IDs, application documents, or payment details.'
          )}
        </p>
        <p className="mt-4 leading-7 text-slate-600">
          {t(
            'Government pages can change. For a question about a service or your application, use the office directories to reach the responsible agency.'
          )}
        </p>
      </section>
    </div>
  );
}
