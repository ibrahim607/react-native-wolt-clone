# Test Suite for Food Delivery App (Wolt Clone)

This directory contains comprehensive unit tests for the React Native food delivery application.

## Test Structure

- `components/` - Component tests
  - `auth/` - Authentication component tests
  - `SmoothInfiniteScroll.test.tsx` - Infinite scroll animation component
- `services/` - Service layer tests
  - `menuService.test.ts` - Menu data service
  - `restaurantService.test.ts` - Restaurant data service
  - `orderService.test.ts` - Order processing service
- `hooks/` - Custom React hooks tests
  - `useMenu.test.tsx` - Menu fetching hooks
  - `useRestaurants.test.tsx` - Restaurant fetching hooks
- `data/` - Data structure validation tests
  - `categories.test.ts` - Category data validation
- `constants/` - Constants validation tests
  - `theme.test.ts` - Theme constants validation
- `app.config.test.ts` - App configuration validation

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Test Coverage

The test suite covers:
- ✅ All service functions with edge cases
- ✅ Custom React hooks with React Query
- ✅ UI components (auth buttons, scroll animations)
- ✅ Data structure validation
- ✅ Theme and configuration validation
- ✅ Error handling and edge cases
- ✅ Async operations and promises
- ✅ Loading and error states

## Technologies Used

- Jest - Test framework
- React Native Testing Library - Component testing
- @tanstack/react-query - API state management
- TypeScript - Type safety

## Notes

- Tests are configured to work with Expo and React Native
- Reanimated and other native modules are mocked
- Tests follow AAA pattern (Arrange, Act, Assert)
- Comprehensive edge case coverage included