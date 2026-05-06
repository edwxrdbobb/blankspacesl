const https = require('https');

// Test the actual URLs from the original manifest that should be working
const workingUrls = [
  'https://res.cloudinary.com/dhixhto9s/image/upload/v1778059773/blankspace/reggie-events-images/whatsapp-image-2026-05-04-at-00-50-41.jpg',
  'https://res.cloudinary.com/dhixhto9s/image/upload/v1778059780/blankspace/reggie-events-images/whatsapp-image-2026-05-04-at-00-50-46.jpg',
  'https://res.cloudinary.com/dhixhto9s/image/upload/v1778059795/blankspace/reggie-events-images/whatsapp-image-2026-05-04-at-00-50-52.jpg'
];

async function testWorkingUrls() {
  for (let i = 0; i < workingUrls.length; i++) {
    const url = workingUrls[i];
    console.log(`\nTesting working URL ${i + 1}:`);
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
      
      console.log(`✅ Status: ${response.statusCode}, Size: ${response.contentLength} bytes`);
      
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

testWorkingUrls();
