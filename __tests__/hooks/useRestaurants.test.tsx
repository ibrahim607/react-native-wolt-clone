import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRestaurants, useRestaurant, useRestaurantMarkers } from '@/hooks/useRestaurants';
import { restaurantService } from '@/services/restaurantService';
import React from 'react';

jest.mock('@/services/restaurantService');

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

describe('useRestaurants hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useRestaurants', () => {
    it('fetches all restaurants', async () => {
      const mockRestaurants = [
        {
          id: 'rest_001',
          name: 'Test Restaurant',
          description: 'Test',
          cuisine: ['Italian'],
          rating: 4.5,
          reviewCount: 100,
          deliveryTime: '30 min',
          deliveryFee: 2.5,
          minOrder: 10,
          image: {} as any,
          location: { address: 'Test', latitude: 0, longitude: 0 },
          tags: [],
          isOpen: true,
          openingHours: {} as any,
        },
      ];
      
      (restaurantService.getAll as jest.Mock).mockResolvedValue(mockRestaurants);
      
      const { result } = renderHook(() => useRestaurants(), {
        wrapper: createWrapper(),
      });
      
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual(mockRestaurants);
    });

    it('handles loading state', () => {
      (restaurantService.getAll as jest.Mock).mockImplementation(
        () => new Promise(() => {})
      );
      
      const { result } = renderHook(() => useRestaurants(), {
        wrapper: createWrapper(),
      });
      
      expect(result.current.isLoading).toBe(true);
    });

    it('handles error state', async () => {
      (restaurantService.getAll as jest.Mock).mockRejectedValue(new Error('Failed'));
      
      const { result } = renderHook(() => useRestaurants(), {
        wrapper: createWrapper(),
      });
      
      await waitFor(() => expect(result.current.isError).toBe(true));
    });
  });

  describe('useRestaurant', () => {
    it('fetches single restaurant by ID', async () => {
      const mockRestaurant = {
        id: 'rest_001',
        name: 'Test Restaurant',
        description: 'Test',
        cuisine: ['Italian'],
        rating: 4.5,
        reviewCount: 100,
        deliveryTime: '30 min',
        deliveryFee: 2.5,
        minOrder: 10,
        image: {} as any,
        location: { address: 'Test', latitude: 0, longitude: 0 },
        tags: [],
        isOpen: true,
        openingHours: {} as any,
      };
      
      (restaurantService.getById as jest.Mock).mockResolvedValue(mockRestaurant);
      
      const { result } = renderHook(() => useRestaurant('rest_001'), {
        wrapper: createWrapper(),
      });
      
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual(mockRestaurant);
    });

    it('does not fetch when ID is empty', () => {
      const { result } = renderHook(() => useRestaurant(''), {
        wrapper: createWrapper(),
      });
      
      expect(result.current.fetchStatus).toBe('idle');
    });

    it('handles non-existent restaurant', async () => {
      (restaurantService.getById as jest.Mock).mockResolvedValue(undefined);
      
      const { result } = renderHook(() => useRestaurant('non_existent'), {
        wrapper: createWrapper(),
      });
      
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toBeUndefined();
    });
  });

  describe('useRestaurantMarkers', () => {
    it('fetches restaurant markers', async () => {
      const mockMarkers = [
        { id: 'rest_001', latitude: 51.9625, longitude: 7.6257 },
        { id: 'rest_002', latitude: 51.9618, longitude: 7.6289 },
      ];
      
      (restaurantService.getMarkers as jest.Mock).mockResolvedValue(mockMarkers);
      
      const { result } = renderHook(() => useRestaurantMarkers(), {
        wrapper: createWrapper(),
      });
      
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual(mockMarkers);
    });

    it('handles empty markers array', async () => {
      (restaurantService.getMarkers as jest.Mock).mockResolvedValue([]);
      
      const { result } = renderHook(() => useRestaurantMarkers(), {
        wrapper: createWrapper(),
      });
      
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual([]);
    });
  });
});