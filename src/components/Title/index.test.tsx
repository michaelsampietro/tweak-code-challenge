import { render } from "@testing-library/react";
import Title from ".";

describe('Title', () => {
  it('Should match snapshot', () => {
    const { container } = render(<Title title='Test' />);
    expect(container).toMatchSnapshot();
  })
});