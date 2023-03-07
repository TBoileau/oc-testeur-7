export function createWork(work) {
  const figure = document.createElement('figure');

  const image = document.createElement('img');
  image.src = work.imageUrl;
  image.alt = work.title;

  const figcaption = document.createElement('figcaption');
  figcaption.textContent = work.title;

  figure.appendChild(image);
  figure.appendChild(figcaption);

  return figure;
}

export function createCategory(category) {
  const button = document.createElement('button');
  button.classList.add('category');
  button.textContent = category.name;
  return button;
}

export function createLogin() {
  const li = document.createElement('li');

  const link = document.createElement('a');
  link.href = './login.html';
  link.textContent = 'login';

  li.appendChild(link);

  return li;
}

export function createLogout({onClick}) {
  const li = document.createElement('li');

  const link = document.createElement('a');
  link.href = '#';
  link.textContent = 'logout';
  link.addEventListener('click', onClick);

  li.appendChild(link);

  return li;
}
