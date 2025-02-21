import { render, screen } from '@testing-library/react';

import Aside from '../components/Aside';

import type { YearItem } from '@/types/years';

const mockYears: YearItem[] = [
  { id: 1, year: 2023 },
  { id: 2, year: 2024 },
];

jest.mock('../components/AsideList', () => {
  const MockAsideList = (props: { years: YearItem[] }) => (
    <div data-testid="aside-list-mock">{`Mocked AsideList with ${props.years.length} items`}</div>
  );
  MockAsideList.displayName = 'MockAsideList';
  return MockAsideList;
});

describe('Aside', () => {
  it('should renders Aside unchanged', () => {
    const { container } = render(<Aside years={[]} />);
    expect(container).toMatchSnapshot();
  });

  it('should render Aside without errors', () => {
    render(<Aside years={[]} />);
    expect(screen.getByRole('complementary')).toBeInTheDocument();
  });

  it('should have the correct class on the aside element', () => {
    render(<Aside years={[]} />);
    expect(screen.getByRole('complementary')).toHaveClass('aside');
  });

  it('should pass the correct years prop to AsideList', () => {
    render(<Aside years={mockYears} />);

    expect(screen.getByTestId('aside-list-mock')).toHaveTextContent('Mocked AsideList with 2 items');
  });

  it('should have the correct class on the aside element', () => {
    render(<Aside years={mockYears} />);

    const listElement = screen.getByRole('complementary');
    expect(listElement).toHaveClass('aside');
  });
});
