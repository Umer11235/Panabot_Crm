// Generate random check-in and check-out times
const generateCheckInOut = (status: string) => {
  if (status === 'close') {
    return { checkIn: '-', checkOut: '-', hoursWorked: 0 };
  }
  if (status === 'unknown_med') {
    const checkIn = `${9 + Math.floor(Math.random() * 2)}:${Math.floor(Math.random() * 6) * 10}`;
    const checkOut = `${16 + Math.floor(Math.random() * 2)}:${Math.floor(Math.random() * 6) * 10}`;
    return { checkIn, checkOut, hoursWorked: 5 + Math.random() * 3 };
  }
  // Present
  const checkInHour = 8 + Math.floor(Math.random() * 2);
  const checkInMin = Math.floor(Math.random() * 6) * 10;
  const checkOutHour = 17 + Math.floor(Math.random() * 2);
  const checkOutMin = Math.floor(Math.random() * 6) * 10;
  const checkIn = `${checkInHour}:${String(checkInMin).padStart(2, '0')}`;
  const checkOut = `${checkOutHour}:${String(checkOutMin).padStart(2, '0')}`;
  const hoursWorked = (checkOutHour - checkInHour) + (checkOutMin - checkInMin) / 60;
  return { checkIn, checkOut, hoursWorked: Math.round(hoursWorked * 100) / 100 };
};

const generateAttendanceDetail = () => {
  const statuses = ['check', 'close', 'unknown_med'];
  return Array.from({ length: 30 }, (_, i) => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const date = new Date(2024, 1, i + 1).toISOString().split('T')[0];
    const timeInfo = generateCheckInOut(status);
    return {
      status,
      date,
      ...timeInfo
    };
  });
};

const generateAttendance = () => {
  const statuses = ['check', 'close', 'unknown_med'];
  return Array.from({ length: 30 }, () => statuses[Math.floor(Math.random() * statuses.length)]);
};

export const attendanceData = [
  { 
    id: 1, 
    name: 'Annette Black', 
    attendance: ['check', 'check', 'check', 'unknown_med', 'check', 'check', 'close', 'check', 'check', 'close', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'close', 'check', 'check', 'check', 'close', 'check', 'check', 'close', 'check', 'check', 'unknown_med', 'check'],
    details: generateAttendanceDetail()
  },
  { 
    id: 2, 
    name: 'Brooklyn Simmons', 
    attendance: Array(30).fill('check'),
    details: generateAttendanceDetail()
  },
  { 
    id: 3, 
    name: 'Cameron Williamson', 
    attendance: ['check', 'unknown_med', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'unknown_med', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check'],
    details: generateAttendanceDetail()
  },
  { 
    id: 4, 
    name: 'Carolyn Barnes', 
    attendance: ['check', 'unknown_med', 'check', 'check', 'check', 'check', 'check', 'unknown_med', 'check', 'unknown_med', 'check', 'check', 'unknown_med', 'close', 'check', 'check', 'close', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'unknown_med', 'check', 'check', 'close', 'check', 'close'],
    details: generateAttendanceDetail()
  },
  { 
    id: 5, 
    name: 'Daniel Kim', 
    attendance: ['check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'unknown_med', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check'],
    details: generateAttendanceDetail()
  },
  { 
    id: 6, 
    name: 'Devon Lane', 
    attendance: ['check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'close', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'unknown_med', 'check', 'check'],
    details: generateAttendanceDetail()
  },
  { 
    id: 7, 
    name: 'Donna Miller', 
    attendance: ['check', 'check', 'check', 'check', 'check', 'unknown_med', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'unknown_med', 'check', 'check', 'check', 'check', 'check', 'check', 'unknown_med', 'check', 'check', 'check', 'check', 'check', 'unknown_med', 'check', 'check', 'check'],
    details: generateAttendanceDetail()
  },
  { 
    id: 8, 
    name: 'Eleanor Pena', 
    attendance: ['check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'unknown_med', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check'],
    details: generateAttendanceDetail()
  },
  { 
    id: 9, 
    name: 'Emma Davis', 
    attendance: ['check', 'unknown_med', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'check', 'unknown_med', 'check', 'check', 'check'],
    details: generateAttendanceDetail()
  },
  { 
    id: 10, 
    name: 'Esther Howard', 
    attendance: ['check', 'close', 'check', 'check', 'check', 'check', 'check', 'close', 'unknown_med', 'unknown_med', 'check', 'check', 'check', 'check', 'check', 'check', 'close', 'check', 'check', 'check', 'check', 'check', 'check', 'unknown_med', 'check', 'check', 'unknown_med', 'check', 'unknown_med', 'check'],
    details: generateAttendanceDetail()
  },
  { id: 11, name: 'Floyd Miles', attendance: generateAttendance(), details: generateAttendanceDetail() },
  { id: 12, name: 'Guy Hawkins', attendance: generateAttendance(), details: generateAttendanceDetail() },
  { id: 13, name: 'Jacob Jones', attendance: generateAttendance(), details: generateAttendanceDetail() },
  { id: 14, name: 'Jane Cooper', attendance: generateAttendance(), details: generateAttendanceDetail() },
  { id: 15, name: 'Jenny Wilson', attendance: generateAttendance(), details: generateAttendanceDetail() },
  { id: 16, name: 'Jerome Bell', attendance: generateAttendance(), details: generateAttendanceDetail() },
  { id: 17, name: 'Kathryn Murphy', attendance: generateAttendance(), details: generateAttendanceDetail() },
  { id: 18, name: 'Leslie Alexander', attendance: generateAttendance(), details: generateAttendanceDetail() },
  { id: 19, name: 'Marvin McKinney', attendance: generateAttendance(), details: generateAttendanceDetail() },
  { id: 20, name: 'Ralph Edwards', attendance: generateAttendance(), details: generateAttendanceDetail() },
  { id: 21, name: 'Robert Fox', attendance: generateAttendance(), details: generateAttendanceDetail() },
  { id: 22, name: 'Ronald Richards', attendance: generateAttendance(), details: generateAttendanceDetail() },
  { id: 23, name: 'Savannah Nguyen', attendance: generateAttendance(), details: generateAttendanceDetail() },
  { id: 24, name: 'Theresa Webb', attendance: generateAttendance(), details: generateAttendanceDetail() },
  { id: 25, name: 'Wade Warren', attendance: generateAttendance(), details: generateAttendanceDetail() },
  { id: 26, name: 'Arlene McCoy', attendance: generateAttendance(), details: generateAttendanceDetail() },
  { id: 27, name: 'Bessie Cooper', attendance: generateAttendance(), details: generateAttendanceDetail() },
  { id: 28, name: 'Courtney Henry', attendance: generateAttendance(), details: generateAttendanceDetail() },
  { id: 29, name: 'Cody Fisher', attendance: generateAttendance(), details: generateAttendanceDetail() },
  { id: 30, name: 'Dianne Russell', attendance: generateAttendance(), details: generateAttendanceDetail() },
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
