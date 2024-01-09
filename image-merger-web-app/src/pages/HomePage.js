// HomePage.js
import React, { useState } from 'react';
import Dropdown from '../components/Dropdown';
import FileUpload from '../components/FileUpload';


function HomePage() {
  const [layerCount, setLayerCount] = useState(1);
  const [files, setFiles] = useState([]);

  const layerOptions = [
    { value: 1, label: '1 Layer' },
    { value: 2, label: '2 Layers' },
    { value: 3, label: '3 Layers' },
    // ...add more options as needed
  ];

  const handleLayerChange = (event) => {
    setLayerCount(event.target.value);
  };

  const handleFileUpload = (file) => {
    setFiles([...files, file]);
  };

  return (
    <>
      <label>Number of Layers:</label>
        <Dropdown 
          value={layerCount} 
          onChange={handleLayerChange} 
          options={layerOptions} 
        /> 
        {[...Array(layerCount)].map((_, index) => (
          <div key={index}>
            <h3>Layer {index + 1}</h3>
            <FileUpload onFileUpload={(file) => handleFileUpload(index, file)} />
          </div>
        ))}
    </>
  )
}

export default HomePage;

