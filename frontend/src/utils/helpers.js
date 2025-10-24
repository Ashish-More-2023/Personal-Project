import { format, formatDistanceToNow, parseISO } from 'date-fns';

export const formatDate = (date, dateFormat = 'MMM dd, yyyy') => {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, dateFormat);
};

export const formatDateTime = (date) => {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, 'MMM dd, yyyy hh:mm a');
};

export const formatRelativeTime = (date) => {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(parsedDate, { addSuffix: true });
};

export const getPriorityColor = (priority) => {
  const colors = {
    low: 'bg-green-100 text-green-800 border-green-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    high: 'bg-red-100 text-red-800 border-red-300',
  };
  return colors[priority] || colors.medium;
};

export const getStatusColor = (status) => {
  const colors = {
    pending: 'bg-gray-100 text-gray-800 border-gray-300',
    in_progress: 'bg-blue-100 text-blue-800 border-blue-300',
    completed: 'bg-green-100 text-green-800 border-green-300',
  };
  return colors[status] || colors.pending;
};

export const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  const parsedDate = typeof dueDate === 'string' ? parseISO(dueDate) : dueDate;
  return parsedDate < new Date();
};

export const getRandomColor = (colors) => {
  return colors[Math.floor(Math.random() * colors.length)];
};

export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const checkTimelineClash = (timeline1, timeline2) => {
  const start1 = new Date(timeline1.startDate);
  const end1 = new Date(timeline1.endDate);
  const start2 = new Date(timeline2.startDate);
  const end2 = new Date(timeline2.endDate);

  return start1 <= end2 && start2 <= end1;
};
