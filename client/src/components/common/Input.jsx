export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full px-3 py-2 text-sm border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:border-brand-indigo transition-all disabled:opacity-50 disabled:bg-slate-50 ${className}`}
      {...props}
    />
  );
}
