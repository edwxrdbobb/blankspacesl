const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function loadDotEnvLocal() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) return;

  const content = fs.readFileSync(envPath, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

function slugifySegment(segment) {
  return segment
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/[^\w.-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function encodePublicPath(relPathFromPublic) {
  const parts = relPathFromPublic.split(path.sep).map((part) => encodeURIComponent(part));
  return `/${parts.join('/')}`;
}

async function uploadFile({ filePath, relFromPublic, cloudName, apiKey, apiSecret }) {
  const publicPath = encodePublicPath(relFromPublic);
  const fileBuffer = fs.readFileSync(filePath);
  const fileHash = crypto.createHash('sha1').update(fileBuffer).digest('hex');
  
  const timestamp = Math.floor(Date.now() / 1000);
  const slugifiedName = slugifySegment(path.basename(relFromPublic, path.extname(relFromPublic)));
  const folder = 'blankspace/reggie-events-images';
  const publicId = `${folder}/${slugifiedName}`;
  
  const formData = new URLSearchParams();
  formData.append('file', fileBuffer);
  formData.append('public_id', publicId);
  formData.append('timestamp', timestamp);
  formData.append('api_key', apiKey);
  formData.append('signature', crypto.createHash('sha1').update(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`).digest('hex'));
  
  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Upload failed: ${error}`);
  }
  
  const result = await response.json();
  return result.secure_url;
}

async function main() {
  loadDotEnvLocal();
  
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  
  if (!cloudName || !apiKey || !apiSecret) {
    console.error('Missing Cloudinary credentials');
    process.exit(1);
  }
  
  const imagesDir = path.join(process.cwd(), 'public/reggie-events-images');
  if (!fs.existsSync(imagesDir)) {
    console.error('Images directory not found');
    process.exit(1);
  }
  
  const files = fs.readdirSync(imagesDir).filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg'));
  console.log(`Found ${files.length} images to upload`);
  
  const manifest = {};
  let uploaded = 0;
  
  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    console.log(`Uploading ${file}...`);
    
    try {
      const url = await uploadFile({
        filePath,
        relFromPublic: `reggie-events-images/${file}`,
        cloudName,
        apiKey,
        apiSecret
      });
      
      manifest[file] = url;
      uploaded++;
      console.log(`✅ ${file} -> ${url}`);
    } catch (error) {
      console.error(`❌ Failed to upload ${file}: ${error.message}`);
    }
  }
  
  // Save manifest
  const manifestPath = path.join(process.cwd(), 'lib/cloudinary-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  
  console.log(`\n✅ Successfully uploaded ${uploaded}/${files.length} images`);
  console.log(`Manifest saved to ${manifestPath}`);
}

main().catch(console.error);
