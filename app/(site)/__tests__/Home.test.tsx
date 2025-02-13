import { render, screen } from '@testing-library/react';

import Home from '../page';

test('should render home page', () => {
  render(<Home />);
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
});
