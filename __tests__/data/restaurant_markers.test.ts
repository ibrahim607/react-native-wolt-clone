import { restaurantMarkers, RestaurantMarker } from '@/data/restaurant_markers';

describe('restaurant_markers data', () => {
  it('exports restaurantMarkers array', () => {
    expect(Array.isArray(restaurantMarkers)).toBe(true);
  });

  it('has multiple markers', () => {
    expect(restaurantMarkers.length).toBeGreaterThan(0);
  });

  it('each marker has required properties', () => {
    restaurantMarkers.forEach((marker) => {
      expect(marker).toHaveProperty('id');
      expect(marker).toHaveProperty('latitude');
      expect(marker).toHaveProperty('longitude');
    });
  });

  it('marker IDs are unique', () => {
    const ids = restaurantMarkers.map((m) => m.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('coordinates are valid numbers', () => {
    restaurantMarkers.forEach((marker) => {
      expect(typeof marker.latitude).toBe('number');
      expect(typeof marker.longitude).toBe('number');
      expect(marker.latitude).not.toBeNaN();
      expect(marker.longitude).not.toBeNaN();
    });
  });

  it('coordinates are in valid range', () => {
    restaurantMarkers.forEach((marker) => {
      // Latitude range: -90 to 90
      expect(marker.latitude).toBeGreaterThanOrEqual(-90);
      expect(marker.latitude).toBeLessThanOrEqual(90);
      // Longitude range: -180 to 180
      expect(marker.longitude).toBeGreaterThanOrEqual(-180);
      expect(marker.longitude).toBeLessThanOrEqual(180);
    });
  });

  it('markers are in Münster, Germany area', () => {
    restaurantMarkers.forEach((marker) => {
      expect(marker.latitude).toBeGreaterThan(50);
      expect(marker.latitude).toBeLessThan(53);
      expect(marker.longitude).toBeGreaterThan(6);
      expect(marker.longitude).toBeLessThan(9);
    });
  });
});