const chromium = require('chrome-aws-lambda');

exports.handler = async (event, context, callback) => {
  let browser = null;
  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });
    
    var payload = JSON.parse(event.body);
    var buffer = Buffer.from(payload.document, 'base64');

    let page = await browser.newPage();
    await page.setContent(buffer.toString());
    
    await page.pdf({path: '/tmp/document.pdf', format: payload.format});

    const pdf = await new Promise((resolve, reject) => {
      fs.readFile('/tmp/document.pdf', (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });    

    var res ={
      "statusCode": 200,
      "headers": {
          "Content-Type": "application/pdf;base64"
      }
    };
    var responseBuffer = Buffer.from(pdf, 'utf-8');
    res.body = responseBuffer.toString('base64');
    callback(null, res)
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }  
};