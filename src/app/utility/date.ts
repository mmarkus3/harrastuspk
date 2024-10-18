import { Timestamp } from '@angular/fire/firestore';
import { format } from 'date-fns';

export const isTimestamp = (object: any): object is Timestamp => {
  if (object == null) {
    return false;
  }
  return 'toDate' in object;
};

export function convertTimestamp(item: any): Date {
  const ret = isTimestamp(item) ? item.toDate() : item;
  return ret;
}

export const compareDates = (date1: Date, date2: Date) => {
  const date = format(convertTimestamp(date1), 'dd.MM.yyyy');
  const today = format(convertTimestamp(date2), 'dd.MM.yyyy');
  return date === today;
};
