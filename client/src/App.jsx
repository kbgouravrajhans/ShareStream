import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import './App.css';
import { uploadFile } from './services/api';

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    const uploadSelectedFile = async () => {
      if (file) {
        try {
          setUploading(true);
          setError(null);
          const data = new FormData();
          data.append("name", file.name);
          data.append("file", file);

          let response = await uploadFile(data);
          setResult(response.path); // Assuming response.path is the shareable link
        } catch (error) {
          console.error("Error uploading file:", error);
          setError("Failed to upload the file. Please try again.");
        } finally {
          setUploading(false);
        }
      }
    };
    uploadSelectedFile();
  }, [file]);

  function onUploadClick() {
    fileInputRef.current.click();
  }

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result)
        .then(() => alert("Link copied to clipboard!"))
        .catch(err => console.error('Failed to copy text: ', err));
    }
};


  return (
    <div className="bg-gradient-to-tr from-orange-300 to-orange-50 w-full h-full min-h-screen flex items-center justify-center">
      <div className="bg-orange-50 p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <CloudArrowUpIcon className="h-16 w-16 text-orange-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-700 mb-2">Share<span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">Stream</span>
        </h1>
        <p className="text-gray-500 mb-4">Upload your file and share the link</p>
        <button
          onClick={onUploadClick}
          className="bg-gradient-to-r from-orange-600 to-yellow-300 text-white px-6 py-3 rounded-full hover:from-orange-300 hover:to-yellow-200 transition"
          disabled={uploading}
        >
          {uploading ? <b>Uploading...</b> : <b>Upload</b>} 
        </button>

        <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
        {result && (
          <div className="mt-4">
            <button
              onClick={copyToClipboard}
              className="bg-gradient-to-r from-green-800 to-green-600 text-white px-6 py-3 rounded-full hover:from-green-500 hover:to-green-300 transition"
            >
              <b>Copy Link</b>
            </button>
          </div>
        )}
        {error && (
          <div className="mt-4 text-red-500">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
