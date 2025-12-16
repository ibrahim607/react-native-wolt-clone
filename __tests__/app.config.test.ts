import appConfig from '../app.json';

describe('app.json configuration', () => {
  it('has valid app configuration', () => {
    expect(appConfig).toBeDefined();
    expect(appConfig.expo).toBeDefined();
  });

  it('has correct app name', () => {
    expect(appConfig.expo.name).toBe('food-delivery-app-wolt-clone');
  });

  it('has slug defined', () => {
    expect(appConfig.expo.slug).toBe('food-delivery-app-wolt-clone');
  });

  it('has iOS configuration', () => {
    expect(appConfig.expo.ios).toBeDefined();
    expect(appConfig.expo.ios.supportsTablet).toBe(true);
    expect(appConfig.expo.ios.bundleIdentifier).toBe('com.woltclone.fooddelivery');
  });

  it('has Android configuration', () => {
    expect(appConfig.expo.android).toBeDefined();
    expect(appConfig.expo.android.package).toBe('com.woltclone.fooddelivery');
  });

  it('has adaptive icon configuration', () => {
    expect(appConfig.expo.android.adaptiveIcon).toBeDefined();
  });

  it('enables new architecture', () => {
    expect(appConfig.expo.newArchEnabled).toBe(true);
  });

  it('has plugins configured', () => {
    expect(appConfig.expo.plugins).toBeDefined();
    expect(Array.isArray(appConfig.expo.plugins)).toBe(true);
  });

  it('includes expo-router plugin', () => {
    const plugins = appConfig.expo.plugins;
    expect(plugins.includes('expo-router')).toBe(true);
  });
});