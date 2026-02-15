import React, { useState } from 'react';
import styles from './DataTable.module.css';
import Icon from '@/utils/Icons';
import Button from '@/components/(Inputs)/Button/Button';
import { DataTableProps } from '@/utils/types/datatable.types';

export default function DataTable<T extends { id: string | number }>({
  title,
  data,
  columns,
  currentPage,
  pageSize,
  totalEntries,
  onPageChange,
  onAdd,
  addButtonText = '+ Add New',
  onEdit,
  onDelete,
  onView,
  onViewMilestones,
}: DataTableProps<T>) {
  const totalPages = Math.ceil(totalEntries / pageSize);
  const startEntry = (currentPage - 1) * pageSize + 1;
  const endEntry = Math.min(currentPage * pageSize, totalEntries);

  return (
    <div className={styles.container}>
      {(addButtonText || onAdd) && (
        <div className={styles.searchBar}>
          <div style={{ flex: 1 }} />
          {onAdd && (
            <Button variant="primary" size="md" onClick={onAdd}>
              {addButtonText}
            </Button>
          )}
        </div>
      )}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index}>{col.header}</th>
              ))}
              {(onEdit || onDelete || onView) && <th style={{ textAlign: 'right' }}>Action</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                {columns.map((col, index) => (
                  <td key={index}>
                    {col.render ? col.render(item) : (item as any)[col.key]}
                  </td>
                ))}
                {(onEdit || onDelete || onView || onViewMilestones) && (
                  <td className={styles.actions}>
                    <div className={styles.actionIcons}>
                      {onView && (
                        <button onClick={() => onView(item)} className={styles.iconBtn} title="View">
                          <Icon name="visibility" size={17} />
                        </button>
                      )}
                      {onEdit && (
                        <button onClick={() => onEdit(item)} className={styles.iconBtn} title="Edit">
                          ✏️
                        </button>
                      )}
                      {onViewMilestones && (
                        <button onClick={() => onViewMilestones(item)} className={styles.iconBtn} title="View Milestones">
                          📋
                        </button>
                      )}
                      {onDelete && (
                        <button onClick={() => onDelete(item)} className={styles.iconBtn} title="Delete">
                          <Icon name='bin' size={17} />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.footer}>
        <p>Showing {startEntry} to {endEntry} of {totalEntries} entries</p>
        <div className={styles.pagination}>
          <button
            className={styles.paginationBtn}
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            title="Previous"
          >
            ←
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`${styles.paginationBtn} ${currentPage === i + 1 ? styles.active : ''}`}
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className={styles.paginationBtn}
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            title="Next"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
