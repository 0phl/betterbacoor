interface BrandMarkProps {
  className?: string;
}

export function BrandMark({ className = 'h-11 w-11' }: BrandMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="2" width="60" height="60" rx="16" fill="#1746B8" />
      <path
        fill="#FFFFFF"
        d="M15 10h18.2C43.1 10 49 14.6 49 22.2c0 4.6-2.4 8-6.7 10 5.2 1.9 8.2 6 8.2 11.8 0 8-6.8 12-16.9 12H15V10Z"
      />
      <path
        d="M27 21.5h9M27 21.5v22h9"
        fill="none"
        stroke="#102A56"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4.5"
      />
      <circle cx="37" cy="21.5" r="5.25" fill="#102A56" />
      <circle cx="37" cy="21.5" r="2.5" fill="#62D0FF" />
      <circle cx="37" cy="43.5" r="5.25" fill="#102A56" />
      <circle cx="37" cy="43.5" r="2.5" fill="#62D0FF" />
    </svg>
  );
}
