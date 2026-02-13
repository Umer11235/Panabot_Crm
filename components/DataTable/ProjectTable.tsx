import React, { useState } from 'react';
import styles from './DataTable.module.css';
import Icon from '@/utils/Icons';
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
  onEdit,
  onDelete,
  onView,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const totalPages = Math.ceil(totalEntries / pageSize);
  const startEntry = (currentPage - 1) * pageSize + 1;
  const endEntry = Math.min(currentPage * pageSize, totalEntries);
  
  const addButtonText = onAdd ? (data[0] && 'name' in data[0] ? '+ Add New Employee' : '+ Add New Project') : '';

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
        {onAdd && (
          <button onClick={onAdd} className={styles.addButton}>
            {addButtonText}
          </button>
        )}
      </div>

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
                {(onEdit || onDelete || onView) && (
                  <td className={styles.actions}>
                    <div className={styles.actionIcons}>
                      {onView && (
                        <button onClick={() => onView(item)} className={styles.viewBtn}>
                          <Icon name="visibility" size={17} />
                        </button>
                      )}
                      {onEdit && (
                        <button onClick={() => onEdit(item)} className={styles.editBtn}>
                          ✏️
                        </button>
                      )}
                      {onDelete && (
                        <button onClick={() => onDelete(item)} className={styles.deleteBtn}>
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
            className={styles.arrowBtn}
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            ←
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`${styles.pageBtn} ${currentPage === i + 1 ? styles.active : ''}`}
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className={styles.arrowBtn}
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
