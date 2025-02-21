import { usePathname } from 'next/navigation';
import { render, screen } from '@testing-library/react';

import { PATHS } from '@/constants/paths';

import AsideItem from '../components/AsideItem';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('AsideItem', () => {
  const year = 2023;
  const href = PATHS.goals.base + PATHS.goals.slug.replace(':slug', year.toString());

  it('should renders AsideItem unchanged', () => {
    const { container } = render(<AsideItem year={year} />);
    expect(container).toMatchSnapshot();
  });

  it('should render the year correctly', () => {
    (usePathname as jest.Mock).mockReturnValue('/some-other-path');

    render(<AsideItem year={year} />);

    expect(screen.getByText(year.toString())).toBeInTheDocument();
  });

  it('should apply active class when pathname matches href', () => {
    (usePathname as jest.Mock).mockReturnValue(href);

    render(<AsideItem year={year} />);

    const link = screen.getByRole('link', { name: year.toString() });
    expect(link).toHaveClass('active');
  });

  it('should generate correct href', () => {
    (usePathname as jest.Mock).mockReturnValue('/some-other-path');

    render(<AsideItem year={year} />);

    const link = screen.getByRole('link', { name: year.toString() });
    expect(link).toHaveAttribute('href', href);
  });
});
