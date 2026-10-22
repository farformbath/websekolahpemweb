import Link from "next/link";

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B66E8] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 rounded-full gap-1.5",
    md: "text-sm px-5 py-2.5 rounded-full gap-2",
    lg: "text-base px-6 py-3 rounded-full gap-2.5 font-semibold",
  };

  const variantStyles = {
    primary:
      "bg-[#0B66E8] hover:bg-[#0757C9] text-white shadow-md shadow-[#0B66E8]/25 hover:shadow-lg hover:shadow-[#0B66E8]/35 active:scale-[0.98]",
    secondary:
      "bg-white/80 hover:bg-white text-[#0F274A] border border-white/80 shadow-sm hover:shadow active:scale-[0.98]",
    glass:
      "bg-white/60 hover:bg-white/80 text-[#0F274A] border border-white/80 backdrop-blur-md shadow-sm hover:shadow active:scale-[0.98]",
    gold:
      "bg-[#F6C744] hover:bg-[#E5B533] text-[#0F274A] font-semibold shadow-md shadow-[#F6C744]/30 hover:shadow-lg active:scale-[0.98]",
    outline:
      "border border-[#0B66E8]/30 hover:border-[#0B66E8] text-[#0B66E8] hover:bg-[#0B66E8]/5 active:scale-[0.98]",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
    variantStyles[variant] || variantStyles.primary
  } ${className}`;

  if (href) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
