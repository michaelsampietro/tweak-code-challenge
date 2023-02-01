import { fireEvent, render, screen } from "@testing-library/react";
import Filter, { FilterProps } from ".";

var mockedProps: FilterProps;
describe('Filter', () => {
  beforeEach(() => {
    mockedProps = {
      label: 'Test',
      fieldName: 'test',
      applyFilter: jest.fn(),
      value: 0,
    }
  })

  it('Renders filter correctly', () => {
    render(<Filter {...mockedProps} />);
    expect(screen.getByLabelText('Test')).toBeInTheDocument();
    expect(screen.getByRole('slider')).toBeInTheDocument();
  })

  it('Calls applyFilter on change', () => {
    render(<Filter {...mockedProps} />);

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: 5 } });

    expect(mockedProps.applyFilter).toHaveBeenCalled();
  })
})