import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Title from './components/Title';
import ImageUpload from './components/ImageUpload';
import ImageEditor from './components/ImageEditor';
import ImageDownload from './components/ImageDownload';

function App() {
  // This state will be shared between the ImageUpload and ImageEditor components.
  const [baseImage, setBaseImage] = useState<HTMLImageElement>();
  const [canvas, setCanvas] = React.useState<fabric.StaticCanvas>();

  return (
    <div>
      <Title title='Upload Image' />
      <ImageUpload setImage={setBaseImage} />

      {baseImage && (
        <>
          <Title title='Edit Image' />
          <ImageEditor image={baseImage} setCanvas={setCanvas} canvas={canvas} />
          <ImageDownload canvas={canvas} fileName={baseImage?.getAttribute('name')} />
        </>
      )}

    </div>
  );
}

export default App;
