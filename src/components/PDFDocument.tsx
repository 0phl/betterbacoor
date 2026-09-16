import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  getDocument,
  GlobalWorkerOptions,
  type PDFDocumentProxy,
  type RenderTask,
} from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

GlobalWorkerOptions.workerSrc = workerUrl;

export default function PDFDocument({
  page,
  onPageChange,
}: {
  page: number;
  onPageChange: (page: number) => void;
}) {
  const [document, setDocument] = useState<PDFDocumentProxy | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(true);
  const [text, setText] = useState('');
  const [width, setWidth] = useState(900);
  const [pageInput, setPageInput] = useState(String(page));
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    const task = getDocument({
      url: '/documents/bacoor-citizens-charter-2026.pdf',
      disableAutoFetch: true,
      disableStream: true,
    });
    task.promise
      .then(pdf => {
        if (active) setDocument(pdf);
      })
      .catch(() => {
        if (active) {
          setError(
            'The document could not load. Please use the original PDF link above or try again later.'
          );
          setBusy(false);
        }
      });
    return () => {
      active = false;
      void task.destroy().catch(() => {});
    };
  }, []);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const observer = new ResizeObserver(entries =>
      setWidth(Math.max(240, entries[0].contentRect.width))
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setPageInput(String(page));
  }, [page]);

  useEffect(() => {
    if (!document) return;
    let active = true;
    let renderTask: RenderTask | undefined;
    setBusy(true);
    setError('');
    setText('');
    host.current?.replaceChildren();
    async function renderPage() {
      try {
        const pdfPage = await document!.getPage(page);
        if (!active) return;
        const viewport = pdfPage.getViewport({
          scale:
            Math.min(width, 1100) / pdfPage.getViewport({ scale: 1 }).width,
        });
        const density = Math.min(window.devicePixelRatio || 1, 2);
        const canvas = window.document.createElement('canvas');
        canvas.width = Math.floor(viewport.width * density);
        canvas.height = Math.floor(viewport.height * density);
        canvas.style.width = '100%';
        canvas.style.height = 'auto';
        canvas.setAttribute('role', 'img');
        canvas.setAttribute(
          'aria-label',
          `Charter PDF page ${page}. An accessible text version is available below.`
        );
        renderTask = pdfPage.render({
          canvas,
          viewport,
          transform: [density, 0, 0, density, 0, 0],
        });
        await renderTask.promise;
        const content = await pdfPage.getTextContent();
        if (!active) return;
        host.current?.replaceChildren(canvas);
        setText(
          content.items
            .map(item =>
              'str' in item ? item.str + (item.hasEOL ? '\n' : ' ') : ''
            )
            .join('')
        );
        setBusy(false);
      } catch {
        if (active) {
          setError(
            'This page could not be rendered. Open the original PDF above to read it.'
          );
          setBusy(false);
        }
      }
    }
    void renderPage();
    return () => {
      active = false;
      renderTask?.cancel();
    };
  }, [document, page, width]);

  function jump(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = Number(pageInput);
    if (
      Number.isInteger(next) &&
      next >= 1 &&
      next <= (document?.numPages ?? 1202)
    )
      onPageChange(next);
  }
  return (
    <section
      className="pdf-reader"
      aria-label="Citizen’s Charter document viewer"
    >
      <div className="pdf-controls">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous PDF page"
        >
          <ChevronLeft size={19} aria-hidden="true" />
          <span>Previous</span>
        </button>
        <form onSubmit={jump}>
          <label htmlFor="pdf-page">PDF page</label>
          <input
            id="pdf-page"
            type="number"
            min={1}
            max={document?.numPages ?? 1202}
            step={1}
            required
            value={pageInput}
            onChange={event => setPageInput(event.target.value)}
          />
          <span>of {document?.numPages ?? 1202}</span>
          <button type="submit">Go</button>
        </form>
        <button
          type="button"
          disabled={page >= (document?.numPages ?? 1202)}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next PDF page"
        >
          <span>Next</span>
          <ChevronRight size={19} aria-hidden="true" />
        </button>
      </div>
      <p role="status" className="pdf-status">
        {error ||
          (busy
            ? `Loading PDF page ${page}…`
            : `PDF page ${page} of ${document?.numPages}`)}
      </p>
      <div className="pdf-canvas" ref={host} aria-busy={busy} />
      {!busy && !error && (
        <details className="pdf-text">
          <summary>Text version of this page</summary>
          <p className="reader-fallback">
            Extracted from the original PDF. Table columns may read out of
            order; our service guides summarize the selected procedures.
          </p>
          <pre>
            {text.trim() ||
              'This page has no extractable text. Use the visual page above or contact the responsible office.'}
          </pre>
        </details>
      )}
    </section>
  );
}
