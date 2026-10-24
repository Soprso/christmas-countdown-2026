# Cloudinary Manifest Server

Deploy this as a serverless function (e.g., Vercel, Netlify Functions, Cloudflare Workers with Node, or a small Node server). 

## Environment variables (server-side only)
- `CLOUDINARY_CLOUD_NAME` (default: yi5vd8rs)
- `CLOUDINARY_API_KEY` (required)
- `CLOUDINARY_API_SECRET` (required)
- `ALLOWED_ORIGINS` (optional, default *)
- `PORT` (optional)

Never put these in the mobile app.

## Deploy
1. Copy this folder to your hosting provider.
2. Set env vars.
3. Install deps: `npm install`
4. Start: `npm start`
5. Endpoint: `GET /api/manifest` (also serves `/manifest`)

## Notes
- Lists all assets in folder `Christmas` via `resources_by_asset_folder` with pagination.
- Returns normalized items compatible with app `GalleryItem` type.
- Videos get poster URLs via transformations.
- Sets short cache headers; errors return 500 without caching.
