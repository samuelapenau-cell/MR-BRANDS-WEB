export default function ProductLoading() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="h-4 w-64 skeleton-pulse rounded-sm mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="aspect-[4/5] skeleton-pulse rounded-sm" />
          <div className="space-y-4">
            <div className="h-4 w-24 skeleton-pulse rounded-sm" />
            <div className="h-12 w-3/4 skeleton-pulse rounded-sm" />
            <div className="h-8 w-32 skeleton-pulse rounded-sm" />
            <div className="h-20 w-full skeleton-pulse rounded-sm" />
            <div className="flex gap-2 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full skeleton-pulse" />
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 w-16 skeleton-pulse rounded-sm" />
              ))}
            </div>
            <div className="h-14 w-full skeleton-pulse rounded-sm mt-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
