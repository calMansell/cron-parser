import { parseCron } from '../../src/utils/cron';

describe('parseCron', () => {
  test('Valid cron string with wildcards', () => {
    const input = '* * * * * /bin/echo';
    const expectedOutput = [
      "minute        0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59",
      "hour          0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23",
      "day of month  1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31",
      "month         1 2 3 4 5 6 7 8 9 10 11 12",
      "day of week   1 2 3 4 5 6 7",
      "command       /bin/echo",
    ].join('\n');

    expect(parseCron(input)).toBe(expectedOutput);

    expect(parseCron(input)).toBe(expectedOutput);
  });

  test('Valid cron string with step values', () => {
    const input = '*/15 0 1,15 * 1-5 /usr/bin/find';
    const expectedOutput = [
      'minute        0 15 30 45',
      'hour          0',
      'day of month  1 15',
      'month         1 2 3 4 5 6 7 8 9 10 11 12',
      'day of week   1 2 3 4 5',
      'command       /usr/bin/find',
    ].join('\n');
      

    expect(parseCron(input)).toBe(expectedOutput);
  });

  test('Invalid cron string format - too few parts', () => {
    const input = '0 0 1 1';
    expect(() => parseCron(input)).toThrow('Invalid cron string. Expected 6 parts.');
  });

  test('Invalid cron string format - too many parts', () => {
    const input = '0 0 1 1 * * /bin/echo';
    expect(() => parseCron(input)).toThrow('Invalid cron string. Expected 6 parts.');
  });

  test('Invalid component value', () => {
    const input = 'a 0 1 1 * /bin/echo';
    expect(() => parseCron(input)).toThrow('Invalid value in field: minute');
  });

  test('Invalid step value', () => {
    const input = '*/a 0 1 1 * /bin/echo';
    expect(() => parseCron(input)).toThrow('Invalid value in field: minute');
  });

  test('Invalid range', () => {
    const input = '0-60 0 1 1 * /bin/echo';
    expect(() => parseCron(input)).toThrow("Value 60 in field 'minute' is out of bounds. Allowed range: 0-59");
  });

  test('Mixed ranges and steps', () => {
    const input = '0-5/2 0-12/3 * * * /bin/echo';
    const expectedOutput = [
      'minute        0 2 4',
      'hour          0 3 6 9 12',
      'day of month  1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31',
      'month         1 2 3 4 5 6 7 8 9 10 11 12',
      'day of week   1 2 3 4 5 6 7',
      'command       /bin/echo',
    ].join('\n');
      

    expect(parseCron(input)).toBe(expectedOutput);
  });

  test('Field with commas and ranges', () => {
    const input = '0 0 1-3,5 1 1 /bin/echo';
    const expectedOutput = [
      "minute        0",
      "hour          0",
      "day of month  1 2 3 5",
      "month         1",
      "day of week   1",
      "command       /bin/echo",
    ].join('\n');

    expect(parseCron(input)).toBe(expectedOutput);
  });

  test('Multiple step values', () => {
    const input = '*/10 */2 * * * /bin/echo';
    const expectedOutput = [
      'minute        0 10 20 30 40 50',
      'hour          0 2 4 6 8 10 12 14 16 18 20 22',
      'day of month  1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31',
      'month         1 2 3 4 5 6 7 8 9 10 11 12',
      'day of week   1 2 3 4 5 6 7',
      'command       /bin/echo',
    ].join('\n');

    expect(parseCron(input)).toBe(expectedOutput);
  });

  test('Overlapping ranges and single values', () => {
    const input = '0-5,3,1,2,4,5 0 1 * * /bin/echo';
    const expectedOutput = [
      'minute        0 1 2 3 4 5',
      'hour          0',
      'day of month  1',
      'month         1 2 3 4 5 6 7 8 9 10 11 12',
      'day of week   1 2 3 4 5 6 7',
      'command       /bin/echo',
    ].join('\n');
    expect(parseCron(input)).toBe(expectedOutput);
  });

  test('Boundary values', () => {
    const input = '59 23 31 12 6 /bin/echo';
    const expectedOutput = [
      'minute        59',
      'hour          23',
      'day of month  31',
      'month         12',
      'day of week   6',
      'command       /bin/echo',
    ].join('\n');

    expect(parseCron(input)).toBe(expectedOutput);
  });

  test('Invalid characters', () => {
    const input = '* * * * $ /bin/echo';
    expect(() => parseCron(input)).toThrow('Invalid value in field: day of week');
  });

  test('Empty string', () => {
    const input = '';
    expect(() => parseCron(input)).toThrow('Invalid cron string. Expected 6 parts.');
  });
});