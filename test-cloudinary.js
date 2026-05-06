const https = require('https');

// Test if Cloudinary URLs are accessible
const urls = [
  'https://res.cloudinary.com/dhixhto9s/image/upload/v1778059773/blankspace/reggie-events-images/whatsapp-image-2026-05-04-at-00-50-41.jpg',
  'https://res.cloudinary.com/dhixhto9s/image/upload/v1778059780/blankspace/reggie-events-images/whatsapp-image-2026-05-04-at-00-50-46.jpg',
  'https://res.cloudinary.com/dhixhto9s/image/upload/v1778063157/blankspace/reggie-events-images/whatsapp-image-2026-05-04-at-00-57-41.jpg'
];

async function testUrls() {
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`\nTesting URL ${i + 1}:`);
    console.log(url);
    
    try {
      const response = await https.get(url);
      console.log(`✅ Status: ${response.statusCode} - ${response.statusMessage}`);
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
  }
}

testUrls();
