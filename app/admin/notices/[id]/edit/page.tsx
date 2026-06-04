"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import type { Notice } from "@/lib/types";

const CATEGORIES = ["공지", "이벤트", "제품"] as const;

export default function EditNoticePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    category: "공지" as (typeof CATEGORIES)[number],
    title: "",
    content: "",
    is_new: false,
  });

  useEffect(() => {
    fetch(`/api/notices/${params.id}`)
      .then(async (r) => {
        if (!r.ok) {
          const data = await r.json().catch(() => ({}));
          throw new Error(data.error ?? "데이터를 불러오지 못했습니다.");
        }
        return r.json();
      })
      .then((n: Notice) => {
        setForm({
          category: n.category,
          title: n.title,
          content: n.content ?? "",
          is_new: Boolean(n.is_new),
        });
      })
      .catch((err: Error) => {
        setError(err.message || "서버에 연결할 수 없습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params.id]);

  function update(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const res = await fetch(`/api/notices/${params.id}`, {
      method: "PUT",
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

  if (loading) {
    return <div className="p-8 text-zinc-400">불러오는 중...</div>;
  }

  if (error && !form.title) {
    return (
      <div className="p-8">
        <div className="rounded-lg bg-red-50 border border-red-200 px-5 py-4 text-sm text-red-600 mb-4">
          {error}
        </div>
        <button onClick={() => router.back()} className="text-sm text-zinc-500 hover:text-zinc-700">
          ← 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/notices" className="text-zinc-400 hover:text-zinc-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold text-zinc-900">공지사항 수정</h1>
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
            className={inputClass}
          />
        </Field>

        <Field label="내용">
          <textarea
            value={form.content}
            onChange={(e) => update("content", e.target.value)}
            rows={12}
            className={inputClass}
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
            disabled={saving}
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
