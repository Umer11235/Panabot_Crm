"use client";
import React from "react";
import styles from "./CardItem.module.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CardItemProps } from "@/utils/types/kanban-components.types";
export default function CardItem({ card, overlay = false }: CardItemProps) {
  const { setNodeRef, transform, transition, attributes, listeners } = useSortable({
    id: card.id,
    data: { type: "card" },
    disabled: overlay,
  });
  const style: React.CSSProperties = overlay
    ? {}
    : { transform: CSS.Transform.toString(transform), transition };
  return (
    <div
      ref={overlay ? undefined : setNodeRef}
      style={style}
      className={[styles.card, overlay ? styles.overlay : ""].join(" ")}
      {...(overlay ? {} : attributes)}
      {...(overlay ? {} : listeners)}
    >
      <div className={styles.topRow}>
        <div className={styles.cardTitle}>{card.title}</div>
        {card.assigneeAvatar ? (
          <img className={styles.avatar} src={card.assigneeAvatar} alt="" />
        ) : null}
      </div>
      {card.description ? <div className={styles.desc}>{card.description}</div> : null}
    </div>
  );
}
