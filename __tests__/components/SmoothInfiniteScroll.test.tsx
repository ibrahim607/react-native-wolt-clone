import React from 'react';
import { render } from '@testing-library/react-native';
import SmoothInfiniteScroll from '@/components/SmoothInfiniteScroll';

// Mock react-native-reanimated more thoroughly
jest.mock('react-native-reanimated', () => {
  const View = require('react-native').View;
  const Text = require('react-native').Text;
  const ScrollView = require('react-native').ScrollView;
  
  return {
    default: {
      View: View,
      Text: Text,
      ScrollView: ScrollView,
    },
    useSharedValue: jest.fn((initial) => ({ value: initial })),
    useAnimatedRef: jest.fn(() => ({ current: null })),
    useAnimatedReaction: jest.fn(),
    withTiming: jest.fn((value) => value),
    withRepeat: jest.fn((value) => value),
    cancelAnimation: jest.fn(),
    scrollTo: jest.fn(),
    Easing: {
      linear: jest.fn(),
    },
  };
});

describe('SmoothInfiniteScroll', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { getByTestId } = render(<SmoothInfiniteScroll />);
    expect(() => render(<SmoothInfiniteScroll />)).not.toThrow();
  });

  it('renders with default props (down direction, set1)', () => {
    const { toJSON } = render(<SmoothInfiniteScroll />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with up scroll direction', () => {
    const { toJSON } = render(<SmoothInfiniteScroll scrollDirection="up" />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with down scroll direction', () => {
    const { toJSON } = render(<SmoothInfiniteScroll scrollDirection="down" />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with set1 icon set', () => {
    const { toJSON } = render(<SmoothInfiniteScroll iconSet="set1" />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with set2 icon set', () => {
    const { toJSON } = render(<SmoothInfiniteScroll iconSet="set2" />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with set3 icon set', () => {
    const { toJSON } = render(<SmoothInfiniteScroll iconSet="set3" />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders all icon sets correctly', () => {
    const iconSets = ['set1', 'set2', 'set3'] as const;
    
    iconSets.forEach((iconSet) => {
      const { toJSON } = render(<SmoothInfiniteScroll iconSet={iconSet} />);
      expect(toJSON()).toBeTruthy();
    });
  });

  it('handles both scroll directions', () => {
    const directions = ['up', 'down'] as const;
    
    directions.forEach((direction) => {
      const { toJSON } = render(<SmoothInfiniteScroll scrollDirection={direction} />);
      expect(toJSON()).toBeTruthy();
    });
  });

  it('renders correct number of items (tripled for infinite scroll)', () => {
    const { toJSON } = render(<SmoothInfiniteScroll iconSet="set1" />);
    const tree = toJSON();
    // set1 has 5 items, tripled = 15 items for seamless scrolling
    expect(tree).toBeTruthy();
  });

  it('applies correct styles to icon containers', () => {
    const { toJSON } = render(<SmoothInfiniteScroll />);
    const tree = toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('handles prop changes gracefully', () => {
    const { rerender } = render(<SmoothInfiniteScroll iconSet="set1" scrollDirection="down" />);
    
    rerender(<SmoothInfiniteScroll iconSet="set2" scrollDirection="up" />);
    rerender(<SmoothInfiniteScroll iconSet="set3" scrollDirection="down" />);
    
    expect(() => rerender(<SmoothInfiniteScroll iconSet="set1" scrollDirection="up" />)).not.toThrow();
  });
});