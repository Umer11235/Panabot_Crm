import React from "react";
import styles from "./Button.module.css";
import { ButtonProps } from "@/utils/types/button.types";

export default function Button({
  children,
  variant = "filled",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  loadingText = "Loading...",
  type = "button",
  onClick,
  className = "",
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[variant]} ${styles[size]} ${fullWidth ? styles.fullWidth : ''} ${loading ? styles.loading : ''} ${className}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {loading && <span className={styles.spinner} />}
      <span>{loading ? loadingText : children}</span>
    </button>
  );
}
