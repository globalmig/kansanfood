"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FiChevronLeft, FiUpload, FiX } from "react-icons/fi";

const CATEGORIES = ["공지", "이벤트", "제품"] as const;

export default function NewNoticePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    category: "공지" as (typeof CATEGORIES)[number],
    title: "",
    content: "",
    image: "",
    is_new: true,
  });
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function update(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload?folder=notices", { method: "POST", body: fd });
    if (res.ok) {
      const { url } = await res.json();
      update("image", url);
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "이미지 업로드 실패");
    }
    setUploading(false);
    e.target.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const res = await fetch("/api/notices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/admin/notices");
    } else {
      const data = await res.json();
      setError(data.error ?? "저장 실패");
      setSaving(false);
    }
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/notices" className="text-zinc-400 hover:text-zinc-600 transition-colors">
          <FiChevronLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-zinc-900">공지사항 추가</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-zinc-200 p-8 space-y-6">
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

        <Field label="제목 *">
          <input
            type="text"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            required
            placeholder="공지사항 제목을 입력하세요"
            className={inputClass}
          />
        </Field>

        <Field label="내용">
          <textarea
            value={form.content}
            onChange={(e) => update("content", e.target.value)}
            rows={12}
            placeholder="공지사항 내용을 입력하세요"
            className={inputClass}
          />
        </Field>

        <Field label="이미지 (선택)">
          {form.image ? (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-zinc-100">
              <Image src={form.image} alt="공지 이미지" fill className="object-cover" />
              <button
                type="button"
                onClick={() => update("image", "")}
                className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition-colors"
              >
                <FiX size={14} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="w-full flex flex-col items-center justify-center gap-2 border-2 border-dashed border-zinc-200 hover:border-zinc-400 rounded-lg py-10 text-zinc-400 hover:text-zinc-600 transition-colors disabled:opacity-50"
            >
              <FiUpload size={22} />
              <span className="text-sm font-medium">{uploading ? "업로드 중..." : "이미지 업로드"}</span>
              <span className="text-xs text-zinc-300">JPG, PNG, WebP · 최대 5MB</span>
            </button>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={handleImageUpload}
          />
        </Field>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="is_new"
            checked={form.is_new}
            onChange={(e) => update("is_new", e.target.checked)}
            className="w-4 h-4 accent-red-500"
          />
          <label htmlFor="is_new" className="text-sm font-medium text-zinc-700">
            NEW 뱃지 표시
          </label>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving || uploading}
            className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-semibold px-8 py-2.5 rounded-lg text-sm transition-colors"
          >
            {saving ? "저장 중..." : "저장"}
          </button>
          <Link
            href="/admin/notices"
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
