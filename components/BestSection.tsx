import Image from "next/image";
import Link from "next/link";

const products = [
  { rank: 1, src: "/images/main/item_01.jpg", name: "오리지널 직화", sub: "오리지널", price: "28,000" },
  { rank: 2, src: "/images/main/item_02.jpg", name: "고추장 직화", sub: "고추장", price: "29,000" },
  { rank: 3, src: "/images/main/item_03.jpg", name: "간장 마늘", sub: "간장마늘", price: "29,000" },
  { rank: 4, src: "/images/main/item_04.jpg", name: "홈파티 세트", sub: "4종 파티", price: "128,000" },
];

export default function BestSection() {
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
            전체 보기 →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {products.map((product) => (
            <Link href="/products" key={product.rank} className="group cursor-pointer">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.src}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-0 left-0 w-7 h-7 md:w-8 md:h-8 bg-red-500 flex items-center justify-center">
                  <span className="text-white font-bold text-xs md:text-sm">{product.rank}</span>
                </div>
              </div>
              <div className="mt-2 md:mt-3">
                <p className="font-bold text-zinc-900 text-sm md:text-base">{product.name}</p>
                <p className="text-zinc-400 text-xs mt-0.5">{product.sub}</p>
                <p className="font-bold text-zinc-900 text-sm mt-1.5 md:mt-2">₩{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
