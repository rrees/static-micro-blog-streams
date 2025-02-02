import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import * as fs from 'node:fs';
import * as path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default function() {
  const currentDir = __dirname;
  const items = fs.readdirSync(currentDir);
  
  const subdirectories = items
    .filter(item => {
      const fullPath = path.join(currentDir, item);
      return fs.statSync(fullPath).isDirectory() && 
             !item.startsWith('.');
    })
    .map(dir => ({
      name: dir.replace('-', ' ').replace(/\b\w/g, s => s.toUpperCase()),
      path: `${dir}`
    }));

  const result = {
    subdirectories
  };

  return result;
};