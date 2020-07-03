import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirestoreItem } from '../models';
import { fieldSorter } from '../utility';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  save<T>(collection: string, item: T) {
    return this.firestore.collection(collection).add(item);
  }

  update<T extends FirestoreItem>(collection: string, item: T) {
    const docRef = this.firestore.collection(collection).doc(item.guid);
    return docRef.set(item);
  }

  remove<T extends FirestoreItem>(collection: string, item: T) {
    const docRef = this.firestore.collection(collection).doc(item.guid);
    return docRef.set(
      {
        deleted: true,
      },
      { merge: true }
    );
  }

  done<T extends FirestoreItem>(collection: string, item: T) {
    const docRef = this.firestore.collection(collection).doc(item.guid);
    return docRef.set(
      {
        done: true,
        feeling: item.feeling,
      },
      { merge: true }
    );
  }

  get<T extends FirestoreItem>(collection: string, guid: string): Observable<T> {
    return this.firestore
      .doc<T>(collection + '/' + guid)
      .valueChanges()
      .pipe(
        map((item: any) => {
          item.guid = guid;
          item.date = item.date?.toDate();
          return item as T;
        })
      );
  }

  getList<T>(collection: string, orderBy?: { value: string; sort: string }, queryFn?: QueryFn): Observable<T[]> {
    return this.firestore
      .collection<T>(collection, queryFn)
      .valueChanges({ idField: 'guid' })
      .pipe(
        map((items) => {
          if (orderBy) {
            items = items.sort(fieldSorter([orderBy.value]));
            if (orderBy.sort === 'desc') {
              items = items.reverse();
            }
          }
          return items.map((item: any) => {
            item.date = item.date?.toDate();
            return item as T;
          });
        })
      );
  }
}
