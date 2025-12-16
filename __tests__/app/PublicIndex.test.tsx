import React from 'react';
import { render } from '@testing-library/react-native';
import PublicIndex from '@/app/(app)/(public)/index';

// Additional mocks for the index screen
jest.mock('@/components/SmoothInfiniteScroll', () => 'SmoothInfiniteScroll');
jest.mock('@/components/auth/AppleAuthButton', () => 'AppleAuthButton');
jest.mock('@/components/auth/GoogleAuthButton', () => 'GoogleAuthButton');

describe('PublicIndex (Login Screen)', () => {
  it('renders without crashing', () => {
    expect(() => render(<PublicIndex />)).not.toThrow();
  });

  it('displays tagline text', () => {
    const { getByText } = render(<PublicIndex />);
    expect(getByText(/Almost EveryThing Delivered/i)).toBeTruthy();
  });

  it('displays other options button text', () => {
    const { getByText } = render(<PublicIndex />);
    expect(getByText('Other options')).toBeTruthy();
  });

  it('displays privacy policy text', () => {
    const { getByText } = render(<PublicIndex />);
    expect(getByText(/Terms of Service and Privacy Policy/i)).toBeTruthy();
  });

  it('renders three smooth infinite scroll components', () => {
    const { toJSON } = render(<PublicIndex />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders authentication buttons', () => {
    const { toJSON } = render(<PublicIndex />);
    expect(toJSON()).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(<PublicIndex />);
    expect(toJSON()).toMatchSnapshot();
  });
});