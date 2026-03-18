import { NextResponse } from 'next/server';
import axios from 'axios';

/**
 * Search MDN Web Docs using their public search API
 * Returns real article URLs – no verification needed
 */
async function searchMDN(query: string): Promise<any[]> {
  try {
    const url = `https://developer.mozilla.org/api/v1/search?q=${encodeURIComponent(query)}&locale=en-US&size=4`;
    const response = await axios.get(url, {
      timeout: 8000,
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });

    const documents = response.data?.documents || [];
    return documents.map((doc: any) => ({
      title: doc.title || '',
      link: `https://developer.mozilla.org${doc.mdn_url}`,
      snippet: (doc.summary || '').replace(/<[^>]*>/g, '').substring(0, 200),
      source: 'MDN Web Docs',
    }));
  } catch (err: any) {
    console.log('[search-materials] MDN search failed:', err.message);
    return [];
  }
}

/**
 * Search Wikipedia using their public search API
 * Returns real article URLs – no verification needed
 */
async function searchWikipedia(query: string): Promise<any[]> {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query + ' programming')}&srnamespace=0&srlimit=4&format=json&origin=*`;
    const response = await axios.get(url, {
      timeout: 8000,
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });

    const results = response.data?.query?.search || [];
    return results.map((item: any) => ({
      title: item.title || '',
      link: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title.replace(/ /g, '_'))}`,
      snippet: (item.snippet || '').replace(/<[^>]*>/g, '').substring(0, 200),
      source: 'Wikipedia',
    }));
  } catch (err: any) {
    console.log('[search-materials] Wikipedia search failed:', err.message);
    return [];
  }
}

/**
 * Search W3Schools using known URL patterns + HEAD verification
 * W3Schools returns proper 404 for non-existent pages
 */
async function searchW3Schools(query: string): Promise<any[]> {
  const w3Section = getW3Section(query);
  const slug = query.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().replace(/\s+/g, '_');

  const candidates = [
    `https://www.w3schools.com/${w3Section}/${w3Section}_${slug}.asp`,
    `https://www.w3schools.com/${w3Section}/${slug}.asp`,
    `https://www.w3schools.com/${w3Section}/default.asp`,
  ];

  const results: any[] = [];

  // Verify in parallel (W3Schools returns proper 404 for fake pages)
  const checks = await Promise.all(
    candidates.map(async (url) => {
      try {
        const r = await axios.head(url, {
          timeout: 5000,
          maxRedirects: 3,
          validateStatus: () => true,
          headers: { 'User-Agent': 'Mozilla/5.0' },
        });
        return { url, exists: r.status >= 200 && r.status < 400 };
      } catch {
        return { url, exists: false };
      }
    })
  );

  for (const { url, exists } of checks) {
    if (exists) {
      const pageName = url.split('/').pop()?.replace('.asp', '').replace(/_/g, ' ') || query;
      results.push({
        title: `${capitalize(pageName)} – W3Schools`,
        link: url,
        snippet: `Interactive tutorial with try-it-yourself examples on W3Schools.`,
        source: 'W3Schools',
      });
      break; // Take only the first valid one
    }
  }

  return results;
}

function capitalize(str: string): string {
  return str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q');

    if (!q) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    console.log(`[search-materials] Searching for: "${q}"`);

    // Run all three searches in parallel – all use real APIs, no hallucinated URLs
    const [mdnResults, wikiResults, w3Results] = await Promise.all([
      searchMDN(q),
      searchWikipedia(q),
      searchW3Schools(q),
    ]);

    console.log(`[search-materials] Found: MDN=${mdnResults.length}, Wiki=${wikiResults.length}, W3S=${w3Results.length}`);

    // Combine: MDN first (best for programming), then W3Schools, then Wikipedia
    const allResults = [...mdnResults, ...w3Results, ...wikiResults];

    // De-duplicate by link
    const seen = new Set<string>();
    const unique = allResults.filter((m) => {
      if (seen.has(m.link)) return false;
      seen.add(m.link);
      return true;
    });

    if (unique.length > 0) {
      return NextResponse.json(unique.slice(0, 8));
    }

    // Fallback: return direct links to known-good section pages
    const w3Section = getW3Section(q);
    return NextResponse.json([
      {
        title: `Search "${q}" – MDN Web Docs`,
        link: `https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(q)}`,
        snippet: `Search MDN Web Docs for ${q} tutorials and references.`,
        source: 'MDN Web Docs',
      },
      {
        title: `${capitalize(q)} – W3Schools`,
        link: `https://www.w3schools.com/${w3Section}/default.asp`,
        snippet: `Learn ${q} with interactive examples on W3Schools.`,
        source: 'W3Schools',
      },
      {
        title: `${q} – Wikipedia`,
        link: `https://en.wikipedia.org/wiki/${encodeURIComponent(q.replace(/ /g, '_'))}`,
        snippet: `Read about ${q} on Wikipedia.`,
        source: 'Wikipedia',
      },
    ]);
  } catch (topLevelError: any) {
    console.error('[search-materials] Fatal error:', topLevelError);
    return NextResponse.json(
      { error: topLevelError.toString() },
      { status: 500 }
    );
  }
}

/**
 * Maps programming topics to W3Schools section paths
 */
function getW3Section(query: string): string {
  const q = query.toLowerCase();
  const mapping: Record<string, string> = {
    javascript: 'js', js: 'js', typescript: 'typescript',
    python: 'python', java: 'java', 'c++': 'cpp', cpp: 'cpp',
    'c#': 'cs', csharp: 'cs', html: 'html', css: 'css',
    sql: 'sql', mysql: 'mysql', php: 'php', react: 'react',
    angular: 'angular', vue: 'vue', node: 'nodejs', nodejs: 'nodejs',
    bootstrap: 'bootstrap', jquery: 'jquery', xml: 'xml',
    json: 'js', kotlin: 'kotlin', rust: 'rust', go: 'go',
    r: 'r', django: 'django', git: 'git', mongodb: 'mongodb',
    pandas: 'python', numpy: 'python',
  };

  for (const [key, section] of Object.entries(mapping)) {
    if (q.startsWith(key) || q.includes(key)) {
      return section;
    }
  }

  return 'python';
}