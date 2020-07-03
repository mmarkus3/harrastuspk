import { FirestoreItem } from './firestore-item';

export interface Athlete extends FirestoreItem {
  guid?: string;
  name: string;
  users: string[];
  template?: string;
}
