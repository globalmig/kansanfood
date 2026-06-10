import { NextRequest, NextResponse } from 'next/server';
import { queryD1, isCloudflareConfigured } from '@/lib/cloudflare-d1';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';
import { getHomepageSection } from '@/lib/data';

const VALID_SECTIONS = ['best', 'premium_grid'] as const;
type Section = (typeof VALID_SECTIONS)[number];

export async function GET(request: NextRequest) {
  const section = request.nextUrl.searchParams.get('section') as Section;
  if (!VALID_SECTIONS.includes(section)) {
    return NextResponse.json({ error: '유효하지 않은 섹션입니다.' }, { status: 400 });
  }
  const products = await getHomepageSection(section);
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }

  if (!isCloudflareConfigured()) {
    return NextResponse.json({ error: 'Cloudflare D1이 설정되지 않았습니다.' }, { status: 503 });
  }

  const { section, product_ids } = await request.json();
  if (!VALID_SECTIONS.includes(section)) {
    return NextResponse.json({ error: '유효하지 않은 섹션입니다.' }, { status: 400 });
  }
  if (!Array.isArray(product_ids)) {
    return NextResponse.json({ error: 'product_ids는 배열이어야 합니다.' }, { status: 400 });
  }

  try {
    await queryD1('DELETE FROM homepage_sections WHERE section = ?', [section]);
    for (let i = 0; i < product_ids.length; i++) {
      await queryD1(
        'INSERT INTO homepage_sections (section, product_id, sort_order) VALUES (?, ?, ?)',
        [section, product_ids[i], i]
      );
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.warn('[api/homepage] POST 실패:', err);
    return NextResponse.json({ error: 'Cloudflare D1 연결에 실패했습니다.' }, { status: 503 });
  }
}
