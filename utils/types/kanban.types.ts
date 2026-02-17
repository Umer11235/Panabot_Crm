export type Id = string;
export type Priority = "LOW" | "MEDIUM" | "HIGH";
export type User = {
  id: Id;
  name: string;
  avatar?: string;
};
export type Task = {
  id: Id;
  title: string;
  description?: string;
  priority: Priority;
  assigneeId?: Id;
  createdAt: string;
  imageUrl?: string;
};
export type Column = {
  id: Id;
  title: string;
  taskIds: Id[];
};
export type Board = {
  id: Id;
  name: string;
  createdAt: string;
  columnOrder: Id[];
  columns: Record<Id, Column>;
  tasks: Record<Id, Task>;
};
export type KanbanState = {
  boards: Record<Id, Board>;
  boardOrder: Id[];
  users: User[];
};
export type KanbanCard = {
  id: Id;
  title: string;
  description?: string;
  assigneeAvatar?: string;
};
export type KanbanColumn = {
  id: Id;
  title: string;
  cardIds: Id[];
};
export type KanbanData = {
  columnOrder: Id[];
  columns: Record<Id, KanbanColumn>;
  cards: Record<Id, KanbanCard>;
};
