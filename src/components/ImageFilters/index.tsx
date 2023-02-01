import React, { useEffect, useState } from 'react';
import { fabric } from 'fabric';
import { filterOptions } from './filterOptions';
import { resetObject } from '../../helpers/resetObject';
import Filter from '../Filter';
import { FiltersStateType } from '../../types/filterState.type';
import styles from './style.module.css';
import Title from '../Title';

type ImageFiltersProps = {
  canvas: fabric.StaticCanvas;
}

const ImageFilters: React.FC<ImageFiltersProps> = ({ canvas }) => {
  const [image] = canvas.getObjects() as fabric.Image[];
  const [filtersState, setFiltersState] = useState<FiltersStateType>({ sepia: 0, blur: 0, vintage: 0 });

  useEffect(() => {
    setFiltersState(resetObject(filtersState, 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const addFilter = (filters: fabric.IBaseFilter[]) => {
    if (image) {
      removeFilters();
      image.filters?.push(...filters);
      image.applyFilters();
      canvas.renderAll();
    }
  }

  const removeFilters = () => {
    if (image) {
      image.filters?.splice(0, image.filters.length);
      image.applyFilters();
      canvas.renderAll();
    }
  }

  const handleFormChange = (e: any) => {
    // Reseting other filters to 0
    const newState = resetObject(filtersState, 0);
    setFiltersState({ ...newState, [e.target.name]: Number(e.target.value ?? 0) });
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