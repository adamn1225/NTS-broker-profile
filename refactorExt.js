import fs from 'fs';
import path from 'path';

const directoryPath = path.join(process.cwd(), 'src');

function updateImports(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const updatedContent = fileContent.replace(/(import .* from '.*)(?<!\.js|\.jsx|\.ts|\.tsx)';/g, "$1.js';");
  
  if (fileContent !== updatedContent) {
    console.log(`Updating imports in: ${filePath}`);
    fs.writeFileSync(filePath, updatedContent, 'utf8');
  }
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      updateImports(fullPath);
    }
  });
}

walkDir(directoryPath);