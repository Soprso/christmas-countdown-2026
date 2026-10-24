import type { Context } from "@netlify/functions";
import { v2 as cloudinary } from "cloudinary";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "yi5vd8rs";
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;
const FOLDER = "Christmas";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
});

async function listAll() {
  const all: any[] = [];
  let next_cursor: string | undefined = undefined;
  do {
    const res: any = await cloudinary.api.resources_by_asset_folder({
      asset_folder: FOLDER,
      max_results: 500,
      next_cursor,
    });
    if (Array.isArray(res.resources)) {
      all.push(...res.resources);
    }
    next_cursor = res.next_cursor;
  } while (next_cursor);
  return all;
}

function buildPoster(publicId: string) {
  try {
    return cloudinary.url(publicId, {
      resource_type: "video",
      transformation: [
        { width: 400, height: 560, crop: "fill", gravity: "auto" },
        { format: "jpg", quality: "auto" },
      ],
      secure: true,
    });
  } catch {
    return null;
  }
}

export default async (req: Request, context: Context) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    if (!API_KEY || !API_SECRET) {
      return new Response(JSON.stringify({ error: "Server not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const resources = await listAll();
    
    // Safe diagnostic logging (no credentials)
    console.log(JSON.stringify({
      event: "cloudinary_manifest_fetch",
      folder: FOLDER,
      count: resources.length,
      samples: resources.slice(0, 15).map((r: any) => ({
        public_id: r.public_id,
        asset_folder: r.asset_folder,
        folder: r.folder,
        path: r.path,
        display_name: r.display_name,
        resource_type: r.resource_type
      }))
    }));

    const items: any[] = [];

    for (const r of resources) {
      if (!r?.public_id) continue;
      const rt = r.resource_type;
      if (rt !== "image" && rt !== "video") continue;
      // Try multiple possible field names for asset folder
      const assetFolder = r.asset_folder || r.folder || r.path || r.asset_folder_path;
      // Also check if public_id starts with folder path
      const publicId = r.public_id || "";
      const inFolderByPath = publicId.startsWith(FOLDER + "/") || publicId === FOLDER;
      
      // If API already queried by asset_folder, trust it more
      // But be defensive about field names
      if (assetFolder && assetFolder !== FOLDER && !inFolderByPath) {
        console.log(JSON.stringify({ event: "skipped_asset", public_id: publicId, asset_folder: assetFolder }));
        continue;
      }
      
      const item: any = {
        id: publicId,
        publicId: publicId,
        resourceType: rt,
        url: cloudinary.url(publicId, {
          resource_type: rt,
          secure: true,
          format: r.format,
          type: r.type || "upload",
        }),
        posterUrl: null,
        width: r.width || null,
        height: r.height || null,
        format: r.format || null,
      };
      if (rt === "video") {
        item.posterUrl = buildPoster(publicId);
      }
      items.push(item);
    }

    items.sort((a, b) => String(a.publicId).localeCompare(String(b.publicId)));

    console.log(JSON.stringify({
      event: "cloudinary_manifest_filtered",
      folder: FOLDER,
      returned: items.length,
      total_fetched: resources.length
    }));

    return new Response(JSON.stringify({ items }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300, s-maxage=300",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (e: any) {
    console.log(JSON.stringify({ event: "cloudinary_manifest_error", message: e?.message }));
    return new Response(JSON.stringify({ error: "Failed to fetch manifest" }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
};
