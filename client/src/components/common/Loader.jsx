export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-slate-200 border-t-brand-indigo"></div>
      <p className="mt-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Loading...</p>
    </div>
  );
}
