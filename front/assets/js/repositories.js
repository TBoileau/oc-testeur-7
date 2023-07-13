import {API_URL} from "./config.js";
import {Category, Work} from "./models.js";
import {getToken, UnauthorizedError} from "./security.js";

/**
 * @returns {Promise<Work[]>}
 */
export async function getWorks() {
  const works = await (await fetch(`${API_URL}/works`)).json();
  return works.map(work => new Work(work));
}

/**
 * @param id {number}
 * @returns {Promise<*>}
 */
export async function removeWork({id}) {
  return await fetch(
    `${API_URL}/works/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken().token}`
      }
    }
  ).then((res) => {
    if (res.ok) {
      return;
    }
    if (res.status === 401) {
      throw new UnauthorizedError('Vous devez être connecté pour effectuer cette action.');
    }

    throw new Error('Une erreur est survenue');
  });
}

/**
 *
 * @param work {{title: string, image: File, category: number}}
 * @returns {Promise<*>}
 */
export async function addWork(work) {
  const formData = new FormData();

  formData.append('title', work.title);
  formData.append('image', work.image);
  formData.append('category', work.category);

  return await fetch(
    `${API_URL}/works`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken().token}`
      },
      body: formData
    }
  ).then((res) => {
    if (res.ok) {
      return;
    }
    if (res.status === 401) {
      throw new UnauthorizedError('Vous devez être connecté pour effectuer cette action.');
    }

    throw new Error('Une erreur est survenue');
  });
}

/**
 * @returns {Promise<Category[]>}
 */
export async function getCategories() {
  const categories = await (await fetch(`${API_URL}/categories`)).json();
  return categories.map(category => new Category(category));
}

/**
 * @param email {string}
 * @param password {string}
 * @returns {Promise<Response<{userId: number, token: string}>>}
 */
export function login({email, password}) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  };

  return fetch(`${API_URL}/users/login`, options)
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      if (res.status === 401) {
        throw new Error('Identifiants invalides.');
      }

      throw new Error('Une erreur est survenue.');
    });
}