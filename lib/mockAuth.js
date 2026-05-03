export const MOCK_DEMO_HINT =
  "Demo: admin@demo.local / admin123 (admin) · user@demo.local / user123 (user)";

const ACCOUNTS = [
  {
    email: "admin@demo.local",
    password: "admin123",
    role: "admin",
    displayName: "Demo Admin",
  },
  {
    email: "user@demo.local",
    password: "user123",
    role: "user",
    displayName: "Demo User",
  },
];

export function matchMockAccount(email, password) {
  const e = String(email).trim().toLowerCase();
  const acc = ACCOUNTS.find((a) => a.email === e && a.password === password);
  if (!acc) return null;
  return {
    role: acc.role,
    user: {
      email: acc.email,
      uid: `mock_${acc.role}`,
      displayName: acc.displayName,
    },
  };
}
