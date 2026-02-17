"use client";

import { useEffect, useMemo, useState } from "react";
import type { Board, Column, KanbanState, Priority, Task, Id } from "../types/kanban.types";

const LS_KEY = "kanban_multiboard_like_v1";
const uid = () => Math.random().toString(36).slice(2, 10);

const createDefaultState = (): KanbanState => {
  const boardId = "b_" + uid();
  const todo = "c_" + uid();
  const progress = "c_" + uid();
  const done = "c_" + uid();
  const t1 = "t_" + uid();
  const t2 = "t_" + uid();
  const t3 = "t_" + uid();
  const now = new Date().toISOString();

  const board: Board = {
    id: boardId,
    name: "Test Project",
    createdAt: now,
    columnOrder: [todo, progress, done],
    columns: {
      [todo]: { id: todo, title: "To Do", taskIds: [t1, t2] },
      [progress]: { id: progress, title: "In Progress", taskIds: [t3] },
      [done]: { id: done, title: "Done", taskIds: [] },
    },
    tasks: {
      [t1]: { id: t1, title: "Fix Drag & Drop", description: "", priority: "HIGH", createdAt: now },
      [t2]: { id: t2, title: "API Integration", description: "", priority: "MEDIUM", createdAt: now },
      [t3]: { id: t3, title: "Design UI", description: "Header + cards", priority: "LOW", createdAt: now },
    },
  };

  return {
    boards: { [boardId]: board },
    boardOrder: [boardId],
    users: [
      { id: "u1", name: "Ali", avatar: "" },
      { id: "u2", name: "Sara", avatar: "" },
      { id: "u3", name: "John", avatar: "" },
    ],
  };
};

export function useKanbanStore() {
  const [state, setState] = useState<KanbanState>(() => {
    if (typeof window === "undefined") return createDefaultState();
    const raw = window.localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as KanbanState) : createDefaultState();
  });

  useEffect(() => {
    window.localStorage.setItem(LS_KEY, JSON.stringify(state));
  }, [state]);

  const api = useMemo(() => {
    const addBoard = (name: string) => {
      const id = "b_" + uid();
      const now = new Date().toISOString();
      const c1 = "c_" + uid();
      const c2 = "c_" + uid();
      const c3 = "c_" + uid();

      const board: Board = {
        id,
        name,
        createdAt: now,
        columnOrder: [c1, c2, c3],
        columns: {
          [c1]: { id: c1, title: "To Do", taskIds: [] },
          [c2]: { id: c2, title: "In Progress", taskIds: [] },
          [c3]: { id: c3, title: "Done", taskIds: [] },
        },
        tasks: {},
      };

      setState((s) => ({
        ...s,
        boards: { ...s.boards, [id]: board },
        boardOrder: [id, ...s.boardOrder],
      }));

      return id;
    };

    const addColumn = (boardId: Id, title: string) => {
      const colId = "c_" + uid();
      setState((s) => {
        const board = s.boards[boardId];
        if (!board) return s;

        const next: Board = {
          ...board,
          columns: { ...board.columns, [colId]: { id: colId, title, taskIds: [] } },
          columnOrder: [...board.columnOrder, colId],
        };

        return { ...s, boards: { ...s.boards, [boardId]: next } };
      });
    };

    const addTask = (
      boardId: Id,
      columnId: Id,
      payload: {
        title: string;
        description?: string;
        priority: Priority;
        assigneeId?: Id;
        imageUrl?: string;
      }
    ) => {
      const taskId = "t_" + uid();
      const now = new Date().toISOString();

      setState((s) => {
        const board = s.boards[boardId];
        if (!board) return s;

        const task: Task = {
          id: taskId,
          title: payload.title,
          description: payload.description || "",
          priority: payload.priority,
          assigneeId: payload.assigneeId,
          createdAt: now,
        };

        const col = board.columns[columnId];
        if (!col) return s;

        const next: Board = {
          ...board,
          tasks: { ...board.tasks, [taskId]: task },
          columns: {
            ...board.columns,
            [columnId]: { ...col, taskIds: [taskId, ...col.taskIds] },
          },
        };

        return { ...s, boards: { ...s.boards, [boardId]: next } };
      });

      return taskId;
    };

    const updateTask = (boardId: Id, taskId: Id, patch: Partial<Task> & { columnId?: Id }) => {
      setState((s) => {
        const board = s.boards[boardId];
        if (!board || !board.tasks[taskId]) return s;

        let nextBoard: Board = {
          ...board,
          tasks: { ...board.tasks, [taskId]: { ...board.tasks[taskId], ...patch } },
        };

        if (patch.columnId) {
          const fromColId = board.columnOrder.find((cid) => board.columns[cid].taskIds.includes(taskId));
          const toColId = patch.columnId;

          if (fromColId && toColId && fromColId !== toColId) {
            const fromCol = nextBoard.columns[fromColId];
            const toCol = nextBoard.columns[toColId];
            if (!toCol) return s;

            nextBoard = {
              ...nextBoard,
              columns: {
                ...nextBoard.columns,
                [fromColId]: { ...fromCol, taskIds: fromCol.taskIds.filter((x) => x !== taskId) },
                [toColId]: { ...toCol, taskIds: [taskId, ...toCol.taskIds] },
              },
            };
          }
        }

        return { ...s, boards: { ...s.boards, [boardId]: nextBoard } };
      });
    };

    const moveTask = (boardId: Id, fromColId: Id, toColId: Id, taskId: Id, toIndex: number) => {
      setState((s) => {
        const board = s.boards[boardId];
        if (!board) return s;

        const fromCol = board.columns[fromColId];
        const toCol = board.columns[toColId];
        if (!fromCol || !toCol) return s;

        const nextFrom = fromCol.taskIds.filter((x) => x !== taskId);
        const nextTo = [...toCol.taskIds];
        const insertAt = Math.max(0, Math.min(toIndex, nextTo.length));
        nextTo.splice(insertAt, 0, taskId);

        const next: Board = {
          ...board,
          columns: {
            ...board.columns,
            [fromColId]: { ...fromCol, taskIds: nextFrom },
            [toColId]: { ...toCol, taskIds: nextTo },
          },
        };

        return { ...s, boards: { ...s.boards, [boardId]: next } };
      });
    };

    const reorderTaskWithinColumn = (boardId: Id, colId: Id, taskIds: Id[]) => {
      setState((s) => {
        const board = s.boards[boardId];
        if (!board) return s;

        const col = board.columns[colId];
        if (!col) return s;

        const next: Board = {
          ...board,
          columns: { ...board.columns, [colId]: { ...col, taskIds } },
        };

        return { ...s, boards: { ...s.boards, [boardId]: next } };
      });
    };

    const updateColumnTitle = (boardId: Id, columnId: Id, title: string) => {
      const trimmed = title.trim();
      if (!trimmed) return;

      setState((s) => {
        const board = s.boards[boardId];
        if (!board) return s;

        const col = board.columns[columnId];
        if (!col) return s;

        const next = {
          ...board,
          columns: {
            ...board.columns,
            [columnId]: { ...col, title: trimmed },
          },
        };

        return { ...s, boards: { ...s.boards, [boardId]: next } };
      });
    };

    const deleteColumn = (boardId: Id, columnId: Id) => {
      setState((s) => {
        const board = s.boards[boardId];
        if (!board) return s;
        if (board.columnOrder.length <= 1) return s;

        const col = board.columns[columnId];
        if (!col) return s;

        const taskIdsToDelete = col.taskIds;
        const nextTasks = { ...board.tasks };
        for (const tid of taskIdsToDelete) {
          delete nextTasks[tid];
        }

        const nextColumns = { ...board.columns };
        delete nextColumns[columnId];

        const nextOrder = board.columnOrder.filter((id) => id !== columnId);

        const nextBoard = {
          ...board,
          tasks: nextTasks,
          columns: nextColumns,
          columnOrder: nextOrder,
        };

        return { ...s, boards: { ...s.boards, [boardId]: nextBoard } };
      });
    };

    const reorderColumns = (boardId: Id, nextColumnOrder: Id[]) => {
      setState((s) => {
        const board = s.boards[boardId];
        if (!board) return s;

        const valid = nextColumnOrder.filter((id) => board.columns[id]);
        if (valid.length !== board.columnOrder.length) return s;

        const nextBoard = { ...board, columnOrder: valid };
        return { ...s, boards: { ...s.boards, [boardId]: nextBoard } };
      });
    };

    const updateBoardName = (boardId: Id, name: string) => {
      const trimmed = name.trim();
      if (!trimmed) return;

      setState((s) => {
        const board = s.boards[boardId];
        if (!board) return s;

        const nextBoard = { ...board, name: trimmed };
        return { ...s, boards: { ...s.boards, [boardId]: nextBoard } };
      });
    };

    const deleteBoard = (boardId: Id) => {
      setState((s) => {
        if (!s.boards[boardId]) return s;

        const nextBoards = { ...s.boards };
        delete nextBoards[boardId];

        const nextOrder = s.boardOrder.filter((id) => id !== boardId);
        return { ...s, boards: nextBoards, boardOrder: nextOrder };
      });
    };

    return {
      state,
      addBoard,
      addColumn,
      addTask,
      updateTask,
      moveTask,
      reorderTaskWithinColumn,
      updateColumnTitle,
      deleteColumn,
      reorderColumns,
      updateBoardName,
      deleteBoard,
    };
  }, [state]);

  return api;
}
