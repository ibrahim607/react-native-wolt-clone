import { categories, Category } from '@/data/categories';

describe('categories data', () => {
  it('exports categories array', () => {
    expect(Array.isArray(categories)).toBe(true);
  });

  it('has at least one category', () => {
    expect(categories.length).toBeGreaterThan(0);
  });

  it('each category has required properties', () => {
    categories.forEach((category) => {
      expect(category).toHaveProperty('id');
      expect(category).toHaveProperty('name');
      expect(category).toHaveProperty('placesCount');
      expect(category).toHaveProperty('image');
      expect(category).toHaveProperty('backgroundColor');
    });
  });

  it('category IDs are unique', () => {
    const ids = categories.map((c) => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('category names are non-empty strings', () => {
    categories.forEach((category) => {
      expect(typeof category.name).toBe('string');
      expect(category.name.length).toBeGreaterThan(0);
    });
  });

  it('places count is a non-negative number', () => {
    categories.forEach((category) => {
      expect(typeof category.placesCount).toBe('number');
      expect(category.placesCount).toBeGreaterThanOrEqual(0);
    });
  });

  it('background colors are valid hex colors', () => {
    categories.forEach((category) => {
      expect(category.backgroundColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });

  it('includes expected categories', () => {
    const categoryNames = categories.map((c) => c.name);
    expect(categoryNames).toContain('Pizza');
    expect(categoryNames).toContain('Burger');
  });

  it('images are defined', () => {
    categories.forEach((category) => {
      expect(category.image).toBeDefined();
    });
  });
});