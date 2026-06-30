const fs = require('fs');
const path = require('path');

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  if (entries.length === 0) {
    // Empty directory, create index file
    const isComponent = dir.includes('components');
    const fileName = isComponent ? 'index.tsx' : 'index.ts';
    const filePath = path.join(dir, fileName);
    
    if (!fs.existsSync(filePath)) {
      const content = isComponent 
        ? "import React from 'react';\nexport default () => <div>Placeholder</div>;" 
        : "export const Placeholder = {};\nexport default {};";
      
      fs.writeFileSync(filePath, content);
      console.log('Created placeholder:', filePath);
    }
    return;
  }

  // Check if directory only contains other directories but no files
  const hasFiles = entries.some(e => e.isFile());
  if (!hasFiles && dir !== 'src') {
    // No files in this directory (only subdirs), might need an index to avoid EISDIR
    const isComponent = dir.includes('components');
    const fileName = isComponent ? 'index.tsx' : 'index.ts';
    const filePath = path.join(dir, fileName);
    
    if (!fs.existsSync(filePath)) {
       // Only create if it's a "leaf" or likely an entity folder
       // For simplicity, let's just create indexes for now
       const content = isComponent 
        ? "import React from 'react';\nexport default () => <div>Placeholder</div>;" 
        : "export const Placeholder = {};\nexport default {};";
      
      fs.writeFileSync(filePath, content);
      console.log('Created bridge index:', filePath);
    }
  }

  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory() && e.name !== 'node_modules' && e.name !== 'dist' && e.name !== '.git') {
      walk(p);
    }
  }
}

const srcPath = path.resolve('src');
if (fs.existsSync(srcPath)) {
  walk(srcPath);
  console.log('Done creating placeholders!');
} else {
  console.error('src directory not found');
}
