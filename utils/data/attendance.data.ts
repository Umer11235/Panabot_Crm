const generateAttendance = () => {
  const statuses = ['check', 'close', 'unknown_med'];
  return Array.from({ length: 30 }, () => statuses[Math.floor(Math.random() * statuses.length)]);
};

export const attendanceData = [
  { id: 1, name: 'Annette Black', attendance: ['check', 'check', 'check', 'unknown_med', 'check', 'check', 'close', 'check', 'check', 'close', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'close', 'check', 'check', 'check', 'close', 'check', 'check', 'close', 'check', 'check', 'unknown_med', 'check'] },
  { id: 2, name: 'Brooklyn Simmons', attendance: Array(30).fill('check') },
  { id: 3, name: 'Cameron Williamson', attendance: ['check', 'unknown_med', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'unknown_med', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check'] },
  { id: 4, name: 'Carolyn Barnes', attendance: ['check', 'unknown_med', 'check', 'check', 'check', 'check', 'check', 'unknown_med', 'check', 'unknown_med', 'check', 'check', 'unknown_med', 'close', 'check', 'check', 'close', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'unknown_med', 'check', 'check', 'close', 'check', 'close'] },
  { id: 5, name: 'Daniel Kim', attendance: ['check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'unknown_med', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check'] },
  { id: 6, name: 'Devon Lane', attendance: ['check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'close', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'unknown_med', 'check', 'check'] },
  { id: 7, name: 'Donna Miller', attendance: ['check', 'check', 'check', 'check', 'check', 'unknown_med', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'unknown_med', 'check', 'check', 'check', 'check', 'check', 'check', 'unknown_med', 'check', 'check', 'check', 'check', 'check', 'unknown_med', 'check', 'check', 'check'] },
  { id: 8, name: 'Eleanor Pena', attendance: ['check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'unknown_med', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check'] },
  { id: 9, name: 'Emma Davis', attendance: ['check', 'unknown_med', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'unknown_med', 'check', 'check', 'check'] },
  { id: 10, name: 'Esther Howard', attendance: ['check', 'close', 'check', 'check', 'check', 'check', 'check', 'close', 'unknown_med', 'unknown_med', 'check', 'check', 'check', 'check', 'check', 'check', 'close', 'check', 'check', 'check', 'check', 'check', 'check', 'unknown_med', 'check', 'check', 'unknown_med', 'check', 'unknown_med', 'check'] },
  { id: 11, name: 'Floyd Miles', attendance: generateAttendance() },
  { id: 12, name: 'Guy Hawkins', attendance: generateAttendance() },
  { id: 13, name: 'Jacob Jones', attendance: generateAttendance() },
  { id: 14, name: 'Jane Cooper', attendance: generateAttendance() },
  { id: 15, name: 'Jenny Wilson', attendance: generateAttendance() },
  { id: 16, name: 'Jerome Bell', attendance: generateAttendance() },
  { id: 17, name: 'Kathryn Murphy', attendance: generateAttendance() },
  { id: 18, name: 'Leslie Alexander', attendance: generateAttendance() },
  { id: 19, name: 'Marvin McKinney', attendance: generateAttendance() },
  { id: 20, name: 'Ralph Edwards', attendance: generateAttendance() },
  { id: 21, name: 'Robert Fox', attendance: generateAttendance() },
  { id: 22, name: 'Ronald Richards', attendance: generateAttendance() },
  { id: 23, name: 'Savannah Nguyen', attendance: generateAttendance() },
  { id: 24, name: 'Theresa Webb', attendance: generateAttendance() },
  { id: 25, name: 'Wade Warren', attendance: generateAttendance() },
  { id: 26, name: 'Arlene McCoy', attendance: generateAttendance() },
  { id: 27, name: 'Bessie Cooper', attendance: generateAttendance() },
  { id: 28, name: 'Courtney Henry', attendance: generateAttendance() },
  { id: 29, name: 'Cody Fisher', attendance: generateAttendance() },
  { id: 30, name: 'Dianne Russell', attendance: generateAttendance() },
];

export const getIcon = (status: string) => {
  if (status === 'check') return '✓';
  if (status === 'close') return '✕';
  return '?';
};

export const getIconColor = (status: string) => {
  if (status === 'check') return '#10b981';
  if (status === 'close') return '#ef4444';
  return '#f59e0b';
};
