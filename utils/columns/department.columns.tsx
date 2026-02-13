import { DataTableColumn } from "@/utils/types/datatable.types";
import { Department } from "@/utils/types/department.types";

export const departmentColumns: DataTableColumn<Department>[] = [
  { header: 'ID', key: 'id' },
  { header: 'Department', key: 'department' },
  { 
    header: 'Head of Department', 
    key: 'head',
    render: (item: Department) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600, color: '#4f46e5' }}>
          {item.head.split(' ').map((n: string) => n[0]).join('')}
        </div>
        <span>{item.head}</span>
      </div>
    )
  },
  { header: 'Contact Email', key: 'email' },
  { header: 'Phone Number', key: 'phone' },
  { header: 'Employees', key: 'employees' },
  { header: 'Budget', key: 'budget' },
];
