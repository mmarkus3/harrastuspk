import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Type } from '../models';
import { FirestoreService } from './firestore.service';

const itemCollection = 'record-types';

@Injectable({
  providedIn: 'root',
})
export class RecordTypeService {
  constructor(private firestore: FirestoreService) {}

  getList(): Observable<Type[]> {
    return this.firestore.getList<Type>(itemCollection, { value: 'order', sort: 'asc' });
  }
}
