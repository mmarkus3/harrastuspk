import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Record, Type } from 'src/app/models';
import { StorageService } from 'src/app/services';
import { storageKeys } from 'src/app/utility';

@Component({
  selector: 'app-record-item',
  templateUrl: 'record-item.component.html',
  styleUrls: ['record-item.component.scss'],
})
export class RecordItemComponent implements OnInit {
  @Input() item: Record;
  @Output() edit = new EventEmitter<Record>();

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.storageService.getValue<Type[]>(storageKeys.recordTypes).subscribe((values) => {
      this.item.name = values?.find((value) => value.key === this.item.type)?.name_fi;
    });
  }

  onEdit(item: Record) {
    this.edit.emit(item);
  }
}
