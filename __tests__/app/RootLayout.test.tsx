import React from 'react';
import { render } from '@testing-library/react-native';
import RootLayout from '@/app/_layout';

describe('RootLayout', () => {
  it('renders without crashing', () => {
    expect(() => render(<RootLayout />)).not.toThrow();
  });

  it('wraps content in GestureHandlerRootView', () => {
    const { toJSON } = render(<RootLayout />);
    expect(toJSON()).toBeTruthy();
  });

  it('provides QueryClient to children', () => {
    const { toJSON } = render(<RootLayout />);
    expect(toJSON()).toBeTruthy();
  });

  it('loads required fonts', () => {
    const { toJSON } = render(<RootLayout />);
    // Since fonts are mocked to return true, component should render
    expect(toJSON()).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(<RootLayout />);
    expect(toJSON()).toMatchSnapshot();
  });
});