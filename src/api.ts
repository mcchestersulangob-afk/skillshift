export const SESSION_KEY = 'skillshift.session'

export function saveApiSession(user: unknown) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user))
}

export function clearApiSession() {
  localStorage.removeItem(SESSION_KEY)
  void fetch('/api/auth/logout.php', { method: 'POST', credentials: 'same-origin' }).catch(() => {})
}

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(path, {
    ...init,
    credentials: 'same-origin',
    headers: {
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...init.headers,
    },
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(typeof data.error === 'string' ? data.error : 'The request could not be completed.')
  return data as T
}

