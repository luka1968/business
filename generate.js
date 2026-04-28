const fs = require('fs');
const path = require('path');

const JSON_FILE = path.join(__dirname, 'content.json');
const TEMPLATE_FILE = path.join(__dirname, 'template.html');
const PAGES_DIR = path.join(__dirname, 'pages');
const BASE_URL = 'https://business.workfern.com';

function createDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function processKeywords() {
    createDir(PAGES_DIR);

    const templateContent = fs.readFileSync(TEMPLATE_FILE, 'utf-8');
    const jsonContent = fs.readFileSync(JSON_FILE, 'utf-8');
    const data = JSON.parse(jsonContent);

    const sitemapEntries = [];
    let count = 0;

    data.forEach(item => {
        const keyword = item.keyword;
        // Generate slug
        const slug = keyword.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        
        // Capitalize for Titles
        const keywordCapitalized = keyword.replace(/\b\w/g, l => l.toUpperCase());

        // Replace placeholders
        let finalHtml = templateContent
            .replace(/\{\{keyword\}\}/g, keyword)
            .replace(/\{\{keyword_capitalized\}\}/g, keywordCapitalized)
            .replace(/\{\{seo_p1\}\}/g, item.seo_p1 || '')
            .replace(/\{\{seo_p2\}\}/g, item.seo_p2 || '')
            .replace(/\{\{faq_1_q\}\}/g, item.faq_1_q || '')
            .replace(/\{\{faq_1_a\}\}/g, item.faq_1_a || '')
            .replace(/\{\{faq_2_q\}\}/g, item.faq_2_q || '')
            .replace(/\{\{faq_2_a\}\}/g, item.faq_2_a || '')
            .replace(/\{\{faq_3_q\}\}/g, item.faq_3_q || '')
            .replace(/\{\{faq_3_a\}\}/g, item.faq_3_a || '');

        // Define output directory
        const outputDir = path.join(PAGES_DIR, slug);
        createDir(outputDir);

        // Write HTML file
        fs.writeFileSync(path.join(outputDir, 'index.html'), finalHtml);

        // Add to sitemap
        sitemapEntries.push(`${BASE_URL}/pages/${slug}/index.html`);
        count++;
    });

    console.log(`Successfully generated ${count} unique SEO landing pages.`);

    // Generate simple text sitemap to append/submit
    const sitemapContent = sitemapEntries.join('\n');
    fs.writeFileSync(path.join(__dirname, 'sitemap-seo.txt'), sitemapContent);
    console.log('Created sitemap-seo.txt with all generated URLs.');
}

processKeywords();
