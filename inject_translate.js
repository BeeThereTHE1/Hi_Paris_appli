const fs = require('fs');
const path = require('path');

const snippet = `
  <!-- ===============================
       WIDGET GOOGLE TRANSLATE (FR/EN)
  ================================ -->
  <div id="google_translate_element" style="display: none !important;"></div>
  <script type="text/javascript">
    function googleTranslateElementInit() {
      new google.translate.TranslateElement({
        pageLanguage: 'fr', 
        includedLanguages: 'en,fr',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
      }, 'google_translate_element');
    }
  </script>
  <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
  <style>
    .goog-te-gadget-simple { background-color: transparent !important; border: none !important; font-family: 'Inter', sans-serif !important; font-size: 14px !important; font-weight: 600 !important; }
    .goog-te-gadget-icon { display: none; }
    body { top: 0px !important; }
    .skiptranslate iframe { display: none !important; }
  </style>
`;

function processDir(dir) {
  const files = fs.readdirSync(dir);
  let count = 0;
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      count += processDir(fullPath);
    } else if (fullPath.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (!content.includes('google_translate_element')) {
        content = content.replace(/<body>/i, '<body>\n' + snippet);
        fs.writeFileSync(fullPath, content);
        console.log('Injecté dans', fullPath);
        count++;
      }
    }
  }
  return count;
}

const total = processDir(path.join(process.cwd(), 'frontend', 'pages'));
console.log('Total fichiers modifiés:', total);
