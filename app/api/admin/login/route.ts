import { NextRequest, NextResponse } from 'next/server';
import { createToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: '비밀번호가 올바르지 않습니다.' }, { status: 401 });
  }

  let token: string;
  try {
    token = await createToken();
  } catch {
    return NextResponse.json({ error: '서버 설정 오류' }, { status: 500 });
  }
  const response = NextResponse.json({ success: true });

  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24시간
    path: '/',
  });

  return response;
}
