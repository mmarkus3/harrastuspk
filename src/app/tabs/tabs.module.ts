import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppCommonModule } from '../common.module';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { TabsPage } from './tabs.page';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, AppCommonModule, TabsPageRoutingModule],
  declarations: [TabsPage],
})
export class TabsPageModule { }
