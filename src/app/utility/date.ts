export const compareDates = (date1: Date, date2: Date) => {
  const time1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const time2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  const ms = Math.abs(time1 - time2);
  return Math.floor(ms / 1000 / 60 / 60 / 24);
};
