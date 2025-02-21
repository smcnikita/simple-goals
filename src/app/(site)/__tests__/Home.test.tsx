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
      if (key === 'sections.section_1') return 'Section 1';
      if (key === 'sections.section_2') return 'Section 2';
      if (key === 'sections.section_3') return 'Section 3';
      if (key === 'sections.section_4') return 'Section 4';
      if (key === 'sections.section_5') return 'Section 5';
      return key;
    });
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });

  it('should renders the translated title', () => {
    mockUseTranslations.mockReturnValue((key: string) => {
      if (key === 'title') return 'Test Title';
      if (key === 'sections.section_1') return 'Section 1';
      if (key === 'sections.section_2') return 'Section 2';
      if (key === 'sections.section_3') return 'Section 3';
      if (key === 'sections.section_4') return 'Section 4';
      if (key === 'sections.section_5') return 'Section 5';
      return key;
    });

    render(<Home />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Title');
  });
});
