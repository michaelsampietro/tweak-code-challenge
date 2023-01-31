import React, { useEffect, useState } from 'react';
import { fabric } from 'fabric';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Title from '../Title';
import Filter from '../Filter';
import { resetObject } from '../../helpers/resetObject';

type ImageEditorProps = {
  image: HTMLImageElement;
  setCanvas?: React.Dispatch<React.SetStateAction<fabric.StaticCanvas | undefined>>;
  canvas?: fabric.StaticCanvas;
}

type FiltersStateType = {
  [key: string]: number;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ image: rawImage, canvas, setCanvas }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [canvasImage, setCanvasImage] = useState<fabric.Image>();
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  const [filtersState, setFiltersState] = useState<FiltersStateType>({ sepia: 0, blur: 0, vintage: 0 });

  useEffect(() => {
    console.log({ rawImage });
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
    removeFilters();
    canvasImage?.filters?.push(...filters);
    canvasImage?.applyFilters();
    canvas?.add(canvasImage!);
  }

  const removeFilters = () => {
    canvasImage?.filters?.splice(0, canvasImage?.filters?.length);
    canvasImage?.applyFilters();
    canvas?.add(canvasImage!);
  }

  const filterOptions: {
    fieldName: string;
    displayName: string;
    filter: fabric.IBaseFilter[];
  }[] = [
      {
        fieldName: 'sepia',
        displayName: 'Sepia',
        filter: [new fabric.Image.filters.Sepia()],
      },
      {
        fieldName: 'blur',
        displayName: 'Blur',
        filter: [new fabric.Image.filters.Convolute({
          matrix: [1 / 9, 1 / 9, 1 / 9,
          1 / 9, 1 / 9, 1 / 9,
          1 / 9, 1 / 9, 1 / 9],
        })]
      },
      {
        fieldName: 'vintage',
        displayName: 'Vintage',
        filter: [
          new fabric.Image.filters.Noise({
            noise: 60,
          }),
          new fabric.Image.filters.Grayscale(),
        ],
      },
    ]

  const adjustFilterIntensity = (event: React.ChangeEvent<HTMLInputElement>, filterName: string) => {
    if (event?.target?.value) {
      const intensity = event?.target?.value || 0;
      removeFilters();

      const filter = filterOptions.find(f => f.fieldName as string === filterName)?.filter;

      if (filter) {
        const filters: fabric.IBaseFilter[][] = [];
        for (let i = 0; i < intensity; i++) {
          filters.push([...filter]);
        }
        addFilter(filters.flat());
      }
    }
  }

  const handleFormChange = (e: any) => {
    // Reseting other filters to 0
    const newState = resetObject(filtersState, 0);
    setFiltersState({ ...newState, [e.target.name]: Number(e.target.value ?? 0) });
  }
  return (
    <>
      <Title title='Edit Image' />
      <form onChangeCapture={handleFormChange}>
        {filterOptions.map((filterOption) => (
          <Filter
            applyFilter={adjustFilterIntensity}
            label={filterOption.displayName}
            fieldName={filterOption.fieldName}
            value={filtersState[filterOption.fieldName]}
          />
        )
        )}
      </form>

      <button onClick={removeFilters}>Remove all filters</button>

      <div>
        <canvas ref={canvasRef} />
      </div>
    </>
  );
}

export default ImageEditor;