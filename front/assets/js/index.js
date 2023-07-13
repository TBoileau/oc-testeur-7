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
import {addWork, getCategories, getWorks, removeWork} from "./repositories.js";
import {Category} from "./models.js";
import {clear, isLogged, UnauthorizedError} from "./security.js";

const header = document.querySelector('header');
const nav = header.querySelector('nav ul');
const myProjectsTitle = document.querySelector('#portfolio h2');

let works = await getWorks();

const categories = await getCategories();

let categorySelected = {id: null};

if (isLogged()) {
  const onClick = () => {
    clear();
    window.location.reload();
  };

  nav.insertBefore(createLogout({onClick}), nav.querySelector('li:last-child'));

  document.body.insertBefore(createEditionMode(), header);

  const modal = createModal({
    categories,
    /**
     * @param work {Work}
     */
    onAdd: async (work) => {
      try {
        await addWork(work);

        works = await getWorks();

        renderWorks();

        modal.classList.remove('show');
      } catch (e) {
        if (e instanceof UnauthorizedError) {
          clear();
          window.location.reload();
        }
      }
    }
  });

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

function renderWorks() {
  const worksContainer = document.querySelector('.gallery');
  worksContainer.innerHTML = '';

  works
    .filter(work => categorySelected.id === null || work.category.id === categorySelected.id)
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

              works = await getWorks();

              renderWorks();
            } catch (e) {
              if (e instanceof UnauthorizedError) {
                clear();
                window.location.reload();
              }
            }
          }
        })
      );
    });
  }
}

[new Category({id: null, name: 'Tous'}), ...categories].forEach(category => {
  const categoryButton = createCategory(category);

  if (category.id === null) {
    categoryButton.classList.add('active');
  }

  categoryButton.addEventListener('click', () => {
    if (document.querySelector('.category.active') !== null) {
      document.querySelector('.category.active').classList.toggle('active');
    }
    categorySelected = category;
    categoryButton.classList.toggle('active');
    renderWorks();
  });

  document.querySelector('.categories').appendChild(categoryButton);
});

renderWorks();
