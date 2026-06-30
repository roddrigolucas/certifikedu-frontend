/* eslint-disable no-console */
/**
 * Smart placeholder fixer: reads all imports across the project,
 * finds which placeholder files have mismatched exports,
 * and regenerates them with the correct named exports.
 */
const fs = require('fs');
const path = require('path');

const srcDir = path.resolve('src');

// Step 1: Collect all import statements across the project
function collectImports(dir) {
  const imports = []; // { fromFile, importNames, importPath }
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory() && e.name !== 'node_modules' && e.name !== 'dist' && e.name !== '.git') {
      imports.push(...collectImports(p));
    } else if (e.isFile() && (e.name.endsWith('.tsx') || e.name.endsWith('.ts'))) {
      const content = fs.readFileSync(p, 'utf-8');
      // Match: import { X, Y } from 'path' or import X from 'path'
      const namedRegex = /import\s+\{([^}]+)\}\s+from\s+['"]([^'"]+)['"]/g;
      const defaultRegex = /import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/g;
      
      let m;
      while ((m = namedRegex.exec(content))) {
        const names = m[1].split(',').map(n => n.trim().split(' as ')[0].trim()).filter(Boolean);
        imports.push({ fromFile: p, importNames: names, importPath: m[2], isNamed: true });
      }
      while ((m = defaultRegex.exec(content))) {
        imports.push({ fromFile: p, importNames: [m[1]], importPath: m[2], isNamed: false });
      }
    }
  }

  return imports;
}

// Step 2: Resolve imports to absolute/relative paths and find files
function resolveImportPath(importPath, fromFile) {
  let rel;
  if (importPath.startsWith('@/')) {
    rel = importPath.replace(/^@\//, 'src/');
  } else if (importPath.startsWith('.') || importPath.startsWith('..')) {
    rel = path.relative(process.cwd(), path.resolve(path.dirname(fromFile), importPath));
  } else {
    return null;
  }
  const candidates = [
    rel + '.ts', rel + '.tsx',
    path.join(rel, 'index.ts'), path.join(rel, 'index.tsx')
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }

  return null;
}

// Step 3: Check if file is a placeholder (very small, ~2-3 lines, no real logic)
function isPlaceholderFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8').trim();
  const lines = content.split('\n').map(l => l.trim()).filter(Boolean);
  if (lines.length > 5) return false;
  // Check if it's our generated placeholder
  if (content.includes('= () => null') || content.includes('= {}')) return true;
  if (content.includes('Placeholder')) return true;

  return false;
}

console.log('Scanning all imports...');
const allImports = collectImports(srcDir);
console.log(`Found ${allImports.length} import statements`);

// Group imports by target file
const importsByFile = {};
for (const imp of allImports) {
  const resolved = resolveImportPath(imp.importPath, imp.fromFile);
  if (!resolved) continue;
  
  const absResolved = path.resolve(resolved);
  if (!importsByFile[absResolved]) {
    importsByFile[absResolved] = { named: new Set(), defaults: new Set() };
  }
  
  if (imp.isNamed) {
    for (const name of imp.importNames) {
      importsByFile[absResolved].named.add(name);
    }
  } else {
    for (const name of imp.importNames) {
      importsByFile[absResolved].defaults.add(name);
    }
  }
}

// Step 4: Fix placeholder files that have wrong exports
let fixed = 0;
for (const [filePath, imports] of Object.entries(importsByFile)) {
  if (!fs.existsSync(filePath)) continue;
  if (!isPlaceholderFile(filePath)) continue;
  
  const isComponent = filePath.endsWith('.tsx');
  const namedExports = [...imports.named];
  const defaultName = [...imports.defaults][0];
  
  let newContent = '';
  
  // Generate named exports
  for (const name of namedExports) {
    if (name.startsWith('E') && name[1] === name[1].toUpperCase()) {
      // Likely an enum
      newContent += `export enum ${name} {}\n`;
    } else if (name.startsWith('I') && name[1] === name[1].toUpperCase()) {
      // Likely an interface
      newContent += `export interface ${name} { [key: string]: any; }\n`;
    } else if (name[0] === name[0].toUpperCase()) {
      // Likely a component or class
      if (isComponent) {
        newContent += `export const ${name} = () => null;\n`;
      } else {
        newContent += `export const ${name} = {};\n`;
      }
    } else {
      // Likely a function or variable
      newContent += `export const ${name} = () => {};\n`;
    }
  }
  
  // Generate default export
  if (defaultName) {
    if (isComponent) {
      newContent += `const ${defaultName} = () => null;\nexport default ${defaultName};\n`;
    } else {
      newContent += `const ${defaultName} = {};\nexport default ${defaultName};\n`;
    }
  } else if (namedExports.length === 0) {
    // No specific exports needed, keep a generic default
    const dirName = path.basename(path.dirname(filePath));
    if (isComponent) {
      newContent += `const ${dirName} = () => null;\nexport default ${dirName};\n`;
    } else {
      newContent += `const ${dirName} = {};\nexport default ${dirName};\n`;
    }
  } else {
    // Add a generic default export
    newContent += `export default {};\n`;
  }
  
  const currentContent = fs.readFileSync(filePath, 'utf-8').trim();
  const newContentTrimmed = newContent.trim();
  
  if (currentContent !== newContentTrimmed) {
    fs.writeFileSync(filePath, newContent);
    console.log(`Fixed: ${path.relative(srcDir, filePath)}`);
    console.log(`  Named: [${namedExports.join(', ')}]`);
    if (defaultName) console.log(`  Default: ${defaultName}`);
    fixed++;
  }
}

console.log(`\nDone! Fixed ${fixed} placeholder files.`);
