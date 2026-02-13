"use client";

import BoardPage from "@/components/Kanban/BoardPage";
import { use } from "react";

export default function Page({ params }: { params: Promise<{ boardId: string }> }) {
  const { boardId } = use(params);
  return <BoardPage boardId={boardId} />;
}
