"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./Dropdown.module.css";
import {  DropdownProps } from "@/utils/types/kanban-components.types";
export default function Dropdown({ trigger, items, align = "right", className = "" }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);
  return (
    <div ref={rootRef} className={[styles.root, className].join(" ")}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open ? "true" : "false"}
      >
        {trigger}
      </button>
      {open ? (
        <div className={[styles.menu, align === "left" ? styles.left : styles.right].join(" ")} role="menu">
          {items.map((it, idx) => {
            if (it.type === "separator") return <div key={idx} className={styles.sep} />;
            return (
              <button
                key={idx}
                type="button"
                className={[styles.item, it.danger ? styles.danger : ""].join(" ")}
                onClick={() => {
                  if (it.disabled) return;
                  it.onClick();
                  setOpen(false);
                }}
                disabled={!!it.disabled}
                role="menuitem"
              >
                {it.icon ? <span className={styles.icon}>{it.icon}</span> : null}
                <span className={styles.label}>{it.label}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
