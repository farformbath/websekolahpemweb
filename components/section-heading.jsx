export default function SectionHeading({
  badge,
  title,
  subtitle,
  centered = true,
  className = "",
}) {
  return (
    <div
      className={`mb-10 md:mb-14 ${
        centered ? "text-center mx-auto max-w-2xl" : "max-w-2xl"
      } ${className}`}
    >
      {badge && (
        <div
          className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-[#0B66E8]/10 text-[#0B66E8] border border-[#0B66E8]/20 mb-3.5 backdrop-blur-md ${
            centered ? "mx-auto" : ""
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#0B66E8]" />
          {badge}
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0F274A]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base text-[#5D7392] leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
