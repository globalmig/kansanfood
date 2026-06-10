import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import type { Product } from "@/lib/types";

export default function BestSection({ products }: { products: Product[] }) {
  return (
    <section className="bg-[#F5F0E8] py-12 md:py-16 px-5 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <div>
            <p className="flex items-center gap-2 text-red-500 text-xs font-medium mb-2">
              <span className="block w-6 h-px bg-red-500" />
              시그니처 제품
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900">BEST 상품</h2>
          </div>
          <Link
            href="/products"
            className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors shrink-0"
          >
            전체 보기 <FiArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {products.map((product, i) => (
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
                <div className="absolute top-0 left-0 w-7 h-7 md:w-8 md:h-8 bg-red-500 flex items-center justify-center">
                  <span className="text-white font-bold text-xs md:text-sm">{i + 1}</span>
                </div>
              </div>
              <div className="mt-2 md:mt-3">
                <p className="font-bold text-zinc-900 text-sm md:text-base">{product.name}</p>
                <p className="text-zinc-400 text-xs mt-0.5">{product.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
