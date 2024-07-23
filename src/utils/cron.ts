import { CronField, CronFieldData } from "../types/types";
import { formatLines } from "./formatter";
import { validateComponent, validateLimits } from './validator';

/**
 * Parses a cron string into a human-readable format detailing each cron field and its expanded values.
 * The cron string must consist of 6 parts: minute, hour, day of month, month, day of week, and command.
 * Each part is separated by a space. The function expands each time field to show all possible values
 * based on the cron syntax provided. It supports '*', '-', ',', and '/' notations for specifying ranges,
 * steps, and lists of values.
 *
 * @param cronString The cron string to be parsed.
 * @returns A string where each line represents a cron field (minute, hour, day of month, month, day of week)
 *          followed by its expanded values, and the last line shows the command to be executed.
 * @throws An error if the cron string format is invalid (not 6 parts) or if any part of the cron string
 *         specifies values out of allowed ranges.
 */
export const parseCron = (cronString: string): string => {
  //TODO: validate cronString with regex and fail fast if invalid

  const parts = cronString.split(' ');
  if (parts.length !== 6) {
    throw new Error('Invalid cron string. Expected 6 parts.');
  }

  //TODO: move these limits and PADDING variable to a config file
  const cronFields: CronField[] = [
    { name: 'minute', min: 0, max: 59, expression: parts[0] },
    { name: 'hour', min: 0, max: 23, expression: parts[1] },
    { name: 'day of month', min: 1, max: 31, expression: parts[2] },
    { name: 'month', min: 1, max: 12, expression: parts[3] },
    { name: 'day of week', min: 1, max: 7, expression: parts[4] },
  ];

  const PADDING = 14;

  const cronData: CronFieldData[] = [];
  
  cronFields.forEach(field => {
    const expanded = expandCronField(field);
    cronData.push({ name: field.name, expanded });
  });

  cronData.push({ name: 'command', expanded: parts[5] });

  return formatLines(cronData, PADDING);
};
  
/**
 * Expands a cron field into an array of numbers representing all possible values.
 * @param chronField The cron field object to expand, containing name, expression, and min/max values.
 * @returns An array of numbers representing the expanded values of the cron field.
 */
const expandCronField = (chronField: CronField): number[] => {
  const { name, expression, min, max } = chronField;

  // Use flag array to maintain order of value and hnadle duplicates
  const range = max - min + 1;
  const flags = new Array(range).fill(false);

  expression.split(',').forEach(part => {
    const partInt = parseInt(part, 10);
    if (!isNaN(partInt) && !part.includes('-') && !part.includes('/')) {
      flags[validateLimits(partInt, min, max, name) - min] = true;
    } else {
      const [rangePart, stepStr] = part.split('/');
      const step = stepStr ? parseInt(stepStr, 10) : undefined;
      validateComponent(step, name);
      expandRange(rangePart, min, max, name, step).forEach(value => flags[validateLimits(value, min, max, name) - min] = true);
    }
  });

  return flags.reduce((acc, present, index) => {
    if (present) acc.push(index + min);
    return acc;
  }, []);
};

/**
 * Expands a range expression from a cron field into an array of numbers, taking into account any specified step.
 * This function supports the '*', '-', and '/' notations for specifying ranges, steps, and lists of values.
 * 
 * @param range The range expression from the cron field. It can be a single value, a range ('start-end'), 
 *              a list of values separated by commas, or '*' for all values within the field's limits.
 * @param min The minimum value allowed for this cron field.
 * @param max The maximum value allowed for this cron field.
 * @param name The name of the cron field (e.g., 'minute', 'hour'). Used for error messages.
 * @param step (Optional) The step value for the range. If specified, only values that are a multiple of 
 *             the step away from the start value are included.
 * @returns An array of numbers representing the expanded values of the range expression, with all values 
 *          validated against the field's limits.
 * @throws An error if the range expression contains invalid numbers or specifies values out of the allowed range.
 */
const expandRange = (range: string, min: number, max: number, name: string, step?: number) => {
  const [start, end] = range === '*' ? [min, max] : range.split('-').map(Number);
  validateComponent(start, name);
  validateComponent(end, name);
  return expandStep(start, end, step).map(num => validateLimits(num, min, max, name));
};

/**
 * Expands step values in cron fields.
 * @param min The minimum value allowed for this field.
 * @param max The maximum value allowed for this field.
 * @param step The step value to use for expansion.
 * @returns An array of numbers representing the step-expanded values.
 */
const  expandStep = (min: number, max: number, step:number = 1): number[] => {
  const result: number[] = [];
  for (let i = min; i <= max; i += step) {
    result.push(i);
  }
  return result;
};


