import React, { useEffect, useState } from 'react';
import { fabric } from 'fabric';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Title from '../Title';

type ImageEditorProps = {
  image: HTMLImageElement;
  setCanvas?: React.Dispatch<React.SetStateAction<fabric.StaticCanvas | undefined>>;
  canvas?: fabric.StaticCanvas;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ image: rawImage, canvas, setCanvas }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [canvasImage, setCanvasImage] = useState<fabric.Image>();
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  useEffect(() => {
    const newCanvas = new fabric.StaticCanvas(canvasRef.current, {
      width: windowWidth,
      height: windowHeight,
    });
    setCanvas?.(newCanvas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (canvasImage) {
      canvas?.clear();
      canvas?.add(canvasImage);
      canvas?.renderAll();
    }
  }, [canvasImage, canvas]);

  useEffect(() => {
    if (rawImage && canvas) {
      // Calculating canvas size
      const aspectRatio = rawImage.height / rawImage.width;
      const baseWidth = rawImage.width > windowWidth ? windowWidth : rawImage.width;
      const newHeight = aspectRatio * baseWidth;

      // Setting the maxible possible size for the canvas
      canvas.setWidth(baseWidth);
      canvas.setHeight(newHeight);

      fabric.Image.fromURL(rawImage.src, (imageObject) => {
        const { height: imageHeight, width: imageWidth } = imageObject.getOriginalSize();

        // scaling image to fit canvas
        // 0.93 is a magic number to make it fit better and prevent overflowing the canvas
        imageObject.scaleX = canvas?.getWidth()! / imageWidth * 0.93;
        imageObject.scaleY = canvas?.getHeight()! / imageHeight * 0.93;

        // resizing canvas to adjust width and height based on image's new dimensions
        canvas?.setWidth(imageObject.getScaledWidth());
        canvas?.setHeight(imageObject.getScaledHeight());

        canvas?.renderAll();
        setCanvasImage(imageObject);
      });
    }
  }, [rawImage, canvas, windowHeight, windowWidth]);

  const addFilter = (filters: fabric.IBaseFilter[]) => {
    canvasImage?.filters?.push(...filters);
    canvasImage?.applyFilters();
    canvas?.add(canvasImage!);
  }

  const removeFilters = () => {
    canvasImage?.filters?.splice(0, canvasImage?.filters?.length);
    canvasImage?.applyFilters();
    canvas?.add(canvasImage!);
  }

  return (
    <>
      <Title title='Edit Image' />

      <button onClick={() => addFilter([
        new fabric.Image.filters.Noise({
          noise: 60,
        }),
        new fabric.Image.filters.Grayscale(),
      ])}>
        Vintage
      </button>

      <button onClick={() => addFilter([new fabric.Image.filters.Sepia()])}>Sepia</button>

      {/* From http://fabricjs.com/docs/fabric.Image.filters.Convolute.html  */}
      <button onClick={() => addFilter([new fabric.Image.filters.Convolute({
        matrix: [1 / 9, 1 / 9, 1 / 9,
        1 / 9, 1 / 9, 1 / 9,
        1 / 9, 1 / 9, 1 / 9],
      })])}>Blur</button>
      <button onClick={removeFilters}>Remove all filters</button>

      <div>
        <canvas ref={canvasRef} />
      </div>
    </>
  );
}

export default ImageEditor;