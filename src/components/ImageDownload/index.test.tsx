import { render, screen } from "@testing-library/react";
import ImageDownload from ".";

let mockStaticCanvas: any;

describe('ImageDownload', () => {
  beforeEach(() => {
    mockStaticCanvas = {
      toDataURL: jest.fn()
        .mockReturnValueOnce('data:image/png;base64,aGVsbG8=') // for PNG test
        .mockReturnValueOnce('data:image/jpeg;base64,aGVsbG8='), // for JPEG test
      getObjects: jest.fn().mockReturnValue([
        {
          scaleX: 1,
          scaleY: 1,
          getOriginalSize: jest.fn().mockReturnValue({
            height: 100,
            width: 100,
          }),
          scaleToWidth: jest.fn(),
          scaleToHeight: jest.fn(),
        },
      ]),
    } as any;
  })

  it('Render PNG and JPEG buttons', () => {
    render(<ImageDownload canvas={mockStaticCanvas} fileName='image' />);
    expect(screen.getByText('PNG')).toBeInTheDocument();
    expect(screen.getByText('JPEG')).toBeInTheDocument();
  });

  it('Downloads image in the correct format', async () => {
    render(<ImageDownload canvas={mockStaticCanvas} fileName='image' />);
    const pngButton = screen.getByText('PNG');
    const jpegButton = screen.getByText('JPEG');

    pngButton.click();
    expect(mockStaticCanvas.toDataURL).toHaveBeenCalledWith({
      format: 'png',
      quality: 1,
      height: 100,
      width: 100,
    });

    jpegButton.click();
    expect(mockStaticCanvas.toDataURL).toHaveBeenCalledWith({
      format: 'jpeg',
      quality: 1,
      height: 100,
      width: 100,
    });
  })
})