import { render, screen } from "@testing-library/react";
import { useState } from "react";
import ImagePreview from ".";

const mockImage = new Image();
mockImage.src = 'data:image/png;base64,aGVsbG8=';
mockImage.setAttribute('width', '200');
mockImage.setAttribute('height', '100');
mockImage.setAttribute('name', 'hello.png');

const ImagePreviewTestWrapper = () => {
  const [canvas, setCanvas] = useState<any>();

  return (
    <ImagePreview image={mockImage} canvas={canvas} setCanvas={setCanvas} />
  );
}

describe('ImagePreview', () => {
  it('Render canvas with image dimensions', async () => {
    render(<ImagePreviewTestWrapper />);

    // Renders canvas in the correct dimensions
    const canvas = screen.getByTestId('canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute('width', '200');
    expect(canvas).toHaveAttribute('height', '100');
  });

  it('Render canvas with window dimensions', async () => {
    mockImage.setAttribute('width', '5000');
    mockImage.setAttribute('height', '5000');

    render(<ImagePreviewTestWrapper />);

    // Renders canvas in the correct dimensions
    const canvas = screen.getByTestId('canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute('width', '1024');
    expect(canvas).toHaveAttribute('height', '1024');
  });
});