import { Component, Input } from '@angular/core';

import { Attribute } from '../attribute';

@Component({
  selector: 'core-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.sass'],
})
export class AttributeComponent {
  @Input() attribute!: Attribute;

  @Input() name!: string;

  @Input() showCost = false;
}
