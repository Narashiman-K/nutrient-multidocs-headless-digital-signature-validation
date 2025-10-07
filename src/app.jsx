// src/app.jsx
import { useState } from "react";

import PdfViewerComponent from "./components/pdf-viewer-component.jsx";
import "./app.css";

function App() {
  const [documents, setDocuments] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    // Create array with filename, blob URL, and file object
    const documentData = files.map((file) => ({
      filename: file.name,
      url: URL.createObjectURL(file),
      file: file,
    }));

    console.log("Files selected:", documentData);
    setDocuments(documentData);
  };

  return (
    <div className="App">
      <label htmlFor="file-input" className="App-input">
        Open documents
      </label>
      <input
        id="file-input"
        type="file"
        onChange={handleFileChange}
        className="chooseFile"
        accept="application/pdf"
        name="pdf"
        multiple
        style={{ display: "none" }}
      />
      <div className="App-viewer">
        <PdfViewerComponent documents={documents} />
      </div>
    </div>
  );
}

export default App;
