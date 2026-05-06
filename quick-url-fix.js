// Quick URL mapping script for Cloudinary media library
// Run this after you get the correct URLs from your Cloudinary console

const fs = require('fs');
const path = require('path');

// Read current gallery config
const galleryPath = path.join(__dirname, 'scripts/reggie-gallery-urls.json');
const galleryConfig = JSON.parse(fs.readFileSync(galleryPath, 'utf8'));

// Example: Update a few entries with correct Cloudinary URLs
// Replace these with actual URLs from your Cloudinary media library
const correctUrlMappings = {
  "WhatsApp Image 2026-05-04 at 00.49.01.jpeg": "https://res.cloudinary.com/dhixhto9s/image/upload/ACTUAL_VERSION/blankspace/reggie-events-images/ACTUAL_FILENAME",
  "WhatsApp Image 2026-05-04 at 00.49.07.jpeg": "https://res.cloudinary.com/dhixhto9s/image/upload/ACTUAL_VERSION/blankspace/reggie-events-images/ACTUAL_FILENAME",
  // Add more mappings as needed...
};

// Update the configuration
const updatedConfig = { ...galleryConfig, ...correctUrlMappings };

// Write back to file
fs.writeFileSync(galleryPath, JSON.stringify(updatedConfig, null, 2));
console.log('Gallery configuration updated with correct Cloudinary URLs');
console.log(`Updated ${Object.keys(correctUrlMappings).length} entries`);

// Test the updated URLs
console.log('\nTesting updated URLs...');
Object.entries(correctUrlMappings).forEach(([filename, url], index) => {
  console.log(`${index + 1}. ${filename}`);
  console.log(`   URL: ${url}`);
  console.log(`   Test: curl -I "${url}"`);
});
