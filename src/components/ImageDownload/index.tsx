import React from 'react';
import Button from '../Button';
import Title from '../Title';

type ImageDownloadProps = {
  canvas?: fabric.StaticCanvas;
  fileName?: string | null | undefined;
}

const ImageDownload: React.FC<ImageDownloadProps> = ({ canvas, fileName }) => {

  const downloadImage = (format: 'PNG' | 'JPEG') => {
    if (canvas) {
      const [editedImage] = canvas.getObjects() as fabric.Image[];

      // Getting images' original size
      const { height, width } = editedImage.getOriginalSize();

      editedImage.scaleToWidth(width);
      editedImage.scaleToHeight(height);

      // Getting image data
      const dataURL = canvas.toDataURL({
        format: format.toLowerCase(),
        quality: 1,
        height,
        width,
      });

      const link = document.createElement('a');
      link.hidden = true;
      link.href = dataURL;
      link.download = fileName?.split('.')[0] || '';
      link.click();
    }
  };

  return (
    <>
      <Title title='Download as' />
      <div className='center-div'>
        <Button text='PNG' onClick={() => downloadImage('PNG')} />
        <Button text='JPEG' onClick={() => downloadImage('JPEG')} />
        {/* <button onClick={() => downloadImage('PNG')}>PNG</button>
        <button onClick={() => downloadImage('JPEG')}>JPEG</button> */}
      </div>
    </>
  )
}

export default ImageDownload;