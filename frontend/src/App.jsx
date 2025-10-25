import React, { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null); // selected file
  const [uploadedFileName, setUploadedFileName] = useState(''); // uploaded file name
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null); // ref to reset input

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");
    setLoading(true);

    const formData = new FormData();
    formData.append("csvFile", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Server response:", response.data);
      alert("File uploaded successfully!");

      // Save uploaded file name to display in UI
      setUploadedFileName(file.name);

      // Reset the file input so user can select the same file again
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div style={{ padding: '20px' }}>
      <h2>Upload CSV</h2>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        ref={fileInputRef} // attach ref
      />
      <button onClick={handleUpload} style={{ marginLeft: '10px' }}>
        Upload
      </button>

      {loading && <div style={{ marginTop: '10px' }}>Uploading...</div>}

      <div style={{ marginTop: '20px' }}>
        <span>
          Uploaded file: <strong>{uploadedFileName || ''}</strong>
        </span>

        
      </div>
    </div>
  );
}

export default App;
