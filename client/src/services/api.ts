import type { User, Order, MenuItem } from '../types';

function resolveApiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_URL || '/api';
  if (raw === '/api' || raw.endsWith('/api')) {
    return raw.replace(/\/$/, '') || '/api';
  }
  return `${raw.replace(/\/$/, '')}/api`;
}

const baseUrl = resolveApiBaseUrl();

async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      typeof data.message === 'string' ? data.message : 'Request failed'
    );
  }

  return data as T;
}

export async function register(
  name: string,
  email: string,
  password: string
): Promise<User> {
  return apiRequest<User>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
}

export async function login(email: string, password: string): Promise<User> {
  return apiRequest<User>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function logout(): Promise<void> {
  await apiRequest('/auth/logout', { method: 'POST' });
}

export async function getMe(): Promise<User> {
  return apiRequest<User>('/auth/me');
}

export async function getMenu(): Promise<MenuItem[]> {
  return apiRequest<MenuItem[]>('/menu');
}

export async function getOrders(): Promise<Order[]> {
  return apiRequest<Order[]>('/orders');
}

export async function createOrder(input: {
  itemName: string;
  price: number;
  image: string;
  quantity: number;
}): Promise<Order> {
  return apiRequest<Order>('/orders', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function deleteOrder(id: string): Promise<void> {
  await apiRequest(`/orders/${id}`, { method: 'DELETE' });
}

export async function clearOrders(): Promise<void> {
  await apiRequest('/orders', { method: 'DELETE' });
}
