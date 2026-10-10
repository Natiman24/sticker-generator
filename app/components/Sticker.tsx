import Image from "next/image";
import { StickerData } from "../types";

interface StickerProps {
  data: StickerData;
}

export default function Sticker({ data }: StickerProps) {
  return (
    <div
      style={{
        width: "20cm",
        height: "5cm",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.15cm 0.4cm",
        backgroundColor: "#fff",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* UNICEF Logo - left: render at high pixel size, CSS constrains the display size */}
      <div style={{ flexShrink: 0, width: "4.5cm", height: "4.6cm", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Image
          src="/logo/Unicef Logo.jpg"
          alt="UNICEF"
          width={600}
          height={600}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>

      {/* Center text */}
      <div
        style={{
          flex: 1,
          textAlign: "center",
          padding: "0 0.3cm",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <p style={{ fontSize: "20pt", fontWeight: "bold", margin: "0 0 6px 0", lineHeight: 1.3 }}>
          {data.productName}
        </p>
        {data.poNumber && (
          <p style={{ fontSize: "18pt", margin: "0 0 6px 0", lineHeight: 1.3 }}>
            PO No. {data.poNumber}
          </p>
        )}
        <p style={{ fontSize: "18pt", margin: 0, lineHeight: 1.3 }}>
          {data.itemsPerCarton} pcs per Carton
        </p>
      </div>

      {/* Penguin Logo - right */}
      <div style={{ flexShrink: 0, width: "3cm", height: "4.2cm", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Image
          src="/logo/Penguin Printing Press Logo.jpg"
          alt="Penguin Printing Press"
          width={400}
          height={400}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
    </div>
  );
}
