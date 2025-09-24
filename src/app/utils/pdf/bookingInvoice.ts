import PDFDocument from "pdfkit";
import AppError from "../helpers/error/appError";
import message from "../message";
import { StatusCodes } from "http-status-codes";
export interface InvoiceProps {
  transactionID: string;
  bookingDate: Date;
  clientName: string;
  tourTitle: string;
  guestCount: number;
  bookingAmount: number;
}

const COLORS = {
  text: "#1f2937",
  muted: "#6b7280",
  border: "#e5e7eb",
  bg: "#f8fafc",
  accent: "#111827",
};

const hr = (doc: PDFKit.PDFDocument, y: number) => {
  doc
    .save()
    .moveTo(doc.page.margins.left, y)
    .lineTo(doc.page.width - doc.page.margins.right, y)
    .lineWidth(1)
    .strokeColor(COLORS.border)
    .stroke()
    .restore();
};

const bookingInvoice = async (data: InvoiceProps) => {
  try {
    return await new Promise<Buffer>((resolve, reject) => {
      const doc = new PDFDocument({ size: "A4", margin: 56 }); // 56pt ≈ 20mm
      const chunks: Buffer[] = [];

      doc.on("data", (chunk) => chunks.push(chunk as Buffer));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", (err) => reject(err));

      // Header
      // subtle header background
      doc.save();
      doc.rect(0, 0, doc.page.width, 64).fill(COLORS.bg);
      doc.restore();

      doc
        .fillColor(COLORS.accent)
        .font("Helvetica-Bold")
        .fontSize(24)
        .text("INVOICE", doc.page.margins.left, 24, { align: "left" });

      const dateStr = new Date(data.bookingDate).toLocaleDateString();
      doc
        .font("Helvetica")
        .fontSize(10)
        .fillColor(COLORS.muted)
        .text(`Transaction ID: ${data.transactionID}`, { align: "right" })
        .text(`Booking Date: ${dateStr}`, { align: "right" });

      hr(doc, 90);

      // Details
      let y = 110;
      const leftX = doc.page.margins.left;
      const rightX = doc.page.width - doc.page.margins.right;

      const label = (t: string, vy: number) =>
        doc
          .font("Helvetica")
          .fontSize(10)
          .fillColor(COLORS.muted)
          .text(t, leftX, vy);

      const value = (t: string, vy: number) =>
        doc
          .font("Helvetica-Bold")
          .fontSize(12)
          .fillColor(COLORS.text)
          .text(t, leftX, vy + 14);

      label("Client", y);
      value(data.clientName, y);

      y += 44;
      label("Tour", y);
      value(data.tourTitle, y);

      y += 44;
      label("Guests", y);
      value(String(data.guestCount), y);

      hr(doc, y + 44);

      // One-line Summary
      const tableTop = y + 64;
      const width = rightX - leftX;
      const col1W = width * 0.65; // Description
      const col2W = width * 0.15; // Guests
      const col3W = width * 0.2; // Amount
      const col1X = leftX;
      const col2X = leftX + col1W;
      const col3X = leftX + col1W + col2W;

      // header strip
      doc.save();
      doc.rect(leftX, tableTop, width, 26).fill(COLORS.bg);
      doc.restore();

      doc
        .font("Helvetica-Bold")
        .fontSize(10)
        .fillColor(COLORS.muted)
        .text("Description", col1X + 8, tableTop + 7)
        .text("Guests", col2X + 8, tableTop + 7)
        .text("Amount", col3X + 8, tableTop + 7, {
          width: col3W - 16,
          align: "right",
        });

      hr(doc, tableTop + 26);

      // row
      const rowY = tableTop + 36;
      doc
        .font("Helvetica")
        .fontSize(11)
        .fillColor(COLORS.text)
        .text(`Tour Booking — ${data.tourTitle}`, col1X + 8, rowY, {
          width: col1W - 16,
        })
        .text(String(data.guestCount), col2X + 8, rowY, {
          width: col2W - 16,
        })
        // amount: keep exactly what you pass (no currency assumptions)
        .text(data.bookingAmount.toFixed(2), col3X + 8, rowY, {
          width: col3W - 16,
          align: "right",
        });

      hr(doc, rowY + 22);

      // Amount Due
      const boxY = rowY + 40;
      doc
        .font("Helvetica")
        .fontSize(10)
        .fillColor(COLORS.muted)
        .text("Amount Due", col3X + 8, boxY);
      doc
        .font("Helvetica-Bold")
        .fontSize(16)
        .fillColor(COLORS.accent)
        .text(data.bookingAmount.toFixed(2), col3X + 8, boxY + 12, {
          width: col3W - 16,
          align: "right",
        });

      doc.end();
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(
        message("fail", "sending invoice"),
        StatusCodes.BAD_REQUEST
      );
    }
  }
};

export default bookingInvoice;
