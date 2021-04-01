import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Attribute } from '../attribute';
import { AttributeComponent } from './attribute.component';

describe('AttributeComponent', () => {
  let component: AttributeComponent;
  let fixture: ComponentFixture<AttributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttributeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeComponent);
    component = fixture.componentInstance;
    component.attribute = new Attribute(0);
    component.name = 'Strength';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
