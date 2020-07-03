import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Type } from '../models';
import { FirestoreService } from './firestore.service';

const itemCollection = 'training-types';

@Injectable({
  providedIn: 'root',
})
export class TrainingTypeService {
  constructor(private firestore: FirestoreService) {}

  save(item: Type) {
    return this.firestore.save<Type>(itemCollection, item);
  }

  getList(): Observable<Type[]> {
    return this.firestore.getList<Type>(itemCollection, { value: 'name_fi', sort: 'asc' });
  }
}
