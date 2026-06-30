const fs = require('fs');
const path = require('path');

const componentPlaceholderOld = "import React from 'react';\nexport default () => <div>Placeholder</div>;";
const nonComponentPlaceholderOld = "export const Placeholder = {};\nexport default {};";

function getComponentName(filePath) {
  // Extract component name from directory name
  const dir = path.dirname(filePath);
  return path.basename(dir);
}

function fixFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8').replace(/\r\n/g, '\n').trim();
  
  if (content === componentPlaceholderOld) {
    const name = getComponentName(filePath);
    const newContent = `export const ${name} = () => null;\nexport default ${name};\n`;
    fs.writeFileSync(filePath, newContent);
    console.log(`Fixed component: ${filePath} (${name})`);
    return true;
  }
  
  if (content === nonComponentPlaceholderOld) {
    const name = getComponentName(filePath);
    const newContent = `export const ${name} = {};\nexport default ${name};\n`;
    fs.writeFileSync(filePath, newContent);
    console.log(`Fixed non-component: ${filePath} (${name})`);
    return true;
  }
  
  return false;
}

function walk(dir) {
  let fixed = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory() && e.name !== 'node_modules' && e.name !== 'dist' && e.name !== '.git') {
      fixed += walk(p);
    } else if (e.isFile() && (e.name.endsWith('.tsx') || e.name.endsWith('.ts'))) {
      if (fixFile(p)) fixed++;
    }
  }
  return fixed;
}

const srcPath = path.resolve('src');
const fixed = walk(srcPath);
console.log(`\nDone! Fixed ${fixed} placeholder files.`);
