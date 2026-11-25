export default function SkeletonCard() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white/5 p-3 animate-pulse border border-white/5">
      <div className="aspect-[2/3] w-full rounded-xl bg-slate-800" />
      <div className="flex items-center justify-between">
        <div className="h-4 w-2/3 rounded bg-slate-800" />
        <div className="h-4 w-1/4 rounded bg-slate-800" />
      </div>
      <div className="h-3 w-1/2 rounded bg-slate-800/60" />
    </div>
  );
}