import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Athlete, Record, Type } from 'src/app/models';
import { StorageService } from 'src/app/services';
import { storageKeys } from 'src/app/utility';

@Component({
  selector: 'app-add-record',
  templateUrl: 'add-record.component.html',
  styleUrls: ['add-record.component.scss'],
})
export class AddRecordComponent implements OnInit, OnDestroy {
  @Input() selectedAthlete: Athlete;
  @Input() item: Record;
  @Output() saved = new EventEmitter<Record>();
  formGroup: FormGroup;
  types: Type[];
  private sub: Subscription;

  constructor(private formBuilder: FormBuilder, private storageService: StorageService) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      type: [this.item?.type, Validators.required],
      value: [this.item?.value, Validators.required],
      athlete: [this.item?.athlete || this.selectedAthlete.guid, Validators.required],
      date: [new Date().toISOString(), Validators.required],
      done: false,
      deleted: false,
      guid: this.item ? this.item.guid : undefined,
    });
    this.sub = this.storageService.getValue<Type[]>(storageKeys.recordTypes).subscribe((list) => (this.types = list));
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  save() {
    this.formGroup.value.date = new Date(this.formGroup.value.date);
    this.saved.emit(this.formGroup.value);
  }
}
