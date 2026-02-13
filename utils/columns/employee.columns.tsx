import { DataTableColumn } from "@/utils/types/datatable.types";
import { Employee } from "@/utils/types/employee.types";

export const employeeColumns: DataTableColumn<Employee>[] = [
  { header: 'Employee ID', key: 'id' },
  { 
    header: 'Employee Name', 
    key: 'name',
    render: (item: Employee) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600, color: '#4f46e5' }}>
          {item.name.split(' ').map((n: string) => n[0]).join('')}
        </div>
        <span>{item.name}</span>
      </div>
    )
  },
  { header: 'Email', key: 'email' },
  { header: 'Contact', key: 'contact' },
  { header: 'Department', key: 'department' },
  { header: 'Position', key: 'position' },
  { header: 'Hire Date', key: 'hireDate' },
  {
    header: 'Status',
    key: 'status',
    render: (item: Employee) => {
      const colors: Record<string, { bg: string; text: string }> = {
        'Full Time': { bg: '#ecfdf5', text: '#10b981' },
        'Part Time': { bg: '#eff6ff', text: '#3b82f6' },
        'Remote': { bg: '#fef3c7', text: '#f59e0b' },
        'Internship': { bg: '#fce7f3', text: '#ec4899' }
      };
      const style = colors[item.status] || colors['Full Time'];
      return (
        <span style={{ background: style.bg, color: style.text, padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>
          {item.status}
        </span>
      );
    }
  }
];
