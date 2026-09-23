#!/usr/bin/env node
// Builds the static SiteResolve website from src/ into dist/. No dependencies.
//
// Page files (src/pages/*.html) start with a metadata comment:
//   <!-- @meta {"title": "...", "description": "...", "nav": "product"} -->
// Template syntax available in pages and partials:
//   {{> name}}          include src/partials/name.html
//   {{icon:name}}       inline SVG icon from scripts/icons.mjs ({{icon:name:extra-class}} adds a class)
//   {{base}}            "" for normal pages, "/" for pages that are served at any path (404)
//   {{year}}            current year
// Bracketed placeholders in text, such as [LEGAL ENTITY NAME], are wrapped in <span class="var">.
//
// Usage: node scripts/build.mjs [--check]

import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync, cpSync, existsSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { icons } from './icons.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'src');
const out = join(root, 'dist');
const config = JSON.parse(readFileSync(join(src, 'site.config.json'), 'utf8'));
const siteUrl = String(config.siteUrl || '').replace(/\/+$/, '');
const year = String(new Date().getFullYear());

const escapeAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function partial(name, depth = 0) {
  if (depth > 10) throw new Error(`Partial recursion too deep at ${name}`);
  const file = join(src, 'partials', `${name}.html`);
  if (!existsSync(file)) throw new Error(`Missing partial: ${name}`);
  return expandIncludes(readFileSync(file, 'utf8'), depth + 1);
}

function expandIncludes(html, depth = 0) {
  return html.replace(/\{\{>\s*([\w-]+)\s*\}\}/g, (_, name) => partial(name, depth));
}

function renderIcons(html) {
  return html.replace(/\{\{icon:([\w-]+)(?::([\w -]+))?\}\}/g, (_, name, extra) => {
    if (!icons[name]) throw new Error(`Unknown icon: ${name}`);
    const cls = extra ? `ic ${extra}` : 'ic';
    return `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${icons[name]}"/></svg>`;
  });
}

// Wrap [PLACEHOLDER] text (not attributes) so unfinished values stay visible.
function markPlaceholders(html) {
  return html.replace(/>([^<]+)</g, (m, text) => {
    if (!text.includes('[')) return m;
    return '>' + text.replace(/\[([A-Z][^\]<>]*)\]/g, '<span class="var">[$1]</span>') + '<';
  });
}

function build() {
  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });
  cpSync(join(src, 'assets'), join(out, 'assets'), { recursive: true });

  const layout = readFileSync(join(src, 'partials', 'layout.html'), 'utf8');
  const pages = readdirSync(join(src, 'pages')).filter((f) => f.endsWith('.html')).sort();
  const sitemap = [];

  for (const file of pages) {
    const raw = readFileSync(join(src, 'pages', file), 'utf8');
    const m = raw.match(/^\s*<!--\s*@meta\s+(\{[\s\S]*?\})\s*-->/);
    if (!m) throw new Error(`${file}: missing @meta comment`);
    const meta = JSON.parse(m[1]);
    const body = raw.slice(m[0].length);
    const key = basename(file, '.html');
    const base = meta.anyPath ? '/' : '';
    const path = key === 'index' ? '' : key + '.html';

    const head = [];
    if (meta.description) head.push(`<meta name="description" content="${escapeAttr(meta.description)}">`);
    if (meta.noindex) head.push('<meta name="robots" content="noindex">');
    if (siteUrl && !meta.noindex) {
      head.push(`<link rel="canonical" href="${siteUrl}/${path}">`);
      head.push(`<meta property="og:url" content="${siteUrl}/${path}">`);
      sitemap.push(`${siteUrl}/${path}`);
    }
    head.push(`<meta property="og:title" content="${escapeAttr(meta.title)}">`);
    if (meta.description) head.push(`<meta property="og:description" content="${escapeAttr(meta.description)}">`);

    let html = layout
      .replace('{{content}}', () => body.trim())
      .replace('{{title}}', () => escapeAttr(meta.title))
      .replace('{{head}}', () => head.join('\n'))
      .replace('{{bodyClass}}', () => `page-${key}`);
    html = expandIncludes(html);
    if (config.showDraftNotices === false) html = html.replace(/<!-- draft-notice -->[\s\S]*?<!-- \/draft-notice -->/g, '');
    html = renderIcons(html);
    html = html.replaceAll('{{base}}', base).replaceAll('{{year}}', year);
    if (meta.nav) {
      html = html.replaceAll(`data-nav="${meta.nav}"`, `data-nav="${meta.nav}" aria-current="page"`);
    }
    html = markPlaceholders(html);
    const left = html.match(/\{\{[^}]*\}\}/);
    if (left) throw new Error(`${file}: unresolved template token ${left[0]}`);
    writeFileSync(join(out, file), html);
  }

  const robots = ['User-agent: *', 'Allow: /'];
  if (siteUrl) {
    robots.push(`Sitemap: ${siteUrl}/sitemap.xml`);
    const urls = sitemap.map((u) => `  <url><loc>${u}</loc></url>`).join('\n');
    writeFileSync(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  }
  writeFileSync(join(out, 'robots.txt'), robots.join('\n') + '\n');
  return pages;
}

// Content and link checks against the rules in the content brief.
function check(pages) {
  const problems = [];
  const files = new Set(pages);
  const banned = [/\u2014/, /\brevolutionary\b/i, /game-changing/i, /world-class/i, /next-generation/i, /industry-leading/i, /most popular/i];
  for (const file of pages) {
    const html = readFileSync(join(out, file), 'utf8');
    const text = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
    for (const re of banned) if (re.test(text)) problems.push(`${file}: contains banned text ${re}`);
    const h1 = (html.match(/<h1[\s>]/g) || []).length;
    if (h1 !== 1) problems.push(`${file}: expected one h1, found ${h1}`);
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((x) => x[1]);
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    if (dupes.length) problems.push(`${file}: duplicate ids ${[...new Set(dupes)].join(', ')}`);
    for (const [, href] of html.matchAll(/\shref="([^"]+)"/g)) {
      if (/^(https?:|mailto:|tel:)/.test(href)) continue;
      const [beforeHash, hash] = href.replace(/^\//, '').split('#');
      const pathPart = beforeHash.split('?')[0];
      const target = pathPart || file;
      if (pathPart && !files.has(pathPart) && !existsSync(join(out, pathPart))) problems.push(`${file}: broken link ${href}`);
      if (hash && files.has(target)) {
        const targetHtml = readFileSync(join(out, target), 'utf8');
        if (!targetHtml.includes(`id="${hash}"`)) problems.push(`${file}: missing anchor ${href}`);
      }
    }
    for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) if (!/\salt="/.test(tag)) problems.push(`${file}: image without alt`);
    for (const [, id] of html.matchAll(/<(?:input|select|textarea)\b[^>]*\sid="([^"]+)"/g)) {
      if (!html.includes(`for="${id}"`) && !new RegExp(`<label[^>]*>(?:(?!</label>)[\\s\\S])*id="${id}"`).test(html)) problems.push(`${file}: control #${id} has no label`);
    }
  }
  return problems;
}

const pages = build();
console.log(`Built ${pages.length} pages into dist/`);
if (process.argv.includes('--check')) {
  const problems = check(pages);
  if (problems.length) {
    console.error(problems.map((p) => `  - ${p}`).join('\n'));
    process.exit(1);
  }
  console.log('Checks passed: no banned phrases or em dashes, one h1 per page, links, anchors, image alt text and form labels.');
}
