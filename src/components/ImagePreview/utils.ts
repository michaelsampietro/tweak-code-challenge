/**
 * Scales image to fit canvas
 * @param image image
 * @param canvas canvas
 */
export const scaleImage = (image: fabric.Image, canvas: fabric.StaticCanvas) => {
  const { height: imageHeight, width: imageWidth } = image.getOriginalSize();

  // scaling image to fit canvas
  image.scaleX = canvas?.getWidth()! / imageWidth;
  image.scaleY = canvas?.getHeight()! / imageHeight;
}

/**
 * Scales canvas to fit image
 * @param image image
 * @param canvas canvas
 * @returns canvas' new width and height
 */
export const scaleCanvas = (image: fabric.Image, canvas: fabric.StaticCanvas) => {
  // resizing canvas to adjust width and height based on image's new dimensions
  canvas?.setWidth(image.getScaledWidth());
  canvas?.setHeight(image.getScaledHeight());
}

/**
 * Calculates canvas size based on image and window width
 * @param image 
 * @param windowWidth 
 * @returns canvas' new width and height
 */
export const calculateCanvasSize = (image: HTMLImageElement, windowWidth: number) => {
  // Image aspect ratio
  const aspectRatio = image.height / image.width;
  const baseWidth = image.width > windowWidth ? windowWidth : image.width;
  const newHeight = aspectRatio * baseWidth;

  return {
    width: baseWidth,
    height: newHeight,
  }
}