import React, { useState } from 'react';

import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import { Document, Page, pdfjs } from 'react-pdf';

import { Button } from '@/components/shared/ui/button';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set the PDF.js worker URL
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  fileUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState<number>(100);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const goToPrevPage = () => setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);
  const goToNextPage = () => setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

  return (
    <div className="my-4 flex flex-col items-center overflow-x-scroll">
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        className="mx-auto w-full max-w-xl "
      >
        <Page pageNumber={pageNumber} className="shadow-lg" />
      </Document>
      <div className="mt-4 flex justify-center space-x-4">
        <Button disabled={pageNumber === 1} size="icon" variant="outline" onClick={goToPrevPage}>
          <ChevronDoubleLeftIcon className="size-5" />
        </Button>
        <p className="mt-2 text-lg">
          Página {pageNumber} de {numPages}
        </p>
        <Button
          disabled={pageNumber === numPages}
          size="icon"
          variant="outline"
          onClick={goToNextPage}
        >
          <ChevronDoubleRightIcon className="size-5" />
        </Button>
      </div>
    </div>
  );
};

export default PDFViewer;
