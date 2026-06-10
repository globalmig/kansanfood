"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FiChevronLeft } from "react-icons/fi";

const CATEGORIES = ["직화 시리즈", "세트 상품", "기타"];

export default function NewProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    name: "",
    category: "직화 시리즈",
    description: "",
    image: "",
    tags: "",
    weight: "",
    badge: "",
    is_featured: false,
    store_url: "",
  });

  function update(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (res.ok) {
      update("image", data.url);
    } else {
      setError(data.error ?? "업로드 실패");
    }
    setUploading(false);
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
          <FiChevronLeft size={20} />
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

        <Field label="이미지">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="bg-zinc-100 hover:bg-zinc-200 disabled:opacity-50 text-zinc-700 font-medium px-4 py-2 rounded-lg text-sm transition-colors"
              >
                {uploading ? "업로드 중..." : "파일 선택"}
              </button>
              <span className="text-xs text-zinc-400">jpg, png, webp, gif · 최대 5MB</span>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            {form.image && (
              <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-zinc-200">
                <Image src={form.image} alt="미리보기" fill className="object-cover" unoptimized />
              </div>
            )}
          </div>
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

        <Field label="스토어 링크 (선택)">
          <input
            type="url"
            value={form.store_url}
            onChange={(e) => update("store_url", e.target.value)}
            placeholder="https://smartstore.naver.com/..."
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
