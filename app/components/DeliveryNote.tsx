import Image from "next/image";
import { DeliveryNoteData } from "../types";

const TOTAL_ROWS = 8;

interface DeliveryNoteProps {
  data: DeliveryNoteData;
}

export default function DeliveryNote({ data }: DeliveryNoteProps) {
  const rows = [...data.items];
  while (rows.length < TOTAL_ROWS) {
    rows.push({ description: "", unit: "", quantity: "", unitPrice: "", totalPrice: "", poNumber: "" });
  }

  return (
    <div
      style={{
        width: "29.7cm",
        height: "21cm",
        backgroundColor: "#fff",
        fontFamily: "Arial, sans-serif",
        fontSize: "11pt",
        boxSizing: "border-box",
        padding: "1cm",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.35cm" }}>
        {/* Penguin Logo */}
        <div style={{ width: "3cm", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Image
            src="/logo/Penguin Printing Press Logo.jpg"
            alt="Penguin Printing Press"
            width={200}
            height={200}
            style={{ width: "3.5cm", height: "3.5cm", objectFit: "contain" }}
          />
        </div>

        {/* Center title */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <p style={{ fontWeight: "bold", fontSize: "16pt", margin: "0 0 3px 0" }}>AK PRINTING PLC</p>
          <p style={{ fontWeight: "bold", fontSize: "15pt", margin: "0 0 6px 0" }}>PENGUIN PRINTING PRESS</p>
          <p style={{ fontWeight: "bold", fontSize: "14pt", margin: 0, textDecoration: "underline" }}>
            DELIVERY NOTE
          </p>
        </div>

        {/* UNICEF Logo + Date/No */}
        <div style={{ width: "4.5cm", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
          <Image
            src="/logo/Unicef Logo.jpg"
            alt="UNICEF"
            width={200}
            height={80}
            style={{ width: "4cm", objectFit: "contain" }}
          />
          <div style={{ textAlign: "right", fontSize: "13pt" }}>
            <p style={{ margin: "0 0 4px 0" }}>
              <strong>Date:</strong> {data.date || "___________"}
            </p>
            <p style={{ margin: 0 }}>
              <strong>No:</strong> {data.no || "___________"}
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "11pt",
          flex: 1,
          marginTop: "0.5cm"
        }}
      >
        <thead>
          <tr>
            {["S/N", "Description", "Unit", "Quantity", "Unit Price", "Total Price", "P.O Number"].map((h) => (
              <th
                key={h}
                style={{
                  border: "1px solid #333",
                  padding: "6px 8px",
                  fontWeight: "bold",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  fontSize: "11pt",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ height: "1cm" }}>
              <td style={{ border: "1px solid #333", padding: "4px 6px", textAlign: "center", width: "0.8cm" }}>
                {i + 1}
              </td>
              <td style={{ border: "1px solid #333", padding: "4px 8px", width: "7.5cm" }}>
                {row.description}
              </td>
              <td style={{ border: "1px solid #333", padding: "4px 6px", textAlign: "center", width: "1.6cm" }}>
                {row.unit}
              </td>
              <td style={{ border: "1px solid #333", padding: "4px 6px", textAlign: "center", width: "2cm" }}>
                {row.quantity}
              </td>
              <td style={{ border: "1px solid #333", padding: "4px 8px", textAlign: "right", width: "2.8cm" }}>
                {row.unitPrice}
              </td>
              <td style={{ border: "1px solid #333", padding: "4px 8px", textAlign: "right", width: "2.8cm" }}>
                {row.totalPrice}
              </td>
              <td style={{ border: "1px solid #333", padding: "4px 8px", textAlign: "center", width: "3.2cm" }}>
                {row.poNumber}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5cm" }}>
        {/* Receiver section — vertically spaced */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5cm" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.3cm" }}>
            <span style={{ whiteSpace: "nowrap", fontSize: "11pt" }}>{"Receiver's Name"}</span>
            <span style={{ display: "inline-block", width: "7cm", borderBottom: "1px solid #333" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.3cm" }}>
            <span style={{ whiteSpace: "nowrap", fontSize: "11pt" }}>{"Receiver's Signature"}</span>
            <span style={{ display: "inline-block", width: "6.4cm", borderBottom: "1px solid #333" }} />
          </div>
        </div>

        {/* Prepared by — with signature & stamp above a single shared line */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          {/* Images row — aligned to bottom so they sit right above the line */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: "0.6cm", marginBottom: "0" }}>
            <span style={{ whiteSpace: "nowrap", fontSize: "11pt", paddingBottom: "4px" }}>Prepared by</span>
            <Image
              src="/logo/signature.svg"
              alt="Signature"
              width={300}
              height={100}
              style={{ objectFit: "contain", height: "2.2cm", width: "5cm", display: "block" }}
            />
            <Image
              src="/logo/stamp.svg"
              alt="Stamp"
              width={300}
              height={300}
              style={{ objectFit: "contain", height: "4cm", width: "4cm", display: "block" }}
            />
          </div>
          {/* Single shared underline spanning full width */}
          <div style={{ borderBottom: "1px solid #333", width: "80%" }} />
        </div>
      </div>
    </div>
  );
}
