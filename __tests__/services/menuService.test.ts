import { menuService } from '@/services/menuService';
import { pizzaPerfettoMenu } from '@/data/restaurant_menu';

describe('menuService', () => {
  describe('getMenu', () => {
    it('returns menu for Pizza Perfetto (rest_001)', async () => {
      const menu = await menuService.getMenu('rest_001');
      expect(menu).toEqual(pizzaPerfettoMenu);
      expect(Array.isArray(menu)).toBe(true);
      expect(menu.length).toBeGreaterThan(0);
    });

    it('returns empty array for unknown restaurant', async () => {
      const menu = await menuService.getMenu('unknown_restaurant');
      expect(menu).toEqual([]);
      expect(Array.isArray(menu)).toBe(true);
      expect(menu.length).toBe(0);
    });

    it('returns menu with correct structure', async () => {
      const menu = await menuService.getMenu('rest_001');
      expect(menu[0]).toHaveProperty('category');
      expect(menu[0]).toHaveProperty('dishes');
      expect(Array.isArray(menu[0].dishes)).toBe(true);
    });

    it('handles empty restaurant ID', async () => {
      const menu = await menuService.getMenu('');
      expect(Array.isArray(menu)).toBe(true);
    });

    it('returns promise that resolves', async () => {
      const menuPromise = menuService.getMenu('rest_001');
      expect(menuPromise).toBeInstanceOf(Promise);
      await expect(menuPromise).resolves.toBeDefined();
    });
  });

  describe('getDishById', () => {
    it('returns correct dish by ID', async () => {
      const dish = await menuService.getDishById(1);
      expect(dish).toBeDefined();
      expect(dish?.id).toBe(1);
      expect(dish?.name).toBe('Build your own Pizza');
    });

    it('returns undefined for non-existent dish ID', async () => {
      const dish = await menuService.getDishById(99999);
      expect(dish).toBeUndefined();
    });

    it('returns dish with correct properties', async () => {
      const dish = await menuService.getDishById(1);
      expect(dish).toHaveProperty('id');
      expect(dish).toHaveProperty('name');
      expect(dish).toHaveProperty('description');
      expect(dish).toHaveProperty('price');
      expect(dish).toHaveProperty('image');
    });

    it('handles zero as dish ID', async () => {
      const dish = await menuService.getDishById(0);
      expect(dish).toBeUndefined();
    });

    it('handles negative dish ID', async () => {
      const dish = await menuService.getDishById(-1);
      expect(dish).toBeUndefined();
    });

    it('returns promise that resolves', async () => {
      const dishPromise = menuService.getDishById(1);
      expect(dishPromise).toBeInstanceOf(Promise);
      await expect(dishPromise).resolves.toBeDefined();
    });
  });

  describe('getAllDishes', () => {
    it('returns all dishes for Pizza Perfetto', async () => {
      const dishes = await menuService.getAllDishes('rest_001');
      expect(Array.isArray(dishes)).toBe(true);
      expect(dishes.length).toBeGreaterThan(0);
    });

    it('returns empty array for unknown restaurant', async () => {
      const dishes = await menuService.getAllDishes('unknown_restaurant');
      expect(Array.isArray(dishes)).toBe(true);
      expect(dishes.length).toBe(0);
    });

    it('returns flattened array of dishes', async () => {
      const dishes = await menuService.getAllDishes('rest_001');
      dishes.forEach((dish) => {
        expect(dish).toHaveProperty('id');
        expect(dish).toHaveProperty('name');
        expect(dish).toHaveProperty('price');
      });
    });

    it('includes dishes from all categories', async () => {
      const dishes = await menuService.getAllDishes('rest_001');
      const menu = await menuService.getMenu('rest_001');
      const expectedCount = menu.reduce((sum, cat) => sum + cat.dishes.length, 0);
      expect(dishes.length).toBe(expectedCount);
    });

    it('returns promise that resolves', async () => {
      const dishesPromise = menuService.getAllDishes('rest_001');
      expect(dishesPromise).toBeInstanceOf(Promise);
      await expect(dishesPromise).resolves.toBeDefined();
    });
  });

  describe('getPopularDishes', () => {
    it('returns only popular dishes', async () => {
      const popularDishes = await menuService.getPopularDishes('rest_001');
      expect(Array.isArray(popularDishes)).toBe(true);
      popularDishes.forEach((dish) => {
        expect(dish.isPopular).toBe(true);
      });
    });

    it('filters out non-popular dishes', async () => {
      const allDishes = await menuService.getAllDishes('rest_001');
      const popularDishes = await menuService.getPopularDishes('rest_001');
      expect(popularDishes.length).toBeLessThanOrEqual(allDishes.length);
    });

    it('returns empty array for unknown restaurant', async () => {
      const popularDishes = await menuService.getPopularDishes('unknown_restaurant');
      expect(Array.isArray(popularDishes)).toBe(true);
      expect(popularDishes.length).toBe(0);
    });

    it('returns dishes with correct structure', async () => {
      const popularDishes = await menuService.getPopularDishes('rest_001');
      if (popularDishes.length > 0) {
        expect(popularDishes[0]).toHaveProperty('id');
        expect(popularDishes[0]).toHaveProperty('name');
        expect(popularDishes[0]).toHaveProperty('price');
        expect(popularDishes[0]).toHaveProperty('isPopular');
      }
    });

    it('returns promise that resolves', async () => {
      const popularPromise = menuService.getPopularDishes('rest_001');
      expect(popularPromise).toBeInstanceOf(Promise);
      await expect(popularPromise).resolves.toBeDefined();
    });
  });

  describe('Edge cases and error handling', () => {
    it('handles null restaurant ID gracefully', async () => {
      const menu = await menuService.getMenu(null as any);
      expect(Array.isArray(menu)).toBe(true);
    });

    it('handles undefined restaurant ID gracefully', async () => {
      const menu = await menuService.getMenu(undefined as any);
      expect(Array.isArray(menu)).toBe(true);
    });

    it('handles concurrent requests', async () => {
      const promises = [
        menuService.getMenu('rest_001'),
        menuService.getDishById(1),
        menuService.getAllDishes('rest_001'),
        menuService.getPopularDishes('rest_001'),
      ];
      
      const results = await Promise.all(promises);
      expect(results).toHaveLength(4);
      results.forEach((result) => expect(result).toBeDefined());
    });
  });
});