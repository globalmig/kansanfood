"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiChevronUp, FiChevronDown, FiX, FiPlus, FiSave, FiCheck, FiMenu } from "react-icons/fi";
import type { Product } from "@/lib/types";

type SectionKey = "best" | "premium_grid";

const SECTION_META: Record<SectionKey, { label: string; desc: string; maxCount: number }> = {
  best: {
    label: "BEST 상품",
    desc: "메인 페이지 상단 BEST 상품 섹션 (최대 4개)",
    maxCount: 4,
  },
  premium_grid: {
    label: "프리미엄 닭꼬치 섹션",
    desc: "언제 어디서나 즐기는 프리미엄 닭꼬치 그리드 (최대 8개)",
    maxCount: 8,
  },
};

export default function AdminHomepagePage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [sections, setSections] = useState<Record<SectionKey, Product[]>>({
    best: [],
    premium_grid: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<SectionKey | null>(null);
  const [saved, setSaved] = useState<SectionKey | null>(null);
  const [error, setError] = useState("");
  const [addOpen, setAddOpen] = useState<SectionKey | null>(null);
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragItemRef = useRef<{ section: SectionKey; index: number } | null>(null);
  const [dragSource, setDragSource] = useState<{ section: SectionKey; index: number } | null>(null);
  const [dragOver, setDragOver] = useState<{ section: SectionKey; index: number } | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [productsRes, bestRes, gridRes] = await Promise.all([fetch("/api/products"), fetch("/api/homepage?section=best"), fetch("/api/homepage?section=premium_grid")]);
        const [products, best, grid] = await Promise.all([productsRes.json(), bestRes.json(), gridRes.json()]);
        setAllProducts(Array.isArray(products) ? products : []);
        setSections({
          best: Array.isArray(best) ? best : [],
          premium_grid: Array.isArray(grid) ? grid : [],
        });
      } catch {
        setError("데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function moveUp(section: SectionKey, index: number) {
    if (index === 0) return;
    setSections((prev) => {
      const list = [...prev[section]];
      [list[index - 1], list[index]] = [list[index], list[index - 1]];
      return { ...prev, [section]: list };
    });
  }

  function moveDown(section: SectionKey, index: number) {
    setSections((prev) => {
      const list = [...prev[section]];
      if (index === list.length - 1) return prev;
      [list[index], list[index + 1]] = [list[index + 1], list[index]];
      return { ...prev, [section]: list };
    });
  }

  function remove(section: SectionKey, id: number) {
    setSections((prev) => ({
      ...prev,
      [section]: prev[section].filter((p) => p.id !== id),
    }));
  }

  function addProduct(section: SectionKey, product: Product) {
    setSections((prev) => {
      if (prev[section].length >= SECTION_META[section].maxCount) return prev;
      if (prev[section].some((p) => p.id === product.id)) return prev;
      return { ...prev, [section]: [...prev[section], product] };
    });
    setAddOpen(null);
  }

  function handleDragStart(section: SectionKey, index: number) {
    dragItemRef.current = { section, index };
    setDragSource({ section, index });
  }

  function handleDragOver(e: React.DragEvent, section: SectionKey, index: number) {
    e.preventDefault();
    if (!dragItemRef.current || dragItemRef.current.section !== section) return;
    if (dragItemRef.current.index !== index) {
      setDragOver({ section, index });
    }
  }

  function handleDrop(section: SectionKey, dropIndex: number) {
    if (!dragItemRef.current || dragItemRef.current.section !== section) return;
    const fromIndex = dragItemRef.current.index;
    if (fromIndex === dropIndex) return;
    setSections((prev) => {
      const list = [...prev[section]];
      const [item] = list.splice(fromIndex, 1);
      list.splice(dropIndex, 0, item);
      return { ...prev, [section]: list };
    });
    dragItemRef.current = null;
    setDragSource(null);
    setDragOver(null);
  }

  function handleDragEnd() {
    dragItemRef.current = null;
    setDragSource(null);
    setDragOver(null);
  }

  async function save(section: SectionKey) {
    setSaving(section);
    try {
      const res = await fetch("/api/homepage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section,
          product_ids: sections[section].map((p) => p.id),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error ?? "저장에 실패했습니다.");
      } else {
        setSaved(section);
        if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
        savedTimerRef.current = setTimeout(() => setSaved(null), 2000);
      }
    } catch {
      alert("서버에 연결할 수 없습니다.");
    } finally {
      setSaving(null);
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center py-40 text-zinc-400">불러오는 중...</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900">메인화면 상품 관리</h2> <br />
        <p className="text-zinc-500 text-sm mt-1">메인 페이지 섹션별 노출 상품을 설정합니다.</p>
        <p className="text-zinc-400 text-sm mt-1">※ 상품 등록 및 수정은 제품 관리 페이지에서 진행 부탁드립니다.</p>
      </div>

      {error && <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-5 py-4 text-sm text-red-600">{error}</div>}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {(Object.keys(SECTION_META) as SectionKey[]).map((section) => {
          const { label, desc, maxCount } = SECTION_META[section];
          const list = sections[section];
          const available = allProducts.filter((p) => !list.some((s) => s.id === p.id));
          const canAdd = available.length > 0 && list.length < maxCount;

          return (
            <div key={section} className="bg-white rounded-2xl border border-zinc-200 overflow-visible">
              {/* 헤더 */}
              <div className="px-6 py-5 border-b border-zinc-100">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-bold text-zinc-900">{label}</h2>
                    <p className="text-xs text-zinc-400 mt-0.5">{desc}</p>
                    <p className="text-xs text-zinc-400 mt-1">
                      <span className={list.length >= maxCount ? "text-red-500 font-semibold" : "text-zinc-500 font-semibold"}>{list.length}</span>
                      <span className="text-zinc-300"> / {maxCount}개</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {canAdd && (
                      <div className="relative">
                        <button
                          onClick={() => setAddOpen(addOpen === section ? null : section)}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold border border-zinc-200 hover:border-zinc-400 text-zinc-600 hover:text-zinc-900 px-3 py-2 rounded-lg transition-colors"
                        >
                          <FiPlus size={14} />
                          상품 추가
                        </button>
                        {addOpen === section && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setAddOpen(null)} />
                            <div className="absolute right-0 top-full mt-1 z-20 w-64 bg-white border border-zinc-200 rounded-xl shadow-xl overflow-hidden">
                              <p className="px-4 pt-3 pb-2 text-xs font-semibold text-zinc-400 tracking-widest uppercase">상품 선택</p>
                              <ul className="max-h-64 overflow-y-auto divide-y divide-zinc-100">
                                {available.map((p) => (
                                  <li key={p.id}>
                                    <button onClick={() => addProduct(section, p)} className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-zinc-50 transition-colors">
                                      <div className="relative w-9 h-9 rounded overflow-hidden bg-zinc-100 shrink-0 flex items-center justify-center">
                                        {p.image ? (
                                          <Image src={p.image} alt={p.name} fill className="object-cover" sizes="36px" />
                                        ) : (
                                          <span className="text-[7px] text-zinc-300 text-center leading-tight px-0.5">이미지 준비중</span>
                                        )}
                                      </div>
                                      <div className="min-w-0">
                                        <p className="text-sm font-medium text-zinc-900 truncate">{p.name}</p>
                                        <p className="text-xs text-zinc-400">{p.category}</p>
                                      </div>
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                    <button
                      onClick={() => save(section)}
                      disabled={saving === section}
                      className={`inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-60 ${
                        saved === section ? "bg-green-500 text-white" : "bg-red-500 hover:bg-red-600 text-white"
                      }`}
                    >
                      {saved === section ? (
                        <>
                          <FiCheck size={14} />
                          저장됨
                        </>
                      ) : (
                        <>
                          <FiSave size={14} />
                          {saving === section ? "저장 중..." : "저장"}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* 상품 목록 */}
              {list.length === 0 ? (
                <div className="py-12 text-center text-sm text-zinc-400">
                  등록된 상품이 없습니다.
                  <br />
                  <span className="text-zinc-300">상품 추가 버튼으로 노출할 상품을 추가하세요.</span>
                </div>
              ) : (
                <ul className="divide-y divide-zinc-100">
                  {list.map((p, i) => {
                    const isDraggingOver = dragOver?.section === section && dragOver?.index === i;
                    const isDragging = dragSource?.section === section && dragSource?.index === i;
                    return (
                      <li
                        key={p.id}
                        draggable
                        onDragStart={() => handleDragStart(section, i)}
                        onDragOver={(e) => handleDragOver(e, section, i)}
                        onDrop={() => handleDrop(section, i)}
                        onDragEnd={handleDragEnd}
                        className={`flex items-center gap-4 px-6 py-3.5 transition-colors select-none ${isDragging ? "opacity-40" : ""} ${isDraggingOver ? "bg-red-50 border-l-2 border-l-red-400" : ""}`}
                      >
                        <span className="text-zinc-300 cursor-grab active:cursor-grabbing shrink-0">
                          <FiMenu size={15} />
                        </span>
                        <span className="w-5 text-center text-sm font-bold text-zinc-300 shrink-0">{i + 1}</span>
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-100 shrink-0 flex items-center justify-center">
                          {p.image ? (
                            <Image src={p.image} alt={p.name} fill className="object-cover" sizes="48px" />
                          ) : (
                            <span className="text-[8px] text-zinc-300 text-center leading-tight px-1">이미지 준비중</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-zinc-900 text-sm truncate">{p.name}</p>
                          <p className="text-xs text-zinc-400 mt-0.5">{p.category}</p>
                        </div>
                        {p.badge && <span className="shrink-0 bg-red-50 text-red-500 text-xs font-semibold px-2 py-0.5 rounded-full">{p.badge}</span>}
                        <div className="flex items-center gap-1 shrink-0">
                          <button onClick={() => moveUp(section, i)} disabled={i === 0} className="p-1 text-zinc-400 hover:text-zinc-700 disabled:opacity-20 transition-colors">
                            <FiChevronUp size={16} />
                          </button>
                          <button onClick={() => moveDown(section, i)} disabled={i === list.length - 1} className="p-1 text-zinc-400 hover:text-zinc-700 disabled:opacity-20 transition-colors">
                            <FiChevronDown size={16} />
                          </button>
                          <button onClick={() => remove(section, p.id)} className="p-1 text-zinc-400 hover:text-red-500 transition-colors ml-1">
                            <FiX size={16} />
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
