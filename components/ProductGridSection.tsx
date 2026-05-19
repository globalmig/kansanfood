import Image from "next/image";
import Link from "next/link";

const products = [
  {
    badge: "캠핑용",
    badgeClass: "bg-orange-500",
    src: "/images/main/item_01.jpg",
    name: "오리지널 직화",
    sub: "오리지널 직화",
    price: "28,000",
  },
  {
    badge: "대용량",
    badgeClass: "bg-red-500",
    src: "/images/main/item_02.jpg",
    name: "고추장 직화",
    sub: "고추장",
    price: "29,000",
  },
  {
    badge: "마트 인기 상품",
    badgeClass: "bg-green-500",
    src: "/images/main/item_03.jpg",
    name: "간장 마늘",
    sub: "간장마늘",
    price: "29,000",
  },
  {
    badge: "홈파티/가족모임",
    badgeClass: "bg-green-800",
    src: "/images/main/item_04.jpg",
    name: "홈파티 세트",
    sub: "6종 30입",
    price: "128,000",
  },
];

const grid = [...products, ...products];

export default function ProductGridSection() {
  return (
    <section className="bg-[#F5F0E8] py-16 px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="flex items-center gap-2 text-zinc-500 text-xs font-medium mb-2">
              <span className="block w-6 h-px bg-zinc-500" />
              전문점 퀄리티를 집에서도 간편하게 즐겨보세요.
            </p>
            <h2 className="text-4xl font-extrabold text-zinc-900">
              언제 어디서나 즐기는 프리미엄 닭꼬치
            </h2>
          </div>
          <Link
            href="/products"
            className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            전체 보기 →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {grid.map((product, index) => (
            <Link href="/products" key={index} className="group cursor-pointer">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.src}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className={`absolute top-3 left-3 ${product.badgeClass} text-white text-xs font-medium px-2 py-1 rounded`}
                >
                  {product.badge}
                </span>
              </div>
              <div className="mt-3">
                <p className="font-bold text-zinc-900 text-base">{product.name}</p>
                <p className="text-zinc-400 text-xs mt-0.5">{product.sub}</p>
                <p className="font-bold text-zinc-900 text-sm mt-2">₩{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
