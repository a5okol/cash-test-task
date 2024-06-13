import moment from 'moment';

// getISOWeek('2021-01-01') => 53
export const getISOWeek = (date: string): number => {
  return moment(date).isoWeek();
};
