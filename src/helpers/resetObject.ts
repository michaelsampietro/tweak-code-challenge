export const resetObject = (object: Record<string, any>, resetValue: any = null) => {
  Object.keys(object).forEach((key) => {
    object[key] = resetValue;
  });

  return object;
}