import React, { useState } from "react";
import { uploadPDF } from "../api/pdf";

export default function PDFUploadView() {
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF file");

    try {
      const { pdfUrl } = await uploadPDF(file);
      setPdfUrl(pdfUrl);
    } catch (err) {
      alert("Upload failed");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Upload PDF</h2>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload
      </button>

      {pdfUrl && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Preview:</h3>
          <iframe
            src={pdfUrl}
            width="100%"
            height="500px"
            title="PDF Preview"
            className="border"
          />
        </div>
      )}
    </div>
  );
}
