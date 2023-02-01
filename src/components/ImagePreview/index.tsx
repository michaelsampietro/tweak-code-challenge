import React, { useEffect } from 'react';
import { fabric } from 'fabric';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { calculateCanvasSize, scaleImage } from './utils';

type ImagePreviewProps = {
  image: HTMLImageElement;
  setCanvas?: React.Dispatch<React.SetStateAction<fabric.StaticCanvas | undefined>>;
  canvas?: fabric.StaticCanvas;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ image: rawImage, canvas, setCanvas }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  // Creates a new canvas on component mount
  useEffect(() => {
    const newCanvas = new fabric.StaticCanvas(canvasRef.current, {
      width: windowWidth,
      height: windowHeight,
    });
    setCanvas?.(newCanvas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When rawImage or canvas changes, resize canvas and add image to it
  useEffect(() => {
    if (rawImage && canvas) {
      setCanvasSize(canvas, windowWidth);

      fabric.Image.fromURL(rawImage.src, (imageObject) => {
        scaleImage(imageObject, canvas);
        imageObject.name = rawImage.getAttribute('name') ?? 'image';
        canvas.clear();
        canvas?.add(imageObject);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawImage, canvas]);

  // When window size changes, resize canvas and image
  useEffect(() => {
    if (rawImage && canvas) {
      // Recalculate canvas size
      setCanvasSize(canvas, windowWidth);

      // Image will always be the first object in the canvas
      const [image] = canvas.getObjects() as fabric.Image[];
      if (!image) return;

      // Scale image to new canvas size
      scaleImage(image, canvas);
      canvas.renderAll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth, windowHeight]);

  const setCanvasSize = (canvas: fabric.StaticCanvas, width: number) => {
    const { width: canvasWidth, height } = calculateCanvasSize(rawImage, width);
    canvas.setWidth(canvasWidth);
    canvas.setHeight(height);
  }

  return (
    <div className='w-100 center-div'>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default ImagePreview;