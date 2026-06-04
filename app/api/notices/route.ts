import { NextRequest, NextResponse } from 'next/server';
import { queryD1, isCloudflareConfigured } from '@/lib/cloudflare-d1';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

export async function GET() {
  if (!isCloudflareConfigured()) {
    return NextResponse.json([], { status: 200 });
  }
  try {
    const result = await queryD1('SELECT * FROM notices ORDER BY created_at DESC');
    return NextResponse.json(result.results);
  } catch (err) {
    console.warn('[api/notices] GET 실패:', err);
    return NextResponse.json({ error: 'Cloudflare D1 연결에 실패했습니다.' }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }

  const { category, title, content, is_new } = await request.json();

  if (!title) {
    return NextResponse.json({ error: '제목은 필수입니다.' }, { status: 400 });
  }

  if (!isCloudflareConfigured()) {
    return NextResponse.json({ error: 'Cloudflare D1이 설정되지 않았습니다.' }, { status: 503 });
  }
  try {
    const result = await queryD1(
      'INSERT INTO notices (category, title, content, is_new) VALUES (?, ?, ?, ?)',
      [category ?? '공지', title, content ?? '', is_new ? 1 : 0]
    );
    return NextResponse.json({ id: result.meta.last_row_id }, { status: 201 });
  } catch (err) {
    console.warn('[api/notices] POST 실패:', err);
    return NextResponse.json({ error: 'Cloudflare D1 연결에 실패했습니다.' }, { status: 503 });
  }
}
