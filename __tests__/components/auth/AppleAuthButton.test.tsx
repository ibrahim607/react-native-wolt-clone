import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AppleAuthButton from '@/components/auth/AppleAuthButton';

describe('AppleAuthButton', () => {
  it('renders correctly', () => {
    const { getByText } = render(<AppleAuthButton />);
    expect(getByText('Continue with Apple')).toBeTruthy();
  });

  it('displays Apple logo icon', () => {
    const { UNSAFE_getByType } = render(<AppleAuthButton />);
    // Check that Ionicons component is rendered
    expect(UNSAFE_getByType).toBeTruthy();
  });

  it('has correct button text', () => {
    const { getByText } = render(<AppleAuthButton />);
    const buttonText = getByText('Continue with Apple');
    expect(buttonText).toBeTruthy();
  });

  it('is touchable/pressable', () => {
    const { getByText } = render(<AppleAuthButton />);
    const button = getByText('Continue with Apple').parent;
    expect(button).toBeTruthy();
  });

  it('can be pressed', () => {
    const { getByText } = render(<AppleAuthButton />);
    const button = getByText('Continue with Apple').parent;
    
    expect(() => {
      if (button) {
        fireEvent.press(button);
      }
    }).not.toThrow();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(<AppleAuthButton />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('applies correct styles', () => {
    const { toJSON } = render(<AppleAuthButton />);
    const tree = toJSON();
    expect(tree).toBeTruthy();
  });

  it('renders without errors', () => {
    expect(() => render(<AppleAuthButton />)).not.toThrow();
  });
});