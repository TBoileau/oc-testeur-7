import {createCategory, createWork} from "./factories.js";
import {getCategories, getWorks} from "./repositories.js";
import {Category} from "./models.js";

function renderWorks(works, category) {

  const worksContainer = document.querySelector('.gallery');
  worksContainer.innerHTML = '';
  works
    .filter(work => category.id === null || work.category.id === category.id)
    .forEach(work => {
      worksContainer.appendChild(createWork(work));
    });
}

const works = await getWorks();

const categories = [new Category({id: null, name: 'Tous'}), ...await getCategories()];

categories.forEach(category => {
  const categoryButton = createCategory(category);

  if (category.id === null) {
    categoryButton.classList.add('active');
  }

  categoryButton.addEventListener('click', () => {
    if (document.querySelector('.category.active') !== null) {
      document.querySelector('.category.active').classList.toggle('active');
    }
    categoryButton.classList.toggle('active');
    renderWorks(works, category);
  });

  document.querySelector('.categories').appendChild(categoryButton);
});

renderWorks(works, categories[0]);
