import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Title from './components/Title';
import ImageUpload from './components/ImageUpload';
import ImageEditor from './components/ImageEditor';

function App() {
  // This state will be shared between the ImageUpload and ImageEditor components.
  const [base64Image, setBase64Image] = useState<string>();

  return (
    <div>
      {/* Image Uploader */}
      <Title title='Upload Image' />
      <ImageUpload setImage={setBase64Image} />

      {/* Image Editor */}
      {base64Image && (
        <>
          <Title title='Edit Image' />
          <ImageEditor image={base64Image} />
        </>
      )}
      {/* Image Downloader */}
    </div>
  );
}

export default App;
