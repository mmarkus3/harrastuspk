import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { StorageService } from '@scandium-oy/ngx-scandium';
import { Subscription } from 'rxjs';
import { Template } from 'src/app/models';
import { storageKeys } from 'src/app/utility';

@Component({
  selector: 'app-template-dialog',
  templateUrl: './template.dialog.html',
  styleUrls: ['template.dialog.scss'],
})
export class TemplateDialogComponent implements OnInit, OnDestroy {
  item: Template;
  templates: Template[];
  private sub: Subscription;
  adding: boolean;
  editing: boolean;
  selectedTemplate: Template;

  constructor(private _modal: ModalController, private storageService: StorageService, navParams: NavParams) {
    this.item = navParams.get('template');
  }

  ngOnInit() {
    this.sub = this.storageService
      .getValue<Template[]>(storageKeys.templates)
      .subscribe((items) => (this.templates = items));
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  onSelect(event: CustomEvent) {
    const template: Template = event.detail.value;
    this.selectedTemplate = template;
  }

  onSave(item: Template) {
    this._modal.dismiss(item);
  }

  onEdit(item: Template) {
    this.item = item;
    this.editing = true;
  }

  onEdited(item: Template) {
    item.edited = true;
    this.onSave(item);
  }

  dismiss() {
    this._modal.dismiss();
  }
}
