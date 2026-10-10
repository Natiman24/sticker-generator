import { ProductEntry, StickerData } from "../types";

export function generateStickerList(products: ProductEntry[]): StickerData[] {
  const stickers: StickerData[] = [];

  for (const product of products) {
    const name = product.name.trim();
    const po = product.poNumber.trim();
    const total = parseInt(product.totalItems);
    const perCarton = parseInt(product.itemsPerCarton);

    if (!name || isNaN(total) || isNaN(perCarton) || perCarton <= 0) continue;

    const fullCartons = Math.floor(total / perCarton);
    const remainder = total % perCarton;

    for (let i = 0; i < fullCartons; i++) {
      stickers.push({ productName: name, poNumber: po, itemsPerCarton: perCarton });
    }
    if (remainder > 0) {
      stickers.push({ productName: name, poNumber: po, itemsPerCarton: remainder });
    }
  }

  return stickers;
}

export function buildArtboards(stickers: StickerData[]): StickerData[][] {
  const STICKERS_PER_BOARD = 6;
  const artboards: StickerData[][] = [];

  if (stickers.length === 0) return artboards;

  for (let i = 0; i < stickers.length; i += STICKERS_PER_BOARD) {
    const chunk = stickers.slice(i, i + STICKERS_PER_BOARD);
    // Fill empty slots by duplicating the last sticker
    while (chunk.length < STICKERS_PER_BOARD) {
      chunk.push({ ...chunk[chunk.length - 1] });
    }
    artboards.push(chunk);
  }

  return artboards;
}
