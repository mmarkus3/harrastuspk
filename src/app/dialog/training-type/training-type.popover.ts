import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-add-training-type-popover',
  templateUrl: './training-type.popover.html',
  styleUrls: ['training-type.popover.scss'],
})
export class AddTrainingTypePopoverComponent {
  formGroup: UntypedFormGroup;

  constructor(private popover: PopoverController, private formBuilder: UntypedFormBuilder) {
    this.formGroup = this.formBuilder.group({
      key: [undefined],
      name_fi: [undefined, Validators.required],
    });
  }

  save() {
    this.formGroup.value.key = this.formGroup.value.name_fi.split(' ')[0].toLowerCase() + new Date().getTime();
    this.popover.dismiss(this.formGroup.value);
  }

  dismiss() {
    this.popover.dismiss();
  }
}
