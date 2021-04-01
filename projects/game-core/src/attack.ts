import { Fighter } from './fighter';

export class Attack {
  attackMargin = 0;

  attackSuccessful?: boolean;

  damage = 0;

  damageMargin?: number;

  defenseType?: 'block' | 'dodge';

  defenseSuccessful?: boolean;

  finalDamage = 0;

  constructor(
    public attacker: Fighter,
    public defender: Fighter,
  ) { }

  get attackModifier() {
    return -Math.floor(this.attackMargin / 2);
  }

  attack(): boolean {
    const atkMargin = this.attacker.dexterity.roll();
    if (!atkMargin) {
      this.attackSuccessful = false;
      return false;
    }
    this.attackMargin = atkMargin;

    this.damageMargin = this.attacker.strength.roll();
    this.damage = this.attacker.strength.value;
    if (this.damageMargin) {
      this.damage += this.attacker.strength.value + 2 * this.damageMargin;
    }
    this.attackSuccessful = true;
    return true;
  }

  block(): boolean {
    this.defenseType = 'block';
    const margin = this.defender.dexterity.roll(this.attackModifier);
    if (margin) {
      this.defenseSuccessful = true;
      this.finalDamage = Math.ceil((this.damage - margin) / 4);
    } else {
      this.defenseSuccessful = false;
      this.finalDamage = Math.ceil((3 * this.damage) / 4);
    }
    return this.defenseSuccessful;
  }

  dodge(): boolean {
    this.defenseType = 'dodge';
    const margin = this.defender.agility.roll(this.attackModifier);
    if (margin) {
      this.defenseSuccessful = true;
      this.finalDamage = 0;
    } else {
      this.defenseSuccessful = false;
      this.finalDamage = this.damage;
    }
    return this.defenseSuccessful;
  }
}
