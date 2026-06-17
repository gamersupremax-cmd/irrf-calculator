import PDFDocument from 'pdfkit';

export const generateIRRFGuide = (calculo) => {
  const doc = new PDFDocument();
  const chunks = [];

  doc.on('data', chunk => chunks.push(chunk));
  doc.on('end', () => {});

  doc.fontSize(20).font('Helvetica-Bold').text('GUIA DE IRRF', 50, 50);
  doc.fontSize(12).font('Helvetica').text('Imposto de Renda Retido na Fonte', 50, 80);

  doc.moveTo(50, 100).lineTo(550, 100).stroke();

  doc.fontSize(11).font('Helvetica-Bold').text('DADOS DA NOTA FISCAL', 50, 120);
  doc.fontSize(10).font('Helvetica')
    .text(`Chave: ${calculo.nfe_chave}`, 50, 145)
    .text(`Data de Emissão: ${new Date(calculo.data_criacao).toLocaleDateString('pt-BR')}`, 50, 165);

  doc.fontSize(11).font('Helvetica-Bold').text('CÁLCULO DO IRRF', 50, 210);
  
  const tableTop = 240;
  const col1 = 50;
  const col2 = 350;

  doc.fontSize(10).font('Helvetica-Bold')
    .text('Descrição', col1, tableTop)
    .text('Valor', col2, tableTop);

  doc.moveTo(50, tableTop + 20).lineTo(550, tableTop + 20).stroke();

  let yPosition = tableTop + 35;

  doc.font('Helvetica')
    .text('Valor Total da NF-e:', col1, yPosition)
    .text(`R$ ${parseFloat(calculo.valor_total).toFixed(2)}`, col2, yPosition);

  yPosition += 25;
  doc.text(`Alíquota (${parseFloat(calculo.aliquota).toFixed(2)}%):`, col1, yPosition)
    .text(`${parseFloat(calculo.aliquota).toFixed(2)}%`, col2, yPosition);

  yPosition += 25;
  doc.moveTo(50, yPosition - 5).lineTo(550, yPosition - 5).stroke();
  doc.font('Helvetica-Bold')
    .text('IRRF a Descontar:', col1, yPosition)
    .text(`R$ ${parseFloat(calculo.valor_irrf).toFixed(2)}`, col2, yPosition);

  yPosition += 35;
  doc.font('Helvetica')
    .text('Valor Líquido:', col1, yPosition)
    .text(`R$ ${(parseFloat(calculo.valor_total) - parseFloat(calculo.valor_irrf)).toFixed(2)}`, col2, yPosition);

  doc.fontSize(8).font('Helvetica')
    .text('Esta guia deve ser impressa e anexada à nota fiscal para controle.', 50, 550)
    .text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 50, 565)
    .text(`ID do Cálculo: ${calculo.id}`, 50, 580);

  doc.end();

  return Buffer.concat(chunks);
};