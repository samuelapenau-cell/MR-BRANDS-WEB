import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const supabase = await createServerSupabaseClient();
    const { data: products } = await supabase
      .from("products")
      .select("name")
      .eq("slug", slug)
      .maybeSingle();
    if (products) {
      return { title: `${products.name} | MR.BRANDS Tienda` };
    }
  } catch {}
  return { title: "Producto | MR.BRANDS Tienda" };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  let name = "no encontrado";
  let price = 0;
  let images: string[] = [];

  try {
    const supabase = await createServerSupabaseClient();
    const { data } = await supabase
      .from("products")
      .select("*, category:categories(*), variants:product_variants(*)")
      .eq("slug", slug)
      .eq("active", true)
      .limit(1)
      .maybeSingle();
    if (data) {
      name = data.name;
      price = data.price;
      images = data.images || [];
    }
  } catch {}

  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-[1400px] mx-auto text-center py-24">
        <h1 className="font-display text-6xl text-offwhite">{name}</h1>
        <p className="text-gold text-2xl mt-4">${price.toFixed(2)}</p>
        <p className="text-offwhite/40 mt-2">{images.length} imagen(es)</p>
      </div>
    </div>
  );
}
