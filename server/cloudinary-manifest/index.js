import { v2 as cloudinary } from 'cloudinary';
import http from 'http';
import url from 'url';
import dotenv from 'dotenv';

dotenv.config();

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'yi5vd8rs';
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;
const FOLDER = 'Christmas';
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS || '*';

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true
});

function buildVideoPoster(publicId) {
  return cloudinary.url(publicId, {
    resource_type: 'video',
    transformation: [
      { width: 400, height: 560, crop: 'fill', gravity: 'auto' },
      { format: 'jpg', quality: 'auto' }
    ],
    secure: true
  });
}

async function listAllAssets() {
  const all = [];
  let nextCursor = undefined;
  do {
    const res = await cloudinary.api.resources_by_asset_folder({
      asset_folder: FOLDER,
      max_results: 500,
      next_cursor: nextCursor
    });
    if (Array.isArray(res.resources)) {
      all.push(...res.resources);
    }
    nextCursor = res.next_cursor;
  } while (nextCursor);
  return all;
}

function normalize(resources) {
  const items = [];
  for (const r of resources) {
    if (!r || !r.public_id) continue;
    const resourceType = r.resource_type === 'video' ? 'video' : (r.resource_type === 'image' ? 'image' : null);
    if (!resourceType) continue;
    const format = r.format || '';
    // skip unsupported if needed - only image/video
    const item = {
      id: r.public_id,
      publicId: r.public_id,
      resourceType,
      url: cloudinary.url(r.public_id, { resource_type: resourceType, secure: true, format: r.format, type: r.type || 'upload' }),
      posterUrl: null,
      width: r.width || null,
      height: r.height || null,
      format
    };
    if (resourceType === 'video') {
      try {
        item.posterUrl = buildVideoPoster(r.public_id);
      } catch {
        item.posterUrl = null;
      }
    }
    items.push(item);
  }
  // deterministic sort by publicId
  items.sort((a, b) => (a.publicId || a.id).localeCompare(b.publicId || b.id));
  return items;
}

const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': ALLOWED_ORIGINS,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }
  if (parsed.pathname === '/api/manifest' || parsed.pathname === '/manifest') {
    try {
      if (!API_KEY || !API_SECRET) {
        res.writeHead(500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': ALLOWED_ORIGINS });
        res.end(JSON.stringify({ error: 'Server not configured' }));
        return;
      }
      const resources = await listAllAssets();
      const items = normalize(resources);
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': ALLOWED_ORIGINS,
        'Cache-Control': 'public, max-age=300, s-maxage=300'
      });
      res.end(JSON.stringify({ items }));
      return;
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': ALLOWED_ORIGINS });
      res.end(JSON.stringify({ error: 'Failed to fetch manifest' }));
      return;
    }
  }
  res.writeHead(404, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': ALLOWED_ORIGINS });
  res.end(JSON.stringify({ error: 'Not found' }));
});

const port = process.env.PORT || 8787;
server.listen(port, () => {
  console.log('manifest server listening');
});
