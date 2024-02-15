import React, { useEffect } from 'react';

import * as pdfjsLib from 'pdfjs-dist';

type PDFViewerProps = {
  onTextStringsLoad: (textStrings: string[]) => void;
  url: string;
};

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.js';

const PdfToText: React.FC<PDFViewerProps> = ({ url, onTextStringsLoad }) => {
  useEffect(() => {
    const loadingTask = pdfjsLib.getDocument(url);

    loadingTask.promise
      .then((pdf) => {
        const { numPages } = pdf;
        const promises: Promise<Uint8Array>[] = [];
        for (let pageNumber = 1; pageNumber <= numPages; pageNumber += 1) {
          const pagePromise: any = pdf.getPage(pageNumber).then((page) => {
            page.getTextContent();
          });
          promises.push(pagePromise);
        }
        return Promise.all(promises);
      })
      .then((textContents) => {
        const allTextStrings: string[] = [];
        textContents.forEach((textContent: any) => {
          const pageTextStrings = textContent.items.map(
            (item: any) => item.str,
          );
          allTextStrings.push(...pageTextStrings);
        });
        onTextStringsLoad(allTextStrings);
      })
      .catch(() => {});
  }, []);

  return null;
};

export default PdfToText;
