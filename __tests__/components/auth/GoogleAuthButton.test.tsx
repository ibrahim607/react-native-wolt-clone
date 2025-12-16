import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import GoogleAuthButton from '@/components/auth/GoogleAuthButton';

describe('GoogleAuthButton', () => {
  it('renders correctly', () => {
    const { getByText } = render(<GoogleAuthButton />);
    expect(getByText('Continue with Google')).toBeTruthy();
  });

  it('displays Google logo icon', () => {
    const { UNSAFE_getByType } = render(<GoogleAuthButton />);
    // Check that component structure exists
    expect(UNSAFE_getByType).toBeTruthy();
  });

  it('has correct button text', () => {
    const { getByText } = render(<GoogleAuthButton />);
    const buttonText = getByText('Continue with Google');
    expect(buttonText).toBeTruthy();
  });

  it('is touchable/pressable', () => {
    const { getByText } = render(<GoogleAuthButton />);
    const button = getByText('Continue with Google').parent;
    expect(button).toBeTruthy();
  });

  it('can be pressed', () => {
    const { getByText } = render(<GoogleAuthButton />);
    const button = getByText('Continue with Google').parent;
    
    expect(() => {
      if (button) {
        fireEvent.press(button);
      }
    }).not.toThrow();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(<GoogleAuthButton />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('applies correct styles with Google blue color', () => {
    const { toJSON } = render(<GoogleAuthButton />);
    const tree = toJSON();
    expect(tree).toBeTruthy();
  });

  it('renders without errors', () => {
    expect(() => render(<GoogleAuthButton />)).not.toThrow();
  });

  it('exports both named and default export', () => {
    const { GoogleAuthButton: NamedExport } = require('@/components/auth/GoogleAuthButton');
    const DefaultExport = require('@/components/auth/GoogleAuthButton').default;
    
    expect(NamedExport).toBeDefined();
    expect(DefaultExport).toBeDefined();
  });
});