import {API_URL} from "./config.js";
import {Category, Work} from "./models.js";

export async function getWorks() {
  const works = await (await fetch(`${API_URL}/works`)).json();
  return works.map(work => new Work(work));
}

export async function getCategories() {
  const categories = await (await fetch(`${API_URL}/categories`)).json();
  return categories.map(category => new Category(category));
}
