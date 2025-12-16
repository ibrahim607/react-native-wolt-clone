import { restaurants, Restaurant } from '@/data/restaurants';

describe('restaurants data', () => {
  it('exports restaurants array', () => {
    expect(Array.isArray(restaurants)).toBe(true);
  });

  it('has multiple restaurants', () => {
    expect(restaurants.length).toBeGreaterThan(0);
  });

  it('each restaurant has required properties', () => {
    restaurants.forEach((restaurant) => {
      expect(restaurant).toHaveProperty('id');
      expect(restaurant).toHaveProperty('name');
      expect(restaurant).toHaveProperty('description');
      expect(restaurant).toHaveProperty('cuisine');
      expect(restaurant).toHaveProperty('rating');
      expect(restaurant).toHaveProperty('reviewCount');
      expect(restaurant).toHaveProperty('deliveryTime');
      expect(restaurant).toHaveProperty('deliveryFee');
      expect(restaurant).toHaveProperty('minOrder');
      expect(restaurant).toHaveProperty('image');
      expect(restaurant).toHaveProperty('location');
      expect(restaurant).toHaveProperty('tags');
      expect(restaurant).toHaveProperty('isOpen');
      expect(restaurant).toHaveProperty('openingHours');
    });
  });

  it('restaurant IDs are unique', () => {
    const ids = restaurants.map((r) => r.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('ratings are between 0 and 5', () => {
    restaurants.forEach((restaurant) => {
      expect(restaurant.rating).toBeGreaterThanOrEqual(0);
      expect(restaurant.rating).toBeLessThanOrEqual(5);
    });
  });

  it('review counts are non-negative', () => {
    restaurants.forEach((restaurant) => {
      expect(restaurant.reviewCount).toBeGreaterThanOrEqual(0);
    });
  });

  it('delivery fees are non-negative', () => {
    restaurants.forEach((restaurant) => {
      expect(restaurant.deliveryFee).toBeGreaterThanOrEqual(0);
    });
  });

  it('min orders are positive', () => {
    restaurants.forEach((restaurant) => {
      expect(restaurant.minOrder).toBeGreaterThan(0);
    });
  });

  it('locations have valid coordinates', () => {
    restaurants.forEach((restaurant) => {
      expect(restaurant.location).toHaveProperty('address');
      expect(restaurant.location).toHaveProperty('latitude');
      expect(restaurant.location).toHaveProperty('longitude');
      expect(typeof restaurant.location.latitude).toBe('number');
      expect(typeof restaurant.location.longitude).toBe('number');
      // Approximate check for valid coordinates (Münster, Germany area)
      expect(restaurant.location.latitude).toBeGreaterThan(50);
      expect(restaurant.location.latitude).toBeLessThan(53);
      expect(restaurant.location.longitude).toBeGreaterThan(6);
      expect(restaurant.location.longitude).toBeLessThan(9);
    });
  });

  it('cuisine is an array', () => {
    restaurants.forEach((restaurant) => {
      expect(Array.isArray(restaurant.cuisine)).toBe(true);
      expect(restaurant.cuisine.length).toBeGreaterThan(0);
    });
  });

  it('tags is an array', () => {
    restaurants.forEach((restaurant) => {
      expect(Array.isArray(restaurant.tags)).toBe(true);
    });
  });

  it('isOpen is a boolean', () => {
    restaurants.forEach((restaurant) => {
      expect(typeof restaurant.isOpen).toBe('boolean');
    });
  });

  it('opening hours has all days', () => {
    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    restaurants.forEach((restaurant) => {
      daysOfWeek.forEach((day) => {
        expect(restaurant.openingHours).toHaveProperty(day);
      });
    });
  });

  it('includes Pizza Perfetto', () => {
    const pizzaPerfetto = restaurants.find((r) => r.id === 'rest_001');
    expect(pizzaPerfetto).toBeDefined();
    expect(pizzaPerfetto?.name).toBe('Pizza Perfetto');
  });

  it('delivery time format is consistent', () => {
    restaurants.forEach((restaurant) => {
      expect(restaurant.deliveryTime).toMatch(/^\d+-\d+ min$/);
    });
  });
});