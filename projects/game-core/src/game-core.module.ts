import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AttributeComponent } from './attribute/attribute.component';
import { GameCoreService } from './game-core.service';
import { StatsComponent } from './stats/stats.component';

@NgModule({
  declarations: [
    AttributeComponent,
    StatsComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    StatsComponent,
  ],
  providers: [
    GameCoreService,
  ],
})
export class GameCoreModule { }
