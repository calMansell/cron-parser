import { CronFieldData } from "../types/types";

/**
* Formats the cron data and command into a string for output.
* @param cronData An array of objects containing the cron field data.
* @param command The command part of the cron job.
* @param padding The number of spaces to pad the name to align the output.
* @returns A formatted string representing the cron job.
*/
export const  formatLines = (cronData: CronFieldData[], padding: number): string => {
  const outputLines: string[] = cronData.map(field => {
    const value = Array.isArray(field.expanded) ? field.expanded.join(' ') : field.expanded;
    return `${field.name.padEnd(padding)}${value}`;
  }); 

  return outputLines.join('\n');
};