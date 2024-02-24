import open from 'open';
import fs from 'fs';
import path from 'path';

function openHtmlFiles(folderPath) {
  const htmlFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.html'));

  htmlFiles.forEach(htmlFile => {
    const htmlPath = path.join(folderPath, htmlFile);
    open(htmlPath, { wait: false });
  });
}

// Usage: node openHtml.mjs path/to/html/folder
const htmlFolderPath = process.argv[2];

if (!htmlFolderPath) {
  console.error('Please provide the path to the HTML folder.');
} else {
  openHtmlFiles(htmlFolderPath);
}