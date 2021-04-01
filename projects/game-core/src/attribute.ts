import { Die } from './die';

/**
 * Cost for the next level.
 */
const costs = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 6, 12, 20, 30, 42, 56, 72, 90, 110];

export class Attribute {
  private innerValue: number;

  get cost(): number {
    return costs[this.value];
  }

  get value(): number {
    return this.innerValue;
  }

  constructor(value: number) {
    this.innerValue = value;
  }

  increase(): void {
    if (this.innerValue < 20) {
      this.innerValue += 1;
    }
  }

  /**
   * Roll against 3D6. If successful, return the margin, else return undefined;
   */
  roll(modifier = 0): number | undefined {
    const modified = this.innerValue + modifier;
    const roll = Die.roll(3);
    return (roll <= modified) ? (modified - roll) : undefined;
  }
}
