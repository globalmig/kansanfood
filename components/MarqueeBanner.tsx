const MARQUEE_ITEMS = [
  "강산푸드·KANSAN",
  "직화 닭꼬치 전문",
  "Since 2017",
  "참숯 직화",
  "국내산 신선육 브라질육",
];

function MarqueeTrack() {
  return (
    <>
      {MARQUEE_ITEMS.map((item, i) => (
        <span key={i} className="flex items-center gap-6 shrink-0">
          <span className="text-sm font-medium tracking-widest text-white/90 uppercase whitespace-nowrap">
            {item}
          </span>
          <span className="text-white/50 text-base">·</span>
        </span>
      ))}
    </>
  );
}

export default function MarqueeBanner() {
  return (
    <div className="w-full overflow-hidden bg-[#7a1a1a] py-3">
      <div className="flex animate-marquee w-max gap-6">
        {/* 두 벌 렌더링 → 끊김 없는 루프 */}
        <MarqueeTrack />
        <MarqueeTrack />
      </div>
    </div>
  );
}
