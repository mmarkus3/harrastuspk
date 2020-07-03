import { FirestoreItem } from './firestore-item';

export interface Training extends FirestoreItem {
  type: string;
  duration?: number;
  desc?: string;
  athlete: string;
  // Helper property
  name?: string;
}
