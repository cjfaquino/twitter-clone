import { serverTimestamp, Timestamp } from 'firebase/firestore';
import getTimeString from '../getTimeString';

describe('getTimeString function', () => {
  const mockTimestamp = (msec: number) => {
    const mock = { toDate: () => new Date(Date.now() - msec) };
    return mock as unknown as Timestamp;
  };

  it('should return empty string when nothing passed', () => {
    expect(getTimeString(undefined)).toBe('');
  });

  describe('when no locale specified', () => {
    it('should output time and date if no optional locale set', () => {
      expect(getTimeString(mockTimestamp(0))).toBe(
        `${new Date().toLocaleTimeString()} · ${new Date().toDateString()}`
      );
    });

    it('should output current time and date if using a locally created Tweet item', () => {
      expect(getTimeString(serverTimestamp() as Timestamp)).toBe(
        `${new Date().toLocaleTimeString()} · ${new Date().toDateString()}`
      );
    });
  });

  describe('when locale specified as "localeDate"', () => {
    it('should output "0s" using a locally created Tweet item', () => {
      expect(getTimeString(serverTimestamp() as Timestamp, 'localeDate')).toBe(
        `0s`
      );
    });

    it('should output in {n}s if within a minute', () => {
      expect(getTimeString(mockTimestamp(2000), 'localeDate')).toBe('2s');
      expect(getTimeString(mockTimestamp(59000), 'localeDate')).toBe('59s');
    });

    it('should output in {n}m if within an hour', () => {
      expect(getTimeString(mockTimestamp(60000), 'localeDate')).toBe('1m');
      expect(getTimeString(mockTimestamp(3540000), 'localeDate')).toBe('59m');
    });

    it('should output in {n}h if within an hour and day', () => {
      expect(getTimeString(mockTimestamp(3600000), 'localeDate')).toBe('1h');
      expect(getTimeString(mockTimestamp(86399999), 'localeDate')).toBe('23h');
    });

    it('should output in be in date toLocaleString if a day passed', () => {
      expect(getTimeString(mockTimestamp(86400000), 'localeDate')).toBe(
        new Date(Date.now() - 86400000).toLocaleDateString()
      );
    });
  });
});
