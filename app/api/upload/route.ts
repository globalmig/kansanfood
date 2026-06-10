import { NextRequest, NextResponse } from 'next/server';
import { uploadToR2, isR2Configured } from '@/lib/cloudflare-r2';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';
import { randomUUID } from 'crypto';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }

  if (!isR2Configured()) {
    return NextResponse.json({ error: 'R2가 설정되지 않았습니다.' }, { status: 503 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: '파일이 없습니다.' }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'jpg, png, webp, gif만 업로드 가능합니다.' }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: '파일 크기는 5MB 이하여야 합니다.' }, { status: 400 });
  }

  const folder = (request.nextUrl.searchParams.get('folder') ?? 'products').replace(/[^a-z_-]/g, '');
  const ext = file.name.split('.').pop() ?? 'jpg';
  const key = `${folder}/${randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const url = await uploadToR2(key, buffer, file.type);
  return NextResponse.json({ url });
}
