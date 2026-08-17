interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <header className="max-w-4xl border-b border-slate-300 pb-9">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-civic-700">
        {eyebrow}
      </p>
      <h1 className="mt-4 text-4xl font-black leading-tight tracking-[-0.045em] text-slate-950 sm:text-6xl">
        {title}
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
        {description}
      </p>
    </header>
  );
}
