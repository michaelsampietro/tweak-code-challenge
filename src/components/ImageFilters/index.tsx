import React from 'react';
import { fabric } from 'fabric';
import { filterOptions } from './filterOptions';
import { resetObject } from '../../helpers/resetObject';
import Filter from '../Filter';
import { FiltersStateType } from '../../types/filterState.type';
import styles from './style.module.css';
import Title from '../Title';

type ImageFiltersProps = {
  image: fabric.Image;
  canvas: fabric.StaticCanvas;
  setFiltersState: React.Dispatch<React.SetStateAction<FiltersStateType>>,
  filtersState: FiltersStateType,
}

const ImageFilters: React.FC<ImageFiltersProps> = ({ image, canvas, filtersState, setFiltersState }) => {
  const addFilter = (filters: fabric.IBaseFilter[]) => {
    removeFilters();
    image.filters?.push(...filters);
    image.applyFilters();
    canvas.add(image!);
  }

  const removeFilters = () => {
    image.filters?.splice(0, image.filters.length);
    image.applyFilters();
    canvas.add(image);
  }

  const handleFormChange = (e: any) => {
    // Reseting other filters to 0
    const newState = resetObject(filtersState, 0);
    setFiltersState({ ...newState, [e.target.name]: Number(e.target.value ?? 0) });
  }

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

  return (
    <form onChangeCapture={handleFormChange}>
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