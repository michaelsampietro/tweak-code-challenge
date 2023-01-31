import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Title from './components/Title';
import ImageUpload from './components/ImageUpload';
import ImageEditor from './components/ImageEditor';
import ImageDownload from './components/ImageDownload';

function App() {
  // This state will be shared between the ImageUpload and ImageEditor components.
  const [base64Image, setBase64Image] = useState<string>();
  const [canvas, setCanvas] = React.useState<fabric.Canvas>();

  return (
    <div>
      {/* Image Uploader */}
      <Title title='Upload Image' />
      <ImageUpload setImage={setBase64Image} />

      {/* Image Editor */}
      {base64Image && (
        <>
          <Title title='Edit Image' />
          <ImageEditor image={base64Image} setCanvas={setCanvas} canvas={canvas} />
        </>
      )}

      {/* Image Downloader */}
      <ImageDownload canvas={canvas} />
    </div>
  );
}

export default App;
