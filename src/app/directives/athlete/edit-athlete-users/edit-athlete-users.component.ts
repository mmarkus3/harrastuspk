import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Athlete } from 'src/app/models';

@Component({
  selector: 'app-edit-athlete-users',
  templateUrl: 'edit-athlete-users.component.html',
  styleUrls: ['edit-athlete-users.component.scss'],
})
export class EditAthleteUsersComponent implements OnInit {
  @Input() item: Athlete;
  @Output() saved = new EventEmitter<Athlete>();
  formGroup: FormGroup;
  users: string[];

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.users = this.item.users.map((u) => u);
  }

  add() {
    const email = this.formGroup.value.email;
    if (!this.users.includes(email.trim())) {
      this.users.push(email.trim());
    }
    this.formGroup.reset();
  }

  delete(email: string) {
    this.users = this.users.filter((user) => user !== email);
  }

  save() {
    this.item.users = this.users.map((u) => u);
    this.saved.emit(this.item);
  }
}
