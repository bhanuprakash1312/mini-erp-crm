export default function Button({ children, type = 'button', className = "", variant = "primary", ...props }) {
  const baseStyle = "px-4 py-2 text-sm font-semibold rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
  
  const variants = {
    primary: "bg-brand-indigo hover:bg-brand-indigo-dark text-white focus:ring-brand-indigo",
    secondary: "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 focus:ring-slate-500",
    danger: "bg-brand-rose hover:bg-red-700 text-white focus:ring-brand-rose",
    success: "bg-brand-emerald hover:bg-emerald-750 text-white focus:ring-brand-emerald"
  };

  return (
    <button
      type={type}
      className={`${baseStyle} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
