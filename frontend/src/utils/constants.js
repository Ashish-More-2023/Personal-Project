export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

export const TASK_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
};

export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

export const WORKSPACE_COLORS = [
  '#FF6B6B', 
  '#4ECDC4', 
  '#45B7D1', 
  '#FFA07A', 
  '#98D8C8', 
  '#F7DC6F',
  '#BB8FCE',
  '#85C1E2', 
  '#F8B739', 
  '#52B788', 
];

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  WORKSPACES: '/workspaces',
  WORKSPACE_DETAIL: '/workspace/:id',
  TASKS: '/tasks',
  TIMELINES: '/timelines',
  EVENTS: '/events',
  NOTES: '/notes',
};

export const getRandomColor = (colors = WORKSPACE_COLORS) => {
  return colors[Math.floor(Math.random() * colors.length)];
};
