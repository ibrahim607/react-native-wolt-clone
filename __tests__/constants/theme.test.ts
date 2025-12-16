import { Colors, Fonts } from '@/constants/theme';

describe('theme constants', () => {
  describe('Colors', () => {
    it('exports Colors object', () => {
      expect(Colors).toBeDefined();
      expect(typeof Colors).toBe('object');
    });

    it('has required color properties', () => {
      expect(Colors).toHaveProperty('background');
      expect(Colors).toHaveProperty('text');
      expect(Colors).toHaveProperty('primary');
      expect(Colors).toHaveProperty('secondary');
      expect(Colors).toHaveProperty('dark');
      expect(Colors).toHaveProperty('light');
      expect(Colors).toHaveProperty('primaryLight');
      expect(Colors).toHaveProperty('muted');
    });

    it('colors are valid hex or color names', () => {
      Object.values(Colors).forEach((color) => {
        expect(typeof color).toBe('string');
        expect(color.length).toBeGreaterThan(0);
      });
    });

    it('has correct primary color', () => {
      expect(Colors.primary).toBe('#01BEE5');
    });

    it('has correct secondary color', () => {
      expect(Colors.secondary).toBe('#0094DD');
    });

    it('background is white', () => {
      expect(Colors.background).toBe('#fff');
    });

    it('dark is black', () => {
      expect(Colors.dark).toBe('#000000');
    });
  });

  describe('Fonts', () => {
    it('exports Fonts object', () => {
      expect(Fonts).toBeDefined();
      expect(typeof Fonts).toBe('object');
    });

    it('has required font properties', () => {
      expect(Fonts).toHaveProperty('brand');
      expect(Fonts).toHaveProperty('brandBold');
      expect(Fonts).toHaveProperty('brandBlack');
    });

    it('uses Nunito font family', () => {
      expect(Fonts.brand).toBe('Nunito');
      expect(Fonts.brandBold).toContain('Nunito');
      expect(Fonts.brandBlack).toContain('Nunito');
    });

    it('font names are non-empty strings', () => {
      Object.values(Fonts).forEach((font) => {
        expect(typeof font).toBe('string');
        expect(font.length).toBeGreaterThan(0);
      });
    });

    it('has bold variant', () => {
      expect(Fonts.brandBold).toBe('Nunito_700Bold');
    });

    it('has black variant', () => {
      expect(Fonts.brandBlack).toBe('Nunito_900Black');
    });
  });

  describe('Theme integration', () => {
    it('all exports are defined', () => {
      expect(Colors).toBeDefined();
      expect(Fonts).toBeDefined();
    });

    it('no undefined values in Colors', () => {
      Object.values(Colors).forEach((value) => {
        expect(value).toBeDefined();
        expect(value).not.toBeNull();
      });
    });

    it('no undefined values in Fonts', () => {
      Object.values(Fonts).forEach((value) => {
        expect(value).toBeDefined();
        expect(value).not.toBeNull();
      });
    });
  });
});