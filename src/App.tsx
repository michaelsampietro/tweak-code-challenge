import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import ImageEditor from './components/ImageEditor';
import ImageDownload from './components/ImageDownload';
import styles from './App.module.css';

function App() {
  // These states will be shared between the ImageUpload and ImageEditor components.
  const [baseImage, setBaseImage] = useState<HTMLImageElement>();
  const [canvas, setCanvas] = React.useState<fabric.StaticCanvas>();

  return (
    <div className={styles.appWrapper}>
      <ImageUpload setImage={setBaseImage} />

      {baseImage && (
        <>
          <ImageEditor image={baseImage} setCanvas={setCanvas} canvas={canvas} />
          <ImageDownload canvas={canvas} fileName={baseImage.getAttribute('name')} />
        </>
      )}
    </div>
  );
}

export default App;
