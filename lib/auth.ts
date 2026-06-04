const COOKIE_NAME = 'admin_token';
const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24시간

async function getKey(): Promise<CryptoKey> {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) throw new Error('ADMIN_JWT_SECRET 환경변수가 설정되지 않았습니다.');
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export async function createToken(): Promise<string> {
  const payload = btoa(JSON.stringify({ exp: Date.now() + TOKEN_TTL_MS }));
  const key = await getKey();
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig)));
  return `${payload}.${sigB64}`;
}

export async function verifyToken(token: string): Promise<boolean> {
  const dotIdx = token.lastIndexOf('.');
  if (dotIdx === -1) return false;
  const payload = token.slice(0, dotIdx);
  const sigB64 = token.slice(dotIdx + 1);
  try {
    const key = await getKey();
    const sig = Uint8Array.from(atob(sigB64), (c) => c.charCodeAt(0));
    const valid = await crypto.subtle.verify('HMAC', key, sig, new TextEncoder().encode(payload));
    if (!valid) return false;
    const { exp } = JSON.parse(atob(payload));
    return typeof exp === 'number' && exp > Date.now();
  } catch {
    return false;
  }
}

export { COOKIE_NAME };
