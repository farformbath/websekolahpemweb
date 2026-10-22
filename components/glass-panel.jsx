// Komponen Glass Panel bergaya macOS Tahoe
export default function GlassPanel({
  children,
  className = "",
  elevated = false,
  as: Component = "div",
  ...props
}) {
  const baseClass = elevated ? "glass-panel-elevated" : "glass-panel";
  return (
    <Component
      className={`rounded-3xl p-6 md:p-8 ${baseClass} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
