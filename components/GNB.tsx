"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const NAV_ITEMS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "PRODUCTS", href: "/products" },
  { label: "공지사항", href: "/notice" },
];

export default function GNB() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { closeSearch(); setMenuOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function closeSearch() { setSearchOpen(false); setQuery(""); }

  function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    closeSearch();
    router.push(`/products?q=${encodeURIComponent(q)}`);
  }

  const iconColor = scrolled || menuOpen
    ? "text-gray-800 hover:text-red-500"
    : "text-white hover:text-red-400";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 py-4 md:py-5 transition-all duration-300 ${
          scrolled || menuOpen ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        {/* 로고 */}
        <Link href="/" onClick={() => setMenuOpen(false)}>
          <Image
            src="/images/common/logo_white.png"
            alt="강산푸드 로고"
            width={100}
            height={34}
            className={`object-contain transition-all duration-300 md:w-[120px] ${
              scrolled || menuOpen ? "brightness-0" : "brightness-100"
            }`}
            priority
          />
        </Link>

        {/* 데스크톱 네비 */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium tracking-widest transition-colors ${
                scrolled ? "text-gray-800 hover:text-red-500" : "text-white hover:text-red-400"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 우측 액션 */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="검색 열기"
            className={`transition-colors ${iconColor}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
            </svg>
          </button>

          <a
            href="https://smartstore.naver.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex rounded-full bg-red-500 px-5 py-2 text-sm font-semibold text-white hover:bg-red-600 transition-colors"
          >
            스마트스토어
          </a>

          {/* 햄버거 버튼 — 모바일 전용 */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            className={`md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 ${iconColor}`}
          >
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </header>

      {/* 모바일 풀스크린 메뉴 */}
      <div
        className={`fixed inset-0 z-40 bg-white flex flex-col pt-20 px-8 pb-10 md:hidden transition-all duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col flex-1 justify-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-bold text-zinc-900 py-5 border-b border-zinc-100 hover:text-red-500 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          href="https://smartstore.naver.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-center rounded-full bg-red-500 py-4 text-base font-semibold text-white hover:bg-red-600 transition-colors"
        >
          스마트스토어 바로가기
        </a>
      </div>

      {/* 검색 오버레이 */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-60 bg-black/70 flex items-start justify-center pt-24 md:pt-32 px-4"
          onClick={closeSearch}
        >
          <div className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit} className="relative">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="제품명을 검색하세요..."
                className="w-full rounded-full bg-white px-6 py-4 pr-14 text-base text-zinc-900 placeholder-zinc-400 shadow-xl outline-none"
              />
              <button type="submit" aria-label="검색" className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8" />
                  <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
                </svg>
              </button>
            </form>
            <p className="mt-3 text-center text-sm text-white/60">Enter로 검색 · Esc로 닫기</p>
          </div>
        </div>
      )}
    </>
  );
}
