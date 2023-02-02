import React, { useEffect, useState } from 'react';
import { fabric } from 'fabric';
import { filterOptions } from './filterOptions';
import { resetObject } from '../../helpers/resetObject';
import Filter from '../Filter';
import { FiltersStateType } from '../../types/filterState.type';
import styles from './style.module.css';

type ImageFiltersProps = {
  canvas: fabric.StaticCanvas;
  imageName?: string | null;
}

const ImageFilters: React.FC<ImageFiltersProps> = ({ canvas, imageName }) => {
  const [canvasImage] = canvas.getObjects() as fabric.Image[];
  const [filtersState, setFiltersState] = useState<FiltersStateType>({ sepia: 0, blur: 0, vintage: 0 });

  useEffect(() => {
    setFiltersState({...resetObject(filtersState, 0)});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageName]);

  const addFilter = (filters: fabric.IBaseFilter[]) => {
    if (canvasImage) {
      removeFilters();
      canvasImage.filters?.push(...filters);
      canvasImage.applyFilters();
      canvas.renderAll();
    }
  }

  const removeFilters = () => {
    if (canvasImage) {
      canvasImage.filters?.splice(0, canvasImage.filters.length);
      canvasImage.applyFilters();
      canvas.renderAll();
    }
  }

  const handleFormChange = (event: any) => {
    // Reseting other filters to 0
    const newState = resetObject(filtersState, 0);
    setFiltersState({ ...newState, [event.target.name]: Number(event.target.value ?? 0) });
  }

  const adjustFilterIntensity = (event: React.ChangeEvent<HTMLInputElement>, filterName: string) => {
    if (event?.target?.value) {
      const intensity = Number(event?.target?.value || 0);

      if (intensity === 0) {
        removeFilters();
        return;
      }

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

  return (
    <form onChangeCapture={handleFormChange} className='w-100'>
      <div className={styles.filterWrapper}>
        {filterOptions.map((filterOption) => (
          <Filter
            key={filterOption.fieldName}
            applyFilter={adjustFilterIntensity}
            label={filterOption.displayName}
            fieldName={filterOption.fieldName}
            value={filtersState[filterOption.fieldName]}
            max={filterOption.max}
          />
        )
        )}
      </div>
    </form>
  )
}

export default ImageFilters;