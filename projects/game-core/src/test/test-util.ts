import { ChangeDetectorRef, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page } from './page';
import { TestEnv } from './test-env';

export class TestUtil {
  /**
   * Creates and returns fixture, component and page.
   */
  static async initTestEnv<T, P extends Page>(
    ComponentType: Type<T>,
    PageType: Type<P>,
  ): Promise<TestEnv<T, P>> {
    const fixture: ComponentFixture<T> = TestBed.createComponent(ComponentType);
    const component = fixture.componentInstance;
    const page = new PageType(fixture);
    return { fixture, component, page };
  }

  /**
   * Runs component lifecycle such as ngInit.
   */
  static async initComponent(fixture: ComponentFixture<any>): Promise<void> {
    // 1st change detection triggers ngOnInit
    fixture.detectChanges();
    await fixture.whenStable();
    // 2nd change detection react to changes
    fixture.detectChanges();
    await fixture.whenStable();
  }

  /**
   * Marks component for chec and runs change detection.
   * Should be used when testing for input changes and not testing with host component.
   */
  static markAndDetect(fixture: ComponentFixture<any>): void {
    fixture.componentRef.injector.get(ChangeDetectorRef).markForCheck();
    fixture.detectChanges();
  }
}
