import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-utils";

export async function GET() {
  const { user, errorResponse } = await requireAdmin();
  if (errorResponse) return errorResponse;

  const supabase = await createServerSupabaseClient();

  const { count: totalProducts } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  const { count: totalOrders } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true });

  const { data: lowStockVariants } = await supabase
    .from("product_variants")
    .select("id, product:products(id, name)")
    .lt("stock", 5);

  const lowStockCount = lowStockVariants?.length || 0;

  const firstOfMonth = new Date();
  firstOfMonth.setDate(1);
  firstOfMonth.setHours(0, 0, 0, 0);

  const { data: monthlyOrders } = await supabase
    .from("orders")
    .select("total")
    .gte("created_at", firstOfMonth.toISOString())
    .in("status", ["confirmed", "shipped", "delivered"]);

  const monthlyRevenue = monthlyOrders?.reduce((sum, o) => sum + Number(o.total), 0) || 0;

  const { data: recentOrders } = await supabase
    .from("orders")
    .select("*, items:order_items(*)")
    .order("created_at", { ascending: false })
    .limit(5);

  return NextResponse.json({
    totalProducts: totalProducts || 0,
    totalOrders: totalOrders || 0,
    monthlyRevenue,
    lowStockCount,
    recentOrders: recentOrders || [],
  });
}
