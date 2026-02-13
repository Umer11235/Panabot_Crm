export const holidaysData = [
  { id: '#1', date: 'January 1, 2025', day: 'Wednesday', type: 'Public', holiday: "New Year's Day" },
  { id: '#2', date: 'March 29, 2025', day: 'Friday', type: 'Religious', holiday: 'Good Friday' },
  { id: '#3', date: 'May 27, 2025', day: 'Tuesday', type: 'Public/National', holiday: 'Memorial Day' },
  { id: '#4', date: 'July 4, 2025', day: 'Friday', type: 'Public/National', holiday: 'National Independence Day' },
  { id: '#5', date: 'September 2, 2025', day: 'Tuesday', type: 'Public/National', holiday: 'Labor Day' },
  { id: '#6', date: 'October 14, 2025', day: 'Tuesday', type: 'Public/National', holiday: "Indigenous Peoples' Day" },
  { id: '#7', date: 'October 31, 2025', day: 'Friday', type: 'Public', holiday: 'Halloween Day' },
  { id: '#8', date: 'November 11, 2025', day: 'Tuesday', type: 'Public/National', holiday: 'Veterans Day' },
  { id: '#9', date: 'November 28, 2025', day: 'Friday', type: 'Public/National', holiday: 'Thanksgiving Day' },
  { id: '#10', date: 'December 25, 2025', day: 'Thursday', type: 'Public/National', holiday: 'Christmas Day' },
];

export const getDayFromDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};
