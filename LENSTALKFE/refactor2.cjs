const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('d:/Downloads/LENSTALKMEDIA/LENSTALK/src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;
  
  if (content.includes('useFirestore')) {
    content = content.replace(/useFirestore/g, 'useApi');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(file, content);
    console.log('Fixed imports in:', file);
  }
});
