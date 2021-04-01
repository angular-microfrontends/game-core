import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export class Page {
  constructor(
    protected fixture: ComponentFixture<any>,
  ) { }

  protected query<R>(cssSelector: string): R {
    return this.fixture.nativeElement.querySelector(cssSelector);
  }

  protected queryDebug(cssSelector: string): DebugElement {
    return this.fixture.debugElement.query(By.css(cssSelector));
  }

  protected queryAll<R>(cssSelector: string): R[] {
    return this.fixture.nativeElement.querySelectorAll(cssSelector);
  }

  protected queryAllDebug(cssSelector: string): DebugElement[] {
    return this.fixture.debugElement.queryAll(By.css(cssSelector));
  }
}
