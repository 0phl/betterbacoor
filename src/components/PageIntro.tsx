interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <header className="max-w-3xl">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
        {title}
      </h1>
      <p className="mt-5 text-lg leading-8 text-slate-650">{description}</p>
    </header>
  );
}
