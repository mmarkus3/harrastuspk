import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Template } from '../models';
import { FirestoreService } from './firestore.service';

const itemCollection = 'templates';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  constructor(private firestore: FirestoreService) {}

  save(item: Template) {
    return this.firestore.save<Template>(itemCollection, item);
  }

  remove(item: Template) {
    return this.firestore.remove<Template>(itemCollection, item);
  }

  update(item: Template) {
    return this.firestore.update(itemCollection, item);
  }

  getList(authorGuid: string): Observable<Template[]> {
    return this.firestore.getList<Template>(itemCollection, undefined, (ref) => ref.where('author', '==', authorGuid));
  }

  get(guid: string): Observable<Template> {
    return this.firestore.get<Template>(itemCollection, guid);
  }
}
