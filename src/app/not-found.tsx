'use client';

export default function NotFound() {
  const handleBack = () => {
    if (typeof window !== 'undefined') {
      // Client router framework ko unmapped memory loop se hatakar back bhejta hai
      window.history.back();
      
      setTimeout(() => {
        window.location.reload();
      }, 10);
    }
  };

  return (
    <div className="w-full h-screen bg-[#121212] flex flex-col items-center justify-center text-white select-none">
      <h2 className="text-4xl font-serif font-light tracking-wider text-[#D4AF37] uppercase mb-4">
        404 - Page Not Found
      </h2>
      <p className="text-sm text-white/60 mb-8 max-w-xs text-center font-sans font-light">
        The architectural design or space you are looking for does not exist.
      </p>
      <div className="flex gap-4">
        <button 
          onClick={() => { window.location.href = '/'; }}
          className="border border-white/20 px-6 py-2.5 rounded-full text-xs tracking-widest uppercase font-semibold hover:bg-white hover:text-[#121212] transition-all duration-300 cursor-pointer"
        >
          Return Home
        </button>
      </div>
    </div>
  );
}