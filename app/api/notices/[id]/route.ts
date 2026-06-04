import { NextRequest, NextResponse } from 'next/server';
import { queryD1, isCloudflareConfigured } from '@/lib/cloudflare-d1';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

type Params = { params: Promise<{ id: string }> };

export async function GET(_: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    const result = await queryD1('SELECT * FROM notices WHERE id = ?', [Number(id)]);
    if (!result.results.length) {
      return NextResponse.json({ error: '공지사항을 찾을 수 없습니다.' }, { status: 404 });
    }
    return NextResponse.json(result.results[0]);
  } catch (err) {
    console.error('[api/notices/id] GET 실패:', err);
    return NextResponse.json({ error: 'Cloudflare D1 연결에 실패했습니다.' }, { status: 503 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }

  const { id } = await params;
  const { category, title, content, is_new } = await request.json();

  try {
    await queryD1(
      'UPDATE notices SET category=?, title=?, content=?, is_new=? WHERE id=?',
      [category, title, content, is_new ? 1 : 0, Number(id)]
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[api/notices/id] PUT 실패:', err);
    return NextResponse.json({ error: 'Cloudflare D1 연결에 실패했습니다.' }, { status: 503 });
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }

  const { id } = await params;
  try {
    await queryD1('DELETE FROM notices WHERE id = ?', [Number(id)]);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[api/notices/id] DELETE 실패:', err);
    return NextResponse.json({ error: 'Cloudflare D1 연결에 실패했습니다.' }, { status: 503 });
  }
}
