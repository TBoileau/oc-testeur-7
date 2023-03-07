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
