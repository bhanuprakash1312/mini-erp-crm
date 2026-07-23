export default function Modal({ isOpen, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full p-6 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {children}
      </div>
    </div>
  );
}
