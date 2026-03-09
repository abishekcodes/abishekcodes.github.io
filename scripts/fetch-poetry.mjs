import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = join(__dirname, '../public/poetry.xml');

console.log('Fetching Medium RSS feed...');

try {
  const response = await fetch('https://medium.com/feed/@RiversOfThought');
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  let xml = await response.text();
  xml = xml.replace(/<(?:blockquote|p)[^>]*>(?:(?!<\/(?:blockquote|p)>)[\s\S])*other poems(?:(?!<\/(?:blockquote|p)>)[\s\S])*<\/(?:blockquote|p)>/gi, '');
  mkdirSync(join(__dirname, '../public'), { recursive: true });
  writeFileSync(outputPath, xml, 'utf-8');
  console.log('poetry.xml written to public/');
} catch (err) {
  console.warn('Warning: Failed to fetch poetry feed:', err.message);
  console.warn('Continuing without poetry.xml — poems will not load.');
}
