import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import type { Product } from "@/lib/types";

const BADGE_COLORS = [
  "bg-orange-500",
  "bg-red-500",
  "bg-green-500",
  "bg-green-800",
  "bg-blue-500",
  "bg-purple-500",
  "bg-amber-500",
  "bg-teal-500",
];

export default function ProductGridSection({ products }: { products: Product[] }) {
  return (
    <section className="bg-[#F5F0E8] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <p className="flex items-center gap-2 text-zinc-500 text-xs font-medium mb-2">
              <span className="block w-6 h-px bg-zinc-500" />
              대량 납품부터 맞춤 제조까지, 신뢰할 수 있는 B2B 파트너
            </p>
            <h2 className="text-2xl md:text-4xl font-extrabold text-zinc-900">
              안정적인 공급, 검증된 품질의 강산푸드
            </h2>
          </div>
          <Link
            href="/products"
            className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors shrink-0"
          >
            전체 보기 <FiArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {products.map((product, index) => (
            <Link href={`/products/${product.id}`} key={product.id} className="group cursor-pointer">
              <div className="relative aspect-square overflow-hidden bg-zinc-100 rounded-lg">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs text-zinc-400">이미지 준비중</span>
                  </div>
                )}
                <span
                  className={`absolute top-3 left-3 ${BADGE_COLORS[index % BADGE_COLORS.length]} text-white text-xs font-medium px-2 py-1 rounded`}
                >
                  {product.badge ?? product.category}
                </span>
              </div>
              <div className="mt-3">
                <p className="font-bold text-zinc-900 text-base">{product.name}</p>
                <p className="text-zinc-400 text-xs mt-0.5">{product.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
