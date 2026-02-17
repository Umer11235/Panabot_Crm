import { DataTableColumn } from "@/utils/types/datatable.types";
import { Project } from "../types/project.types";

export const projectColumns: DataTableColumn<Project>[] = [
  { header: 'ID', key: 'id' },
  { header: 'Project Name', key: 'name' },
  { header: 'Start Date', key: 'start' },
  { header: 'End Date', key: 'end' },
  { header: 'Project Manager', key: 'manager' },
  { header: 'Budget', key: 'budget' },
  { 
    header: 'Progress', 
    key: 'progress',
    render: (item: Project) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '11px', width: '30px' }}>{item.progress}%</span>
        <div style={{ flex: 1, height: '3px', background: '#f1f5f9', borderRadius: '4px', minWidth: '60px' }}>
          <div style={{ width: `${item.progress}%`, height: '100%', background: item.progress === 100 ? '#3b82f6' : '#10b981', borderRadius: '4px' }} />
        </div>
      </div>
    )
  },
  {
    header: 'Status',
    key: 'status',
    render: (item: Project) => {
      const colors: Record<string, { bg: string; text: string }> = {
        'In Progress': { bg: '#ecfdf5', text: '#10b981' },
        'Completed': { bg: '#eff6ff', text: '#3b82f6' },
        'Not Started': { bg: '#fef2f2', text: '#ef4444' },
        'Pending': { bg: '#fffbeb', text: '#f59e0b' }
      };
      const style = colors[item.status] || colors['Pending'];
      return (
        <span style={{ background: style.bg, color: style.text, padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, whiteSpace: 'nowrap' }}>
          {item.status}
        </span>
      );
    }
  }
];
