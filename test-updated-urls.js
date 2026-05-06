const https = require('https');

// Test updated gallery URLs
const testUrls = [
  'https://res.cloudinary.com/dhixhto9s/image/upload/v1778059773/blankspace/reggie-events-images/whatsapp-image-2026-05-04-at-00-50-41.jpg',
  'https://res.cloudinary.com/dhixhto9s/image/upload/v1778059780/blankspace/reggie-events-images/whatsapp-image-2026-05-04-at-00-50-46.jpg'
];

async function testUpdatedUrls() {
  for (let i = 0; i < testUrls.length; i++) {
    const url = testUrls[i];
    console.log(`\nTesting updated URL ${i + 1}:`);
    console.log(url);
    
    try {
      const response = await new Promise((resolve, reject) => {
        const req = https.get(url, (res) => {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => {
            resolve({
              statusCode: res.statusCode,
              contentLength: res.headers['content-length']
            });
          });
        });
        
        req.on('error', reject);
        req.setTimeout(10000, () => {
          req.destroy();
          reject(new Error('Timeout'));
        });
      });
      
      console.log(`Status: ${response.statusCode}, Size: ${response.contentLength} bytes`);
      
      if (response.statusCode === 200 && parseInt(response.contentLength) > 1000) {
        console.log('✅ Image is accessible and has content!');
      } else {
        console.log('❌ Image not accessible or empty');
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
  }
}

testUpdatedUrls();
