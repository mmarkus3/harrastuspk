import { Injectable } from '@angular/core';
import { where } from '@angular/fire/firestore';
import { AuthService, FirestoreService } from '@scandium-oy/ngx-scandium';
import { Observable } from 'rxjs';
import { Athlete } from '../models';

const itemCollection = 'athletes';

@Injectable({
  providedIn: 'root',
})
export class AthletesService {
  constructor(private firestore: FirestoreService, private fireAuth: AuthService) { }

  save(item: Athlete) {
    return this.firestore.save<Athlete>(itemCollection, item);
  }

  remove(item: Athlete) {
    return this.firestore.softDelete<Athlete>(itemCollection, item);
  }

  update(item: Athlete) {
    return this.firestore.update(itemCollection, item);
  }

  async getList(): Promise<Observable<Athlete[]>> {
    const user = await this.fireAuth.getCurrentUser();
    return this.firestore.getList<Athlete>(itemCollection, undefined, [where('users', 'array-contains', user.email)]);
  }

  get(guid: string): Observable<Athlete> {
    return this.firestore.get<Athlete>(itemCollection, guid);
  }
}
