const fs = require('fs');
const path = require('path');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  
  // Fix patterns like "..., -> "...",
  content = content.replace(/"\.\.\.,/g, '"...",');
  
  // Fix patterns like "...} -> "..."}
  content = content.replace(/"\.\.\.}/g, '"..."}');
  
  // Fix patterns like "... : -> "...":
  content = content.replace(/"\.\.\. :/g, '...":');
  
  // Fix patterns like "...] -> "..."]
  content = content.replace(/"\.\.\.]/g, '"..."]');
  
  // Fix patterns like "... : "" -> "...": ""
  content = content.replace(/"\.\.\. : ""/g, '...": ""');
  
  // Fix patterns like raw: "..., -> raw: "...",
  content = content.replace(/: "\.\.\.,/g, ': "...",');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed:', filePath);
  }
}

function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (f.endsWith('.ts') || f.endsWith('.json')) {
      fixFile(p);
    }
  });
}

walk('c:/Users/Administrator/克隆工作区/openX/src');
console.log('Done');
