import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DialogsModule } from './dialog/dialogs.modules';
import { DirectivesModule } from './directives/directives.modules';

@NgModule({
  imports: [ReactiveFormsModule, TranslateModule, DirectivesModule, DialogsModule],
  exports: [ReactiveFormsModule, TranslateModule, DirectivesModule, DialogsModule],
})
export class AppCommonModule {}
