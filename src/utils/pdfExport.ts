import jsPDF from 'jspdf';
import { Vehicle } from '../types';
import { formatGhs, formatUsd } from './formatters';

export const exportInventoryPdf = (vehicles: Vehicle[], title = 'TRUST AUTO TRADER - WHOLESALE INVENTORY CATALOG') => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  let y = margin;

  // Helper: Header bar
  const drawPageHeader = (pageNum: number) => {
    doc.setFillColor(8, 8, 9);
    doc.rect(0, 0, pageWidth, 24, 'F');

    // Gold accent line
    doc.setFillColor(212, 175, 55);
    doc.rect(0, 23.2, pageWidth, 0.8, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('TRUST AUTO TRADER', margin, 11);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(212, 175, 55);
    doc.text('WHOLESALE VEHICLE SPEC SHEETS & INVENTORY CATALOG', margin, 17);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(180, 180, 180);
    doc.text(`TEMA, GHANA & CHINA EXPORT BASE`, pageWidth - margin, 11, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.text(`TEL/WHATSAPP: +233 53 387 7588`, pageWidth - margin, 17, { align: 'right' });
  };

  const drawPageFooter = (pageNum: number, totalPages: number) => {
    doc.setFillColor(15, 15, 18);
    doc.rect(0, pageHeight - 14, pageWidth, 14, 'F');

    doc.setDrawColor(40, 40, 45);
    doc.line(0, pageHeight - 14, pageWidth, pageHeight - 14);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(150, 150, 150);
    doc.text('Confidential Wholesale Document - Prepared for Registered Motor Dealers & Fleet Buyers', margin, pageHeight - 6);

    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, pageHeight - 6, { align: 'right' });
  };

  // Start building pages
  let currentPage = 1;
  drawPageHeader(currentPage);

  y = 30;

  // Catalog Summary Box
  doc.setFillColor(18, 18, 22);
  doc.rect(margin, y, pageWidth - margin * 2, 22, 'F');
  doc.setDrawColor(212, 175, 55);
  doc.rect(margin, y, pageWidth - margin * 2, 22, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(212, 175, 55);
  doc.text(title.toUpperCase(), margin + 5, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(200, 200, 200);
  doc.text(`Total Units Cataloged: ${vehicles.length} Units   |   Generated: ${new Date().toLocaleDateString('en-GB')} ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`, margin + 5, y + 13);
  doc.text('Direct Dealer Sales & Logistics Staging: Golf City, Tema, Ghana & Nansha Export Base, China', margin + 5, y + 18);

  y += 28;

  // Loop through vehicles
  vehicles.forEach((veh) => {
    // Check if space needed (approx 76mm per vehicle spec block)
    if (y + 76 > pageHeight - 18) {
      currentPage++;
      doc.addPage();
      drawPageHeader(currentPage);
      y = 30;
    }

    // Vehicle Spec Card Block
    const cardHeight = 72;
    doc.setFillColor(245, 245, 248);
    doc.rect(margin, y, pageWidth - margin * 2, cardHeight, 'F');
    doc.setDrawColor(200, 200, 205);
    doc.rect(margin, y, pageWidth - margin * 2, cardHeight, 'S');

    // Header banner of card
    doc.setFillColor(10, 10, 12);
    doc.rect(margin, y, pageWidth - margin * 2, 11, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(`${veh.year} ${veh.make} ${veh.model} ${veh.trim ? `(${veh.trim})` : ''}`, margin + 4, y + 7.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(212, 175, 55);
    doc.text(`STOCK ID: ${veh.stockId}`, pageWidth - margin - 4, y + 7.5, { align: 'right' });

    // Details Grid inside Card
    const innerY = y + 16;

    // Price and Location line
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    const priceStr = veh.priceOnRequest ? 'Price On Request' : `${formatGhs(veh.priceGhs)} (~${formatUsd(veh.priceUsd)})`;
    doc.text(`Wholesale Price: ${priceStr}`, margin + 4, innerY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(80, 80, 80);
    doc.text(`Location: ${veh.location === 'GHANA' ? 'Tema Golf City Yard (Ghana Stock)' : 'China Export Base'}`, margin + 110, innerY);

    // Divider line
    doc.setDrawColor(220, 220, 225);
    doc.line(margin + 4, innerY + 3, pageWidth - margin - 4, innerY + 3);

    // Spec Grid (2 columns)
    const specY = innerY + 8;
    doc.setFontSize(8);

    const leftSpecs = [
      ['Type / Body:', veh.type],
      ['Engine:', veh.engine],
      ['Transmission:', veh.transmission],
      ['Fuel:', veh.fuel],
      ['Drivetrain:', veh.drivetrain],
    ];

    const rightSpecs = [
      ['Mileage:', veh.mileageKm === 0 ? '0 KM (NEW)' : `${veh.mileageKm.toLocaleString()} KM`],
      ['Exterior Color:', veh.color],
      ['Condition:', veh.condition],
      ['Status:', veh.status],
      ['Suitability:', veh.insight?.dealerSuitabilityIndex || 'HIGH'],
    ];

    leftSpecs.forEach((sp, sIdx) => {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(60, 60, 60);
      doc.text(sp[0], margin + 4, specY + (sIdx * 4.8));
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      doc.text(sp[1], margin + 30, specY + (sIdx * 4.8));
    });

    rightSpecs.forEach((sp, sIdx) => {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(60, 60, 60);
      doc.text(sp[0], margin + 110, specY + (sIdx * 4.8));
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      doc.text(sp[1], margin + 138, specY + (sIdx * 4.8));
    });

    // Features line
    if (veh.features && veh.features.length > 0) {
      const featY = specY + 26;
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(60, 60, 60);
      doc.setFontSize(7.5);
      doc.text('Key Equipment:', margin + 4, featY);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(30, 30, 30);
      const featText = veh.features.slice(0, 6).join(' • ');
      doc.text(featText, margin + 28, featY, { maxWidth: pageWidth - margin * 2 - 32 });
    }

    // Insight summary
    if (veh.insight?.bestSuitedFor) {
      const insightY = specY + 32;
      doc.setFillColor(235, 238, 245);
      doc.rect(margin + 4, insightY - 3, pageWidth - margin * 2 - 8, 8, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(180, 130, 0);
      doc.setFontSize(7.5);
      doc.text('Dealer Note:', margin + 6, insightY + 1.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(40, 40, 40);
      doc.text(veh.insight.bestSuitedFor, margin + 26, insightY + 1.5, { maxWidth: pageWidth - margin * 2 - 32 });
    }

    y += cardHeight + 6;
  });

  // Stamp total pages on footers
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    drawPageFooter(p, totalPages);
  }

  doc.save(`TRUST_AUTO_TRADER_WHOLESALE_CATALOG_${new Date().toISOString().slice(0, 10)}.pdf`);
};

export const exportSingleVehiclePdf = (veh: Vehicle) => {
  exportInventoryPdf([veh], `VEHICLE SPEC SHEET - ${veh.year} ${veh.make} ${veh.model} (${veh.stockId})`);
};
