import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppCommonModule } from './../common.module';
import { StatsPageRoutingModule } from './stats-routing.module';
import { StatsPage } from './stats.page';

@NgModule({
  imports: [AppCommonModule, CommonModule, FormsModule, IonicModule, StatsPageRoutingModule],
  declarations: [StatsPage],
})
export class StatsPageModule {}
