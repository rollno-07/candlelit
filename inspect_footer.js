
const puppeteer = require('puppeteer-core');
(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1000 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await page.waitForTimeout(2000);
  
  const footerInfo = await page.evaluate(() => {
    const el = document.querySelector('footer');
    if (!el) return { found: false };
    const rect = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);
    return {
      found: true,
      tagName: el.tagName,
      className: el.className,
      rect: { top: rect.top, bottom: rect.bottom, height: rect.height, width: rect.width },
      scrollHeight: document.documentElement.scrollHeight,
      clientHeight: document.documentElement.clientHeight,
      scrollY: window.scrollY,
      display: style.display,
      visibility: style.visibility,
      opacity: style.opacity,
      zIndex: style.zIndex,
      position: style.position,
      innerTextSnippet: el.innerText.slice(0, 100)
    };
  });
  console.log('FOOTER EVALUATION:', JSON.stringify(footerInfo, null, 2));
  await browser.close();
})();
