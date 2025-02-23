import { render } from '@testing-library/react';

import Aside from '../components/Aside';

jest.mock('../components/AsideList', () => {
  const MockAsideList = (props: { defaultYears: number[] }) => (
    <div data-testid="aside-list-mock">{`Mocked AsideList with ${props.defaultYears.length} items`}</div>
  );
  MockAsideList.displayName = 'MockAsideList';
  return MockAsideList;
});

describe('Aside', () => {
  // TODO: add more tests

  it('should renders Aside unchanged', () => {
    const { container } = render(<Aside />);
    expect(container).toMatchSnapshot();
  });
});
