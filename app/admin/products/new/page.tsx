"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CATEGORIES = ["직화 시리즈", "세트 상품", "기타"];

export default function NewProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    category: "직화 시리즈",
    description: "",
    image: "",
    tags: "",
    weight: "",
    badge: "",
    is_featured: false,
  });

  function update(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const tags = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, tags: JSON.stringify(tags) }),
    });

    if (res.ok) {
      router.push("/admin/products");
    } else {
      const data = await res.json();
      setError(data.error ?? "저장 실패");
      setSaving(false);
    }
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/products" className="text-zinc-400 hover:text-zinc-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold text-zinc-900">제품 추가</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-zinc-200 p-8 space-y-6">
        <Field label="제품명 *">
          <input
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
            placeholder="오리지널 직화"
            className={inputClass}
          />
        </Field>

        <Field label="카테고리">
          <select
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            className={inputClass}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>

        <Field label="제품 설명">
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            rows={4}
            placeholder="제품 설명을 입력하세요"
            className={inputClass}
          />
        </Field>

        <Field label="이미지 경로 또는 URL">
          <input
            type="text"
            value={form.image}
            onChange={(e) => update("image", e.target.value)}
            placeholder="/images/main/item_01.jpg"
            className={inputClass}
          />
        </Field>

        <Field label="태그 (쉼표로 구분)">
          <input
            type="text"
            value={form.tags}
            onChange={(e) => update("tags", e.target.value)}
            placeholder="국내산, 참숯직화, HACCP"
            className={inputClass}
          />
        </Field>

        <Field label="용량/중량">
          <input
            type="text"
            value={form.weight}
            onChange={(e) => update("weight", e.target.value)}
            placeholder="500g / 1kg"
            className={inputClass}
          />
        </Field>

        <Field label="뱃지 (선택)">
          <input
            type="text"
            value={form.badge}
            onChange={(e) => update("badge", e.target.value)}
            placeholder="BEST, NEW, 인기 등"
            className={inputClass}
          />
        </Field>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="is_featured"
            checked={form.is_featured}
            onChange={(e) => update("is_featured", e.target.checked)}
            className="w-4 h-4 accent-red-500"
          />
          <label htmlFor="is_featured" className="text-sm font-medium text-zinc-700">
            추천 제품으로 설정 (홈 화면 노출)
          </label>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-semibold px-8 py-2.5 rounded-lg text-sm transition-colors"
          >
            {saving ? "저장 중..." : "저장"}
          </button>
          <Link
            href="/admin/products"
            className="text-zinc-500 hover:text-zinc-700 font-semibold px-4 py-2.5 text-sm transition-colors"
          >
            취소
          </Link>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-700 mb-2">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full border border-zinc-200 rounded-lg px-4 py-2.5 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition";
