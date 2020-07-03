import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Athlete } from '../models';
import { FirestoreService } from './firestore.service';

const itemCollection = 'athletes';

@Injectable({
  providedIn: 'root',
})
export class AthletesService {
  constructor(private firestore: FirestoreService, private fireAuth: AngularFireAuth) {}

  save(item: Athlete) {
    return this.firestore.save<Athlete>(itemCollection, item);
  }

  remove(item: Athlete) {
    return this.firestore.remove<Athlete>(itemCollection, item);
  }

  update(item: Athlete) {
    return this.firestore.update(itemCollection, item);
  }

  async getList(): Promise<Observable<Athlete[]>> {
    const user = await this.fireAuth.currentUser;
    return this.firestore.getList<Athlete>(itemCollection, undefined, (ref) =>
      ref.where('users', 'array-contains', user.email)
    );
  }

  get(guid: string): Observable<Athlete> {
    return this.firestore.get<Athlete>(itemCollection, guid);
  }
}
