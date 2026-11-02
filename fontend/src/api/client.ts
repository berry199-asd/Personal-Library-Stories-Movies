// Cấu hình lớp gọi API chuẩn kết nối tới Backend Spring Boot (http://localhost:8080/api)

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export interface ApiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data: T;
  timestamp: string;
}

export interface PageResponse<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export type RoleType = 'USER' | 'ADMIN';

const TOKEN_KEY = 'personal_library_access_token';
const ROLE_KEY = 'personal_library_user_role';

export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token: string | null): void {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export function getSavedRole(): RoleType {
  const saved = localStorage.getItem(ROLE_KEY);
  return saved === 'ADMIN' ? 'ADMIN' : 'USER';
}

export function setSavedRole(role: RoleType): void {
  localStorage.setItem(ROLE_KEY, role);
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const payload = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !payload.success) {
    throw new Error(payload.message || `Lỗi kết nối máy chủ (${response.status})`);
  }

  return payload;
}

// Bước 3: Auth & User Profile APIs
export const authApi = {
  login: (usernameOrEmail: string, password: string) =>
    apiRequest<{ accessToken: string; user: { id: number; username: string; role: RoleType } }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ usernameOrEmail, password }),
    }),
  register: (data: { username: string; email: string; password: string; displayName: string }) =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Bước 4: Content, Genre & Chapter APIs (Bao gồm quản lý bài đăng của chính User & Admin)
export const contentApi = {
  getGenres: () => apiRequest('/genres'),
  searchContents: (params: URLSearchParams) => apiRequest(`/contents?${params.toString()}`),
  getMyPublishedContents: (page = 0, size = 20) =>
    apiRequest(`/contents/my-published?page=${page}&size=${size}`),
  getDetail: (id: number) => apiRequest(`/contents/${id}`),
  publishContent: (payload: unknown) =>
    apiRequest('/contents', { method: 'POST', body: JSON.stringify(payload) }),
  updateOwnOrManagedContent: (id: number, payload: unknown) =>
    apiRequest(`/contents/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteOwnOrManagedContent: (id: number) =>
    apiRequest(`/contents/${id}`, { method: 'DELETE' }),
  addChapterToContent: (contentId: number, payload: unknown) =>
    apiRequest(`/contents/${contentId}/chapters`, { method: 'POST', body: JSON.stringify(payload) }),
  updateContentChapter: (contentId: number, chapterId: number, payload: unknown) =>
    apiRequest(`/contents/${contentId}/chapters/${chapterId}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteContentChapter: (contentId: number, chapterId: number) =>
    apiRequest(`/contents/${contentId}/chapters/${chapterId}`, { method: 'DELETE' }),
};

// Bước 5: Personal Library, Custom Categories & Public Shared Library APIs
export const libraryApi = {
  getMyLibrary: (params: URLSearchParams) => apiRequest(`/library?${params.toString()}`),
  getPublicLibrary: (username: string) => apiRequest(`/library/public/${encodeURIComponent(username)}`),
  upsertEntry: (payload: unknown) =>
    apiRequest('/library', { method: 'POST', body: JSON.stringify(payload) }),
  copySharedEntry: (sourceLibraryEntryId: number) =>
    apiRequest(`/library/copy/${sourceLibraryEntryId}`, { method: 'POST' }),
  removeEntry: (contentId: number) =>
    apiRequest(`/library/${contentId}`, { method: 'DELETE' }),
  toggleChapterProgress: (chapterId: number) =>
    apiRequest(`/library/chapters/${chapterId}/toggle-progress`, { method: 'POST' }),
  getCategories: () => apiRequest('/categories'),
  createCategory: (name: string, description: string) =>
    apiRequest('/categories', { method: 'POST', body: JSON.stringify({ name, description }) }),
};

// Bước 6: Reviews (Spoiler), Reports, Chat & Notifications APIs
export const communityApi = {
  getReviews: (contentId: number, chapterId?: number) =>
    apiRequest(`/contents/${contentId}/reviews${chapterId ? `?chapterId=${chapterId}` : ''}`),
  postReview: (contentId: number, payload: { rating?: number; commentText: string; isSpoiler?: boolean; chapterId?: number; parentId?: number }) =>
    apiRequest(`/contents/${contentId}/reviews`, { method: 'POST', body: JSON.stringify(payload) }),
  submitReport: (payload: { targetType: 'CONTENT' | 'COMMENT' | 'USER'; targetId: number; reason: string; details?: string }) =>
    apiRequest('/reports', { method: 'POST', body: JSON.stringify(payload) }),
  getConversations: () => apiRequest('/conversations'),
  sendMessage: (conversationId: number, payload: { messageType?: string; messageText?: string; sharedContentId?: number }) =>
    apiRequest(`/conversations/${conversationId}/messages`, { method: 'POST', body: JSON.stringify(payload) }),
  getNotifications: () => apiRequest('/notifications'),
  markNotificationRead: (id: number) => apiRequest(`/notifications/${id}/read`, { method: 'PATCH' }),
  markAllNotificationsRead: () => apiRequest('/notifications/read-all', { method: 'PATCH' }),
};

// Phân quyền Quản trị viên (Chỉ ROLE_ADMIN mới có quyền truy cập /api/admin/**)
export const adminApi = {
  listUsers: (keyword = '', page = 0) => apiRequest(`/admin/users?keyword=${encodeURIComponent(keyword)}&page=${page}`),
  updateUserStatus: (userId: number, status: 'ACTIVE' | 'LOCKED' | 'BANNED') =>
    apiRequest(`/admin/users/${userId}/status?status=${status}`, { method: 'PATCH' }),
  updateUserRole: (userId: number, role: RoleType) =>
    apiRequest(`/admin/users/${userId}/role?role=${role}`, { method: 'PATCH' }),
  listContents: (page = 0) => apiRequest(`/admin/contents?page=${page}`),
  createContent: (payload: unknown) =>
    apiRequest('/admin/contents', { method: 'POST', body: JSON.stringify(payload) }),
  updateContent: (id: number, payload: unknown) =>
    apiRequest(`/admin/contents/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteContent: (id: number) =>
    apiRequest(`/admin/contents/${id}`, { method: 'DELETE' }),
  listReports: (status?: string) =>
    apiRequest(`/admin/reports${status ? `?status=${status}` : ''}`),
  resolveReport: (reportId: number, status: 'RESOLVED' | 'REJECTED', adminNote = '') =>
    apiRequest(`/admin/reports/${reportId}?status=${status}&adminNote=${encodeURIComponent(adminNote)}`, { method: 'PATCH' }),
};
