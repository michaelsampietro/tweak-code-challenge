import React, { useEffect, useState } from 'react';
import { fabric } from 'fabric';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Title from '../Title';
import { resetObject } from '../../helpers/resetObject';
import ImageFilters from '../ImageFilters';
import { FiltersStateType } from '../../types/filterState.type';

type ImageEditorProps = {
  image: HTMLImageElement;
  setCanvas?: React.Dispatch<React.SetStateAction<fabric.StaticCanvas | undefined>>;
  canvas?: fabric.StaticCanvas;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ image: rawImage, canvas, setCanvas }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [canvasImage, setCanvasImage] = useState<fabric.Image>();
  const [filtersState, setFiltersState] = useState<FiltersStateType>({ sepia: 0, blur: 0, vintage: 0 });
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  useEffect(() => {
    setFiltersState(resetObject(filtersState, 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawImage]);

  useEffect(() => {
    const newCanvas = new fabric.StaticCanvas(canvasRef.current, {
      width: windowWidth,
      height: windowHeight,
    });
    setCanvas?.(newCanvas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

        canvas.clear();
        canvas?.add(imageObject)
        canvas?.renderAll();
        setCanvasImage(imageObject);
      });
    }
  }, [rawImage, canvas, windowHeight, windowWidth]);

  return (
    <>
      <Title title='Edit Image' />

      {canvasImage && canvas && (
        <ImageFilters image={canvasImage} canvas={canvas} setFiltersState={setFiltersState} filtersState={filtersState} />
      )}

      <div>
        <canvas ref={canvasRef} />
      </div>
    </>
  );
}

export default ImageEditor;