import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const PUBLIC_DIR = path.resolve(__dirname, '../public');

const ROUTES = [
  {
    path: '/about',
    file: 'about.html',
    title: 'About Us | VBL Law Chambers — 25+ Years Legal Practice Kavali',
    description: 'Founded in 1999, VBL Law Chambers provides dedicated legal advocacy, property scrutiny, and notary services in Kavali, SPSR Nellore District, Andhra Pradesh.',
  },
  {
    path: '/practice-areas',
    file: 'practice-areas.html',
    title: 'Legal Practice Areas | VBL Law Chambers | Kavali, Nellore',
    description: 'Comprehensive legal services in Civil, Criminal, Family Law, Will Drafting, Property Verification, Motor Accident Claims (MACT), and Notary Attestations.',
  },
  {
    path: '/attorneys',
    file: 'attorneys.html',
    title: 'Our Advocates & Legal Team | VBL Law Chambers | Kavali',
    description: 'Led by Advocate & Notary Smt. V. Bhagya Lakshmi (B.Sc., B.L.) with 25+ years courtroom experience across Nellore district and High Court of Andhra Pradesh.',
  },
  {
    path: '/will-submission',
    file: 'will-submission.html',
    title: 'Online Will Submission & Testamentary Planning | VBL Law Chambers',
    description: 'Confidential online will submission, testament scrutiny, codicil drafting, and estate planning with authorized Advocates & Notaries in Kavali, AP.',
  },
  {
    path: '/contact',
    file: 'contact.html',
    title: 'Contact VBL Law Chambers | Kavali, SPSR Nellore District',
    description: 'Schedule a confidential legal consultation with VBL Law Chambers at Brndavanam Colony, Kavali, SPSR Nellore Dist., Andhra Pradesh.',
  },
];

function generatePrerender() {
  const templatePath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('dist/index.html not found. Run vite build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(templatePath, 'utf-8');

  ROUTES.forEach((route) => {
    let html = baseHtml;

    // Replace Title
    html = html.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);

    // Replace Meta Description
    html = html.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
      `<meta name="description" content="${route.description}" />`
    );

    // Replace Canonical Link
    html = html.replace(
      /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
      `<link rel="canonical" href="https://vbllawchambers.com${route.path}" />`
    );

    // Replace OpenGraph Title & URL
    html = html.replace(
      /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:title" content="${route.title}" />`
    );
    html = html.replace(
      /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:url" content="https://vbllawchambers.com${route.path}" />`
    );
    html = html.replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:description" content="${route.description}" />`
    );

    // Replace Twitter Card Title & Description
    html = html.replace(
      /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:title" content="${route.title}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:description" content="${route.description}" />`
    );

    // Save to dist/
    fs.writeFileSync(path.join(DIST_DIR, route.file), html, 'utf-8');
    console.log(`Generated dist/${route.file} for ${route.path}`);
  });

  console.log('✅ Per-route static HTML pre-rendering completed.');
}

generatePrerender();
