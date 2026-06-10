import GNB from "@/components/GNB";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full flex flex-col">
      <GNB />
      <main className="flex-1">{children}</main>
      <footer className="bg-zinc-900 text-zinc-400 text-sm py-6 md:py-8 px-5 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-1">
          <p className="font-semibold text-white">강산푸드</p>
          <p>대표: 김용화 · 사업자등록번호: 195-55-01078</p>
          <p>주소: 광주광역시 광산구 하남산단6번로 57, 비동 110호(오선동)</p>
          <p className="mt-3 text-zinc-600">© 2026 강산푸드. All rights reserved.</p>
          <p className="text-zinc-700 text-xs mt-1">
            Designed & Developed by{" "}
            <a
              href="https://www.weasley-market.com/homepage-development/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-400 underline underline-offset-2 transition-colors"
            >
              글로벌엠아이지
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
