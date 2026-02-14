import styles from "./CompanyCard.module.css";
import Button from "@/components/(Inputs)/Button/Button";
import Image from "next/image";
import { CompanyCardProps } from "@/utils/types/card.types";
export default function CompanyCard({
  name,
  email,
  contactPerson,
  contactPhone,
  totalProjects,
  logoSrc,
  logoAlt = "Company logo",
  headerRight,
  primaryAction,
  secondaryAction,
  className = "",
}: CompanyCardProps) {
  return (
    <div className={[styles.card, className].join(" ")}>
      <div className={styles.header}>
        <div className={styles.logoWrap}>
          {logoSrc ? (
            <Image className={styles.logoImg} src={logoSrc} alt={logoAlt} />
          ) : (
            <div className={styles.logoFallback} aria-hidden="true" />
          )}
        </div>
        <div className={styles.titleArea}>
          <div className={styles.nameRow}>
            <h3 className={styles.name}>{name}</h3>
            {headerRight ? <div className={styles.headerRight}>{headerRight}</div> : null}
          </div>
          <p className={styles.email}>{email}</p>
        </div>
      </div>
      <div className={styles.info}>
        {contactPerson ? (
          <p className={styles.line}>
            <span className={styles.label}>Contact Person:</span>{" "}
            <span className={styles.value}>{contactPerson}</span>
          </p>
        ) : null}
        {contactPhone ? (
          <p className={styles.line}>
            <span className={styles.label}>Contact Phone:</span>{" "}
            <span className={styles.value}>{contactPhone}</span>
          </p>
        ) : null}
        {typeof totalProjects === "number" ? (
          <p className={styles.line}>
            <span className={styles.label}>Total Projects:</span>{" "}
            <span className={styles.value}>{totalProjects}</span>
          </p>
        ) : null}
      </div>
      {(primaryAction || secondaryAction) ? (
        <div className={styles.actions}>
          {/* {primaryAction ? (
            <Button
              variant="primary"
              size="sm"
              onClick={primaryAction.onClick}
              loading={!!primaryAction.loading}
              disabled={!!primaryAction.disabled}
              loadingText="Sending..."
              type="button"
            >
              {primaryAction.label}
            </Button>
          ) : null} */}
          {secondaryAction ? (
            <Button
              variant="outline"
              size="sm"
              onClick={secondaryAction.onClick}
              loading={!!secondaryAction.loading}
              disabled={!!secondaryAction.disabled}
              loadingText="Loading..."
              type="button"
            >
              {secondaryAction.label}
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
