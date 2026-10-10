"use client";

import { useSearchParams, useRouter } from "next/navigation";import { Suspense } from "react";
import { DeliveryNoteData } from "../../types";
import DeliveryNote from "../../components/DeliveryNote";

function DeliveryPrintContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const raw = searchParams.get("data");

  let data: DeliveryNoteData | null = null;

  if (raw) {
    try {
      data = JSON.parse(decodeURIComponent(raw)) as DeliveryNoteData;
    } catch {
      // invalid
    }
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        No valid data.{" "}
        <button onClick={() => router.push("/delivery")} className="ml-2 underline">
          Go back
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="no-print bg-gray-800 text-white px-6 py-3 flex items-center gap-4 sticky top-0 z-10">
        <button
          onClick={() => router.push("/delivery")}
          className="text-sm hover:text-gray-300 transition-colors"
        >
          ← Back
        </button>
        <span className="text-sm text-gray-400">Delivery Note ready</span>
        <button
          onClick={() => {
            const editParam = searchParams.get("edit");
            router.push(`/delivery${editParam ? `?edit=${editParam}` : ""}`);
          }}
          className="ml-auto mr-2 border border-gray-500 hover:border-white text-white px-5 py-1.5 rounded text-sm font-semibold transition-colors"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => window.print()}
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-1.5 rounded text-sm font-semibold transition-colors"
        >
          🖨 Print
        </button>
      </div>

      {/* Preview */}
      <div className="print-container delivery-print-page">
        <div className="artboard-wrapper">
          <DeliveryNote data={data} />
        </div>
      </div>
    </div>
  );
}

export default function DeliveryPrintPage() {
  return (
    <Suspense>
      <DeliveryPrintContent />
    </Suspense>
  );
}
