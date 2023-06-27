import {
  createCategory,
  createEditButton,
  createEditionMode,
  createLogin,
  createLogout,
  createModal,
  createModalWork,
  createWork
} from "./factories.js";
import {getCategories, getWorks, removeWork} from "./repositories.js";
import {Category} from "./models.js";
import {clear, isLogged, UnauthorizedError} from "./security.js";

const header = document.querySelector('header');
const nav = header.querySelector('nav ul');
const myProjectsTitle = document.querySelector('#portfolio h2');

if (isLogged()) {
  const onClick = () => {
    clear();
    window.location.reload();
  };

  nav.insertBefore(createLogout({onClick}), nav.querySelector('li:last-child'));

  document.body.insertBefore(createEditionMode({
    onClick: () => {
    }
  }), header);

  const modal = createModal();

  document.body.appendChild(modal);

  myProjectsTitle.appendChild(
    createEditButton({
      onClick: () => {
        modal.classList.add('show');
      }
    })
  );
} else {
  nav.insertBefore(createLogin(), nav.querySelector('li:last-child'));
}

function renderWorks(works, category) {
  const worksContainer = document.querySelector('.gallery');
  worksContainer.innerHTML = '';
  works
    .filter(work => category.id === null || work.category.id === category.id)
    .forEach(work => {
      worksContainer.appendChild(createWork(work));
    });

  if (isLogged()) {
    const listWorks = document.querySelector('.list-works .works');
    listWorks.innerHTML = '';
    works.forEach(work => {
      listWorks.appendChild(
        createModalWork({
          work,
          onClick: async () => {
            try {
              await removeWork(work);

              const works = await getWorks();

              renderWorks(works, category);
            } catch (e) {
              console.log(e instanceof UnauthorizedError)
              if (e instanceof UnauthorizedError) {
                clear();
                window.location.reload();
              }

              console.error(e);
            }
          }
        })
      );
    });
  }
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
