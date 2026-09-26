#!/usr/bin/env node
// Checks source copy against the content rules: no em dashes and none of the banned phrases.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const roots = ['app', 'components', 'content', 'lib', 'emails'];
const banned = [
  /—/, /\brevolutionary\b/i, /game-changing/i, /world-class/i, /next-generation/i, /industry-leading/i, /most popular/i,
  /\bseamless(ly)?\b/i, /\bstreamline/i, /\bempower/i, /\bunlock/i, /\belevate/i, /\bleverage\b/i, /cutting-edge/i,
  /\bnot just\b/i, /\bwhether you/i, /one clear workflow/i
];
const problems = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (['.ts', '.tsx', '.txt', '.html', '.css'].includes(extname(path))) {
      readFileSync(path, 'utf8').split('\n').forEach((line, i) => {
        for (const re of banned) if (re.test(line)) problems.push(`${path}:${i + 1} matches ${re}`);
      });
    }
  }
}
roots.forEach(walk);
if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('Content check passed: no em dashes or banned phrases.');
