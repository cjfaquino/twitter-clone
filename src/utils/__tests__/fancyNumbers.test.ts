import fancyNumbers from '../fancyNumbers';

describe('fancyNumbers a number formatter', () => {
  it('should return an empty string if less than one', () => {
    expect(fancyNumbers(undefined)).toBe('');
    expect(fancyNumbers(0)).toBe('');
    expect(fancyNumbers(-1)).toBe('');
  });

  it('should return string "0" if second arg passed', () => {
    expect(fancyNumbers(0, true)).toBe('0');
  });

  it('should output numbers below 5 digits to show value as string', () => {
    expect(fancyNumbers(9999)).toBe('9,999');
    expect(fancyNumbers(5000)).toBe('5,000');
    expect(fancyNumbers(300)).toBe('300');
  });

  it('should shorten numbers 5 digits or more', () => {
    expect(fancyNumbers(12345)).toBe('12.3K');
    expect(fancyNumbers(123456)).toBe('123.4K');
  });

  it('should shorten even more for numbers 7 digits or more', () => {
    expect(fancyNumbers(1234567)).toBe('1.2M');
    expect(fancyNumbers(12345678)).toBe('12.3M');
    expect(fancyNumbers(123456789)).toBe('123.4M');
  });

  it('should shorten even more for numbers 10 digits or more', () => {
    expect(fancyNumbers(1234567890)).toBe('1.2B');
    expect(fancyNumbers(12345678901)).toBe('12.3B');
    expect(fancyNumbers(123456789012)).toBe('123.4B');
  });
});
