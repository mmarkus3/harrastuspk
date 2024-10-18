import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AddAthleteItemComponent } from './athlete/add-athlete/add-athlete.component';
import { EditAthleteUsersComponent } from './athlete/edit-athlete-users/edit-athlete-users.component';
import { LoadingComponent } from './loading/loading.component';
import { LoginIconComponent } from './login-icon/login-icon.component';
import { AddRecordComponent } from './record/add-record/add-record.component';
import { RecordItemComponent } from './record/record-item/record-item.component';
import { AddTemplateComponent } from './template/add-template/add-template.component';
import { TemplateComponent } from './template/no-template/template.component';
import { TotalDurationComponent } from './total-duration/total-duration.component';
import { AddTrainingItemComponent } from './training/add-training/add-training.component';
import { TrainingItemComponent } from './training/training-item/training-item.component';

@NgModule({
  declarations: [
    AddAthleteItemComponent,
    AddRecordComponent,
    AddTemplateComponent,
    AddTrainingItemComponent,
    EditAthleteUsersComponent,
    LoadingComponent,
    LoginIconComponent,
    RecordItemComponent,
    TemplateComponent,
    TotalDurationComponent,
    TrainingItemComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  exports: [
    AddAthleteItemComponent,
    AddRecordComponent,
    AddTemplateComponent,
    AddTrainingItemComponent,
    EditAthleteUsersComponent,
    LoadingComponent,
    LoginIconComponent,
    RecordItemComponent,
    TemplateComponent,
    TotalDurationComponent,
    TrainingItemComponent,
  ],
})
export class DirectivesModule { }
