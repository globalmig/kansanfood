export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  tags: string; // JSON 문자열 e.g. '["국내산","HACCP"]'
  weight: string;
  badge: string | null;
  is_featured: number; // 0 or 1
  created_at: string;
}

export interface Notice {
  id: number;
  category: '공지' | '이벤트' | '제품';
  title: string;
  content: string;
  is_new: number; // 0 or 1
  created_at: string;
}
