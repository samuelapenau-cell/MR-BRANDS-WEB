"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

type DashboardStats = {
  totalProducts: number;
  totalOrders: number;
  monthlyRevenue: number;
  lowStockCount: number;
  recentOrders: any[];
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadStats = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data);
    } catch {} finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { loadStats(); }, [loadStats]);

  const refresh = () => {
    setRefreshing(true);
    loadStats();
  };

  const statCards = [
    { label: "Productos", value: stats?.totalProducts ?? "--", href: "/admin/productos" },
    { label: "Ordenes", value: stats?.totalOrders ?? "--", href: "/admin/ordenes" },
    {
      label: "Ingresos (mes)",
      value: stats ? `$${Number(stats.monthlyRevenue).toFixed(2)}` : "--",
      href: "/admin/ordenes",
    },
    {
      label: "Stock bajo",
      value: stats?.lowStockCount ?? "--",
      href: "/admin/inventario",
      warn: (stats?.lowStockCount ?? 0) > 0,
    },
  ];

  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[2.5px] text-gold">Admin</span>
            <h1 className="mt-2 font-display text-4xl md:text-5xl text-offwhite tracking-[2px]">
              Panel de <span className="text-gold">Control</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={refresh}
              disabled={refreshing}
              className="text-[10px] font-mono uppercase tracking-[1.5px] text-offwhite/30 hover:text-offwhite/60 transition-colors disabled:opacity-30"
            >
              {refreshing ? "Actualizando..." : "↻ Actualizar"}
            </button>
            <Link
              href="/"
              className="text-xs font-mono uppercase tracking-[1.5px] text-offwhite/30 hover:text-offwhite/60 transition-colors"
            >
              Ver tienda →
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-6 bg-surface-light border border-border rounded-sm">
                <div className="h-8 w-20 skeleton-pulse rounded" />
                <div className="h-3 w-24 skeleton-pulse rounded mt-3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {statCards.map((stat) => (
              <Link
                key={stat.label}
                href={stat.href}
                className={`p-6 bg-surface-light border rounded-sm transition-all group ${
                  stat.warn ? "border-accent/40" : "border-border hover:border-gold/30"
                }`}
              >
                <p className="font-display text-3xl md:text-4xl text-gold tracking-[1px]">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs text-offwhite/40 font-mono uppercase tracking-[1.5px]">
                  {stat.label}
                </p>
              </Link>
            ))}
          </div>
        )}

        <div className="bg-surface-light border border-border rounded-sm overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="font-display text-xl text-offwhite tracking-[1px]">Ordenes Recientes</h2>
            <Link
              href="/admin/ordenes"
              className="text-xs font-mono uppercase tracking-[1.5px] text-gold hover:text-gold-light transition-colors"
            >
              Ver todas →
            </Link>
          </div>
          {loading ? (
            <div className="p-8 text-center text-offwhite/30 text-sm">Cargando...</div>
          ) : stats?.recentOrders && stats.recentOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-[10px] font-mono uppercase tracking-[1.5px] text-offwhite/30">
                    <th className="p-4 font-normal">Cliente</th>
                    <th className="p-4 font-normal">Total</th>
                    <th className="p-4 font-normal">Estado</th>
                    <th className="p-4 font-normal">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map((order: any) => (
                    <tr key={order.id} className="border-b border-border/50 last:border-0">
                      <td className="p-4 text-offwhite/70">{order.customer_name}</td>
                      <td className="p-4 text-offwhite/70">${Number(order.total).toFixed(2)}</td>
                      <td className="p-4">
                        <span
                          className={`text-[10px] font-mono uppercase tracking-[1px] px-2 py-1 rounded-sm ${
                            order.status === "pending"
                              ? "bg-yellow-500/10 text-yellow-400"
                              : order.status === "confirmed"
                                ? "bg-blue-500/10 text-blue-400"
                                : order.status === "shipped"
                                  ? "bg-purple-500/10 text-purple-400"
                                  : order.status === "delivered"
                                    ? "bg-green-500/10 text-green-400"
                                    : "bg-red-500/10 text-red-400"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 text-offwhite/40 text-xs">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-offwhite/30 text-sm">No hay ordenes recientes</div>
          )}
        </div>
      </div>
    </div>
  );
}
