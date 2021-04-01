import { ComponentFixture } from '@angular/core/testing';
import { MockBuilder } from 'ng-mocks';

import { Fighter } from '../fighter';
import { GameCoreModule } from '../game-core.module';
import { Page } from '../test/page';
import { TestUtil } from '../test/test-util';
import { StatsComponent } from './stats.component';

class StatsPage extends Page {
  get name(): HTMLDivElement {
    return this.query('.name');
  }
}

describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;
  let page: StatsPage;

  beforeEach(async () => {
    await MockBuilder(StatsComponent, GameCoreModule);
    ({
      component,
      fixture,
      page,
    } = await TestUtil.initTestEnv(StatsComponent, StatsPage));
    component.fighter = new Fighter('Name', 0);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display name', () => {
    TestUtil.initComponent(fixture);
    expect(page.name.textContent).toBe('Name');
  });
});
