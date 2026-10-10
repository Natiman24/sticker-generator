"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductEntry } from "./types";

const emptyEntry = (): ProductEntry => ({
  name: "",
  poNumber: "",
  totalItems: "",
  itemsPerCarton: "",
});

export default function Home() {
  const router = useRouter();
  const [entries, setEntries] = useState<ProductEntry[]>([
    emptyEntry(),
    emptyEntry(),
    emptyEntry(),
    emptyEntry(),
  ]);

  const update = (index: number, field: keyof ProductEntry, value: string) => {
    setEntries((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleGenerate = () => {
    const data = encodeURIComponent(JSON.stringify(entries));
    router.push(`/print?data=${data}`);
  };

  const hasAnyEntry = entries.some((e) => e.name.trim() !== "");

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Carton Sticker Generator</h1>
        <p className="text-gray-500 mb-8 text-sm">
          Fill in up to 4 products. Leave unused rows blank.
        </p>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-4 gap-px bg-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wide">
            <div className="bg-gray-50 px-4 py-3">Product Name</div>
            <div className="bg-gray-50 px-4 py-3">PO Number</div>
            <div className="bg-gray-50 px-4 py-3">Total Items</div>
            <div className="bg-gray-50 px-4 py-3">Items per Carton</div>
          </div>

          {/* Rows */}
          {entries.map((entry, i) => (
            <div
              key={i}
              className="grid grid-cols-4 gap-px bg-gray-100 border-t border-gray-100"
            >
              <div className="bg-white px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 w-4">{i + 1}</span>
                  <input
                    type="text"
                    placeholder="e.g. PP Module"
                    value={entry.name}
                    onChange={(e) => update(i, "name", e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-blue-400"
                  />
                </div>
              </div>
              <div className="bg-white px-3 py-2">
                <input
                  type="text"
                  placeholder="e.g. 81121223"
                  value={entry.poNumber}
                  onChange={(e) => update(i, "poNumber", e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-blue-400"
                />
              </div>
              <div className="bg-white px-3 py-2">
                <input
                  type="number"
                  placeholder="e.g. 235"
                  value={entry.totalItems}
                  onChange={(e) => update(i, "totalItems", e.target.value)}
                  min={1}
                  className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-blue-400"
                />
              </div>
              <div className="bg-white px-3 py-2">
                <input
                  type="number"
                  placeholder="e.g. 25"
                  value={entry.itemsPerCarton}
                  onChange={(e) => update(i, "itemsPerCarton", e.target.value)}
                  min={1}
                  className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-blue-400"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Preview of sticker count */}
        <StickerPreview entries={entries} />

        <button
          onClick={handleGenerate}
          disabled={!hasAnyEntry}
          className="mt-6 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Generate Print Sheet →
        </button>
      </div>
    </main>
  );
}

function StickerPreview({ entries }: { entries: ProductEntry[] }) {
  const rows: { name: string; full: number; remainder: number; total: number }[] = [];

  for (const e of entries) {
    const name = e.name.trim();
    const total = parseInt(e.totalItems);
    const per = parseInt(e.itemsPerCarton);
    if (!name || isNaN(total) || isNaN(per) || per <= 0) continue;
    const full = Math.floor(total / per);
    const rem = total % per;
    rows.push({ name, full, remainder: rem, total: full + (rem > 0 ? 1 : 0) });
  }

  if (rows.length === 0) return null;

  const totalStickers = rows.reduce((a, r) => a + r.total, 0);
  const sheets = Math.ceil(totalStickers / 6);

  return (
    <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 text-sm text-blue-800">
      <span className="font-semibold">Preview: </span>
      {rows.map((r, i) => (
        <span key={i}>
          {r.name}: {r.full} × full{r.remainder > 0 ? ` + 1 × ${r.remainder} pcs` : ""}
          {i < rows.length - 1 ? " | " : ""}
        </span>
      ))}
      <span className="ml-2 font-semibold">→ {totalStickers} stickers / {sheets} sheet{sheets !== 1 ? "s" : ""}</span>
    </div>
  );
}
