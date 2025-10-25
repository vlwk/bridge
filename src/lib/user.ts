export function getUserId(): number {
  if (typeof window === "undefined") return 0;

  const key = "bridge:tabId";
  const existing = sessionStorage.getItem(key);
  if (existing) return Number(existing);

  // simple random 9-digit number
  const id = Math.floor(100000000 + Math.random() * 900000000);
  sessionStorage.setItem(key, String(id));
  return id;
}
