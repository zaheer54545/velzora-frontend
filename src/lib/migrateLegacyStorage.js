/**
 * One-time carry-over of browser data saved under the previous brand's keys
 * (carts, wishlist lists/settings, search history, pending login redirect), so
 * returning visitors don't lose anything after the rebrand.
 */
const LEGACY_PREFIX_MAP = [
  ["nexota:", "velzora:"],
  ["nexota_", "velzora_"],
];

const MIGRATION_FLAG = "velzora:storage-migrated";

export function migrateLegacyStorage() {
  if (typeof window === "undefined") return;

  try {
    if (localStorage.getItem(MIGRATION_FLAG)) return;

    const legacyKeys = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      if (key && LEGACY_PREFIX_MAP.some(([from]) => key.startsWith(from))) {
        legacyKeys.push(key);
      }
    }

    legacyKeys.forEach((key) => {
      const [from, to] = LEGACY_PREFIX_MAP.find(([prefix]) =>
        key.startsWith(prefix),
      );
      const nextKey = `${to}${key.slice(from.length)}`;

      if (localStorage.getItem(nextKey) === null) {
        localStorage.setItem(nextKey, localStorage.getItem(key));
      }
      localStorage.removeItem(key);
    });

    localStorage.setItem(MIGRATION_FLAG, "1");
  } catch {
    // Storage unavailable (private mode / blocked) - nothing to migrate.
  }
}
