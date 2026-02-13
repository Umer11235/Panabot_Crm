import { KanbanData } from "@/utils/types/kanban.types";

export const initialData: KanbanData = {
  columnOrder: ["todo", "doing", "done"],
  columns: {
    todo: { id: "todo", title: "To do", cardIds: ["c1", "c2"] },
    doing: { id: "doing", title: "In progress", cardIds: ["c3"] },
    done: { id: "done", title: "Done", cardIds: ["c4"] },
  },
  cards: {
    c1: { id: "c1", title: "Design UI", description: "Header + cards" },
    c2: { id: "c2", title: "API Integration" },
    c3: { id: "c3", title: "Fix Drag & Drop", assigneeAvatar: "/avatars/a.png" },
    c4: { id: "c4", title: "Deploy" },
  },
};
