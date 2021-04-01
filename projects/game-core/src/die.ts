export class Die {
  /**
   * Random int from 0 to max - 1.
   */
  static random(max: number) {
    return Math.floor(Math.random() * max);
  }

  /**
   * Random int from min to max.
   */
  static randomRange(min: number, max: number): number {
    return min + this.random(max - min + 1);
  }

  static roll(dieCount: number = 1) {
    let sum = 0;
    for (let i = 0; i < dieCount; i += 1) {
      sum += this.randomRange(1, 6);
    }
    return sum;
  }
}
