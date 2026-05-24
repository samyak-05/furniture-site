// Loading.tsx
export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/40 dark:bg-black/40 backdrop-blur-md p-4">
      <div className="flex flex-col items-center gap-4 text-center">
        {/* Minimal Spinner Circle */}
        <div className="relative w-12 h-12">
          {/* Inner static accent ring */}
          <div className="absolute inset-0 rounded-full border-[3px] border-black/[0.04] dark:border-white/[0.04]" />
          {/* Outer active spinning ring */}
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#2A3439] dark:border-t-white animate-spin" />
        </div>

        {/* Minimalist Message Text */}
        <div className="space-y-1">
          <p className="text-xs font-black uppercase tracking-widest text-[#2A3439] dark:text-gray-200">
            Uploading Assets
          </p>
          <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500">
            Please keep this window open
          </p>
        </div>
      </div>
    </div>
  );
}