import { validateLimits, validateComponent } from "../../src/utils/validator";

describe('validateLimits', () => {
  test('returns the value if within bounds', () => {
    expect(validateLimits(5, 1, 10, 'minute')).toBe(5);
  });

  test('throws an error if the value is below the minimum limit', () => {
    expect(() => validateLimits(0, 1, 10, 'minute')).toThrow('Value 0 in field \'minute\' is out of bounds. Allowed range: 1-10');
  });

  test('throws an error if the value is above the maximum limit', () => {
    expect(() => validateLimits(11, 1, 10, 'minute')).toThrow('Value 11 in field \'minute\' is out of bounds. Allowed range: 1-10');
  });
});

describe('validateComponent', () => {
  test('does not throw an error for a valid number', () => {
    expect(() => validateComponent(5, 'minute')).not.toThrow();
  });

  test('does not throw an error for undefined', () => {
    expect(() => validateComponent(undefined, 'minute')).not.toThrow();
  });

  test('throws an error for NaN', () => {
    expect(() => validateComponent(NaN, 'minute')).toThrow('Invalid value in field: minute');
  });
});