import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getFiles(dir) {
  let results = [];
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) results.push(...getFiles(full));
    else if (/\.(jsx|js|html)$/.test(file)) results.push(full);
  });
  return results;
}

const files = getFiles(path.resolve(__dirname, '../src'));
// Extract classes from standard strings, template literals, and conditionals
const classRegex = /className=\{?`([^`]+)`\}?|className="([^"]+)"|className='([^']+)'/g;
const usedClasses = new Set();

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  let match;
  while ((match = classRegex.exec(content)) !== null) {
    const raw = match[1] || match[2] || match[3] || '';
    // Split by whitespace and remove template literal interpolation syntax ${...}
    raw.split(/\s+/).forEach(c => {
      // Remove JS wrappers
      const cleaned = c.replace(/[${}`"']/g, '').trim();
      // Ignore JS identifiers / expressions / operators
      if (cleaned && 
          cleaned !== ':' &&
          cleaned !== '?' &&
          !cleaned.includes('(') && 
          !cleaned.includes(')') && 
          !cleaned.includes('==') && 
          !cleaned.includes('>') &&
          !cleaned.includes('<') &&
          !['step', 'status', 'filterStatus', 'isSelected', 'New', 'Under', 'Scrutiny', 'Consultation', 'Scheduled', 'Submission', 'currentStep', 'formData', 'active', 'isOpen', 'activeTab', 'submit', 'track', 'isCompleted', 'isCurrent'].includes(cleaned) &&
          !cleaned.includes('.')) {
        usedClasses.add(cleaned);
      }
    });
  }
});

const css = fs.readFileSync(path.resolve(__dirname, '../src/index.css'), 'utf8');
const missing = [];
usedClasses.forEach(c => {
  // In CSS, characters like :, /, ., [, ] are escaped with a backslash
  const cssClass = c.replace(/([:/.\[\]])/g, '\\$1');
  const regexPattern = '\\.' + cssClass.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '(?=[\\s,{:>:]|$)';
  const reg = new RegExp(regexPattern);
  if (!reg.test(css)) {
    missing.push(c);
  }
});

console.log('Total used classes:', usedClasses.size);
console.log('Missing classes count:', missing.length);
console.log('Missing classes:', JSON.stringify(missing.sort(), null, 2));
