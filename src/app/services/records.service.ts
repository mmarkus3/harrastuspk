import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Record } from '../models';
import { FirestoreService } from './firestore.service';

const itemCollection = 'records';

@Injectable({
  providedIn: 'root',
})
export class RecordsService {
  constructor(private firestore: FirestoreService) {}

  save(item: Record) {
    return this.firestore.save<Record>(itemCollection, item);
  }

  remove(item: Record) {
    return this.firestore.remove<Record>(itemCollection, item);
  }

  update(item: Record) {
    return this.firestore.update(itemCollection, item);
  }

  getList(athleteGuid: string): Observable<Record[]> {
    return this.firestore.getList<Record>(itemCollection, undefined, (ref) => ref.where('athlete', '==', athleteGuid));
  }
}
