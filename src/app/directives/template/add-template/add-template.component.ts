import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AddTrainingTypePopoverComponent } from 'src/app/dialog/training-type/training-type.popover';
import { Template, Type } from 'src/app/models';
import { StorageService, TrainingTypeService } from 'src/app/services';
import { storageKeys } from 'src/app/utility';

@Component({
  selector: 'app-add-template',
  templateUrl: 'add-template.component.html',
  styleUrls: ['add-template.component.scss'],
})
export class AddTemplateComponent implements OnInit, OnDestroy {
  @Input() item: Template;
  @Output() saved = new EventEmitter<Template>();
  formGroup: UntypedFormGroup;
  types: Type[];
  selectedTypes: Type[];
  private sub: Subscription;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private storageService: StorageService,
    private trainingTypeService: TrainingTypeService,
    private popoverCtrl: PopoverController
  ) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: [this.item?.name, Validators.required],
      types: [this.item?.types],
      date: new Date(),
      done: false,
      deleted: false,
      guid: this.item ? this.item.guid : undefined,
      author: this.item ? this.item.author : undefined,
    });
    this.sub = this.storageService.getValue<Type[]>(storageKeys.trainingTypes).subscribe((list) => {
      this.types = list;
      if (this.item) {
        this.selectedTypes = list.filter((t) => this.item.types.includes(t.guid));
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  onSelect(event: CustomEvent) {
    if (!this.selectedTypes) {
      this.selectedTypes = [];
    }
    const newType: Type = event.detail.value;
    if (this.selectedTypes.every((t) => t.guid !== newType.guid)) {
      this.selectedTypes.push(newType);
      this.formGroup.value.types = this.selectedTypes.map((t) => t.guid);
    }
  }

  onDelete(type: Type) {
    this.selectedTypes = this.selectedTypes.filter((t) => t.guid !== type.guid);
    this.formGroup.value.types = this.selectedTypes.map((t) => t.guid);
  }

  onNewType() {
    this.popoverCtrl.create({ component: AddTrainingTypePopoverComponent }).then((popover) => {
      popover.present();
      popover.onDidDismiss().then((data) => {
        if (data.data) {
          this.trainingTypeService.save(data.data);
        }
      });
    });
  }

  save() {
    this.saved.emit(this.formGroup.value);
  }
}
