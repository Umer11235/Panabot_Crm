// @/utils/types/project.types.ts

export interface Project {
  id: string | number;
  name: string;
  start: string;
  end: string;
  manager: string;
  budget: string;
  progress: number; // Percentage (0-100)
  status: 'In Progress' | 'Completed' | 'Not Started' | 'Pending' | string;
}