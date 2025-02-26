/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import Home from '../page';
import { useTranslations } from 'next-intl';
import { vi, describe, it, expect, type Mock } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(),
}));

describe('Home Component', () => {
  it('should renders the title and sections with translated text', () => {
    const mockTranslations = {
      title: 'Welcome to My App',
      sections: {
        section_1: 'This is section 1.',
        section_2: 'This is section 2.',
        section_3: 'This is section 3.',
        section_4: 'Check out the',
        section_5: 'Enjoy!',
      },
    };

    (useTranslations as Mock).mockReturnValue((key: string) => {
      const keys = key.split('.');

      let value: any = mockTranslations;
      for (const k of keys) {
        if (typeof value === 'object' && value !== null && k in value) {
          value = value[k];
        } else {
          return key;
        }
      }
      if (typeof value === 'string') {
        return value;
      }
      return key;
    });

    const result = render(<Home />);

    expect(result).toMatchSnapshot();

    expect(screen.getByRole('heading', { name: 'Welcome to My App' })).toBeInTheDocument();
    expect(screen.getByText('This is section 1.')).toBeInTheDocument();
    expect(screen.getByText('This is section 2.')).toBeInTheDocument();
    expect(screen.getByText('This is section 3.')).toBeInTheDocument();
    expect(screen.getByText(/Check out the/)).toBeInTheDocument();
    expect(screen.getByText(/Enjoy!/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Github' })).toHaveAttribute(
      'href',
      'https://github.com/smcnikita/simple-goals'
    );
  });
});
