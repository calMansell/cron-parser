/**
 * Validates if a given value falls within specified minimum and maximum limits for a cron field.
 * Throws an error if the value is out of bounds.
 * 
 * @param value The numerical value to validate.
 * @param min The minimum allowed value for the cron field.
 * @param max The maximum allowed value for the cron field.
 * @param name The name of the cron field being validated (e.g., "minute", "hour").
 * @returns The validated value if it is within bounds.
 * @throws {Error} If the value is out of the specified range.
 */
export const validateLimits = (value: number, min: number, max: number, name: string) => {
  if (value < min || value > max) {
    throw new Error(`Value ${value} in field '${name}' is out of bounds. Allowed range: ${min}-${max}`);
  }
  return value;
};

export const validateComponent = (value: number | undefined, name: string) => {
  if ((value !== undefined && isNaN(value))) throw new Error(`Invalid value in field: ${name}`);
};
