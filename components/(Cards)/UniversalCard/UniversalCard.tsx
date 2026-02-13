"use client";

import React, { useState } from 'react';
import styles from './UniversalCard.module.css';
import { UniversalCardProps } from '@/utils/types/card.types';

export default function UniversalCard({ title, children, actionType, actionOptions = [] }: UniversalCardProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <div className={styles.cardToolbar}>
          {actionType === 'dropdown' && (
            <div className={styles.dropdownContainer}>
              <button
                className={styles.threeDotBtn}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                ⋮
              </button>
              {isDropdownOpen && (
                <ul className={styles.dropdownMenu}>
                  {actionOptions.map((opt, i) => (
                    <li key={i} className={styles.dropdownItem}>
                      {opt.icon && <span className={styles.itemIcon}>{opt.icon}</span>}
                      {opt.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {actionType === 'radio' && (
            <div className={styles.radioGroup}>
              {actionOptions.map((opt, i) => (
                <label key={i} className={styles.radioLabel}>
                  <input type="radio" name={title} value={opt.value} />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          )}

          {actionType === 'select' && (
            <select className={styles.cardSelect}>
              {actionOptions.map((opt, i) => (
                <option key={i} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          )}

          {actionType === 'button' && (
            <button className={styles.headerBtn}>View All</button>
          )}
        </div>
      </div>
      <div className={styles.cardBody}>
        {children}
      </div>
    </div>
  );
}
