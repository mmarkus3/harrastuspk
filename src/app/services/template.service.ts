import { Injectable } from '@angular/core';
import { where } from '@angular/fire/firestore';
import { FirestoreService } from '@scandium-oy/ngx-scandium';
import { Observable } from 'rxjs';
import { Template } from '../models';

const itemCollection = 'templates';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  constructor(private firestore: FirestoreService) { }

  save(item: Template) {
    return this.firestore.save<Template>(itemCollection, item);
  }

  remove(item: Template) {
    return this.firestore.softDelete<Template>(itemCollection, item);
  }

  update(item: Template) {
    return this.firestore.update(itemCollection, item);
  }

  getList(authorGuid: string): Observable<Template[]> {
    return this.firestore.getList<Template>(itemCollection, undefined, [where('author', '==', authorGuid)]);
  }

  get(guid: string): Observable<Template> {
    return this.firestore.get<Template>(itemCollection, guid);
  }
}
