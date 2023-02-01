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
      <ImageUpload setImage={setBaseImage} />

      {canvas && (
        <ImageFilters canvas={canvas} />
      )}

      {baseImage && (
        <>
          <ImagePreview image={baseImage} setCanvas={setCanvas} canvas={canvas} />
          <ImageDownload canvas={canvas} fileName={baseImage.getAttribute('name')} />
        </>
      )}

    </div>
  );
}

export default App;
