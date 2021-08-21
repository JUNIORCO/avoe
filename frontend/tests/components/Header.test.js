import React from 'react';
import renderer from '@testing-library/react';
import Header from '../../src/components/Header';

describe('HeaderComponent', () => {
  it('renders correctly', () => {
    const tree = renderer
      .render(<Header />)
      .toString();
    expect(tree).toMatchSnapshot();
  });
});
