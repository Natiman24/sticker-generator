"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center mb-10">
        {/* <div className="flex items-center justify-center gap-6 mb-6">
          <Image
            src="/logo/Penguin Printing Press Logo.jpg"
            alt="Penguin Printing Press"
            width={80}
            height={80}
            style={{ objectFit: "contain" }}
          />
          <Image
            src="/logo/Unicef Logo.jpg"
            alt="UNICEF"
            width={80}
            height={80}
            style={{ objectFit: "contain" }}
          />
        </div> */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">AK Printing PLC</h1>
        <p className="text-lg text-gray-500 font-medium mb-1">Penguin Printing Press</p>
        <p className="text-sm text-gray-400 mt-3 max-w-md mx-auto">
          Welcome! Use this tool to generate print-ready carton stickers or delivery notes for your orders.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        <button
          onClick={() => router.push("/stickers")}
          className="group flex flex-col items-center gap-3 bg-white border border-gray-200 rounded-2xl px-10 py-8 shadow hover:shadow-md hover:border-blue-400 transition-all"
        >
          <span className="text-4xl">📦</span>
          <span className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
            Create Sticker
          </span>
          <span className="text-sm text-gray-400 text-center max-w-[160px]">
            Generate carton stickers for your products
          </span>
        </button>

        <button
          onClick={() => router.push("/delivery")}
          className="group flex flex-col items-center gap-3 bg-white border border-gray-200 rounded-2xl px-10 py-8 shadow hover:shadow-md hover:border-green-400 transition-all"
        >
          <span className="text-4xl">📄</span>
          <span className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
            Create Delivery Note
          </span>
          <span className="text-sm text-gray-400 text-center max-w-[160px]">
            Fill in and print an official delivery note
          </span>
        </button>
      </div>
    </main>
  );
}
