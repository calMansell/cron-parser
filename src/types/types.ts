export type CronField = {
    name: string;
    min: number;
    max: number;
    expression: string;
  };

export type CronFieldData = {
    name: string;
    expanded: number[] | string; // expanded can be an array of numbers or a string for the command part
  };
  
    