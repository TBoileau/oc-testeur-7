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
