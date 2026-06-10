"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import type { Product } from "@/lib/types";

interface ProductView {
  id: number;
  src: string;
  name: string;
  category: string;
  desc: string;
  tags: string[];
  weight: string;
  badge: string | null;
}

function toProductView(p: Product): ProductView {
  let tags: string[] = [];
  try {
    tags = JSON.parse(p.tags);
  } catch {
    tags = p.tags ? p.tags.split(",").map((t) => t.trim()) : [];
  }
  return {
    id: p.id,
    src: p.image || "/images/main/item_01.jpg",
    name: p.name,
    category: p.category,
    desc: p.description ?? "",
    tags,
    weight: p.weight ?? "",
    badge: p.badge ?? null,
  };
}

export default function ProductsGrid({ products }: { products: Product[] }) {
  const categories = ["전체", ...Array.from(new Set(products.map((p) => p.category)))];
  const [active, setActive] = useState("전체");

  const views = products.map(toProductView);
  const filtered = active === "전체" ? views : views.filter((p) => p.category === active);

  return (
    <>
      {/* 필터 탭 */}
      <div className="flex gap-2 mb-10 flex-wrap">
        {categories.map((cat) => (
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

      {filtered.length === 0 ? (
        <p className="text-center text-zinc-400 py-20">해당 카테고리의 제품이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-white rounded-2xl overflow-hidden border border-zinc-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-zinc-100 rounded-t-xl">
                <Image
                  src={product.src}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="p-6">
                <p className="text-red-500 text-xs font-semibold tracking-widest uppercase mb-1">
                  {product.category}
                </p>
                <h3 className="text-zinc-900 text-lg font-bold mb-2">{product.name}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">{product.desc}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-zinc-100 text-zinc-500 text-xs px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                  {product.weight && (
                    <span className="text-zinc-400 text-xs">중량 {product.weight}</span>
                  )}
                  <span className="text-xs font-semibold text-zinc-900 group-hover:text-red-500 transition-colors ml-auto">
                    자세히 보기 <FiArrowRight />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
