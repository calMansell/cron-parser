import { CronFieldData } from "../../src/types/types";
import { formatLines } from "../../src/utils/formatter";

describe('formatLines', () => {
  test('formats simple cron data and command correctly', () => {
    const cronData: CronFieldData[] = [
      { name: 'minute', expanded: [0] },
      { name: 'hour', expanded: [0] },
      { name: 'day of month', expanded: [1] },
      { name: 'month', expanded: [1] },
      { name: 'day of week', expanded: [1] },
      { name: 'command', expanded: '/bin/execute' },
    ];
    const padding = 14;
    const expectedOutput = 
      'minute        0\n' +
      'hour          0\n' +
      'day of month  1\n' +
      'month         1\n' +
      'day of week   1\n' +
      'command       /bin/execute';
    expect(formatLines(cronData,  padding)).toBe(expectedOutput);
  });

  test('handles complex cron data with expanded fields', () => {
    const cronData: CronFieldData[] = [
      { name: 'minute', expanded: [0, 15, 30, 45] },
      { name: 'hour', expanded: [0, 12] },
      { name: 'day of month', expanded: [1] },
      { name: 'month', expanded: [1, 6, 12] },
      { name: 'day of week', expanded: [1,2,3,4,5,6,7] },
      { name: 'command', expanded: '/bin/execute' },
    ];
    const padding = 14;
    const expectedOutput = 
      'minute        0 15 30 45\n' +
      'hour          0 12\n' +
      'day of month  1\n' +
      'month         1 6 12\n' +
      'day of week   1 2 3 4 5 6 7\n' +
      'command       /bin/execute';
    expect(formatLines(cronData, padding)).toBe(expectedOutput);
  });
});