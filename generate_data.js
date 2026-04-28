const fs = require('fs');
const path = require('path');

const categories = [
  "Instant Data Scraper alternative",
  "Free data scraper tools",
  "Lead extraction software no login",
  "Local business lead extractor tool",
  "Business contact data scraper"
];

const industries = [
  "Real Estate", "Marketing Agencies", "Dentists", "Plumbers", "Roofers",
  "B2B Sales", "Software Companies", "Accountants", "Financial Advisors", "Auto Repair Shops",
  "Law Firms", "Construction", "HVAC", "Cleaning Services", "Restaurants",
  "Gyms", "Chiropractors", "Landscaping", "Electricians", "Pest Control"
];

const modifiers = [
  "Best", "Fast", "Top", "Easy", "Free",
  "Automated", "Cloud-based", "Advanced", "Ultimate", "Simple"
];

const data = [];

// Helper to slightly randomize templates
const seoP1Templates = [
  "When searching for the {modifier} {category} tailored specifically for {industry}, speed and accuracy are paramount. Teams cannot rely on stale databases or generic scraping extensions.",
  "Finding a reliable {modifier} {category} is crucial for professionals in {industry}. The ability to quickly pull accurate data directly impacts your bottom line.",
  "For experts in {industry}, using a {modifier} {category} eliminates the steep learning curve of traditional data mining, allowing you to focus purely on lead generation."
];

const seoP2Templates = [
  "Our platform provides exactly what {industry} professionals need: highly targeted, structured contact data directly from major directories without technical overhead.",
  "We have designed this solution to help {industry} businesses scale their outreach. It effortlessly bypasses complex anti-bot measures to deliver pristine data.",
  "Whether you are targeting local neighborhoods or nationwide leads, this tool generates structured lists for {industry} campaigns instantly in your browser."
];

function getRandomTemplate(templates) {
  return templates[Math.floor(Math.random() * templates.length)];
}

categories.forEach(category => {
  industries.forEach(industry => {
    modifiers.forEach(modifier => {
      
      const keyword = `${modifier} ${category} for ${industry}`;
      
      const p1Raw = getRandomTemplate(seoP1Templates);
      const p2Raw = getRandomTemplate(seoP2Templates);
      
      const seo_p1 = p1Raw.replace('{modifier}', modifier.toLowerCase()).replace('{category}', category).replace('{industry}', industry);
      const seo_p2 = p2Raw.replace('{industry}', industry);

      const faq_1_q = `Why is this the ${modifier.toLowerCase()} ${category} for ${industry}?`;
      const faq_1_a = `It is specifically optimized to extract highly relevant, structured B2B contact data for ${industry} instantly, bypassing the need for complex CSS setups.`;

      const faq_2_q = `How do I extract ${industry} leads with no login required?`;
      const faq_2_a = `Simply enter your target ${industry} niche and location into our search bar. The tool works locally in your browser to pull leads immediately.`;

      const faq_3_q = `Are there ${modifier.toLowerCase()} alternatives for ${industry} lead generation?`;
      const faq_3_a = `Yes, our platform acts as a premier alternative, allowing you to sample highly targeted contact lists instantly without installing clunky extensions.`;

      data.push({
        keyword,
        seo_p1,
        seo_p2,
        faq_1_q,
        faq_1_a,
        faq_2_q,
        faq_2_a,
        faq_3_q,
        faq_3_a
      });
      
    });
  });
});

const outputPath = path.join(__dirname, 'content.json');
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

console.log(`Successfully generated ${data.length} unique data objects in content.json!`);
