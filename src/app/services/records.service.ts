import { Injectable } from '@angular/core';
import { where } from '@angular/fire/firestore';
import { FirestoreService } from '@scandium-oy/ngx-scandium';
import { Observable } from 'rxjs';
import { Record } from '../models';

const itemCollection = 'records';

@Injectable({
  providedIn: 'root',
})
export class RecordsService {
  constructor(private firestore: FirestoreService) { }

  save(item: Record) {
    return this.firestore.save<Record>(itemCollection, item);
  }

  remove(item: Record) {
    return this.firestore.softDelete<Record>(itemCollection, item);
  }

  update(item: Record) {
    return this.firestore.update(itemCollection, item);
  }

  getList(athleteGuid: string): Observable<Record[]> {
    return this.firestore.getList<Record>(itemCollection, undefined, [where('athlete', '==', athleteGuid)]);
  }
}
