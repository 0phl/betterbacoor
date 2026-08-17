interface BrandMarkProps {
  className?: string;
}

export function BrandMark({ className = 'h-11 w-11' }: BrandMarkProps) {
  return (
    <img
      src="/logo-mark.svg"
      alt=""
      aria-hidden="true"
      className={`${className} object-contain`}
      draggable={false}
      width="512"
      height="479"
    />
  );
}
