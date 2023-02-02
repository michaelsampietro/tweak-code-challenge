import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import ImagePreview from './components/ImagePreview';
import ImageDownload from './components/ImageDownload';
import styles from './App.module.css';
import ImageFilters from './components/ImageFilters';

function App() {
  const [baseImage, setBaseImage] = useState<HTMLImageElement>();
  const [canvas, setCanvas] = React.useState<fabric.StaticCanvas>();

  return (
    <div className={styles.appWrapper}>
      {!baseImage && (
        <div>
          <h1>Upload an image to get started</h1>
        </div>
      )}

      <ImageUpload setImage={setBaseImage} hasImage={baseImage !== undefined} />


      {baseImage && canvas && (
        <ImageFilters canvas={canvas} imageName={baseImage.getAttribute('name')} />
      )}

      {baseImage && (
        <ImagePreview image={baseImage} setCanvas={setCanvas} canvas={canvas} />
      )}

      {baseImage && canvas && (
        <ImageDownload canvas={canvas} fileName={baseImage.getAttribute('name')} />
      )}
    </div>
  );
}

export default App;
