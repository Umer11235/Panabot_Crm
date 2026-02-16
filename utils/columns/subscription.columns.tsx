import { DataTableColumn } from '@/utils/types/datatable.types';

type Subscription = {
  id: string;
  subscription: string;
  vendor: string;
  fromDate: string;
  toDate: string;
  paymentBy: string;
  paymentMode: string;
  cost: number;
  status: string;
};

export const subscriptionColumns: DataTableColumn<Subscription>[] = [
  { header: 'ID', key: 'id' },
  { header: 'Subscription', key: 'subscription' },
  { header: 'Vendor', key: 'vendor' },
  { header: 'From', key: 'fromDate' },
  { header: 'To', key: 'toDate' },
  { header: 'Payment By', key: 'paymentBy' },
  { header: 'Payment Mode', key: 'paymentMode' },
  { header: 'Cost', key: 'cost', render: (s: Subscription) => <span>${s.cost.toFixed(2)}</span> },
  {
    header: 'Status',
    key: 'status',
    render: (s: Subscription) => {
      const map: Record<string, { bg: string; color: string }> = {
        Active: { bg: '#ecfdf5', color: '#10b981' },
        Pending: { bg: '#fffbeb', color: '#d97706' },
        Expired: { bg: '#fef2f2', color: '#ef4444' },
        Inactive: { bg: '#f3f4f6', color: '#6b7280' }
      };
      const style = map[s.status] || map['Pending'];
      return (
        <span style={{ background: style.bg, color: style.color, padding: '4px 8px', borderRadius: 6, fontWeight: 600, fontSize: 12 }}>
          {s.status}
        </span>
      );
    }
  }
];
