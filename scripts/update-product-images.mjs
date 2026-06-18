import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://uwfrzrmjhcggtkpvpyur.supabase.co';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SERVICE_ROLE_KEY) {
  console.error('Set SUPABASE_SERVICE_ROLE_KEY env var');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const sqlFile = resolve(__dirname, '..', 'supabase', 'update-images.sql');
const sql = readFileSync(sqlFile, 'utf-8');
const statements = sql.split('\n').filter(l => l.trim());

console.log(`Parsed ${statements.length} update statements...`);

let ok = 0, fail = 0;
for (const stmt of statements) {
  // Parse: update products set images = array['...'] where slug = '...';
  const match = stmt.match(/where slug = '([^']+)'/);
  if (!match) { fail++; continue; }
  const slug = match[1];

  // Extract URLs
  const urls = [...stmt.matchAll(/'https?:\/\/[^']+'/g)].map(m => m[0].replace(/'/g, ''));
  if (urls.length === 0) { fail++; continue; }

  const { error } = await supabase.from('products').update({ images: urls }).eq('slug', slug);
  if (error) {
    console.error(`  FAIL: ${slug} - ${error.message}`);
    fail++;
  } else {
    console.log(`  OK:   ${slug} (${urls.length} images)`);
    ok++;
  }
}

console.log(`\nDone: ${ok} updated, ${fail} failed`);
