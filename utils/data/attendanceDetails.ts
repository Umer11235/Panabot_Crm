// Detailed attendance records with check-in and check-out times
export const attendanceDetailsData = [
  {
    id: 1,
    name: 'Annette Black',
    department: 'Marketing',
    records: [
      { date: '2024-02-01', status: 'present', checkIn: '09:00', checkOut: '18:00', hoursWorked: 9 },
      { date: '2024-02-02', status: 'present', checkIn: '09:15', checkOut: '18:15', hoursWorked: 9 },
      { date: '2024-02-03', status: 'present', checkIn: '08:50', checkOut: '17:45', hoursWorked: 8.92 },
      { date: '2024-02-04', status: 'medical', checkIn: '10:30', checkOut: '16:00', hoursWorked: 5.5 },
      { date: '2024-02-05', status: 'present', checkIn: '09:00', checkOut: '18:00', hoursWorked: 9 },
      { date: '2024-02-06', status: 'present', checkIn: '09:05', checkOut: '18:10', hoursWorked: 9.08 },
      { date: '2024-02-07', status: 'absent', checkIn: '-', checkOut: '-', hoursWorked: 0 },
      { date: '2024-02-08', status: 'present', checkIn: '09:00', checkOut: '18:00', hoursWorked: 9 },
      { date: '2024-02-09', status: 'present', checkIn: '09:20', checkOut: '18:30', hoursWorked: 9.17 },
      { date: '2024-02-10', status: 'absent', checkIn: '-', checkOut: '-', hoursWorked: 0 },
      { date: '2024-02-11', status: 'present', checkIn: '09:00', checkOut: '18:00', hoursWorked: 9 },
      { date: '2024-02-12', status: 'present', checkIn: '08:45', checkOut: '17:50', hoursWorked: 9.08 },
      { date: '2024-02-13', status: 'present', checkIn: '09:10', checkOut: '18:15', hoursWorked: 9.08 },
      { date: '2024-02-14', status: 'present', checkIn: '09:00', checkOut: '18:00', hoursWorked: 9 },
      { date: '2024-02-15', status: 'present', checkIn: '09:30', checkOut: '18:30', hoursWorked: 9 },
      { date: '2024-02-16', status: 'present', checkIn: '09:00', checkOut: '18:00', hoursWorked: 9 },
      { date: '2024-02-17', status: 'present', checkIn: '09:00', checkOut: '18:00', hoursWorked: 9 },
      { date: '2024-02-18', status: 'present', checkIn: '09:05', checkOut: '18:10', hoursWorked: 9.08 },
      { date: '2024-02-19', status: 'absent', checkIn: '-', checkOut: '-', hoursWorked: 0 },
      { date: '2024-02-20', status: 'present', checkIn: '09:00', checkOut: '18:00', hoursWorked: 9 },
      { date: '2024-02-21', status: 'present', checkIn: '09:15', checkOut: '18:20', hoursWorked: 9.08 },
      { date: '2024-02-22', status: 'present', checkIn: '09:00', checkOut: '18:00', hoursWorked: 9 },
      { date: '2024-02-23', status: 'present', checkIn: '08:55', checkOut: '18:05', hoursWorked: 9.17 },
      { date: '2024-02-24', status: 'absent', checkIn: '-', checkOut: '-', hoursWorked: 0 },
      { date: '2024-02-25', status: 'present', checkIn: '09:00', checkOut: '18:00', hoursWorked: 9 },
      { date: '2024-02-26', status: 'absent', checkIn: '-', checkOut: '-', hoursWorked: 0 },
      { date: '2024-02-27', status: 'present', checkIn: '09:20', checkOut: '18:25', hoursWorked: 9.08 },
      { date: '2024-02-28', status: 'present', checkIn: '09:00', checkOut: '18:00', hoursWorked: 9 },
      { date: '2024-02-29', status: 'medical', checkIn: '10:00', checkOut: '17:00', hoursWorked: 7 },
    ]
  }
];

export const getStatusColor = (status: string) => {
  switch(status) {
    case 'present': return '#10b981';
    case 'absent': return '#ef4444';
    case 'medical': return '#f59e0b';
    case 'leave': return '#3b82f6';
    default: return '#6b7280';
  }
};

export const getStatusLabel = (status: string) => {
  switch(status) {
    case 'present': return 'Present';
    case 'absent': return 'Absent';
    case 'medical': return 'Medical Leave';
    case 'leave': return 'Leave';
    default: return 'Unknown';
  }
};
