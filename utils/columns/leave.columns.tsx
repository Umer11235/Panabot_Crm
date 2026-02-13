import { DataTableColumn } from "@/utils/types/datatable.types";
import { Leave } from "@/utils/types/leave.types";

export const leaveColumns: DataTableColumn<Leave>[] = [
  { header: 'ID', key: 'id' },
  { 
    header: 'Employee Name', 
    key: 'name',
    render: (item: Leave) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600, color: '#4f46e5' }}>
          {item.name.split(' ').map((n: string) => n[0]).join('')}
        </div>
        <span>{item.name}</span>
      </div>
    )
  },
  { header: 'Department', key: 'department' },
  { header: 'Position', key: 'position' },
  { header: 'Start Date', key: 'startDate' },
  { header: 'End Date', key: 'endDate' },
  { header: 'Duration', key: 'duration' },
  { header: 'Leave Type', key: 'leaveType' },
  { header: 'Approved By', key: 'approvedBy' },
  {
    header: 'Status',
    key: 'status',
    render: (item: Leave) => {
      const colors: Record<string, { bg: string; text: string }> = {
        'Approved': { bg: '#ecfdf5', text: '#10b981' },
        'Pending': { bg: '#fef3c7', text: '#f59e0b' },
        'Denied': { bg: '#fef2f2', text: '#ef4444' }
      };
      const style = colors[item.status] || colors['Pending'];
      return (
        <span style={{ background: style.bg, color: style.text, padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>
          {item.status}
        </span>
      );
    }
  }
];
