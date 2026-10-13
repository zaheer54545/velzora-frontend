// Single source of truth for the backend URL (local backend runs on port 3001).
// Override with NEXT_PUBLIC_API_URL in .env.local when the backend lives elsewhere.
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002/api";

export default API_BASE_URL;
