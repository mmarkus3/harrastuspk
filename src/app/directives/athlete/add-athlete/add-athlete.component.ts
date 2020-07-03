import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Athlete } from 'src/app/models';

@Component({
  selector: 'app-add-athlete-item',
  templateUrl: 'add-athlete.component.html',
  styleUrls: ['add-athlete.component.scss'],
})
export class AddAthleteItemComponent {
  @Output() saved = new EventEmitter<Athlete>();
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private fireAuth: AngularFireAuth) {
    this.formGroup = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      date: new Date(),
      done: false,
      deleted: false,
    });
  }

  async save() {
    const user = await this.fireAuth.currentUser;
    const data = this.formGroup.value;
    data.users = [data.email];
    if (data.email !== user.email) {
      data.users.push(user.email);
    }
    delete data.email;
    this.saved.emit(data);
  }
}
