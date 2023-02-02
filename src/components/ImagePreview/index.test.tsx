import { render, screen } from "@testing-library/react";
import ImagePreview from ".";

const mockImage = new Image();
mockImage.src = 'data:image/png;base64,aGVsbG8=';
mockImage.setAttribute('name', 'hello.png');

describe('ImagePreview', () => {
  it('should render', () => {
    render(<ImagePreview image={mockImage} />);
    expect(screen.getByTestId('canvas')).toBeInTheDocument();
  });
});