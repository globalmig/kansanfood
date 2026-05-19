"use client";

import Image from "next/image";
import { useState } from "react";

const PRODUCTS = [
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

const CATEGORIES = ["전체", "직화 시리즈", "세트 상품"];

export default function ProductsGrid() {
  const [active, setActive] = useState("전체");

  const filtered =
    active === "전체" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);

  return (
    <>
      {/* 필터 탭 */}
      <div className="flex gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
              active === cat
                ? "bg-zinc-900 text-white"
                : "bg-white border border-zinc-200 text-zinc-500 hover:border-zinc-400 hover:text-zinc-900"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 제품 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((product) => (
          <div key={product.id} className="group bg-white rounded-2xl overflow-hidden border border-zinc-100 hover:shadow-lg transition-shadow duration-300">
            {/* 이미지 */}
            <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
              <Image
                src={product.src}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {product.badge}
                </span>
              )}
            </div>

            {/* 정보 */}
            <div className="p-6">
              <p className="text-red-500 text-xs font-semibold tracking-widest uppercase mb-1">
                {product.category}
              </p>
              <h3 className="text-zinc-900 text-lg font-bold mb-2">{product.name}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">{product.desc}</p>

              <div className="flex items-center justify-between">
                {/* 태그 */}
                <div className="flex flex-wrap gap-1.5">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-zinc-100 text-zinc-500 text-xs px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-zinc-400 text-xs">중량 {product.weight}</span>
                <button className="text-xs font-semibold text-zinc-900 hover:text-red-500 transition-colors">
                  문의하기 →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
