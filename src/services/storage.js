export const storage = {
  get(key, defaultValue = null) {
    try {
      const v = localStorage.getItem(key);
      return v !== null ? v : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {}
  },
};

