import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dialog } from '@capacitor/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Training, Type } from 'src/app/models';
import { StorageService } from '@scandium-oy/ngx-scandium';
import { storageKeys } from 'src/app/utility';

@Component({
  selector: 'app-training-item',
  templateUrl: 'training-item.component.html',
  styleUrls: ['training-item.component.scss'],
})
export class TrainingItemComponent implements OnInit {
  @Input() item: Training;
  @Output() removed = new EventEmitter<Training>();
  @Output() done = new EventEmitter<Training>();
  @Output() edit = new EventEmitter<Training>();

  constructor(private translate: TranslateService, private storageService: StorageService) { }

  ngOnInit() {
    this.storageService.getValue<Type[]>(storageKeys.trainingTypes).subscribe((values) => {
      this.item.name = values?.find((value) => value.key === this.item.type)?.name_fi;
    });
  }

  async delete(item: Training) {
    const translateValues = this.translate.instant(['general.removeTitle', 'general.remove'], { name: item.name });
    const confirmRet = await Dialog.confirm({
      title: translateValues['general.removeTitle'],
      message: translateValues['general.remove'],
    });
    if (confirmRet.value === true) {
      this.removed.emit(item);
    }
  }

  async onDone(item: Training) {
    this.done.emit(item);
  }

  onEdit(item: Training) {
    this.edit.emit(item);
  }
}
