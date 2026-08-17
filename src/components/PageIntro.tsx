interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <header className="max-w-3xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-civic-700">
        {eyebrow}
      </p>
      <h1 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
        {description}
      </p>
    </header>
  );
}
