import { NextRequest, NextResponse } from 'next/server';
import { getFromR2 } from '@/lib/cloudflare-r2';

type Params = { params: Promise<{ key: string[] }> };

export async function GET(_: NextRequest, { params }: Params) {
  const { key } = await params;
  const objectKey = key.join('/');

  try {
    const result = await getFromR2(objectKey);
    if (!result) {
      return NextResponse.json({ error: '이미지를 찾을 수 없습니다.' }, { status: 404 });
    }

    return new NextResponse(result.body, {
      headers: {
        'Content-Type': result.contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return NextResponse.json({ error: '이미지를 불러올 수 없습니다.' }, { status: 500 });
  }
}
