import { fireEvent, render, screen } from "@testing-library/react";
import ImageFilters from ".";
import { filterOptions } from "./filterOptions";

var mockStaticCanvas: any;
describe('ImageFilters', () => {
  beforeEach(() => {
    mockStaticCanvas = {
      renderAll: jest.fn(),
      getObjects: jest.fn().mockReturnValue([
        {
          filters: [],
          applyFilters: jest.fn(),
        },
      ]),
    };
  });

  it('Renders all filters', () => {
    render(<ImageFilters canvas={mockStaticCanvas} />);
    filterOptions.forEach((filter) => {
      expect(screen.getByText(filter.displayName)).toBeInTheDocument();
    })
  });

  it('Applies filters slider change', () => {
    render(<ImageFilters canvas={mockStaticCanvas} />);

    const slider = screen.getAllByRole("slider")[0];
    fireEvent.change(slider, { target: { value: 5 } });

    const [mockImage] = mockStaticCanvas.getObjects();
    expect(mockImage.filters?.length).toBe(5);
    expect(mockImage.applyFilters).toHaveBeenCalled();
    expect(mockStaticCanvas.renderAll).toHaveBeenCalled();
  });
});