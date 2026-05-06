// Batch URL updater - run this after getting correct URLs from Cloudinary
const fs = require('fs');
const path = require('path');

// Instructions:
// 1. Copy the correct URLs from your Cloudinary media library
// 2. Update the urlMappings object below
// 3. Run this script: node batch-update-urls.js

// Replace these with actual URLs from your Cloudinary console
const urlMappings = {
  // Example format:
  // "WhatsApp Image 2026-05-04 at 00.49.01.jpeg": "https://res.cloudinary.com/dhixhto9s/image/upload/v1778059773/blankspace/reggie-events-images/whatsapp-image-2026-05-04-at-00-49-01.jpg",
  // Add all your correct URLs here...
};

// Read current config
const galleryPath = path.join(__dirname, 'scripts/reggie-gallery-urls.json');
const galleryConfig = JSON.parse(fs.readFileSync(galleryPath, 'utf8'));

// Update with correct URLs
const updatedConfig = { ...galleryConfig, ...urlMappings };

// Write back
fs.writeFileSync(galleryPath, JSON.stringify(updatedConfig, null, 2));
console.log(`Updated ${Object.keys(urlMappings).length} URLs in gallery configuration`);
console.log('Gallery now has', Object.keys(updatedConfig).length, 'total images');
