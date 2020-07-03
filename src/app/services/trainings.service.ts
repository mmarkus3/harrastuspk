import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Training } from '../models';
import { FirestoreService } from './firestore.service';

const itemCollection = 'items';

@Injectable({
  providedIn: 'root',
})
export class TrainingsService {
  constructor(private firestore: FirestoreService) {}

  save(item: Training) {
    return this.firestore.save<Training>(itemCollection, item);
  }

  remove(item: Training) {
    return this.firestore.remove<Training>(itemCollection, item);
  }

  done(item: Training) {
    return this.firestore.done<Training>(itemCollection, item);
  }

  update(item: Training) {
    return this.firestore.update(itemCollection, item);
  }

  getList(athleteGuid: string): Observable<Training[]> {
    return this.firestore.getList<Training>(itemCollection, undefined, (ref) =>
      ref.where('athlete', '==', athleteGuid).where('deleted', '==', false)
    );
  }
}
