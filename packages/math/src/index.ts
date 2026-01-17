/**
 * Adds two numbers together.
 * @param a - The first number
 * @param b - The second number
 * @returns The sum of a and b
 */
export function add(a: number, b: number): number {
  return a + b;
}

/**
 * Subtracts the second number from the first number.
 * @param a - The first number (minuend)
 * @param b - The second number (subtrahend)
 * @returns The difference of a and b
 */
export function subtract(a: number, b: number): number {
  return a - b;
}

/**
 * Multiplies two numbers together.
 * @param a - The first number
 * @param b - The second number
 * @returns The product of a and b
 */
export function multiply(a: number, b: number): number {
  return a * b;
}

/**
 * Divides the first number by the second number.
 * @param a - The first number (dividend)
 * @param b - The second number (divisor)
 * @returns The quotient of a and b
 * @throws {Error} Throws an error if b is zero
 */
export function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error("Division by zero is not allowed");
  }
  return a / b;
}
