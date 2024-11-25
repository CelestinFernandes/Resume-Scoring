// File: API/utils/fileParser.js
import { PDFExtract } from 'pdf.js-extract';

export default async function parseFile(file) {
  try {
    if (!file || !file.buffer) {
      throw new Error('Invalid file input: File or file buffer is missing');
    }

    if (file.mimetype === 'application/pdf') {
      const pdfExtract = new PDFExtract();
      const dataBuffer = Buffer.from(file.buffer);
      
      const data = await pdfExtract.extractBuffer(dataBuffer);
      
      if (!data || !data.pages) {
        throw new Error('Failed to extract text from PDF');
      }
      
      // Combine all pages text into a single string
      const fullText = data.pages
        .map(page => page.content.map(item => item.str).join(' '))
        .join('\n')
        .trim();
      
      if (!fullText) {
        throw new Error('No text content found in PDF');
      }
      
      return fullText;
    } else {
      throw new Error(`Unsupported file type: ${file.mimetype}`);
    }
  } catch (error) {
    console.error('File parsing error:', error);
    throw new Error(`Error parsing file: ${error.message}`);
  }
}