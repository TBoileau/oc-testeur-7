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

export function createEditionMode({ onClick }) {
  const div = document.createElement('div');
  div.classList.add('edition-mode');

  const p = document.createElement('p');

  const icon = document.createElement('img');
  icon.src = './assets/icons/edition-mode.png';
  p.appendChild(icon);

  const span = document.createElement('span');
  span.textContent = 'Mode édition';
  p.appendChild(span);

  const button = document.createElement('button');
  button.textContent = 'publier les changements';
  button.addEventListener('click', onClick);

  div.appendChild(p);
  div.appendChild(button);

  return div;
}

export function createEditButton({ onClick }) {
  const a = document.createElement('a');
  a.classList.add('edit-projects');
  a.ariaLabel = 'modifier';
  a.href = '#';
  a.addEventListener('click', onClick);

  const icon = document.createElement('img');
  icon.src = './assets/icons/edition-mode-black.png';
  a.appendChild(icon);

  const span = document.createElement('span');
  span.textContent = 'modifier';
  a.appendChild(span);

  return a;
}
