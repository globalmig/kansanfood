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
      <footer className="bg-zinc-900 text-zinc-400 text-sm py-8 px-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-1">
          <p className="font-semibold text-white">강산푸드</p>
          <p>대표: 홍길동 · 사업자등록번호: 000-00-00000</p>
          <p>주소: 경기도 어딘가</p>
          <p className="mt-3 text-zinc-600">© 2024 강산푸드. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
