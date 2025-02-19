import { render, screen } from '@testing-library/react';
import { useTranslations } from 'next-intl';

import Home from '../page';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

const mockUseTranslations = useTranslations as jest.Mock;

describe('Home', () => {
  it('should renders Home unchanged', () => {
    mockUseTranslations.mockReturnValue((key: string) => {
      if (key === 'title') return 'Test Title';
      return key;
    });
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });

  it('should renders the translated title', () => {
    mockUseTranslations.mockReturnValue((key: string) => {
      if (key === 'title') return 'Test Title';
      return key;
    });

    render(<Home />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Title');
  });
});
