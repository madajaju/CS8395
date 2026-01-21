// generate-pdfs.js
// Usage:   node generate-pdfs.js [rootDir]
// Example: node generate-pdfs.js . 

const { readdir, stat } = require('fs').promises;
const { spawnSync } = require('child_process');
const { join, extname } = require('path');
const fs = require('fs');
const path = require('path');

fs.mkdirSync('.output', { recursive: true });

async function traverseAndConvert(dir) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      await traverseAndConvert(fullPath);
    }
    else if (entry.isFile() && entry.name.endsWith('.marp.md')) {
      const dirname = path.dirname(fullPath);
      const outHTML = path.resolve(dirname, fullPath.replace(/\.marp\.md$/, '.html'));
        const outPdf = path.resolve(dirname, fullPath.replace(/\.marp\.md$/, '.ppt'));
      if(!fs.existsSync(outHTML)) {
          console.log(`⏳  Generating HTML for ${fullPath}`);
          const result = spawnSync(
              'npx marp --pptx --theme ./doc/default.scss --allow-local-files ' +
              `-o "${outPdf}" "${fullPath}"`,
              {stdio: 'inherit', shell: true}
          );

          if (result.error) {
              console.error(`❌  Error processing ${fullPath}:`, result.error);
          } else {
              console.log(`✅  ${outPdf} created.`);
          }

          fs.mkdirSync(path.resolve(dirname, '.output'), { recursive: true });
          fs.copyFileSync(path.resolve('./doc', "custom.css"), path.resolve(dirname, '.output', "custom.css"));

          const result2 = spawnSync(
              'docker run --rm -v ".:/documents" -w /documents ' +
              'asciidoctor/docker-asciidoctor:latest asciidoctor-revealjs ' +
              '-r asciidoctor-diagram -a allow-uri-read ' +
              '-a revealjsdir=https://cdn.jsdelivr.net/npm/reveal.js@4 ' +
              '-a customcss=./custom.css -D .output ' +
              'README.marp.adoc',
              {cwd: dirname, stdio: 'inherit', shell: true}
          )
          if (result2.error) {
              console.error(`❌  Error processing ${fullPath}:`, result2.error);
          } else {
              console.log(`✅  README.html created.`);
          }
      }
    }
  }
}

(async () => {
  const root = process.argv[2] || '.';
  try {
    const stats = await stat(root);
    if (!stats.isDirectory()) {
      console.error(`Error: ${root} is not a directory`);
      process.exit(1);
    }
    await traverseAndConvert(root);
    console.log('All done!');
  }
  catch (err) {
    console.error('Unexpected error:', err);
    process.exit(1);
  }
})();
