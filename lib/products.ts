export type StaticProduct = {
  id: number;
  src: string;
  name: string;
  category: string;
  desc: string;
  tags: string[];
  weight: string;
  badge: "BEST" | "NEW" | "인기" | null;
};

export const PRODUCTS: StaticProduct[] = [
  {
    id: 1,
    src: "/images/main/item_01.jpg",
    name: "오리지널 직화",
    category: "직화 시리즈",
    desc: "정통 직화 방식으로 구워낸 강산푸드의 시그니처 제품. 국내산 닭고기를 참숯 직화로 구워 깊은 풍미를 살렸습니다.",
    tags: ["국내산", "참숯직화", "HACCP"],
    weight: "500g / 1kg",
    badge: "BEST",
  },
  {
    id: 2,
    src: "/images/main/item_02.jpg",
    name: "고추장 직화",
    category: "직화 시리즈",
    desc: "한국 전통 고추장 소스를 베이스로 은은한 고추향이 살아있는 깔끔하고 담백한 직화 닭꼬치입니다.",
    tags: ["고추장", "국내산", "HACCP"],
    weight: "500g / 1kg",
    badge: null,
  },
  {
    id: 3,
    src: "/images/main/item_03.jpg",
    name: "간장마늘 직화",
    category: "직화 시리즈",
    desc: "진한 간장 베이스에 마늘 향이 어우러진 풍미 깊은 직화 닭꼬치. 편의점·외식 채널에서 꾸준히 사랑받는 제품입니다.",
    tags: ["간장마늘", "국내산", "HACCP"],
    weight: "500g / 1kg",
    badge: null,
  },
  {
    id: 4,
    src: "/images/main/item_04.jpg",
    name: "와사비 직화",
    category: "직화 시리즈",
    desc: "산뜻한 와사비 소스가 포인트가 되는 이색 메뉴. 익숙함에 새로운 자극을 더한 강산푸드의 특화 제품입니다.",
    tags: ["와사비", "국내산", "HACCP"],
    weight: "500g / 1kg",
    badge: "NEW",
  },
  {
    id: 5,
    src: "/images/main/item_01.jpg",
    name: "홈파티 4종 세트",
    category: "세트 상품",
    desc: "오리지널·고추장·간장마늘·와사비 4종을 한 번에 즐길 수 있는 홈파티 세트. 선물용으로도 인기입니다.",
    tags: ["4종 구성", "선물세트", "대용량"],
    weight: "2kg (4종 각 500g)",
    badge: "인기",
  },
  {
    id: 6,
    src: "/images/main/item_02.jpg",
    name: "직화 시리즈 2종 세트",
    category: "세트 상품",
    desc: "원하는 2가지 맛을 골라 구성할 수 있는 맞춤형 세트. B2B 소량 납품에도 활용 가능합니다.",
    tags: ["2종 선택", "맞춤구성"],
    weight: "1kg (2종 각 500g)",
    badge: null,
  },
];
