const configuredBackendUrl = process.env.REACT_APP_BACKEND_URL?.trim();
const API_BASE_URL = configuredBackendUrl || 'https://leaderboard-system-vsj9.onrender.com';

export default API_BASE_URL;
