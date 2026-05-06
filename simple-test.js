// Simple test to check if Cloudinary URLs exist
const https = require('https');

const testUrl = 'https://res.cloudinary.com/dhixhto9s/image/upload/v1778063157/blankspace/reggie-events-images/whatsapp-image-2026-05-04-at-00-57-41.jpg';

console.log('Testing Cloudinary URL accessibility...');
console.log('URL:', testUrl);

const req = https.get(testUrl, (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers);
  
  if (res.statusCode === 200) {
    console.log('✅ Image is accessible!');
  } else {
    console.log('❌ Image not accessible. Status:', res.statusCode);
  }
});

req.on('error', (err) => {
  console.log('❌ Request failed:', err.message);
});

req.setTimeout(10000, () => {
  req.destroy();
  console.log('❌ Request timed out');
});
