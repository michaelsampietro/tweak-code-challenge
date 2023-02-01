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
      const editedImage = canvas.getObjects()[0] as fabric.Image;
      // Storing image current size
      const currentSizes = {
        scaleX: editedImage.scaleX,
        scaleY: editedImage.scaleY,
      };

      // Getting images original size
      const { height, width } = editedImage.getOriginalSize();

      // Scaling back to original size
      editedImage.scaleToWidth(width);
      editedImage.scaleToHeight(height);

      // Getting image data
      const dataURL = canvas.toDataURL({
        format: format.toLowerCase(),
        quality: 1,
        height,
        width,
      });

      // Revert image back to "editing" size
      editedImage.scaleX = currentSizes.scaleX;
      editedImage.scaleY = currentSizes.scaleY;

      const link = document.createElement('a');
      link.hidden = true;
      link.href = dataURL;
      link.download = fileName || '';
      link.click();
    }
  };

  return (
    <>
      <Title title='Download as' />
      <div className='center-div'>
        <Button text='PNG' onClick={() => downloadImage('PNG')} />
        <Button text='JPEG' onClick={() => downloadImage('JPEG')} />
      </div>
    </>
  )
}

export default ImageDownload;