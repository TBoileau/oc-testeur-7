import {API_URL} from "./config.js";
import {Work} from "./models.js";

export async function getWorks() {
  const works = await (await fetch(`${API_URL}/works`)).json();
  return works.map(work => new Work(work));
}
