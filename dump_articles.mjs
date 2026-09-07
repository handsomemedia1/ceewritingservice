import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function main() {
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*');

  if (error) {
    console.error(error);
    return;
  }

  console.log('Found ' + posts.length + ' posts.');
  fs.writeFileSync('articles_dump.json', JSON.stringify(posts, null, 2));
}

main();
