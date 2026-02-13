import React from 'react';
import styles from './PromoBanner.module.css';

export default function PromoBanner() {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.gridBg} />
      <div className={styles.contentWrapper}>
        <div className={styles.leftContent}>
          <div className={styles.avatarGroup}>
            <img src="/avatar-1.jpg" className={styles.avatar} alt="u1" />
            <img src="/avatar-2.jpg" className={styles.avatar} alt="u2" />
            <img src="/avatar-3.jpg" className={styles.avatar} alt="u3" />
            <div className={`${styles.avatar} ${styles.countBadge}`}>S</div>
          </div>
          <h1 className={styles.title}>
            Connect Today & Join <br />
            the <span className={styles.brandText}>KeenThemes Network</span>
          </h1>
          <p className={styles.description}>
            Enhance your projects with premium themes and <br />
            templates. Join the KeenThemes community today <br />
            for top-quality designs and resources.
          </p>
        </div>

        <div className={styles.rightContent}>
          <div className={styles.loginCard}>
            <div className={styles.loginHeader}>
              <h3 className={styles.loginTitle}>Sign In</h3>
              <p className={styles.loginSub}>Need an account? <a href="#">Sign up</a></p>
            </div>
            <div className={styles.authButtons}>
              <button className={styles.socialBtn}>
                <img src="/google-icon.svg" alt="" /> Use Google
              </button>
              <button className={styles.socialBtn}>
                <img src="/apple-icon.svg" alt="" /> Use Apple
              </button>
            </div>
            <div className={styles.divider}><span>OR</span></div>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input type="email" placeholder="email@email.com" />
            </div>
            <div className={styles.formGroup}>
              <div className={styles.labelRow}>
                <label>Password</label>
                <a href="#" className={styles.forgotPass}>Forgot Password?</a>
              </div>
              <input type="password" placeholder="Enter Password" />
            </div>
            <div className={styles.rememberMe}>
              <input type="checkbox" id="rem" />
              <label htmlFor="rem">Remember me</label>
            </div>
            <button className={styles.signInBtn}>Sign In</button>
          </div>
        </div>
      </div>
      <div className={styles.bannerFooter}>
        <button className={styles.getStartedLink}>Get Started</button>
      </div>
    </div>
  );
}
