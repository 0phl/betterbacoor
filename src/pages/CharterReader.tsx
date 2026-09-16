import { lazy, Suspense, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, FileText } from 'lucide-react';
import { charterUrl } from '../data/guides';
import { PageMeta } from '../components/PageMeta';
const PDFDocument = lazy(() => import('../components/PDFDocument'));

const chapters = [
  { page: 1, name: 'Start of document' },
  { page: 162, name: 'New business · 6.2' },
  { page: 163, name: 'Business renewal · 6.3' },
  { page: 171, name: 'Online business application · 6.11' },
  { page: 318, name: 'Civil record copies · 9.26' },
];
export function CharterReader() {
  const [params, setParams] = useSearchParams();
  const requested = Number(params.get('page') ?? 1);
  const page =
    Number.isInteger(requested) && requested >= 1 && requested <= 1202
      ? requested
      : 1;
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="page-shell charter-reader">
      <PageMeta
        title="Citizen’s Charter reader"
        description="Read the official 2026 Bacoor Citizen’s Charter within BetterBacoor, with shortcuts to business permits and civil registry services."
      />
      <Link className="back-link" to="/services">
        <ArrowLeft size={16} aria-hidden="true" /> Service guides
      </Link>
      <p className="eyebrow">THE CITY’S PUBLISHED SERVICE MANUAL</p>
      <h1>Citizen’s Charter, within reach.</h1>
      <p>
        Read the City of Bacoor’s 2026 first edition. This is an unmodified copy
        of the city’s published 1,202-page document, available here for easier
        reading. Chapter labels use its printed page numbers.
      </p>
      <div className="reader-toolbar">
        <label htmlFor="charter-chapter">Jump to a section</label>
        <select
          id="charter-chapter"
          value={page}
          onChange={event => setParams({ page: event.target.value })}
        >
          {!chapters.some(chapter => chapter.page === page) && (
            <option value={page}>PDF page {page}</option>
          )}
          {chapters.map(chapter => (
            <option key={chapter.page} value={chapter.page}>
              {chapter.name}
            </option>
          ))}
        </select>
        <a href={`${charterUrl}#page=${page}`} target="_blank" rel="noreferrer">
          Open original PDF <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
      <p className="reader-fallback">
        This reader uses PDF page numbers, which differ from the printed chapter
        numbers. You can also use our{' '}
        <Link to="/services">plain-language guides</Link>.
      </p>
      {loaded ? (
        <Suspense fallback={<p role="status">Loading document reader…</p>}>
          <PDFDocument
            page={page}
            onPageChange={next => setParams({ page: String(next) })}
          />
        </Suspense>
      ) : (
        <div className="reader-placeholder">
          <FileText size={44} strokeWidth={1.4} aria-hidden="true" />
          <h2>Read the official document here</h2>
          <p>
            The complete PDF is approximately 13 MB. Load it when you’re ready.
          </p>
          <button
            type="button"
            className="button-primary"
            onClick={() => setLoaded(true)}
          >
            Load the city’s PDF
          </button>
        </div>
      )}
    </div>
  );
}
