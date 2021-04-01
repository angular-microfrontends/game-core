import { Attribute } from './attribute';
import { Die } from './die';

const HEALTH_MULTIPLIER = 10;
const READINESS_COST = 100;

export class Fighter {
  health = 0;

  get maxHealth(): number {
    return this.constitution.value * HEALTH_MULTIPLIER;
  }

  agility = new Attribute(10);

  constitution = new Attribute(10);

  dexterity = new Attribute(10);

  strength = new Attribute(10);

  totalExperience = 0;

  get usedExperience(): number {
    return this.totalExperience - this.unusedExperience;
  }

  readiness = 0;

  /**
   * Support for random level up.
   */
  private attributes: Attribute[] = [];

  constructor(
    public name: string,
    public unusedExperience: number = 0,
  ) {
    this.pushAttributes();
    this.randomLevelUp();
  }

  serialize(): string {
    return JSON.stringify({
      agility: this.agility.value,
      constitution: this.constitution.value,
      dexterity: this.dexterity.value,
      strength: this.strength.value,
      totalExperience: this.totalExperience,
      unusedExperience: this.unusedExperience,
    });
  }

  deserialize(json: string) {
    const values = JSON.parse(json);
    this.agility = new Attribute(values.agility);
    this.constitution = new Attribute(values.constitution);
    this.dexterity = new Attribute(values.dexterity);
    this.strength = new Attribute(values.strength);
    this.totalExperience = values.totalExperience;
    this.unusedExperience = values.unusedExperience;
    this.pushAttributes();
  }

  private pushAttributes() {
    this.attributes = [];
    this.attributes.push(this.agility);
    this.attributes.push(this.constitution);
    this.attributes.push(this.dexterity);
    this.attributes.push(this.strength);
  }

  private randomLevelUp(): void {
    while (this.unusedExperience > 0) {
      const attribute = this.randomAttribute();
      this.totalExperience += attribute.cost;
      this.unusedExperience -= Math.min(this.unusedExperience, attribute.cost);
      attribute.increase();
    }
  }

  private randomAttribute(): Attribute {
    const candidates: Attribute[] = [];
    this.attributes.forEach((attribute) => {
      if (attribute.cost <= this.unusedExperience) {
        candidates.push(attribute);
      }
    });
    // last increase even if not enough experience
    if (candidates.length === 0) {
      candidates.push(...this.attributes);
    }
    return candidates[Die.random(candidates.length)];
  }

  heal(): void {
    this.health = this.maxHealth;
  }

  learn(amount: number): void {
    const newUnused = Math.max(this.unusedExperience + amount, 0);
    this.totalExperience += newUnused - this.unusedExperience;
    this.unusedExperience = newUnused;
  }

  getReady(): void {
    this.readiness += this.agility.value;
    const margin = this.agility.roll();
    if (margin) {
      this.readiness += this.agility.value + margin;
    }
  }

  get ready(): boolean {
    return this.readiness >= READINESS_COST;
  }

  useReadiness(): void {
    this.readiness -= READINESS_COST;
  }

  takeDamage(damage: number) {
    this.health -= Math.min(damage, this.health);
  }

  private upgrade(attrib: Attribute): void {
    if (this.unusedExperience < attrib.cost) {
      return;
    }
    this.unusedExperience -= attrib.cost;
    attrib.increase();
  }

  upgradeAgility() {
    this.upgrade(this.agility);
  }

  upgradeConstitution() {
    this.upgrade(this.constitution);
  }

  upgradeDexterity() {
    this.upgrade(this.dexterity);
  }

  upgradeStrength() {
    this.upgrade(this.strength);
  }
}
