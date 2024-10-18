import { Component, Input, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { ModalController } from '@ionic/angular';
import { StorageService } from '@scandium-oy/ngx-scandium';
import { TemplateDialogComponent } from 'src/app/dialog/template/template.dialog';
import { Athlete, Template } from 'src/app/models';
import { AthletesService, TemplateService } from 'src/app/services';
import { storageKeys } from 'src/app/utility';

@Component({
  selector: 'app-template',
  templateUrl: 'template.component.html',
  styleUrls: ['template.component.scss'],
})
export class TemplateComponent implements OnInit {
  @Input() athlete: Athlete;
  @Input() user: User;

  constructor(
    private modalCtrl: ModalController,
    private templateService: TemplateService,
    private athletesService: AthletesService,
    private storageService: StorageService,
  ) { }

  ngOnInit() { }

  addTemplate() {
    this.modalCtrl.create({ component: TemplateDialogComponent, componentProps: {} }).then((m) => {
      m.present();
      m.onDidDismiss().then((data) => {
        if (data.data) {
          const template: Template = data.data;
          if (template.guid) {
            this.handleExistingTemplate(template);
          } else {
            this.handleNewTemplate(template);
          }
        }
      });
    });
  }

  private handleExistingTemplate(template: Template) {
    if (template.edited) {
      this.templateService.update(template).then((_) => {
        this.saveTemplateToAthlete(template.guid);
      });
    } else {
      this.saveTemplateToAthlete(template.guid);
    }
  }

  private handleNewTemplate(template: Template) {
    template.author = this.user.uid;
    this.templateService.save(template).then((docRef) => {
      this.saveTemplateToAthlete(docRef.id);
    });
  }

  private saveTemplateToAthlete(templateGuid: string) {
    this.athlete.template = templateGuid;
    this.athletesService.update(this.athlete).then((_) => {
      this.athletesService.get(this.athlete.guid).subscribe((athlete) => {
        this.storageService.set(storageKeys.selectedAthlete, athlete);
      });
    });
  }
}
