import { Injectable } from '@angular/core';

import { Attack } from './attack';
import { Die } from './die';
import { Fighter } from './fighter';

@Injectable({
  providedIn: 'root',
})
export class GameCoreService {
  challengeCount = 0;

  challenger?: Fighter;

  player = new Fighter('Player');

  attackData?: Attack;

  attacking = false;

  defending = false;

  constructor() {
    this.player.heal();
  }

  startChallenge(): void {
    this.reset();
    this.challengeCount += 1;
    this.challenger = new Fighter(
      `Challenger ${this.challengeCount}`,
      this.player.totalExperience,
    );
    this.challenger.heal();
  }

  startTurn(): void {
    this.nextReady();
    if (this.player === this.attackData?.attacker) {
      this.attacking = true;
    } else if (this.challengerAttack()) {
      this.defending = true;
    }
  }

  private nextReady(): void {
    let waiting = true;
    while (this.challenger && waiting) {
      if (this.player.ready || this.challenger.ready) {
        waiting = false;
        let attacker;
        let defender;
        if (this.player.readiness >= this.challenger.readiness) {
          attacker = this.player;
          defender = this.challenger;
        } else {
          attacker = this.challenger;
          defender = this.player;
        }
        attacker.useReadiness();
        this.attackData = new Attack(attacker, defender);
      } else {
        this.player.getReady();
        this.challenger.getReady();
      }
    }
  }

  /**
   * Player attack.
   */
  attack(): void {
    if (!this.attackData) {
      throw new Error('Attacking without attackData');
    }
    this.attacking = false;
    if (this.attackData.attack()) {
      this.challenderDefend();
    }
    this.endTurn();
  }

  /**
   * Player block.
   */
  block(): void {
    if (!this.attackData) {
      throw new Error('Blocking without attackData');
    }
    this.defending = false;
    this.attackData.block();
    this.endTurn();
  }

  /**
   * Player dodge.
   */
  dodge(): void {
    if (!this.attackData) {
      throw new Error('Dodging without attackData');
    }
    this.defending = false;
    this.attackData.dodge();
    this.endTurn();
  }

  run(): void {
    this.reset();
    this.player.learn(-1);
  }

  private challengerAttack(): boolean {
    if (!this.challenger || !this.attackData) {
      throw new Error('Attacing without challenger or attackData');
    }
    return this.attackData.attack();
  }

  private challenderDefend(): void {
    if (!this.challenger || !this.attackData) {
      throw new Error('Defeding without challenger or attackData');
    }
    const agi = this.challenger.agility.value;
    const dex = this.challenger.dexterity.value;
    if (Die.random(agi + dex) < agi) {
      this.attackData.dodge();
    } else {
      this.attackData.block();
    }
  }

  private endTurn(): void {
    if (!this.attackData?.attackSuccessful) {
      return;
    }
    this.attackData.defender.takeDamage(this.attackData.finalDamage);
    if (this.challengeEnded) {
      this.endChallenge();
    }
  }

  private endChallenge(): void {
    if (this.player.health > 0) {
      this.player.learn(2);
    } else {
      this.player.learn(1);
    }
  }

  get challengeEnded() {
    return this.attackData?.defender.health === 0;
  }

  private reset(): void {
    this.challenger = undefined;
    this.attackData = undefined;
    this.attacking = false;
    this.defending = false;
    this.player.heal();
  }

  save() {
    /*
     * This is just an example to make the component sharing demo work.
     * Also to demonstrate the reuse of service code.
     * For recommendations on sharing state/data, see
     * https://single-spa.js.org/docs/faq/#how-can-i-share-application-state-between-applications
     */
    localStorage.setItem('player', this.player.serialize());
  }

  load() {
    const json = localStorage.getItem('player');
    if (json) {
      this.player.deserialize(json);
    }
  }
}
