import { fabric } from "fabric";
import { FilterOption } from "../../types/filterOption.type";

export const filterOptions: FilterOption[] = [
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
    })],
    max: 100,
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
];