import { ComponentFixture } from '@angular/core/testing';

import { Page } from './page';

export interface TestEnv<T, P extends Page> {
  component: T;

  fixture: ComponentFixture<T>;

  page: P;
}
