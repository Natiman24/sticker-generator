"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { ProductEntry } from "../types";
import { generateStickerList, buildArtboards } from "../lib/generateStickers";
import Artboard from "../components/Artboard";

function PrintContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const raw = searchParams.get("data");

  let artboards: ReturnType<typeof buildArtboards> = [];

  if (raw) {
    try {
      const entries: ProductEntry[] = JSON.parse(decodeURIComponent(raw));
      const stickers = generateStickerList(entries);
      artboards = buildArtboards(stickers);
    } catch {
      // invalid data
    }
  }

  if (artboards.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        No valid data. <button onClick={() => router.push("/")} className="ml-2 underline">Go back</button>
      </div>
    );
  }

  return (
    <div>
      {/* Screen toolbar - hidden on print */}
      <div className="no-print bg-gray-800 text-white px-6 py-3 flex items-center gap-4 sticky top-0 z-10">
        <button
          onClick={() => router.push("/stickers")}
          className="text-sm hover:text-gray-300 transition-colors"
        >
          ← Back
        </button>
        <span className="text-sm text-gray-400">{artboards.length} sheet{artboards.length !== 1 ? "s" : ""} ready</span>
        <button
          onClick={() => window.print()}
          className="ml-auto bg-blue-500 hover:bg-blue-600 text-white px-5 py-1.5 rounded text-sm font-semibold transition-colors"
        >
          🖨 Print
        </button>
      </div>

      {/* Artboards */}
      <div className="print-container">
        {artboards.map((board, i) => (
          <div key={i} className="artboard-wrapper">
            <Artboard stickers={board} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PrintPage() {
  return (
    <Suspense>
      <PrintContent />
    </Suspense>
  );
}
