import React from 'react';
import Title from '../Title';
import styles from './style.module.css';

type ImageUploadProps = {
  setImage: (image: HTMLImageElement) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setImage }) => {
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
    <>
      <Title title='Upload Image' /><div className='inputWrapper'>
        <input
          type="file"
          name="imageInput"
          id="imageInput"
          onChange={onFileUpload}
          className={styles.input}
          accept="image/*" // Only image types accepted
        />
      </div>
    </>
  )
}

export default ImageUpload;