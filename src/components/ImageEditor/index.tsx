import React, { useEffect, useState } from 'react';
import { fabric } from 'fabric';

type ImageEditorProps = {
  image: string;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ image: rawImage }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = React.useState<fabric.Canvas>();
  const [canvasImage, setCanvasImage] = useState<fabric.Image>()

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 500,
        height: 500,
      });
      setCanvas(canvas);
    }
  }, []);

  useEffect(() => {
    if (canvasImage) {
      canvas?.clear();
      canvas?.add(canvasImage);
    }
  }, [canvasImage, canvas]);

  useEffect(() => {
    if (rawImage) {
      fabric.Image.fromURL(rawImage, (image) => {
        image.scaleToWidth(500);
        image.scaleToHeight(500);
        image.applyFilters();
        setCanvasImage(image);
      });
    }
  }, [rawImage]);

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
      <canvas ref={canvasRef} />
    </>
  );
}

export default ImageEditor;