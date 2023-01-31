import React from 'react';
import Title from '../Title';

type ImageDownloadProps = {
  canvas?: fabric.StaticCanvas;
  fileName?: string | null | undefined;
}

const ImageDownload: React.FC<ImageDownloadProps> = ({ canvas, fileName }) => {

  const downloadImage = (format: 'PNG' | 'JPEG') => {
    if (canvas) {
      const dataURL = canvas.toDataURL({
        format: format.toLowerCase(),
        quality: 1,
      });

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
      <button onClick={() => downloadImage('PNG')}>PNG</button>
      <button onClick={() => downloadImage('JPEG')}>JPEG</button>
    </>
  )
}

export default ImageDownload;