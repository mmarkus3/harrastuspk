import { FirestoreItem } from './firestore-item';

export interface Record extends FirestoreItem {
  athlete: string;
  type: string;
  value: string;
  // Helper property
  name?: string;
}
