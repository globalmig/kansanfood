import { queryD1, isCloudflareConfigured } from './cloudflare-d1';
import type { Product, Notice } from './types';
import { PRODUCTS } from './products';

// DB 미연결 시 폴백 데이터
const FALLBACK_PRODUCTS: Product[] = PRODUCTS.map((p) => ({
  id: p.id,
  name: p.name,
  category: p.category,
  description: p.desc,
  image: p.src,
  tags: JSON.stringify(p.tags),
  weight: p.weight,
  badge: p.badge,
  is_featured: p.badge === 'BEST' ? 1 : 0,
  created_at: '2025-01-01T00:00:00.000Z',
}));

const FALLBACK_NOTICES: Notice[] = [
  {
    id: 1,
    category: '공지',
    title: '강산푸드 홈페이지 오픈 안내',
    content: '안녕하세요, 강산푸드입니다.\n\n강산푸드 공식 홈페이지가 새롭게 오픈했습니다.\n앞으로 다양한 소식을 이곳에서 전달드리겠습니다.\n\n감사합니다.',
    is_new: 1,
    created_at: '2025-06-01T00:00:00.000Z',
  },
  {
    id: 2,
    category: '제품',
    title: '와사비 직화 신제품 출시',
    content: '강산푸드의 새로운 제품, 와사비 직화가 출시되었습니다.\n\n산뜻한 와사비 소스와 참숯 직화의 만남으로 색다른 맛을 경험해 보세요.\nB2B 납품 문의는 파트너십 페이지를 이용해 주세요.',
    is_new: 1,
    created_at: '2025-05-20T00:00:00.000Z',
  },
  {
    id: 3,
    category: '이벤트',
    title: '파트너사 모집 이벤트 진행 중',
    content: '강산푸드와 함께할 B2B 파트너사를 모집합니다.\n\n편의점, 급식, 외식업체 등 다양한 채널의 파트너사를 찾고 있습니다.\n문의사항은 파트너십 페이지를 통해 연락 주시기 바랍니다.',
    is_new: 0,
    created_at: '2025-05-10T00:00:00.000Z',
  },
  {
    id: 4,
    category: '공지',
    title: 'HACCP 인증 갱신 완료',
    content: '강산푸드의 HACCP 인증이 성공적으로 갱신되었습니다.\n\n앞으로도 위생적이고 안전한 제품 생산을 위해 최선을 다하겠습니다.',
    is_new: 0,
    created_at: '2025-04-15T00:00:00.000Z',
  },
];

export async function getProducts(): Promise<Product[]> {
  if (!isCloudflareConfigured()) return FALLBACK_PRODUCTS;
  try {
    const result = await queryD1<Product>(
      'SELECT * FROM products ORDER BY is_featured DESC, created_at DESC'
    );
    return result.results;
  } catch (err) {
    console.warn('[data] getProducts 실패:', err);
    return FALLBACK_PRODUCTS;
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  if (!isCloudflareConfigured()) {
    return FALLBACK_PRODUCTS.find((p) => p.id === id) ?? null;
  }
  try {
    const result = await queryD1<Product>(
      'SELECT * FROM products WHERE id = ?',
      [id]
    );
    return result.results[0] ?? null;
  } catch (err) {
    console.warn('[data] getProductById 실패:', err);
    return FALLBACK_PRODUCTS.find((p) => p.id === id) ?? null;
  }
}

export async function getNotices(): Promise<Notice[]> {
  if (!isCloudflareConfigured()) return FALLBACK_NOTICES;
  try {
    const result = await queryD1<Notice>(
      'SELECT * FROM notices ORDER BY created_at DESC'
    );
    return result.results;
  } catch (err) {
    console.warn('[data] getNotices 실패:', err);
    return FALLBACK_NOTICES;
  }
}

export async function getNoticeById(id: number): Promise<Notice | null> {
  if (!isCloudflareConfigured()) {
    return FALLBACK_NOTICES.find((n) => n.id === id) ?? null;
  }
  try {
    const result = await queryD1<Notice>(
      'SELECT * FROM notices WHERE id = ?',
      [id]
    );
    return result.results[0] ?? null;
  } catch (err) {
    console.warn('[data] getNoticeById 실패:', err);
    return FALLBACK_NOTICES.find((n) => n.id === id) ?? null;
  }
}

export async function getAdjacentNotices(
  id: number
): Promise<{ prev: Notice | null; next: Notice | null }> {
  if (!isCloudflareConfigured()) {
    const idx = FALLBACK_NOTICES.findIndex((n) => n.id === id);
    return {
      prev: idx < FALLBACK_NOTICES.length - 1 ? FALLBACK_NOTICES[idx + 1] : null,
      next: idx > 0 ? FALLBACK_NOTICES[idx - 1] : null,
    };
  }
  try {
    const all = await getNotices();
    const idx = all.findIndex((n) => n.id === id);
    return {
      prev: idx < all.length - 1 ? all[idx + 1] : null,
      next: idx > 0 ? all[idx - 1] : null,
    };
  } catch (err) {
    console.warn('[data] getAdjacentNotices 실패:', err);
    return { prev: null, next: null };
  }
}
