import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '@scandium-oy/ngx-scandium';
import { Athlete } from 'src/app/models';

@Component({
  selector: 'app-add-athlete-item',
  templateUrl: 'add-athlete.component.html',
  styleUrls: ['add-athlete.component.scss'],
})
export class AddAthleteItemComponent {
  @Output() saved = new EventEmitter<Athlete>();
  formGroup: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder, private fireAuth: AuthService) {
    this.formGroup = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      date: new Date(),
      done: false,
      deleted: false,
    });
  }

  async save() {
    const user = await this.fireAuth.getCurrentUser();
    const data = this.formGroup.value;
    data.users = [data.email];
    if (data.email !== user.email) {
      data.users.push(user.email);
    }
    delete data.email;
    this.saved.emit(data);
  }
}
