import React from "react";
import styles from "./ProjectCard.module.css";
import Button from "@/components/(Inputs)/Button/Button";
import Image from "next/image";
import { Member, ProjectCardProps } from "@/utils/types/card.types";

export default function ProjectCard({
  leaderName,
  leaderRole = "Team Leader",
  leaderAvatarSrc,
  title,
  members = [],
  maxVisibleMembers = 3,
  progress = 0,
  progressLabel = "Team Members:",
  onMenuClick,
  menu,
  ctaLabel = "View Details",
  onCtaClick,
  ctaLoading = false,
  ctaDisabled = false,
  className = "",
}: ProjectCardProps) {
  const safeProgress = Math.max(0, Math.min(100, Math.round(progress)));
  const visibleMembers = members.slice(0, maxVisibleMembers);
  const extraCount = Math.max(0, members.length - maxVisibleMembers);

  return (
    <div className={[styles.card, className].join(" ")}>
      <div className={styles.header}>
        <div className={styles.leader}>
          <div className={styles.avatarWrap}>
            {leaderAvatarSrc ? (
              <Image className={styles.avatarImg} src={leaderAvatarSrc} alt={leaderName} />
            ) : (
              <div className={styles.avatarFallback} aria-hidden="true" />
            )}
          </div>
          <div className={styles.leaderText}>
            <div className={styles.leaderName}>{leaderName}</div>
            <div className={styles.leaderRole}>{leaderRole}</div>
          </div>
        </div>
        {menu ? (
          // render custom menu (Dropdown) provided by parent
          <div>{menu}</div>
        ) : (
          <button
            type="button"
            className={styles.menuBtn}
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <span className={styles.dots} aria-hidden="true">•••</span>
          </button>
        )}
      </div>

      <div className={styles.body}>
        <h4 className={styles.title}>{title}</h4>
        <div className={styles.sectionLabel}>{progressLabel}</div>
        <div className={styles.membersRow}>
          <div className={styles.members}>
            {visibleMembers.map((m) => (
              <div key={m.id} className={styles.memberAvatar} title={m.name || ""}>
                {m.avatarSrc ? (
                  <Image width={50} height={50} src={leaderAvatarSrc} alt={m.name || "member"} />
                ) : (
                  <div className={styles.memberFallback} aria-hidden="true" />
                )}
              </div>
            ))}
            {extraCount > 0 && (
              <div className={[styles.memberAvatar, styles.more].join(" ")} title={`${extraCount} more`}>
                +{extraCount}
              </div>
            )}
          </div>
        </div>

        <div className={styles.progressRow}>
          <div className={styles.percent}>{safeProgress}%</div>
          <div className={styles.progressTrack} aria-label={`Progress ${safeProgress}%`}>
            <div className={styles.progressFill} style={{ width: `${safeProgress}%` }} />
          </div>
        </div>

        <div className={styles.cta}>
          <Button
            variant="primary"
            size="sm"
            onClick={onCtaClick}
            loading={ctaLoading}
            disabled={ctaDisabled}
            loadingText="Loading..."
            type="button"
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
