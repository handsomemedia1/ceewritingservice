import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tsyiylazielwbelfzsqo.supabase.co';
const supabaseKey = 'sb_publishable_MoTvPzdwdjsAWLH8wxbzxw_zdauAXzh';
const supabase = createClient(supabaseUrl, supabaseKey);

async function performUnifiedSearch(query) {
  const lowerQuery = query.toLowerCase();
  const searchPattern = `%${lowerQuery}%`;

  const { data: categories, error: categoriesError } = await supabase.from('categories').select('id, title');
  if (categoriesError) {
    console.error('SearchEngine categories error:', categoriesError);
  }
  const catMap = new Map(categories?.map(c => [c.id, c.title]) || []);

  const [blogRes, servicesRes, packagesRes] = await Promise.all([
    supabase
      .from('blog_posts')
      .select('id, title, meta_description, slug, published_at, tags, content')
      .eq('status', 'published')
      .or(`title.ilike.${searchPattern},meta_description.ilike.${searchPattern},content.ilike.${searchPattern}`)
      .limit(30),
      
    supabase
      .from('services')
      .select('id, name, desc_text, slug, category_id')
      .or(`name.ilike.${searchPattern},desc_text.ilike.${searchPattern}`)
      .limit(30),

    supabase
      .from('packages')
      .select('id, name, desc_text')
      .or(`name.ilike.${searchPattern},desc_text.ilike.${searchPattern}`)
      .limit(30)
  ]);

  if (blogRes.error) console.error('SearchEngine blog error:', blogRes.error);
  if (servicesRes.error) console.error('SearchEngine services error:', servicesRes.error);
  if (packagesRes.error) console.error('SearchEngine packages error:', packagesRes.error);

  const results = [];

  const calculateScore = (exactTitle, exactDesc, content = '', tagsArray = [], categoryName = '') => {
    let score = 0;
    const t = exactTitle.toLowerCase();
    const d = exactDesc.toLowerCase();
    const c = content.toLowerCase();
    
    if (t === lowerQuery) score += 100;
    else if (t.includes(lowerQuery)) score += 50;
    
    if (d.includes(lowerQuery) || c.includes(lowerQuery)) score += 20;
    
    if (categoryName.toLowerCase().includes(lowerQuery)) score += 10;
    
    if (tagsArray.some(tag => tag.toLowerCase().includes(lowerQuery))) score += 10;

    return score;
  };

  if (blogRes.data) {
    blogRes.data.forEach(post => {
      const matchesText = post.title.toLowerCase().includes(lowerQuery) || 
                          (post.meta_description && post.meta_description.toLowerCase().includes(lowerQuery)) ||
                          (post.content && post.content.toLowerCase().includes(lowerQuery));
      const matchesTag = post.tags && post.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
      
      if (!matchesText && !matchesTag) return;

      const score = calculateScore(post.title, post.meta_description || '', post.content || '', post.tags || [], '');
      
      results.push({
        id: post.id,
        type: 'Knowledge Hub',
        title: post.title,
        url: `/blog/${post.slug}`,
        _score: score
      });
    });
  }

  if (servicesRes.data) {
    servicesRes.data.forEach(service => {
      const catName = catMap.get(service.category_id) || 'Service';
      const score = calculateScore(service.name, service.desc_text || '', '', [], catName);

      results.push({
        id: service.id,
        type: 'Services',
        title: service.name,
        url: service.slug ? `/services/${service.slug}` : `/services`,
        _score: score
      });
    });
  }

  if (packagesRes.data) {
    packagesRes.data.forEach(pkg => {
      const score = calculateScore(pkg.name, pkg.desc_text || '', '', [], '');
      results.push({
        id: pkg.id,
        type: 'Packages',
        title: pkg.name,
        url: `/#packages`,
        _score: score
      });
    });
  }

  results.sort((a, b) => {
    if (b._score !== a._score) {
      return b._score - a._score;
    }
    return a.title.localeCompare(b.title);
  });

  return results.map(({ _score, ...rest }) => ({ title: rest.title, url: rest.url, type: rest.type, _score }));
}

async function run() {
  const queries = [
    "How to Write a Literature Review That Gets Published"
  ];

  for (const q of queries) {
    if (!q) {
      console.log(`Query: "" | Results: 0`);
      continue;
    }
    const res = await performUnifiedSearch(q);
    console.log(`Query: "${q}" | Results: ${res.length}`);
    res.slice(0, 5).forEach((r, i) => {
      console.log(`  ${i+1}. [${r.type}] ${r.title} (Score: ${r._score}) -> ${r.url}`);
    });
  }
}
run();
