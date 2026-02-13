import { useState, useMemo } from 'react';
import styles from './Card.module.css';
import UniversalCard from '../UniversalCard/UniversalCard';
import { ticketData as initialTicketData } from '@/utils/data/tickets.data';
import { filterTickets, paginateTickets, toggleTicketSelect, toggleSelectAll, deleteSelectedTickets } from './functions';

export default function TicketList() {
  const [tickets, setTickets] = useState(initialTicketData);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredTickets = useMemo(() => filterTickets(tickets, search), [search, tickets]);
  const totalPages = Math.ceil(filteredTickets.length / rowsPerPage);
  const paginatedTickets = paginateTickets(filteredTickets, currentPage, rowsPerPage);
  const totalSelected = tickets.filter(t => t.isSelected).length;

  const toggleSelect = (id: string) => {
    setTickets(prev => toggleTicketSelect(prev, id));
  };

  const handleToggleSelectAll = () => {
    const allSelected = totalSelected === tickets.length;
    setTickets(prev => toggleSelectAll(prev, allSelected));
  };

  return (
    <UniversalCard title="Events">
      <div className={styles.dashboardContainer}>
        <div className={styles.searchBar}>
          <button
            className={styles.deleteButton}
            disabled={totalSelected === 0}
            onClick={() => setTickets(prev => deleteSelectedTickets(prev))}
          >
            <span>
              <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4h12M5 4V2.5A1.5 1.5 0 0 1 6.5 1h1A1.5 1.5 0 0 1 9 2.5V4m2 0v11.5a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 3 15.5V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </div>

        <div className={styles.controlHeader}>
          <div className={styles.selectionCount}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={totalSelected === tickets.length}
              onChange={handleToggleSelectAll}
            />
            <span className={styles.countText}>{totalSelected} Selected</span>
          </div>
        </div>

        <ul className={styles.list}>
          {paginatedTickets.map((ticket, index) => (
            <li
              key={ticket.id}
              className={`${styles.listItem} ${index % 2 === 0 ? styles.highlighted : ''}`}
            >
              <div className={`${styles.ticketContent} ${index % 2 === 0 ? styles.highlighted : ''}`}>
                <div className={styles.leftSection}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={ticket.isSelected}
                    onChange={() => toggleSelect(ticket.id)}
                  />
                  <div className={styles.info}>
                    <p className={styles.title}>{ticket.title}</p>
                  </div>
                </div>
                <div className={styles.rightSection}>
                  <span className={styles.ticketId}>{ticket.id}</span>
                  <span className={styles.team}>Team: {ticket.team}</span>
                  <span className={`${styles.status} ${styles[ticket.status]}`}>Status: {ticket.status}</span>
                  <span className={`${styles.priority} ${styles[ticket.priority]}`}>Priority: {ticket.priority}</span>
                  <span className={styles.assignee}>Assignee: {ticket.assignee}</span>
                  <span className={styles.created}>Created: {ticket.created}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.paginationFooter}>
          <div className={styles.paginationLeft}>
            <span>Rows per page:</span>
            <select
              className={styles.rowsPerPageSelect}
              value={rowsPerPage}
              onChange={e => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            >
              <option>5</option>
              <option>10</option>
              <option>25</option>
            </select>
          </div>
          <div className={styles.paginationRight}>
            <span>{(currentPage - 1) * rowsPerPage + 1}-{Math.min(currentPage * rowsPerPage, filteredTickets.length)} of {filteredTickets.length}</span>
            <button
              className={styles.pageButton}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            <button
              className={styles.pageButton}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </UniversalCard>
  );
}
