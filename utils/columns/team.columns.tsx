import { DataTableColumn } from "@/utils/types/datatable.types";

export const teamColumns: DataTableColumn<any>[] = [
  { header: 'Team ID', key: 'id' },
  { header: 'Team Name', key: 'name' },
  { header: 'Team Leader', key: 'leader' },
  { 
    header: 'Members', 
    key: 'members',
    render: (item: any) => item.members?.length || 0
  },
  { header: 'Projects', key: 'projects' },
  {
    header: 'Status',
    key: 'status',
    render: (item: any) => {
      const colors: Record<string, { bg: string; text: string }> = {
        'Active': { bg: '#ecfdf5', text: '#10b981' },
        'Inactive': { bg: '#fef2f2', text: '#ef4444' },
      };
      const style = colors[item.status] || colors['Active'];
      return (
        <span style={{ background: style.bg, color: style.text, padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>
          {item.status}
        </span>
      );
    }
  }
];
