import { fireEvent, render, screen } from "@testing-library/react";
import Button from ".";

const mockBtnCallback = jest.fn();

describe('Button', () => {
  it('Renders button correctly', () => {
    render(<Button onClick={mockBtnCallback} text='Test' />);

    expect(screen.getByText('Test')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Test'));
    expect(mockBtnCallback).toHaveBeenCalledTimes(1);
  })
})