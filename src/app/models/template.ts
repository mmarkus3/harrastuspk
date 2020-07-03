import { FirestoreItem } from './firestore-item';

export interface Template extends FirestoreItem {
  name: string;
  types: string[];
  author: string;
  //
  edited?: boolean;
}
