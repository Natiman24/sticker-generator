import { StickerData } from "../types";
import Sticker from "./Sticker";

interface ArtboardProps {
  stickers: StickerData[];
  index: number;
}

export default function Artboard({ stickers, index }: ArtboardProps) {
  return (
    <div
      style={{
        width: "20cm",
        height: "30cm",
        backgroundColor: "#fff",
        border: "1px solid #999",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        pageBreakAfter: "always",
        breakAfter: "page",
      }}
    >
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {stickers.map((sticker, i) => (
          <Sticker key={i} data={sticker} />
        ))}
      </div>
    </div>
  );
}
