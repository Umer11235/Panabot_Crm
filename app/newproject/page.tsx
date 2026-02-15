"use client";

import CreateProjectPage from "@/components/(Forms)/ProjectForm/ProjectForm";
import styles from './newproject.module.css';

export default function NewProjectPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Create New Project</h1>
      </div>
      <CreateProjectPage />
    </div>
  );
}
