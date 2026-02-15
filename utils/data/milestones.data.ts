export interface MilestoneDeliverable {
  deliverableId: string;
  milestoneId: string;
  title: string;
  description: string;
  fileUrl?: string;
  status: 'Pending' | 'Submitted' | 'Approved' | 'Rejected';
  submittedAt?: string;
  approvedAt?: string;
}

export interface MilestonePayment {
  paymentId: string;
  milestoneId: string;
  amount: number;
  paymentMethod: 'Card' | 'Bank' | 'Stripe' | 'PayPal' | 'Cash';
  transactionId?: string;
  status: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
  paidAt?: string;
  notes?: string;
}

export interface Milestone {
  milestoneId: string;
  projectId: string;
  projectName: string;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Approved' | 'Cancelled';
  startDate?: string;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High';
  createdBy: string;
  createdAt: string;
  totalCost: number;
  currency: string;
  taxAmount: number;
  platformFee: number;
  netAmount: number;
  amountReceived: number;
  remainingAmount: number;
  deliverables: MilestoneDeliverable[];
  payments: MilestonePayment[];
}

export const milestonesData: Milestone[] = [
  {
    milestoneId: '#M-001',
    projectId: '#951',
    projectName: 'Hotel management system',
    title: 'Frontend Development',
    description: 'Complete frontend implementation with React and TypeScript',
    status: 'In Progress',
    startDate: '2025-01-15',
    dueDate: '2025-02-28',
    priority: 'High',
    createdBy: 'John Doe',
    createdAt: '2025-01-10',
    totalCost: 5000,
    currency: 'USD',
    taxAmount: 500,
    platformFee: 250,
    netAmount: 5750,
    amountReceived: 2000,
    remainingAmount: 3750,
    deliverables: [
      {
        deliverableId: '#D-001',
        milestoneId: '#M-001',
        title: 'Homepage Design',
        description: 'Responsive homepage with hero section',
        status: 'Approved',
        submittedAt: '2025-01-20',
        approvedAt: '2025-01-22'
      },
      {
        deliverableId: '#D-002',
        milestoneId: '#M-001',
        title: 'Dashboard UI',
        description: 'Admin dashboard interface',
        status: 'Submitted',
        submittedAt: '2025-01-25'
      }
    ],
    payments: [
      {
        paymentId: '#P-001',
        milestoneId: '#M-001',
        amount: 2000,
        paymentMethod: 'Stripe',
        transactionId: 'txn_123456',
        status: 'Paid',
        paidAt: '2025-01-20',
        notes: 'Initial payment'
      }
    ]
  },
  {
    milestoneId: '#M-002',
    projectId: '#951',
    projectName: 'Hotel management system',
    title: 'Backend API Development',
    description: 'RESTful API with authentication and database integration',
    status: 'Pending',
    dueDate: '2025-03-15',
    priority: 'High',
    createdBy: 'Jane Smith',
    createdAt: '2025-01-12',
    totalCost: 7000,
    currency: 'USD',
    taxAmount: 700,
    platformFee: 350,
    netAmount: 8050,
    amountReceived: 0,
    remainingAmount: 8050,
    deliverables: [],
    payments: []
  },
  {
    milestoneId: '#M-003',
    projectId: '#547',
    projectName: 'Product development',
    title: 'UI/UX Design',
    description: 'Complete app design with prototypes',
    status: 'Completed',
    startDate: '2024-12-01',
    dueDate: '2024-12-31',
    priority: 'Medium',
    createdBy: 'Mike Johnson',
    createdAt: '2024-11-28',
    totalCost: 3000,
    currency: 'USD',
    taxAmount: 300,
    platformFee: 150,
    netAmount: 3450,
    amountReceived: 3450,
    remainingAmount: 0,
    deliverables: [
      {
        deliverableId: '#D-003',
        milestoneId: '#M-003',
        title: 'Wireframes',
        description: 'Low-fidelity wireframes',
        status: 'Approved',
        submittedAt: '2024-12-10',
        approvedAt: '2024-12-12'
      },
      {
        deliverableId: '#D-004',
        milestoneId: '#M-003',
        title: 'High-Fidelity Mockups',
        description: 'Final designs with branding',
        status: 'Approved',
        submittedAt: '2024-12-28',
        approvedAt: '2024-12-30'
      }
    ],
    payments: [
      {
        paymentId: '#P-002',
        milestoneId: '#M-003',
        amount: 1725,
        paymentMethod: 'Bank',
        transactionId: 'bank_789',
        status: 'Paid',
        paidAt: '2024-12-15',
        notes: '50% upfront'
      },
      {
        paymentId: '#P-003',
        milestoneId: '#M-003',
        amount: 1725,
        paymentMethod: 'Bank',
        transactionId: 'bank_790',
        status: 'Paid',
        paidAt: '2024-12-31',
        notes: 'Final payment'
      }
    ]
  }
];
