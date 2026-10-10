export interface ProductEntry {
  name: string;
  poNumber: string;
  totalItems: string;
  itemsPerCarton: string;
}

export interface StickerData {
  productName: string;
  poNumber: string;
  itemsPerCarton: number;
}

export interface DeliveryNoteItem {
  description: string;
  unit: string;
  quantity: string;
  unitPrice: string;
  totalPrice: string;
  poNumber: string;
}

export interface DeliveryNoteData {
  date: string;
  no: string;
  items: DeliveryNoteItem[];
  sharedPO: boolean;
  commonPO: string;
}
