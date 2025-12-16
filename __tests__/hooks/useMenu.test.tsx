import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMenu, useDish, usePopularDishes } from '@/hooks/useMenu';
import { menuService } from '@/services/menuService';
import React from 'react';

jest.mock('@/services/menuService');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useMenu hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useMenu', () => {
    it('fetches menu for restaurant', async () => {
      const mockMenu = [
        {
          category: 'Test Category',
          dishes: [
            {
              id: 1,
              name: 'Test Dish',
              description: 'Test',
              price: 10,
              image: {} as any,
            },
          ],
        },
      ];
      
      (menuService.getMenu as jest.Mock).mockResolvedValue(mockMenu);
      
      const { result } = renderHook(() => useMenu('rest_001'), {
        wrapper: createWrapper(),
      });
      
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual(mockMenu);
    });

    it('does not fetch when restaurant ID is empty', () => {
      const { result } = renderHook(() => useMenu(''), {
        wrapper: createWrapper(),
      });
      
      expect(result.current.fetchStatus).toBe('idle');
    });

    it('handles loading state', () => {
      (menuService.getMenu as jest.Mock).mockImplementation(
        () => new Promise(() => {})
      );
      
      const { result } = renderHook(() => useMenu('rest_001'), {
        wrapper: createWrapper(),
      });
      
      expect(result.current.isLoading).toBe(true);
    });

    it('handles error state', async () => {
      (menuService.getMenu as jest.Mock).mockRejectedValue(new Error('Failed'));
      
      const { result } = renderHook(() => useMenu('rest_001'), {
        wrapper: createWrapper(),
      });
      
      await waitFor(() => expect(result.current.isError).toBe(true));
    });

    it('uses correct query key', () => {
      const { result } = renderHook(() => useMenu('rest_001'), {
        wrapper: createWrapper(),
      });
      
      expect(result.current).toBeDefined();
    });
  });

  describe('useDish', () => {
    it('fetches single dish by ID', async () => {
      const mockDish = {
        id: 1,
        name: 'Test Dish',
        description: 'Test',
        price: 10,
        image: {} as any,
      };
      
      (menuService.getDishById as jest.Mock).mockResolvedValue(mockDish);
      
      const { result } = renderHook(() => useDish(1), {
        wrapper: createWrapper(),
      });
      
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual(mockDish);
    });

    it('does not fetch when dish ID is zero', () => {
      const { result } = renderHook(() => useDish(0), {
        wrapper: createWrapper(),
      });
      
      expect(result.current.fetchStatus).toBe('idle');
    });

    it('handles undefined dish', async () => {
      (menuService.getDishById as jest.Mock).mockResolvedValue(undefined);
      
      const { result } = renderHook(() => useDish(999), {
        wrapper: createWrapper(),
      });
      
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toBeUndefined();
    });
  });

  describe('usePopularDishes', () => {
    it('fetches popular dishes for restaurant', async () => {
      const mockPopularDishes = [
        {
          id: 1,
          name: 'Popular Dish',
          description: 'Test',
          price: 10,
          image: {} as any,
          isPopular: true,
        },
      ];
      
      (menuService.getPopularDishes as jest.Mock).mockResolvedValue(mockPopularDishes);
      
      const { result } = renderHook(() => usePopularDishes('rest_001'), {
        wrapper: createWrapper(),
      });
      
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual(mockPopularDishes);
    });

    it('does not fetch when restaurant ID is empty', () => {
      const { result } = renderHook(() => usePopularDishes(''), {
        wrapper: createWrapper(),
      });
      
      expect(result.current.fetchStatus).toBe('idle');
    });
  });
});