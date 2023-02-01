import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ImageUpload from ".";

const mockSetImage = jest.fn();

const fakeFile = new File(['hello'], 'hello.png', { type: 'image/png' });

describe('ImageUpload', () => {
  it('Uploads file correctly', async () => {
    render(<ImageUpload setImage={mockSetImage} />);
    expect(screen.getByText('Upload Image')).toBeInTheDocument();

    const uploader = screen.getByTestId('imageInput');

    fireEvent.change(uploader, { target: { files: [fakeFile] } });

    // Expected image output after file upload
    const expectedImg = new Image();
    expectedImg.src = 'data:image/png;base64,aGVsbG8=';
    expectedImg.setAttribute('name', 'hello.png');

    await waitFor(() => {
      expect(mockSetImage).toHaveBeenCalledWith(expectedImg);
    })
  });
})