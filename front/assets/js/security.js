/**
 * @param token {{userId: number, token: string}}
 */
export function save(token) {
  localStorage.setItem('token', JSON.stringify(token));
}

export function clear() {
  localStorage.removeItem('token');
}

export function isLogged() {
  return localStorage.getItem('token') !== null;
}

export function getToken() {
  return isLogged() ? JSON.parse(localStorage.getItem('token')) : null;
}

export class UnauthorizedError extends Error {
  /**
   * @param message {string}
   */
  constructor(message) {
    super(message);
    this.name = 'Unauthorized';
  }
}
