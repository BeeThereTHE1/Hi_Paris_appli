const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('file:///' + 'C:/Users/dkeskin/Documents/projet_hiparis/Projet_Hi_Paris_TF_Playground/frontend/pages/create.html'.replace(/\\/g, '/'));
  await new Promise(r => setTimeout(r, 2000));
  const iframeHandle = await page.$('#preview-iframe');
  const frame = await iframeHandle.contentFrame();
  const styleContent = await frame.$eval('#preview-hash-css', el => el.textContent).catch(e => 'STYLE TAG NOT FOUND');
  console.log('CSS Content:', styleContent);
  await browser.close();
})();
