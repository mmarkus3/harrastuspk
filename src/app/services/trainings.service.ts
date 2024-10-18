import { Injectable } from '@angular/core';
import { where } from '@angular/fire/firestore';
import { FirestoreService } from '@scandium-oy/ngx-scandium';
import { Observable } from 'rxjs';
import { Training } from '../models';

const itemCollection = 'items';

@Injectable({
  providedIn: 'root',
})
export class TrainingsService {
  constructor(private firestore: FirestoreService) { }

  save(item: Training) {
    return this.firestore.save<Training>(itemCollection, item);
  }

  remove(item: Training) {
    return this.firestore.softDelete<Training>(itemCollection, item);
  }

  done(item: Training) {
    return this.firestore.updateOnly(itemCollection, item.guid, { done: true });
  }

  update(item: Training) {
    return this.firestore.update(itemCollection, item);
  }

  getList(athleteGuid: string): Observable<Training[]> {
    return this.firestore.getList<Training>(itemCollection, undefined, [where('athlete', '==', athleteGuid), where('deleted', '==', false)]
    );
  }
}
