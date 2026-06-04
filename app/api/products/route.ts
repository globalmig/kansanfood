import { NextRequest, NextResponse } from 'next/server';
import { queryD1, isCloudflareConfigured } from '@/lib/cloudflare-d1';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

export async function GET() {
  if (!isCloudflareConfigured()) {
    return NextResponse.json([], { status: 200 });
  }
  try {
    const result = await queryD1(
      'SELECT * FROM products ORDER BY is_featured DESC, created_at DESC'
    );
    return NextResponse.json(result.results);
  } catch (err) {
    console.warn('[api/products] GET 실패:', err);
    return NextResponse.json({ error: 'Cloudflare D1 연결에 실패했습니다.' }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }

  const { name, category, description, image, tags, weight, badge, is_featured } =
    await request.json();

  if (!name) {
    return NextResponse.json({ error: '제품명은 필수입니다.' }, { status: 400 });
  }

  if (!isCloudflareConfigured()) {
    return NextResponse.json({ error: 'Cloudflare D1이 설정되지 않았습니다.' }, { status: 503 });
  }
  try {
    const result = await queryD1(
      `INSERT INTO products (name, category, description, image, tags, weight, badge, is_featured)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        category ?? '직화 시리즈',
        description ?? '',
        image ?? '',
        typeof tags === 'string' ? tags : JSON.stringify(tags ?? []),
        weight ?? '',
        badge ?? null,
        is_featured ? 1 : 0,
      ]
    );
    return NextResponse.json({ id: result.meta.last_row_id }, { status: 201 });
  } catch (err) {
    console.warn('[api/products] POST 실패:', err);
    return NextResponse.json({ error: 'Cloudflare D1 연결에 실패했습니다.' }, { status: 503 });
  }
}
