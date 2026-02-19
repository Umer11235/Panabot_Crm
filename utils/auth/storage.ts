import { AuthResult, AuthUser, LoginPayload } from "@/utils/types/auth.types";

const USERS_STORAGE_KEY = "panabot-crm-users";
const SESSION_STORAGE_KEY = "panabot-crm-session-user";

const DUMMY_USER: AuthUser = {
  id: "seed-user-umer1",
  username: "umer1",
  password: "123456",
  createdAt: new Date("2026-01-01T00:00:00.000Z").toISOString(),
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function parseUsers(rawValue: string | null): AuthUser[] {
  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue) as AuthUser[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function normalizeUsername(username: string): string {
  return username.trim().toLowerCase();
}

export function getStoredUsers(): AuthUser[] {
  if (!isBrowser()) {
    return [];
  }

  return parseUsers(window.localStorage.getItem(USERS_STORAGE_KEY));
}

export function ensureDummyUser(): void {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([DUMMY_USER]));

  const currentSession = window.localStorage.getItem(SESSION_STORAGE_KEY);
  if (currentSession && normalizeUsername(currentSession) !== normalizeUsername(DUMMY_USER.username)) {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
  }
}

export function getCurrentUser(): AuthUser | null {
  if (!isBrowser()) {
    return null;
  }

  const sessionUsername = window.localStorage.getItem(SESSION_STORAGE_KEY);
  if (!sessionUsername) {
    return null;
  }

  const users = getStoredUsers();
  const matchedUser = users.find((user) => normalizeUsername(user.username) === normalizeUsername(sessionUsername));

  if (!matchedUser) {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
    return null;
  }

  return matchedUser;
}

function setCurrentUser(user: AuthUser): void {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(SESSION_STORAGE_KEY, user.username);
}

export function logoutUser(): void {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(SESSION_STORAGE_KEY);
}

export function loginUser(payload: LoginPayload): AuthResult {
  if (!isBrowser()) {
    return { success: false, message: "Login is only available in browser." };
  }

  ensureDummyUser();

  const username = normalizeUsername(payload.username);
  const password = payload.password.trim();

  if (!username || !password) {
    return { success: false, message: "Username and password are required." };
  }

  if (username !== normalizeUsername(DUMMY_USER.username) || password !== DUMMY_USER.password) {
    return { success: false, message: "Invalid username or password." };
  }

  setCurrentUser(DUMMY_USER);
  return { success: true, message: "Login successful." };
}
