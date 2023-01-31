import React from 'react';

type FilterProps = {
  label: string;
  fieldName: string;
  applyFilter: (e: React.ChangeEvent<HTMLInputElement>, filterName: string) => void;
  value: number;
}

const Filter: React.FC<FilterProps> = ({ label, applyFilter, fieldName, value }) => {
  return (
    <>
      <label htmlFor={fieldName}>{label}</label>
      <input
        type="range"
        name={fieldName}
        id={fieldName}
        min={0}
        max={100}
        defaultValue={0}
        value={value}
        onChange={(e) => applyFilter(e, fieldName)}
      />
    </>
  )
}

export default Filter;