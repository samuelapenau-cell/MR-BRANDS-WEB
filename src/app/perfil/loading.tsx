export default function PerfilLoading() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-10">
          <div className="h-4 w-16 skeleton-pulse rounded-sm" />
          <div className="mt-2 h-12 w-48 skeleton-pulse rounded-sm" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="p-6 bg-surface-light border border-border rounded-sm space-y-4">
              <div className="w-16 h-16 rounded-full skeleton-pulse" />
              <div className="h-6 w-32 skeleton-pulse rounded-sm" />
              <div className="h-4 w-48 skeleton-pulse rounded-sm" />
            </div>
          </div>
          <div className="md:col-span-2 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 skeleton-pulse rounded-sm" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
