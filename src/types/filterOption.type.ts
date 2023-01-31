import { fabric } from "fabric";

export type FilterOption = {
  fieldName: string;
  displayName: string;
  filter: fabric.IBaseFilter[];
  max?: number;
}