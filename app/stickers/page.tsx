"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductEntry } from "../types";

const emptyEntry = (): ProductEntry => ({
  name: "",
  poNumber: "",
  totalItems: "",
  itemsPerCarton: "",
});

const inputCls =
  "w-full text-sm border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400";

export default function StickersPage() {
  const router = useRouter();
  const [entries, setEntries] = useState<ProductEntry[]>([
    emptyEntry(),
    emptyEntry(),
    emptyEntry(),
    emptyEntry(),
  ]);
  const [sharedPO, setSharedPO] = useState(false);
  const [commonPO, setCommonPO] = useState("");

  const update = (index: number, field: keyof ProductEntry, value: string) => {
    setEntries((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const addRow = () => setEntries((prev) => [...prev, emptyEntry()]);

  const removeRow = (index: number) => {
    setEntries((prev) => prev.filter((_, i) => i !== index));
  };

  const resolvedEntries: ProductEntry[] = entries.map((e) => ({
    ...e,
    poNumber: sharedPO ? commonPO : e.poNumber,
  }));

  const handleGenerate = () => {
    const data = encodeURIComponent(JSON.stringify(resolvedEntries));
    router.push(`/print?data=${data}`);
  };

  const hasAnyEntry = entries.some((e) => e.name.trim() !== "");

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => router.push("/")}
          className="text-sm text-gray-500 hover:text-gray-800 mb-6 flex items-center gap-1"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Carton Sticker Generator</h1>
        <p className="text-gray-500 mb-8 text-sm">Fill in product details. Leave unused rows blank.</p>

        {/* Shared PO toggle */}
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => setSharedPO((v) => !v)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
              sharedPO ? "bg-blue-600" : "bg-gray-300"
            }`}
            role="switch"
            aria-checked={sharedPO}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                sharedPO ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className="text-sm text-gray-700 font-medium">Same PO for all</span>
          {sharedPO && (
            <input
              type="text"
              placeholder="Enter common PO number"
              value={commonPO}
              onChange={(e) => setCommonPO(e.target.value)}
              className="text-sm border border-gray-200 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400 w-56"
              autoFocus
            />
          )}
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div
            className="grid gap-px bg-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wide"
            style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr auto" }}
          >
            <div className="bg-gray-50 px-4 py-3">Product Name</div>
            <div className="bg-gray-50 px-4 py-3">
              PO Number{sharedPO && <span className="ml-1 normal-case font-normal text-blue-500">(shared)</span>}
            </div>
            <div className="bg-gray-50 px-4 py-3">Total Items</div>
            <div className="bg-gray-50 px-4 py-3">Items per Carton</div>
            <div className="bg-gray-50 px-4 py-3" />
          </div>

          {entries.map((entry, i) => (
            <div
              key={i}
              className="grid gap-px bg-gray-100 border-t border-gray-100"
              style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr auto" }}
            >
              <div className="bg-white px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 w-4 shrink-0">{i + 1}</span>
                  <input
                    type="text"
                    placeholder="e.g. PP Module"
                    value={entry.name}
                    onChange={(e) => update(i, "name", e.target.value)}
                    className={inputCls}
                  />
                </div>
              </div>
              <div className="bg-white px-3 py-2">
                {sharedPO ? (
                  <div className="flex items-center h-full px-2 py-1.5 text-sm text-gray-400 border border-dashed border-gray-200 rounded bg-gray-50">
                    {commonPO || <span className="italic">shared PO</span>}
                  </div>
                ) : (
                  <input
                    type="text"
                    placeholder="e.g. 81121223"
                    value={entry.poNumber}
                    onChange={(e) => update(i, "poNumber", e.target.value)}
                    className={inputCls}
                  />
                )}
              </div>
              <div className="bg-white px-3 py-2">
                <input
                  type="number"
                  placeholder="e.g. 235"
                  value={entry.totalItems}
                  onChange={(e) => update(i, "totalItems", e.target.value)}
                  min={1}
                  className={inputCls}
                />
              </div>
              <div className="bg-white px-3 py-2">
                <input
                  type="number"
                  placeholder="e.g. 25"
                  value={entry.itemsPerCarton}
                  onChange={(e) => update(i, "itemsPerCarton", e.target.value)}
                  min={1}
                  className={inputCls}
                />
              </div>
              <div className="bg-white px-3 py-2 flex items-center justify-center">
                <button
                  onClick={() => removeRow(i)}
                  disabled={entries.length === 1}
                  title="Remove row"
                  className="text-gray-300 hover:text-red-400 disabled:opacity-20 disabled:cursor-not-allowed transition-colors text-lg leading-none"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

          <div className="border-t border-gray-100 px-4 py-2">
            <button
              onClick={addRow}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors flex items-center gap-1"
            >
              <span className="text-lg leading-none">+</span> Add Product
            </button>
          </div>
        </div>

        <StickerPreview entries={resolvedEntries} />

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
      <span className="ml-2 font-semibold">
        → {totalStickers} stickers / {sheets} sheet{sheets !== 1 ? "s" : ""}
      </span>
    </div>
  );
}
