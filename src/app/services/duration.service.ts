import { Injectable } from '@angular/core';
import { FirestoreService } from '@scandium-oy/ngx-scandium';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const itemCollection = 'durations';

@Injectable({
  providedIn: 'root',
})
export class DurationService {
  constructor(private firestore: FirestoreService) { }

  getList(): Observable<number[]> {
    return this.firestore.getList<any>(itemCollection).pipe(
      map((items) => {
        return items?.length ? items[0]?.values : [];
      })
    );
  }
}
