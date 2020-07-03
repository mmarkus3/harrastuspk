import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionSheetOptionStyle, Plugins } from '@capacitor/core';
import { TranslateService } from '@ngx-translate/core';
import { Training, Type } from 'src/app/models';
import { StorageService } from 'src/app/services';
import { storageKeys } from 'src/app/utility';

const { Modals } = Plugins;

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

  constructor(private translate: TranslateService, private storageService: StorageService) {}

  ngOnInit() {
    this.storageService.getValue<Type[]>(storageKeys.trainingTypes).subscribe((values) => {
      this.item.name = values?.find((value) => value.key === this.item.type)?.name_fi;
    });
  }

  async delete(item: Training) {
    const translateValues = await this.translate
      .get(['general.removeTitle', 'general.remove'], { name: item.name })
      .toPromise();
    const confirmRet = await Modals.confirm({
      title: translateValues['general.removeTitle'],
      message: translateValues['general.remove'],
    });
    if (confirmRet.value === true) {
      this.removed.emit(item);
    }
  }

  async onDone(item: Training) {
    const translateValues = await this.translate
      .get(
        [
          'general.howDidItFeel',
          'general.cancel',
          'training.feelings.0',
          'training.feelings.1',
          'training.feelings.2',
          'training.feelings.3',
          'training.feelings.4',
        ],
        { name: item.name }
      )
      .toPromise();
    const promptRet = await Modals.showActions({
      title: translateValues['general.howDidItFeel'],
      options: [
        {
          title: translateValues['training.feelings.0'],
        },
        {
          title: translateValues['training.feelings.1'],
        },
        {
          title: translateValues['training.feelings.2'],
        },
        {
          title: translateValues['training.feelings.3'],
        },
        {
          title: translateValues['training.feelings.4'],
        },
        {
          title: translateValues['general.cancel'],
          style: ActionSheetOptionStyle.Cancel,
          icon: 'close-outline',
        },
      ],
    });
    if (promptRet.index < 4) {
      item.feeling = promptRet.index;
      this.done.emit(item);
    }
  }

  onEdit(item: Training) {
    this.edit.emit(item);
  }
}
