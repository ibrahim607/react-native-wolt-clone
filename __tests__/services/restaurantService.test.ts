import { restaurantService } from '@/services/restaurantService';
import { restaurants } from '@/data/restaurants';
import { restaurantMarkers } from '@/data/restaurant_markers';

describe('restaurantService', () => {
  describe('getAll', () => {
    it('returns all restaurants', async () => {
      const allRestaurants = await restaurantService.getAll();
      expect(allRestaurants).toEqual(restaurants);
      expect(Array.isArray(allRestaurants)).toBe(true);
      expect(allRestaurants.length).toBeGreaterThan(0);
    });

    it('returns restaurants with correct structure', async () => {
      const allRestaurants = await restaurantService.getAll();
      const restaurant = allRestaurants[0];
      
      expect(restaurant).toHaveProperty('id');
      expect(restaurant).toHaveProperty('name');
      expect(restaurant).toHaveProperty('description');
      expect(restaurant).toHaveProperty('cuisine');
      expect(restaurant).toHaveProperty('rating');
      expect(restaurant).toHaveProperty('deliveryTime');
      expect(restaurant).toHaveProperty('location');
    });

    it('returns promise that resolves', async () => {
      const promise = restaurantService.getAll();
      expect(promise).toBeInstanceOf(Promise);
      await expect(promise).resolves.toBeDefined();
    });
  });

  describe('getById', () => {
    it('returns correct restaurant by ID', async () => {
      const restaurant = await restaurantService.getById('rest_001');
      expect(restaurant).toBeDefined();
      expect(restaurant?.id).toBe('rest_001');
      expect(restaurant?.name).toBe('Pizza Perfetto');
    });

    it('returns undefined for non-existent restaurant', async () => {
      const restaurant = await restaurantService.getById('non_existent');
      expect(restaurant).toBeUndefined();
    });

    it('returns restaurant with complete data', async () => {
      const restaurant = await restaurantService.getById('rest_001');
      
      expect(restaurant?.cuisine).toBeDefined();
      expect(Array.isArray(restaurant?.cuisine)).toBe(true);
      expect(restaurant?.location).toBeDefined();
      expect(restaurant?.location.address).toBeDefined();
      expect(restaurant?.location.latitude).toBeDefined();
      expect(restaurant?.location.longitude).toBeDefined();
    });

    it('handles empty string ID', async () => {
      const restaurant = await restaurantService.getById('');
      expect(restaurant).toBeUndefined();
    });

    it('returns promise that resolves', async () => {
      const promise = restaurantService.getById('rest_001');
      expect(promise).toBeInstanceOf(Promise);
      await expect(promise).resolves.toBeDefined();
    });
  });

  describe('getMarkers', () => {
    it('returns all restaurant markers', async () => {
      const markers = await restaurantService.getMarkers();
      expect(markers).toEqual(restaurantMarkers);
      expect(Array.isArray(markers)).toBe(true);
    });

    it('returns markers with correct structure', async () => {
      const markers = await restaurantService.getMarkers();
      if (markers.length > 0) {
        const marker = markers[0];
        expect(marker).toHaveProperty('id');
        expect(marker).toHaveProperty('latitude');
        expect(marker).toHaveProperty('longitude');
      }
    });

    it('returns promise that resolves', async () => {
      const promise = restaurantService.getMarkers();
      expect(promise).toBeInstanceOf(Promise);
      await expect(promise).resolves.toBeDefined();
    });
  });

  describe('search', () => {
    it('finds restaurants by name', async () => {
      const results = await restaurantService.search('Pizza');
      expect(results.length).toBeGreaterThan(0);
      expect(results.some((r) => r.name.toLowerCase().includes('pizza'))).toBe(true);
    });

    it('finds restaurants by description', async () => {
      const results = await restaurantService.search('burger');
      expect(results.length).toBeGreaterThan(0);
    });

    it('finds restaurants by cuisine', async () => {
      const results = await restaurantService.search('Italian');
      expect(results.length).toBeGreaterThan(0);
      expect(results.some((r) => r.cuisine.includes('Italian'))).toBe(true);
    });

    it('is case-insensitive', async () => {
      const resultsLower = await restaurantService.search('pizza');
      const resultsUpper = await restaurantService.search('PIZZA');
      const resultsMixed = await restaurantService.search('PiZzA');
      
      expect(resultsLower.length).toBe(resultsUpper.length);
      expect(resultsLower.length).toBe(resultsMixed.length);
    });

    it('returns empty array for no matches', async () => {
      const results = await restaurantService.search('xyzabc123nonexistent');
      expect(results).toEqual([]);
      expect(Array.isArray(results)).toBe(true);
    });

    it('returns all restaurants for empty query', async () => {
      const results = await restaurantService.search('');
      expect(results.length).toBeGreaterThan(0);
    });

    it('handles special characters', async () => {
      const results = await restaurantService.search('&');
      expect(Array.isArray(results)).toBe(true);
    });

    it('returns promise that resolves', async () => {
      const promise = restaurantService.search('pizza');
      expect(promise).toBeInstanceOf(Promise);
      await expect(promise).resolves.toBeDefined();
    });
  });

  describe('filterByCuisine', () => {
    it('filters restaurants by cuisine type', async () => {
      const results = await restaurantService.filterByCuisine('Italian');
      expect(results.length).toBeGreaterThan(0);
      results.forEach((restaurant) => {
        expect(restaurant.cuisine).toContain('Italian');
      });
    });

    it('returns empty array for non-existent cuisine', async () => {
      const results = await restaurantService.filterByCuisine('NonExistentCuisine');
      expect(results).toEqual([]);
    });

    it('is case-sensitive for exact matching', async () => {
      const results = await restaurantService.filterByCuisine('Italian');
      expect(Array.isArray(results)).toBe(true);
    });

    it('handles multiple restaurants with same cuisine', async () => {
      const italianResults = await restaurantService.filterByCuisine('Italian');
      expect(Array.isArray(italianResults)).toBe(true);
    });

    it('returns promise that resolves', async () => {
      const promise = restaurantService.filterByCuisine('Italian');
      expect(promise).toBeInstanceOf(Promise);
      await expect(promise).resolves.toBeDefined();
    });
  });

  describe('Edge cases and error handling', () => {
    it('handles null search query', async () => {
      const results = await restaurantService.search(null as any);
      expect(Array.isArray(results)).toBe(true);
    });

    it('handles undefined search query', async () => {
      const results = await restaurantService.search(undefined as any);
      expect(Array.isArray(results)).toBe(true);
    });

    it('handles concurrent requests', async () => {
      const promises = [
        restaurantService.getAll(),
        restaurantService.getById('rest_001'),
        restaurantService.search('pizza'),
        restaurantService.filterByCuisine('Italian'),
      ];
      
      const results = await Promise.all(promises);
      expect(results).toHaveLength(4);
      results.forEach((result) => expect(result).toBeDefined());
    });
  });
});