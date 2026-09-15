import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkArticles() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug, title')
    .in('slug', [
      'analyse-survey-data-python-likert-scale',
      'python-regression-analysis-research-data',
      'test-normality-spss'
    ]);

  if (error) {
    console.error('Error fetching articles:', error);
  } else {
    console.log('Found articles:', data.length);
    if (data.length > 0) {
      console.log('Articles exist in Supabase.');
    } else {
      console.log('Articles DO NOT exist in Supabase.');
    }
  }
}

checkArticles();
