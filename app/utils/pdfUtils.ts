import jsPDF from 'jspdf';

export const generatePDF = (content: string, fileName: string = 'document.pdf') => {
  const doc = new jsPDF();
  const pageHeight = doc.internal.pageSize.height;
  const margin = 15;
  const fontSize = 12;
  const lineHeight = 1.15;
  const font = ['times', 'roman'];
  const indent = 36; // 0.5 inch indent (36 points)
  let y = margin;

  doc.setFont(font[0], font[1]);
  doc.setFontSize(fontSize);

  const lines = doc.splitTextToSize(content, doc.internal.pageSize.width - 2 * margin);

  lines.forEach((line: string, lineIndex: number) => {
    if (y > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }

    const x = lineIndex > 0 ? margin : margin + indent;
    doc.text(line, x, y);
    y += fontSize * lineHeight;
  });

  doc.save(fileName);
};
