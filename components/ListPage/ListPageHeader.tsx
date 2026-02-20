import type { ReactNode } from "react";

type ListPageHeaderClasses = {
  header: string;
  title: string;
  addBtn?: string;
};

type ListPageHeaderProps = {
  title: string;
  classes: ListPageHeaderClasses;
  addButtonText?: string;
  onAdd?: () => void;
  rightContent?: ReactNode;
};

export default function ListPageHeader({
  title,
  classes,
  addButtonText,
  onAdd,
  rightContent,
}: ListPageHeaderProps) {
  return (
    <div className={classes.header}>
      <h1 className={classes.title}>{title}</h1>
      {rightContent ? (
        rightContent
      ) : (
        addButtonText &&
        onAdd && (
          <button className={classes.addBtn} onClick={onAdd}>
            {addButtonText}
          </button>
        )
      )}
    </div>
  );
}
