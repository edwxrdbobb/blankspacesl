// Update gallery configuration with actual Cloudinary URLs
const fs = require('fs');
const path = require('path');

// Read current gallery config
const galleryPath = path.join(__dirname, 'scripts/reggie-gallery-urls.json');
const galleryConfig = JSON.parse(fs.readFileSync(galleryPath, 'utf8'));

// Since we can't access Cloudinary API directly, let's create a mapping
// based on the pattern we see in the working URLs
const updatedConfig = {};

// Update URLs to use the correct Cloudinary pattern
Object.entries(galleryConfig).forEach(([filename, oldUrl]) => {
  if (oldUrl.includes('reggies-gallery/reggies-gallery-')) {
    // Convert to correct reggie-events-images pattern
    const newUrl = oldUrl
      .replace('reggies-gallery/reggies-gallery-', 'reggie-events-images/whatsapp-image-')
      .replace(/-at-00-4[0-9]/, (match) => {
        return match.replace('-at-00-4', '-at-00-5');
      });
    updatedConfig[filename] = newUrl;
  } else {
    updatedConfig[filename] = oldUrl;
  }
});

// Write updated configuration
fs.writeFileSync(galleryPath, JSON.stringify(updatedConfig, null, 2));
console.log('Gallery configuration updated with corrected URL patterns');
console.log(`Total images: ${Object.keys(updatedConfig).length}`);
