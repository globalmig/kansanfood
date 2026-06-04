import Image from "next/image";
import Link from "next/link";

const products = [
  { src: "/images/main/item_01.jpg", name: "오리지널 직화", desc: "정통 직화 방식으로 구워낸 강산푸드의 시그니처" },
  { src: "/images/main/item_02.jpg", name: "고추향 직화", desc: "은은한 고추향이 살아있는 깔끔하고 담백한 맛" },
  { src: "/images/main/item_03.jpg", name: "간장마늘 직화", desc: "진한 간장 베이스에 마늘 향이 어우러진 풍미" },
  { src: "/images/main/item_04.jpg", name: "와사비 직화", desc: "산뜻한 와사비 소스가 포인트가 되는 이색 메뉴" },
];

export default function ProductSection() {
  return (
    <section className="bg-zinc-950 py-24 px-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 text-center">
          <p className="text-red-500 text-sm font-semibold tracking-widest uppercase mb-3">Our Products</p>
          <h2 className="text-4xl font-bold text-white">강산푸드 대표 제품</h2>
          <p className="mt-4 text-zinc-400 text-base max-w-md mx-auto">
            엄선된 국내산 닭고기를 사용해 직화로 완성한 강산푸드만의 프리미엄 닭꼬치 라인업입니다.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.name} className="group relative overflow-hidden rounded-lg aspect-[3/4] bg-zinc-900">
              <Image
                src={product.src}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white font-bold text-lg leading-tight">{product.name}</p>
                <p className="text-zinc-300 text-sm mt-1 leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {product.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-white hover:text-zinc-900 transition-colors"
          >
            전체 제품 보기 →
          </Link>
        </div>
      </div>
    </section>
  );
}
