import React from 'react';
import styles from './style.module.css';

type ImageUploadProps = {
  setImage: (image: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setImage }) => {
  const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = e.target?.result;
        setImage(image as string);
      }
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className='inputWrapper'>
      <input
        type="file"
        name="imageInput"
        id="imageInput"
        onChange={onFileUpload}
        className={styles.input}
        accept="image/*" // Only image types accepted
      />
    </div>
  )
}

export default ImageUpload;