const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchNotifications = async () => {
  const response = await fetch(`${API_BASE_URL}/api/notifications`);
  if (!response.ok) throw new Error('Failed to fetch notifications');
  return response.json();
};

export const markAsRead = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/api/notifications/${id}/read`, {
    method: 'PATCH',
  });
  if (!response.ok) throw new Error('Failed to mark as read');
  return response.json();
};

export const toggleStar = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/api/notifications/${id}/star`, {
    method: 'PATCH',
  });
  if (!response.ok) throw new Error('Failed to toggle star');
  return response.json();
};

export const deleteNotification = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/api/notifications/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete notification');
  return response.json();
};