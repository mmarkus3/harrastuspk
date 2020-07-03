import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Plugins } from '@capacitor/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Athlete, Training, Type } from 'src/app/models';
import { StorageService, TemplateService } from 'src/app/services';
import { storageKeys } from 'src/app/utility';

const { Modals } = Plugins;

@Component({
  selector: 'app-add-training-item',
  templateUrl: 'add-training.component.html',
  styleUrls: ['add-training.component.scss'],
})
export class AddTrainingItemComponent implements OnInit, OnDestroy, OnChanges {
  @Input() selectedAthlete: Athlete;
  @Input() currentDate: Date;
  @Input() item: Training;
  @Output() saved = new EventEmitter<Training>();
  formGroup: FormGroup;
  durations: number[];
  trainingTypes: Type[];
  private subs: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private templateService: TemplateService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      athlete: [this.item?.athlete || this.selectedAthlete.guid, Validators.required],
      type: [this.item?.type, Validators.required],
      duration: [this.item?.duration || 0],
      desc: [this.item?.desc],
      date: this.item?.date || this.currentDate,
      done: this.item?.done || false,
      deleted: this.item?.deleted || false,
      guid: this.item?.guid,
    });
    this.subs.push(
      this.storageService.getValue<number[]>(storageKeys.durations).subscribe((list) => (this.durations = list))
    );
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.selectedAthlete) {
      this.setAthletesTrainingTypes();
    }
  }

  private setAthletesTrainingTypes() {
    this.subs.push(
      this.storageService.getValue<Type[]>(storageKeys.trainingTypes).subscribe((list) => {
        if (this.selectedAthlete.template) {
          this.subs.push(
            this.templateService.get(this.selectedAthlete.template).subscribe((template) => {
              this.trainingTypes = list.filter((t) => template.types.includes(t.guid));
            })
          );
        } else {
          this.trainingTypes = list;
        }
      })
    );
  }

  save() {
    this.saved.emit(this.formGroup.value);
    this.formGroup.reset({
      athlete: this.selectedAthlete?.guid,
      duration: 0,
      date: this.currentDate,
      done: false,
      deleted: false,
    });
  }

  onDurationChange(event: CustomEvent) {
    if (event.detail.value === '-1') {
      this.onOwnDuration();
    }
  }

  private onOwnDuration() {
    this.translateService.get(['training.durationTitle', 'training.durationMsg']).subscribe(async (values) => {
      const promptRet = await Modals.prompt({
        title: values['training.durationTitle'],
        message: values['training.durationMsg'],
      });
      this.formGroup.value.duration = +promptRet.value;
    });
  }
}
