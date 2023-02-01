import React from 'react';
import styles from './style.module.css';

type FilterProps = {
  label: string;
  fieldName: string;
  applyFilter: (e: React.ChangeEvent<HTMLInputElement>, filterName: string) => void;
  value: number;
  max?: number;
}

const Filter: React.FC<FilterProps> = ({ label, applyFilter, fieldName, value, max }) => {
  return (
    <div className={styles.fieldWrapper}>
      <label htmlFor={fieldName}>{label}</label>
      <input
        type="range"
        name={fieldName}
        id={fieldName}
        min={0}
        max={max ?? 10}
        value={value}
        onChange={(e) => applyFilter(e, fieldName)}
      />
    </div>
  )
}

export default Filter;