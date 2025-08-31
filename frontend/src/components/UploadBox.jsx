import { useState } from "react";
import axios from "axios";

export default function UploadBox({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:8000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onUpload("Document uploaded successfully!");
    } catch (error) {
      onUpload("Error uploading file.");
    }
  };

  return (
<div className="upload-box w-full max-w-md bg-white rounded-2xl shadow-lg p-2 mb-4 flex flex-col items-center">
  <h3 className="text-xl font-bold mb-3 text-gray-800">Upload Document</h3>

  <input
    type="file"
    accept=".txt,.pdf,.docx"
    onChange={(e) => setFile(e.target.files[0])}
    className="w-full border border-gray-300 rounded-lg px-2 py-1 mb-4 file:border-0 file:bg-blue-500 file:text-white file:font-semibold file:px-4 file:py-2 file:rounded-lg hover:file:bg-blue-600 focus:outline-none"
  />

  <button
    onClick={handleUpload}
    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-xl transition-colors"
  >
    Upload
  </button>
</div>

  );
}
