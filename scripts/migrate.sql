-- D1 마이그레이션: store_url 컬럼 추가 + homepage_sections 테이블 생성
-- Cloudflare 대시보드 > D1 > kansanfood-db > Console 탭에 아래 SQL을 붙여넣고 실행하세요.

-- 1. products 테이블에 store_url 컬럼 추가
--    (이미 존재하면 에러가 나도 무시하고 다음 SQL로 넘어가세요)
ALTER TABLE products ADD COLUMN store_url TEXT;

-- 2. homepage_sections 테이블 생성 (없는 경우)
CREATE TABLE IF NOT EXISTS homepage_sections (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  section    TEXT    NOT NULL,
  product_id INTEGER NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);
