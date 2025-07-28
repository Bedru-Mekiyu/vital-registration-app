const PDFDocument = require('pdfkit');
const fs = require('fs');

/**
 * Generate PDF certificate
 * @param {Object} data - Certificate data
 * @param {string} type - Certificate type (birth/death/marriage)
 * @returns {Buffer} PDF buffer
 */
exports.generateCertificate = async (data, type) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margin: 50,
      info: {
        Title: `${type.charAt(0).toUpperCase() + type.slice(1)} Certificate`,
        Author: 'Vital Registration System'
      }
    });

    const buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.on('error', reject);

    // Add Ethiopian cultural elements
    doc.font('Times-Roman').fontSize(24).text('Ethiopian Vital Registration', { align: 'center' });
    doc.moveDown();
    doc.fontSize(18).text(`${type.toUpperCase()} CERTIFICATE`, { align: 'center', underline: true });
    doc.moveDown(2);

    // Certificate content based on type
    if (type === 'birth') {
      doc.fontSize(14)
        .text(`Child: ${data.childName}`)
        .text(`Father: ${data.fatherName}`)
        .text(`Mother: ${data.motherName}`)
        .text(`Date of Birth: ${new Date(data.dateOfBirth).toLocaleDateString('en-ET')}`)
        .text(`Gender: ${data.gender}`)
        .text(`Place of Birth: ${data.placeOfBirth}`)
        .text(`Status: ${data.status}`);
    } else if (type === 'death') {
      doc.fontSize(14)
        .text(`Name: ${data.fullName}`)
        .text(`Date of Death: ${new Date(data.dateOfDeath).toLocaleDateString('en-ET')}`)
        .text(`Place of Death: ${data.placeOfDeath}`)
        .text(`Cause of Death: ${data.causeOfDeath}`)
        .text(`Status: ${data.status}`);
    } else if (type === 'marriage') {
      doc.fontSize(14)
        .text(`Groom: ${data.groomName}`)
        .text(`Bride: ${data.brideName}`)
        .text(`Date of Marriage: ${new Date(data.dateOfMarriage).toLocaleDateString('en-ET')}`)
        .text(`Place of Marriage: ${data.placeOfMarriage}`)
        .text(`Witnesses: ${data.witnesses.join(', ')}`)
        .text(`Status: ${data.status}`);
    }

    doc.moveDown(2);
    doc.fontSize(12).text('Issued by: Ethiopian Vital Registration Authority');
    doc.text(`Date: ${new Date().toLocaleDateString('en-ET')}`);
    
    doc.end();
  });
};
