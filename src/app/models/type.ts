import { FirestoreItem } from './firestore-item';

export interface Type extends FirestoreItem {
  key: string;
  name_fi: string;
  order: number;
}
