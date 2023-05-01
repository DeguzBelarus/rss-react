import { describe, expect } from 'vitest';

import { dateStringValidator, monthStringValidator, yearStringValidator } from './utils';

describe('Form validators tests', (): void => {
  test('checks dateStringValidator form validator', () => {
    expect(dateStringValidator('-5')).toBe(false);
    expect(dateStringValidator('0')).toBe(false);
    expect(dateStringValidator('10')).toBe(true);
  });

  test('checks monthStringValidator form validator', () => {
    expect(monthStringValidator('-5')).toBe(false);
    expect(monthStringValidator('0')).toBe(false);
    expect(monthStringValidator('10')).toBe(true);
  });

  test('checks yearStringValidator form validator', () => {
    expect(yearStringValidator('-5')).toBe(false);
    expect(yearStringValidator('0')).toBe(false);
    expect(yearStringValidator('2023')).toBe(true);
  });
});
