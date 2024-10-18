import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppCommonModule } from '../common.module';
import { SelectDayComponent } from '../directives/select-day/select-day.component';
import { HistoryPageRoutingModule } from './history-routing.module';
import { HistoryPage } from './history.page';

@NgModule({
  imports: [AppCommonModule, CommonModule, FormsModule, IonicModule, HistoryPageRoutingModule, SelectDayComponent],
  declarations: [HistoryPage],
})
export class HistoryPageModule { }
