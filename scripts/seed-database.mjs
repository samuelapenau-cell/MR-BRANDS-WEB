import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import readline from 'readline';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://uwfrzrmjhcggtkpvpyur.supabase.co';

async function askQuestion(query) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(query, (ans) => { rl.close(); resolve(ans); }));
}

async function main() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || await askQuestion('Enter your Supabase service_role key: ');
  if (!serviceRoleKey) {
    console.error('SUPABASE_SERVICE_ROLE_KEY is required.');
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  console.log('=== Seeding MR.BRANDS database ===\n');

  // 0. Create storage bucket
  console.log('Creating storage bucket...');
  try {
    const { data: existingBucket, error: listError } = await supabase.storage.getBucket('productos');
    if (!existingBucket) {
      const { error: createError } = await supabase.storage.createBucket('productos', { public: true });
      if (createError) throw createError;
      console.log('  Bucket "productos" created.');
    } else {
      console.log('  Bucket "productos" already exists.');
    }
  } catch (e) {
    console.log('  Could not create bucket (may already exist):', e.message);
  }

  // 1. Clear existing data
  console.log('\nClearing existing data...');
  await supabase.from('order_items').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('orders').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('product_variants').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('categories').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  console.log('  Done.');

  // 2. Categories
  console.log('\nInserting categories...');
  const { data: cats, error: catErr } = await supabase.from('categories').insert([
    { name: 'TODAS', slug: 'todas' },
    { name: 'SLIM-FIT', slug: 'slim-fit' },
    { name: 'PANTALONES', slug: 'pantalones' },
    { name: 'HOODIES CREWNECKS', slug: 'hoodies-crewnecks' },
    { name: 'FRANELAS BoxyFit', slug: 'franelas-boxyfit' },
    { name: 'FRANELAS OVERSIZE', slug: 'franelas-oversize' },
    { name: 'BERMUDAS', slug: 'bermudas' },
    { name: 'SHORTS', slug: 'shorts' },
    { name: 'GORRAS', slug: 'gorras' },
    { name: 'FIRTS ONE', slug: 'firts-one' },
  ]).select();
  if (catErr) { console.error('  Error:', catErr); process.exit(1); }
  const catMap = {};
  cats.forEach(c => catMap[c.slug] = c.id);
  console.log(`  Inserted ${cats.length} categories.`);

  // 3. Products - PANTALONES
  console.log('\nInserting PANTALONES products...');
  const pantalonesProducts = [
    { n: 'Baggy Brown Carpediem', s: 'baggy-brown-carpediem', d: 'Baggy color marrón. Corte holgado y cómodo.', p: 60.00, f: true },
    { n: 'Baggy Carpediem', s: 'baggy-carpediem', d: 'Baggy color azul. Estilo urbano Carpediem.', p: 60.00, f: true },
    { n: 'Baggy Jeam Carpediem Camuflado', s: 'baggy-jeam-carpediem-camuflado', d: 'Baggy jean camuflado Carpediem. Estilo militar.', p: 70.00, f: true },
    { n: 'Baggy REBUSS', s: 'baggy-rebuss-gris', d: 'Baggy REBUSS color gris. Corte amplio y moderno.', p: 60.00, f: false },
    { n: 'Baggy REBUSS (Azul Claro)', s: 'baggy-rebuss-azul-claro', d: 'Baggy REBUSS en azul claro. Fresco y versátil.', p: 60.00, f: false },
    { n: 'BAGGY REBUSS (NEGRO)', s: 'baggy-rebuss-negro', d: 'Baggy REBUSS color negro. Clásico e indispensable.', p: 60.00, f: true },
    { n: 'Baggy Track Pant Black', s: 'baggy-track-pant-black', d: 'Track pant baggy color negro. Estilo deportivo.', p: 60.00, f: false },
    { n: 'BootCut Carpediem', s: 'bootcut-carpediem', d: 'Bootcut Carpediem color negro. Corte acampanado.', p: 60.00, f: false },
    { n: 'Corte Recto Carpediem', s: 'corte-recto-carpediem', d: 'Pantalón corte recto Carpediem color azul.', p: 60.00, f: false },
    { n: 'Corte Recto REBUSS', s: 'corte-recto-rebuss', d: 'Corte recto REBUSS con acabado degradado azul.', p: 60.00, f: false },
    { n: 'Flared REBUSS', s: 'flared-rebuss-gris', d: 'Flared REBUSS color gris. Corte acampanado moderno.', p: 60.00, f: false },
    { n: 'Flared REBUSS (Negro)', s: 'flared-rebuss-negro', d: 'Flared REBUSS color negro. Estilo bold.', p: 60.00, f: false },
    { n: 'Mono FirtsOne', s: 'mono-firtsone', d: 'Mono FirtsOne color negro. Cómodo y práctico.', p: 40.00, f: false },
    { n: 'Pant Baggy Bordado Carpediem', s: 'pant-baggy-bordado-carpediem', d: 'Pant baggy bordado Carpediem color azul. Detalles bordados exclusivos.', p: 60.00, f: true },
    { n: 'Pant Burning', s: 'pant-burning-azul', d: 'Pant Burning color azul. Estilo llamativo.', p: 60.00, f: false },
    { n: 'Pant Burning (Azul Oscuro)', s: 'pant-burning-azul-oscuro', d: 'Pant Burning en azul oscuro.', p: 60.00, f: false },
    { n: 'Pant Burning (Azul Pre-Lavado)', s: 'pant-burning-azul-pre-lavado', d: 'Pant Burning azul con acabado pre-lavado.', p: 60.00, f: false },
    { n: 'Pant Burning (Negro)', s: 'pant-burning-negro', d: 'Pant Burning color negro.', p: 60.00, f: false },
    { n: 'Pant Burning (Negro con Detalles)', s: 'pant-burning-negro-detalles', d: 'Pant Burning negro con detalles especiales.', p: 60.00, f: false },
    { n: 'Pant Burning (Negro Pre-Lavado)', s: 'pant-burning-negro-pre-lavado', d: 'Pant Burning negro con acabado pre-lavado.', p: 60.00, f: false },
    { n: 'Pant Carpediem', s: 'pant-carpediem', d: 'Pant Carpediem color gris. Diseño clásico de la marca.', p: 60.00, f: true },
    { n: 'Pant Old Money Bari', s: 'pant-old-money-bari', d: 'Pant Old Money Bari color negro. Estilo elegante y sofisticado.', p: 45.00, f: true },
    { n: 'Pant Real Tree Camuflado Carpediem', s: 'pant-real-tree-camuflado-carpediem', d: 'Pant con estampado Real Tree camuflado Carpediem.', p: 50.00, f: false },
    { n: 'Pant SuperBaggy', s: 'pant-superbaggy', d: 'Pant SuperBaggy color negro. Corte ultra holgado.', p: 60.00, f: true },
    { n: 'Pantalon Super Baggy', s: 'pantalon-super-baggy', d: 'Pantalón super baggy color azul. Comodidad extrema.', p: 55.00, f: false },
  ];

  const pantalonesData = pantalonesProducts.map(pr => ({
    name: pr.n, slug: pr.s, description: pr.d, price: pr.p,
    category_id: catMap['pantalones'], images: [], featured: pr.f, active: true,
  }));

  const { data: pants, error: pantsErr } = await supabase.from('products').insert(pantalonesData).select();
  if (pantsErr) { console.error('  Error:', pantsErr); process.exit(1); }
  console.log(`  Inserted ${pants.length} pants products.`);

  // 4. Products - SLIM-FIT
  console.log('\nInserting SLIM-FIT products...');
  const slimFitProducts = [
    { n: 'Baby Tee Bari (Beige)', s: 'baby-tee-bari-beige', d: 'Baby Tee Bari color beige. Corte slim fit.', p: 25.00, f: true },
    { n: 'Baby Tee Bari (Blanca)', s: 'baby-tee-bari-blanca', d: 'Baby Tee Bari color blanco. Clásico y fresco.', p: 25.00, f: true },
    { n: 'Baby Tee Bari (Negra)', s: 'baby-tee-bari-negra', d: 'Baby Tee Bari color negro. Esencial en cualquier look.', p: 25.00, f: true },
    { n: 'Cold Culture Baby Tee (Blanco)', s: 'cold-culture-baby-tee-blanco', d: 'Cold Culture Baby Tee color blanco.', p: 22.00, f: false },
    { n: 'Cold Culture Baby Tee (Negro)', s: 'cold-culture-baby-tee-negro', d: 'Cold Culture Baby Tee color negro.', p: 22.00, f: false },
    { n: 'Slim Fit Unicolor Carpediem (Blanco)', s: 'slim-fit-unicolor-carpediem-blanco', d: 'Slim Fit unicolor Carpediem color blanco.', p: 24.00, f: false },
    { n: 'Slim Fit Unicolor Carpediem (Negro)', s: 'slim-fit-unicolor-carpediem-negro', d: 'Slim Fit unicolor Carpediem color negro.', p: 24.00, f: false },
  ];

  const slimFitData = slimFitProducts.map(pr => ({
    name: pr.n, slug: pr.s, description: pr.d, price: pr.p,
    category_id: catMap['slim-fit'], images: [], featured: pr.f, active: true,
  }));

  const { data: slims, error: slimErr } = await supabase.from('products').insert(slimFitData).select();
  if (slimErr) { console.error('  Error:', slimErr); process.exit(1); }
  console.log(`  Inserted ${slims.length} slim-fit products.`);

  // Build product slug → id map
  const allProducts = [...pants, ...slims];
  const prodMap = {};
  allProducts.forEach(p => prodMap[p.slug] = p);

  // 5. Variants
  console.log('\nInserting variants...');

  // Color mapping for each slug
  const colorMap = {
    'baggy-brown-carpediem': 'Marron',
    'baggy-carpediem': 'Azul',
    'baggy-jeam-carpediem-camuflado': 'Camuflado',
    'baggy-rebuss-gris': 'Gris',
    'baggy-rebuss-azul-claro': 'Azul Claro',
    'baggy-rebuss-negro': 'Negro',
    'baggy-track-pant-black': 'Negro',
    'bootcut-carpediem': 'Negro',
    'corte-recto-carpediem': 'Azul',
    'corte-recto-rebuss': 'Azul Degradado',
    'flared-rebuss-gris': 'Gris',
    'flared-rebuss-negro': 'Negro',
    'mono-firtsone': 'Negro',
    'pant-baggy-bordado-carpediem': 'Azul',
    'pant-burning-azul': 'Azul',
    'pant-burning-azul-oscuro': 'Azul Oscuro',
    'pant-burning-azul-pre-lavado': 'Azul Pre-Lavado',
    'pant-burning-negro': 'Negro',
    'pant-burning-negro-detalles': 'Negro con Detalles',
    'pant-burning-negro-pre-lavado': 'Negro Pre-Lavado',
    'pant-carpediem': 'Gris',
    'pant-old-money-bari': 'Negro',
    'pant-real-tree-camuflado-carpediem': 'Camuflajeado',
    'pant-superbaggy': 'Negro',
    'pantalon-super-baggy': 'Azul',
    'baby-tee-bari-beige': 'Beige',
    'baby-tee-bari-blanca': 'Blanca',
    'baby-tee-bari-negra': 'Negra',
    'cold-culture-baby-tee-blanco': 'Blanco',
    'cold-culture-baby-tee-negro': 'Negro',
    'slim-fit-unicolor-carpediem-blanco': 'Blanco',
    'slim-fit-unicolor-carpediem-negro': 'Negro',
  };

  // Sizes: baggy-carpediem = only 34,36; slim-fit = L,XL; rest = 28,30,32,34,36
  const STANDARD_SIZES = ['28','30','32','34','36'];
  const SLIM_SIZES = ['L','XL'];
  const SMALL_SIZES = ['34','36'];
  const SPECIAL = new Set(['baggy-carpediem']);

  let variantCount = 0;
  for (const [slug, color] of Object.entries(colorMap)) {
    const product = prodMap[slug];
    if (!product) { console.warn(`  ⚠ No product found for slug: ${slug}`); continue; }

    const sizes = SPECIAL.has(slug) ? SMALL_SIZES
                 : product.category_id === catMap['slim-fit'] ? SLIM_SIZES
                 : STANDARD_SIZES;

    const variants = sizes.map(size => ({
      product_id: product.id, size, color,
      stock: Math.floor(Math.random() * 20 + 3),
      sku: `${slug}-${color.toLowerCase().replace(/[^a-z0-9]/g, '')}-${size}`,
    }));

    const { error: vErr } = await supabase.from('product_variants').insert(variants);
    if (vErr) { console.error(`  Error inserting variants for ${slug}:`, vErr); continue; }
    variantCount += variants.length;
  }

  console.log(`  Inserted ${variantCount} variants.`);
  console.log('\n=== Seeding complete! ===');
  console.log(`Categories: ${cats.length}`);
  console.log(`Products: ${allProducts.length}`);
  console.log(`Variants: ${variantCount}`);
}

main().catch(console.error);
