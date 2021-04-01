import { Component, Input } from '@angular/core';

import { Fighter } from '../fighter';

@Component({
  selector: 'core-stats',
  templateUrl: 'stats.component.html',
  styleUrls: ['stats.component.sass'],
})
export class StatsComponent {
  @Input() fighter!: Fighter;

  @Input() showCosts = false;

  @Input() showExperience = false;

  get healthBar(): string {
    return StatsComponent.barBackground(this.fighter.health, this.fighter.maxHealth);
  }

  get experienceBar(): string {
    return StatsComponent.barBackground(this.fighter.usedExperience, this.fighter.totalExperience);
  }

  private static barBackground(value: number, max: number): string {
    const perc = Math.ceil((100 * value) / max);
    let color;
    if (perc < 20) {
      color = 'red';
    } else if (perc < 50) {
      color = 'darkorange';
    } else {
      color = 'green';
    }
    return `linear-gradient(to right, ${color} ${perc}%, black ${perc}%, black)`;
  }
}
