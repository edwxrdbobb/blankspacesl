import { NextResponse } from 'next/server';
import { cloudinary } from '@/lib/cloudinary';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get('folder'); // e.g. "my-folder/subfolder"

  if (!folder) {
    return NextResponse.json({ error: 'Missing folder param' }, { status: 400 });
  }

  try {
    const result = await cloudinary.search
      .expression(`asset_folder="${folder}"`) // or asset_folder:${folder}/*
      .max_results(500)                      // adjust as needed
      .execute();                            // returns { resources: [...] }

    const images = result.resources.map((r: any) => ({
      public_id: r.public_id,
      format: r.format,
      secure_url: r.secure_url,
      width: r.width,
      height: r.height,
      folder: r.asset_folder,
    }));

    return NextResponse.json({ images });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: 'Cloudinary error' }, { status: 500 });
  }
}
