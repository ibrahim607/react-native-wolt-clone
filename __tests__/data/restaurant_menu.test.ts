import { pizzaPerfettoMenu, Dish, MenuCategory } from '@/data/restaurant_menu';

describe('restaurant_menu data', () => {
  it('exports pizzaPerfettoMenu array', () => {
    expect(Array.isArray(pizzaPerfettoMenu)).toBe(true);
  });

  it('has multiple menu categories', () => {
    expect(pizzaPerfettoMenu.length).toBeGreaterThan(0);
  });

  it('each category has required properties', () => {
    pizzaPerfettoMenu.forEach((category) => {
      expect(category).toHaveProperty('category');
      expect(category).toHaveProperty('dishes');
      expect(Array.isArray(category.dishes)).toBe(true);
    });
  });

  it('each dish has required properties', () => {
    pizzaPerfettoMenu.forEach((category) => {
      category.dishes.forEach((dish) => {
        expect(dish).toHaveProperty('id');
        expect(dish).toHaveProperty('name');
        expect(dish).toHaveProperty('description');
        expect(dish).toHaveProperty('price');
        expect(dish).toHaveProperty('image');
      });
    });
  });

  it('dish IDs are unique across all categories', () => {
    const allDishes = pizzaPerfettoMenu.flatMap((cat) => cat.dishes);
    const ids = allDishes.map((d) => d.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('dish prices are positive numbers', () => {
    pizzaPerfettoMenu.forEach((category) => {
      category.dishes.forEach((dish) => {
        expect(dish.price).toBeGreaterThan(0);
      });
    });
  });

  it('dish names are non-empty', () => {
    pizzaPerfettoMenu.forEach((category) => {
      category.dishes.forEach((dish) => {
        expect(dish.name.length).toBeGreaterThan(0);
      });
    });
  });

  it('has popular dishes marked', () => {
    const allDishes = pizzaPerfettoMenu.flatMap((cat) => cat.dishes);
    const popularDishes = allDishes.filter((d) => d.isPopular);
    expect(popularDishes.length).toBeGreaterThan(0);
  });

  it('includes Speciale category', () => {
    const speciale = pizzaPerfettoMenu.find((cat) => cat.category === 'Speciale');
    expect(speciale).toBeDefined();
  });

  it('includes Build your own Pizza dish', () => {
    const allDishes = pizzaPerfettoMenu.flatMap((cat) => cat.dishes);
    const buildYourOwnPizza = allDishes.find((d) => d.name === 'Build your own Pizza');
    expect(buildYourOwnPizza).toBeDefined();
    expect(buildYourOwnPizza?.isPopular).toBe(true);
  });

  it('category names are non-empty', () => {
    pizzaPerfettoMenu.forEach((category) => {
      expect(category.category.length).toBeGreaterThan(0);
    });
  });

  it('each category has at least one dish', () => {
    pizzaPerfettoMenu.forEach((category) => {
      expect(category.dishes.length).toBeGreaterThan(0);
    });
  });
});