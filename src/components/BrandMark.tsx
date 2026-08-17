interface BrandMarkProps {
  className?: string;
}

export function BrandMark({ className = 'h-11 w-11' }: BrandMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 56 56"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="56" height="56" rx="16" fill="currentColor" />
      <path
        d="M17 13.5h15.2c7.2 0 11.5 3.7 11.5 9.4 0 3.4-1.7 6.1-4.7 7.6 3.8 1.4 6 4.6 6 8.7 0 6.5-4.9 10.3-12.5 10.3H17v-36Zm9.1 7.3v6.9h5.1c2.3 0 3.7-1.3 3.7-3.5s-1.4-3.4-3.7-3.4h-5.1Zm0 13.8v7.6h5.8c2.7 0 4.2-1.4 4.2-3.8s-1.5-3.8-4.2-3.8h-5.8Z"
        fill="white"
      />
      <circle cx="47" cy="13" r="4" fill="#74d4ff" />
    </svg>
  );
}
