import { render, screen } from '@testing-library/react';

import AsideList from '../components/AsideList';

import type { YearItem } from '@/types/years';

jest.mock('../components/AsideItem', () => jest.fn(() => <li>Mocked Year</li>));

const mockYears: YearItem[] = [
  { id: 1, year: 2023 },
  { id: 2, year: 2024 },
];

describe('AsideList', () => {
  it('should renders AsideList unchanged', () => {
    const { container } = render(<AsideList years={mockYears} />);
    expect(container).toMatchSnapshot();
  });

  it('should render a list of years', () => {
    render(<AsideList years={mockYears} />);

    expect(screen.getAllByText('Mocked Year')).toHaveLength(mockYears.length);
  });

  it('should render an empty list if no years are provided', () => {
    render(<AsideList years={[]} />);

    expect(screen.queryByText('Mocked Year')).not.toBeInTheDocument();
  });

  it('should have the correct class on the list element', () => {
    render(<AsideList years={mockYears} />);

    const listElement = screen.getByRole('list');
    expect(listElement).toHaveClass('list');
  });
});
