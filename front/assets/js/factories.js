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
  icon.title = 'mode édition';
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
  icon.title = 'modifier';
  a.appendChild(icon);

  const span = document.createElement('span');
  span.textContent = 'modifier';
  a.appendChild(span);

  return a;
}

export function createModal() {
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const modalClose = document.createElement('a');
  modalClose.classList.add('modal-close');
  modalClose.href = '#';
  modalClose.ariaLabel = 'fermer';
  modalClose.textContent = '×';

  modal.appendChild(modalContent);
  modalContent.appendChild(modalClose);

  const closeModal = () => {
    modal.classList.remove('show');
    list.classList.add('show');
    add.classList.remove('show');
  };

  modal.addEventListener('click', closeModal);

  modalClose.addEventListener('click', closeModal);

  modalContent.addEventListener('click', (e) => e.stopPropagation());

  const list = document.createElement('section');
  list.classList.add('list-works', 'show');

  const listTitle = document.createElement('h2');
  listTitle.textContent = 'Galerie photo';

  list.appendChild(listTitle);

  const works = document.createElement('div');
  works.classList.add('works');

  list.appendChild(works);

  const hr = document.createElement('hr');

  list.appendChild(hr);

  const toAdd = document.createElement('button');
  toAdd.classList.add('to-add');
  toAdd.href = '#';
  toAdd.ariaLabel = 'retour à la liste';
  toAdd.textContent = 'Ajouter une photo';

  list.appendChild(toAdd);

  const removeGallery = document.createElement('a');
  removeGallery.classList.add('remove-gallery');
  removeGallery.href = '#';
  removeGallery.textContent = 'Supprimer la galerie';

  list.appendChild(removeGallery);

  modalContent.appendChild(list);

  const add = document.createElement('section');
  add.classList.add('add-work');

  const backToList = document.createElement('a');
  backToList.classList.add('back-to-list');
  backToList.href = '#';
  backToList.ariaLabel = 'retour à la liste';
  backToList.textContent = '←';

  add.appendChild(backToList);

  modalContent.appendChild(add);

  toAdd.addEventListener('click', () => {
    list.classList.toggle('show');
    add.classList.toggle('show');
  });

  backToList.addEventListener('click', () => {
    list.classList.toggle('show');
    add.classList.toggle('show');
  });

  return modal;
}

export function createModalWork({work, onClick}) {
  const figure = document.createElement('figure');
  figure.classList.add('work');

  const image = document.createElement('img');
  image.src = work.imageUrl;
  image.alt = work.title;

  const figcaption = document.createElement('figcaption');
  figcaption.textContent = 'éditer';

  figure.appendChild(image);
  figure.appendChild(figcaption);

  const remove = document.createElement('a');
  remove.classList.add('remove-work');
  remove.href = '#';
  remove.ariaLabel = 'supprimer';

  const icon = document.createElement('img');
  icon.src = './assets/icons/trash.svg';
  icon.alt = 'supprimer';
  remove.appendChild(icon);

  remove.addEventListener('click', onClick);

  figure.appendChild(remove);

  return figure;
}