import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirestoreService } from './firestore.service';

const itemCollection = 'durations';

@Injectable({
  providedIn: 'root',
})
export class DurationService {
  constructor(private firestore: FirestoreService) {}

  getList(): Observable<number[]> {
    return this.firestore.getList<any>(itemCollection).pipe(
      map((items) => {
        return items?.length ? items[0]?.values : [];
      })
    );
  }
}
