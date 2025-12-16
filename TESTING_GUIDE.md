# Quick Testing Guide

## Setup (One-time)

```bash
npm install
```

## Run Tests

```bash
# Run all tests
npm test

# Watch mode (re-run on file changes)
npm run test:watch

# Coverage report
npm run test:coverage
```

## Test Structure

```
__tests__/
├── app/                # App layout tests
├── components/         # UI component tests
│   └── auth/          # Authentication components
├── services/          # Business logic tests
├── hooks/             # React hooks tests
├── data/              # Data validation tests
└── constants/         # Constants tests
```

## Common Commands

```bash
# Run specific test file
npm test -- __tests__/services/menuService.test.ts

# Update snapshots
npm test -- -u

# Verbose output
npm test -- --verbose
```

## Best Practices

1. Write tests alongside new features
2. Keep tests focused and isolated
3. Use descriptive test names
4. Mock external dependencies
5. Test edge cases and error conditions

---
For more details, see TEST_SUMMARY.md