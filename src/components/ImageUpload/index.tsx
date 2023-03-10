import React from 'react';
import Title from '../Title';
import styles from './style.module.css';

type ImageUploadProps = {
  hasImage: boolean;
  setImage: (image: HTMLImageElement) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setImage, hasImage }) => {
  const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.setAttribute('name', file.name);
        setImage(img);
      }
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className={styles.inputWrapper}>
      {hasImage && (
        <Title title='Change Image' />
      )}
      <div>
        <input
          type="file"
          name="imageInput"
          data-testid="imageInput"
          id="imageInput"
          onChange={onFileUpload}
          className={styles.input}
          accept="image/*" // Only image types accepted
        />
      </div>
    </div>
  )
}

export default ImageUpload;