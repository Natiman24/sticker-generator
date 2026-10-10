"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { DeliveryNoteItem, DeliveryNoteData } from "../types";

const emptyItem = (): DeliveryNoteItem => ({
  description: "",
  unit: "",
  quantity: "",
  unitPrice: "",
  totalPrice: "",
  poNumber: "",
});

const inputCls =
  "w-full text-sm border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-green-400";

function DeliveryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [date, setDate] = useState("");
  const [no, setNo] = useState("");
  const [items, setItems] = useState<DeliveryNoteItem[]>([
    emptyItem(),
    emptyItem(),
    emptyItem(),
    emptyItem(),
  ]);
  const [sharedPO, setSharedPO] = useState(false);
  const [commonPO, setCommonPO] = useState("");
  const [sharedUnit, setSharedUnit] = useState(false);
  const [commonUnit, setCommonUnit] = useState("");

  // Restore state when coming back from edit
  useEffect(() => {
    const raw = searchParams.get("edit");
    if (raw) {
      try {
        const parsed = JSON.parse(decodeURIComponent(raw));
        if (parsed.date !== undefined) setDate(parsed.date);
        if (parsed.no !== undefined) setNo(parsed.no);
        if (parsed.items) setItems(parsed.items);
        if (parsed.sharedPO !== undefined) setSharedPO(parsed.sharedPO);
        if (parsed.commonPO !== undefined) setCommonPO(parsed.commonPO);
        if (parsed.sharedUnit !== undefined) setSharedUnit(parsed.sharedUnit);
        if (parsed.commonUnit !== undefined) setCommonUnit(parsed.commonUnit);
      } catch {
        // ignore
      }
    }
  }, [searchParams]);

  const update = (index: number, field: keyof DeliveryNoteItem, value: string) => {
    setItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      // Auto-calculate total price
      if (field === "quantity" || field === "unitPrice") {
        const qty = parseFloat(field === "quantity" ? value : next[index].quantity);
        const price = parseFloat(field === "unitPrice" ? value : next[index].unitPrice);
        if (!isNaN(qty) && !isNaN(price)) {
          next[index].totalPrice = (qty * price).toFixed(2);
        }
      }
      return next;
    });
  };

  const addRow = () => setItems((prev) => [...prev, emptyItem()]);

  const removeRow = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const resolvedItems: DeliveryNoteItem[] = items.map((item) => ({
    ...item,
    poNumber: sharedPO ? commonPO : item.poNumber,
    unit: sharedUnit ? commonUnit : item.unit,
  }));

  const handleGenerate = () => {
    const editState = encodeURIComponent(JSON.stringify({ date, no, items, sharedPO, commonPO, sharedUnit, commonUnit }));
    const data: DeliveryNoteData = { date, no, items: resolvedItems, sharedPO, commonPO };
    router.push(`/delivery/print?data=${encodeURIComponent(JSON.stringify(data))}&edit=${editState}`);
  };

  const hasAnyItem = items.some((item) => item.description.trim() !== "");

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.push("/")}
          className="text-sm text-gray-500 hover:text-gray-800 mb-6 flex items-center gap-1"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Delivery Note</h1>
        <p className="text-gray-500 mb-8 text-sm">Fill in delivery details. Total price is calculated automatically.</p>

        {/* Date & No */}
        <div className="flex gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="text-sm border border-gray-200 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-green-400 bg-white"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">No.</label>
            <input
              type="text"
              placeholder="e.g. DN-001"
              value={no}
              onChange={(e) => setNo(e.target.value)}
              className="text-sm border border-gray-200 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-green-400 bg-white w-40"
            />
          </div>
        </div>

        {/* Shared toggles */}
        <div className="flex flex-col gap-3 mb-4">
          {/* Shared PO */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSharedPO((v) => !v)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                sharedPO ? "bg-green-600" : "bg-gray-300"
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
                className="text-sm border border-gray-200 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-green-400 w-56"
                autoFocus
              />
            )}
          </div>

          {/* Shared Unit */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSharedUnit((v) => !v)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                sharedUnit ? "bg-green-600" : "bg-gray-300"
              }`}
              role="switch"
              aria-checked={sharedUnit}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                  sharedUnit ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className="text-sm text-gray-700 font-medium">Same Unit for all</span>
            {sharedUnit && (
              <input
                type="text"
                placeholder="e.g. pcs"
                value={commonUnit}
                onChange={(e) => setCommonUnit(e.target.value)}
                className="text-sm border border-gray-200 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-green-400 w-40"
                autoFocus
              />
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow overflow-x-auto">
          {/* Header */}
          <div
            className="grid gap-px bg-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wide min-w-[800px]"
            style={{ gridTemplateColumns: "2rem 2fr 1fr 1fr 1fr 1fr 1.2fr auto" }}
          >
            <div className="bg-gray-50 px-3 py-3">S/N</div>
            <div className="bg-gray-50 px-3 py-3">Description</div>
            <div className="bg-gray-50 px-3 py-3">
              Unit{sharedUnit && <span className="ml-1 normal-case font-normal text-green-500">(shared)</span>}
            </div>
            <div className="bg-gray-50 px-3 py-3">Qty</div>
            <div className="bg-gray-50 px-3 py-3">Unit Price</div>
            <div className="bg-gray-50 px-3 py-3">Total Price</div>
            <div className="bg-gray-50 px-3 py-3">
              PO Number{sharedPO && <span className="ml-1 normal-case font-normal text-green-500">(shared)</span>}
            </div>
            <div className="bg-gray-50 px-3 py-3" />
          </div>

          {/* Rows */}
          {items.map((item, i) => (
            <div
              key={i}
              className="grid gap-px bg-gray-100 border-t border-gray-100 min-w-[800px]"
              style={{ gridTemplateColumns: "2rem 2fr 1fr 1fr 1fr 1fr 1.2fr auto" }}
            >
              <div className="bg-white px-3 py-2 flex items-center text-xs text-gray-400">{i + 1}</div>
              <div className="bg-white px-2 py-2">
                <input
                  type="text"
                  placeholder="e.g. PP Module"
                  value={item.description}
                  onChange={(e) => update(i, "description", e.target.value)}
                  className={inputCls}
                />
              </div>
              <div className="bg-white px-2 py-2">
                {sharedUnit ? (
                  <div className="flex items-center h-full px-2 py-1.5 text-sm text-gray-400 border border-dashed border-gray-200 rounded bg-gray-50">
                    {commonUnit || <span className="italic">shared unit</span>}
                  </div>
                ) : (
                  <input
                    type="text"
                    placeholder="e.g. pcs"
                    value={item.unit}
                    onChange={(e) => update(i, "unit", e.target.value)}
                    className={inputCls}
                  />
                )}
              </div>
              <div className="bg-white px-2 py-2">
                <input
                  type="number"
                  placeholder="0"
                  value={item.quantity}
                  onChange={(e) => update(i, "quantity", e.target.value)}
                  min={0}
                  className={inputCls}
                />
              </div>
              <div className="bg-white px-2 py-2">
                <input
                  type="number"
                  placeholder="0.00"
                  value={item.unitPrice}
                  onChange={(e) => update(i, "unitPrice", e.target.value)}
                  min={0}
                  step="0.01"
                  className={inputCls}
                />
              </div>
              <div className="bg-white px-2 py-2">
                <input
                  type="text"
                  placeholder="auto"
                  value={item.totalPrice}
                  onChange={(e) => update(i, "totalPrice", e.target.value)}
                  className={inputCls}
                />
              </div>
              <div className="bg-white px-2 py-2">
                {sharedPO ? (
                  <div className="flex items-center h-full px-2 py-1.5 text-sm text-gray-400 border border-dashed border-gray-200 rounded bg-gray-50">
                    {commonPO || <span className="italic">shared PO</span>}
                  </div>
                ) : (
                  <input
                    type="text"
                    placeholder="PO number"
                    value={item.poNumber}
                    onChange={(e) => update(i, "poNumber", e.target.value)}
                    className={inputCls}
                  />
                )}
              </div>
              <div className="bg-white px-2 py-2 flex items-center justify-center">
                <button
                  onClick={() => removeRow(i)}
                  disabled={items.length === 1}
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
              className="text-sm text-green-600 hover:text-green-800 font-medium transition-colors flex items-center gap-1"
            >
              <span className="text-lg leading-none">+</span> Add Row
            </button>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!hasAnyItem}
          className="mt-6 px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Generate Delivery Note →
        </button>
      </div>
    </main>
  );
}

export default function DeliveryPage() {
  return (
    <Suspense>
      <DeliveryContent />
    </Suspense>
  );
}
