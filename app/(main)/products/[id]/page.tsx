import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";
import { getProductById, getProducts } from "@/lib/data";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ id: String(p.id) }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(Number(id));
  if (!product) notFound();

  let tags: string[] = [];
  try {
    tags = JSON.parse(product.tags);
  } catch {
    tags = product.tags ? product.tags.split(",").map((t) => t.trim()) : [];
  }

  return (
    <>
      <div className="h-20 bg-zinc-900" />

      <section className="bg-white py-12 md:py-20">
        <div className="max-w-5xl mx-auto px-5 md:px-10">
          {/* 브레드크럼 */}
          <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-10">
            <Link href="/" className="hover:text-zinc-900 transition-colors">HOME</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-zinc-900 transition-colors">제품</Link>
            <span>/</span>
            <span className="text-zinc-900">{product.name}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-8 md:gap-14 items-start">
            {/* 이미지 */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-100">
              <Image
                src={product.image || "/images/main/item_01.jpg"}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  {product.badge}
                </span>
              )}
            </div>

            {/* 정보 */}
            <div className="flex flex-col">
              <p className="text-red-500 text-xs font-semibold tracking-widest uppercase mb-3">
                {product.category}
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 leading-tight mb-4">
                {product.name}
              </h1>
              <p className="text-zinc-500 text-sm md:text-base leading-relaxed mb-6">
                {product.description}
              </p>

              {product.weight && (
                <div className="flex items-center gap-3 py-4 border-t border-b border-zinc-100 mb-6">
                  <span className="text-xs text-zinc-400 w-12 shrink-0">중량</span>
                  <span className="text-sm font-medium text-zinc-700">{product.weight}</span>
                </div>
              )}

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-zinc-100 text-zinc-600 text-xs font-medium px-3 py-1.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-col gap-3">
                {product.store_url && (
                  <a
                    href={product.store_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#03C75A] hover:bg-[#02b050] transition-colors text-white font-semibold px-8 py-4 rounded-md text-sm"
                  >
                    네이버 스마트스토어에서 구매 <FiArrowRight />
                  </a>
                )}
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 transition-colors text-white font-semibold px-8 py-4 rounded-md text-sm"
                >
                  B2B 납품 문의하기 <FiArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 목록으로 */}
      <div className="bg-zinc-50 py-10 px-5 md:px-10 text-center">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 border border-zinc-300 text-zinc-700 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-colors font-semibold px-8 py-3 rounded-md text-sm"
        >
          ← 전체 제품 목록
        </Link>
      </div>
    </>
  );
}
