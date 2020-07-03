import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '../directives/directives.modules';
import { AthletePopoverComponent } from './athlete/athlete.popover';
import { LoginDialogComponent } from './login/login.dialog';
import { EditRecordDialogComponent } from './record/edit-record.dialog';
import { TemplateDialogComponent } from './template/template.dialog';
import { AddTrainingTypePopoverComponent } from './training-type/training-type.popover';
import { EditTrainingDialogComponent } from './training/training.dialog';

@NgModule({
  declarations: [
    AthletePopoverComponent,
    EditRecordDialogComponent,
    EditTrainingDialogComponent,
    LoginDialogComponent,
    TemplateDialogComponent,
    AddTrainingTypePopoverComponent,
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    TranslateModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
})
export class DialogsModule {}
