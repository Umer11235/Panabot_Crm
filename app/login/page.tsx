"use client";

import { FormEvent, useState } from "react";
import styles from "./auth.module.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { loginUser } from "@/utils/auth/storage";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = loginUser({ username, password });
    setStatusMessage(result.message);

    if (result.success) {
      router.replace("/dashboard");
    }
  };

  return (
    <section className={styles.authPage}>
      <div className={styles.shell}>
        <aside className={styles.introPanel}>
          <h2 className={styles.introTitle}>Panabot CRM</h2>
          <p className={styles.introText}>
            Keep your teams, projects, and operations synced from one dashboard with your current Material theme.
          </p>
          <div className={styles.chipRow}>
            <span className={styles.chip}>Departments</span>
            <span className={styles.chip}>Attendance</span>
            <span className={styles.chip}>Holidays</span>
          </div>
        </aside>

        <div className={styles.card}>
          <span className={styles.brand}>
            <span className={styles.brandDot} /> Login
          </span>

          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Sign in with your assigned account credentials.</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Enter username"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="password">Password</label>
              <div className={styles.passwordField}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword((prevState) => !prevState)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className={styles.primaryBtn}>
              Login
            </button>
          </form>

          <p className={styles.helperText}>Demo login: umer1 / 123456</p>
          {statusMessage && <p className={styles.statusMessage}>{statusMessage}</p>}
        </div>
      </div>
    </section>
  );
}
