-- Cloudflare D1 초기화 SQL
-- Cloudflare 대시보드 > D1 > 데이터베이스 선택 > Console 탭에 붙여넣기 후 실행

CREATE TABLE IF NOT EXISTS products (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT    NOT NULL,
  category    TEXT    NOT NULL DEFAULT '직화 시리즈',
  description TEXT,
  image       TEXT,
  tags        TEXT    DEFAULT '[]',
  weight      TEXT,
  badge       TEXT,
  is_featured INTEGER DEFAULT 0,
  store_url   TEXT,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS homepage_sections (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  section    TEXT    NOT NULL,
  product_id INTEGER NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS notices (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  category   TEXT    NOT NULL DEFAULT '공지',
  title      TEXT    NOT NULL,
  content    TEXT,
  is_new     INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 초기 제품 데이터 (선택 사항)
INSERT INTO products (name, category, description, image, tags, weight, badge, is_featured) VALUES
  ('오리지널 직화', '직화 시리즈', '정통 직화 방식으로 구워낸 강산푸드의 시그니처 제품. 국내산 닭고기를 참숯 직화로 구워 깊은 풍미를 살렸습니다.', '/images/main/item_01.jpg', '["국내산","참숯직화","HACCP"]', '500g / 1kg', 'BEST', 1),
  ('고추장 직화', '직화 시리즈', '한국 전통 고추장 소스를 베이스로 은은한 고추향이 살아있는 깔끔하고 담백한 직화 닭꼬치입니다.', '/images/main/item_02.jpg', '["고추장","국내산","HACCP"]', '500g / 1kg', NULL, 0),
  ('간장마늘 직화', '직화 시리즈', '진한 간장 베이스에 마늘 향이 어우러진 풍미 깊은 직화 닭꼬치. 편의점·외식 채널에서 꾸준히 사랑받는 제품입니다.', '/images/main/item_03.jpg', '["간장마늘","국내산","HACCP"]', '500g / 1kg', NULL, 0),
  ('와사비 직화', '직화 시리즈', '산뜻한 와사비 소스가 포인트가 되는 이색 메뉴. 익숙함에 새로운 자극을 더한 강산푸드의 특화 제품입니다.', '/images/main/item_04.jpg', '["와사비","국내산","HACCP"]', '500g / 1kg', 'NEW', 0),
  ('홈파티 4종 세트', '세트 상품', '오리지널·고추장·간장마늘·와사비 4종을 한 번에 즐길 수 있는 홈파티 세트. 선물용으로도 인기입니다.', '/images/main/item_01.jpg', '["4종 구성","선물세트","대용량"]', '2kg (4종 각 500g)', '인기', 0),
  ('직화 시리즈 2종 세트', '세트 상품', '원하는 2가지 맛을 골라 구성할 수 있는 맞춤형 세트. B2B 소량 납품에도 활용 가능합니다.', '/images/main/item_02.jpg', '["2종 선택","맞춤구성"]', '1kg (2종 각 500g)', NULL, 0);

-- 초기 공지사항 데이터 (선택 사항)
INSERT INTO notices (category, title, content, is_new) VALUES
  ('이벤트', '2024 여름 시즌 한정 닭꼬치 세트 출시 기념 할인 행사', '안녕하세요, 강산푸드입니다.

여름 시즌을 맞아 신규 한정 세트 상품 출시를 기념한 특별 할인 행사를 진행합니다.

【 행사 기간 】
2024년 7월 15일(월) ~ 2024년 8월 31일(토)

【 할인 내용 】
- 스마트스토어 구매 시 10% 할인
- 2세트 이상 구매 시 무료배송

감사합니다.', 1),
  ('공지', '강산푸드 공식 홈페이지 오픈 안내', '안녕하세요, 강산푸드입니다.

강산푸드 공식 홈페이지가 새롭게 오픈했습니다.

홈페이지를 통해 제품 정보, B2B 파트너십 문의, 회사 소개 등 다양한 정보를 확인하실 수 있습니다.

앞으로도 강산푸드를 많은 사랑과 관심 부탁드립니다.
감사합니다.', 1);
