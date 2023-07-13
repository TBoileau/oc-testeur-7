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

export function createEditionMode() {
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

  div.appendChild(p);
  div.appendChild(button);

  return div;
}

export function createEditButton({onClick}) {
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

export function createModal({categories, onAdd}) {
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

  const list = createModalListWorks({
    onAdd: () => {
      list.classList.toggle('show');
      add.classList.toggle('show');
    }
  });

  const add = createModalAddWork({
    categories,
    onSubmit: onAdd,
    onBack: () => {
      list.classList.toggle('show');
      add.classList.toggle('show');
    }
  });

  const closeModal = () => {
    modal.classList.remove('show');
    list.classList.add('show');
    add.classList.remove('show');
  };

  modal.addEventListener('click', closeModal);

  modalClose.addEventListener('click', closeModal);

  modalContent.addEventListener('click', (e) => e.stopPropagation());

  modalContent.appendChild(list);

  modalContent.appendChild(add);

  return modal;
}

function createModalAddWork({categories, onBack, onSubmit}) {
  const add = document.createElement('section');
  add.classList.add('add-work');

  const backToList = document.createElement('a');
  backToList.classList.add('back-to-list');
  backToList.href = '#';
  backToList.ariaLabel = 'retour à la liste';
  backToList.textContent = '←';

  add.appendChild(backToList);

  const addTitle = document.createElement('h2');
  addTitle.textContent = 'Ajout photo';

  add.appendChild(addTitle);

  const form = document.createElement('form');
  form.classList.add('form');

  add.appendChild(form);

  const upload = document.createElement('div');
  upload.classList.add('form-control', 'control-upload');

  form.appendChild(upload);

  const uploadIcon = document.createElement('img');
  uploadIcon.src = './assets/icons/image.svg';
  uploadIcon.alt = 'Ajouter photo';

  upload.appendChild(uploadIcon);

  const uploadLabel = document.createElement('label');
  uploadLabel.classList.add('upload-label');
  uploadLabel.htmlFor = 'upload';
  uploadLabel.textContent = '+ Ajouter photo';

  upload.appendChild(uploadLabel);

  const uploadInput = document.createElement('input');
  uploadInput.type = 'file';
  uploadInput.id = 'upload';
  uploadInput.name = 'upload';
  uploadInput.accept = 'image/*';

  upload.appendChild(uploadInput);

  const uploadHelp = document.createElement('span');
  uploadHelp.classList.add('form-help');
  uploadHelp.textContent = 'jpg, png : 4mo max';

  upload.appendChild(uploadHelp);

  const title = document.createElement('div');
  title.classList.add('form-control');

  form.appendChild(title);

  const titleLabel = document.createElement('label');
  titleLabel.htmlFor = 'title';
  titleLabel.textContent = 'Titre';

  title.appendChild(titleLabel);

  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.id = 'title';
  titleInput.name = 'title';
  titleInput.required = true;

  title.appendChild(titleInput);

  const category = document.createElement('div');
  category.classList.add('form-control');

  const categoryLabel = document.createElement('label');
  categoryLabel.htmlFor = 'category';
  categoryLabel.textContent = 'Catégorie';

  category.appendChild(categoryLabel);

  const categorySelect = document.createElement('select');
  categorySelect.id = 'category';
  categorySelect.name = 'category';
  categorySelect.required = true;

  category.appendChild(categorySelect);

  categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category.id;
    option.textContent = category.name;
    categorySelect.appendChild(option);
  });

  form.appendChild(category);

  const hr = document.createElement('hr');

  form.appendChild(hr);

  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.textContent = 'Valider';
  submit.classList.add('form-submit');
  submit.disabled = true;

  form.appendChild(submit);

  const deletePreview = () => {
    if (upload.querySelector('.preview') !== null) {
      upload.querySelector('.preview').remove();
    }
  };

  const resetForm = () => {
    deletePreview();
    uploadInput.value = '';
    titleInput.value = '';
    submit.disabled = true;
    removeError({control: title});
    removeError({control: upload});
  };

  const removeError = ({control}) => {
    control.classList.remove('is-invalid');
    if (control.querySelector('.form-error') !== null) {
      control.querySelector('.form-error').remove();
    }
  }

  const addError = ({control, message, append}) => {
    append = append === undefined ? true : append;

    control.classList.add('is-invalid');

    if (control.querySelector('.form-error') === null) {
      const error = document.createElement('span');
      error.classList.add('form-error');
      error.textContent = message;

      if (append) {
        control.append(error);
      } else {
        control.prepend(error);
      }
    }
  };

  const validateForm = () => {
    let valid = true;

    valid = uploadValidate() && valid;

    valid = titleValidate() && valid;

    if (valid) {
      submit.disabled = false;
    }

    return valid;
  };

  const titleValidate = () => {
    return titleInput.value.trim() !== '';
  };

  const uploadValidate = () => {
    return uploadInput.files.length === 1;
  };

  uploadInput.addEventListener('change', () => {
    if (!uploadValidate()) {
      addError({
        control: upload,
        message: 'Veuillez ajouter une photo'
      });
    } else {
      removeError({control: upload});
    }

    validateForm();
  });

  titleInput.addEventListener('change', () => {
    if (!titleValidate()) {
      addError({
        control: title,
        message: 'Veuillez ajouter un titre'
      });
    } else {
      removeError({control: title});
    }

    validateForm();
  });

  backToList.addEventListener('click', onBack);

  backToList.addEventListener('click', resetForm);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return false;
    }

    try {
      onSubmit({
        title: titleInput.value,
        category: categorySelect.value,
        image: uploadInput.files[0]
      });
      resetForm();
    } catch (error) {
      addError({
        control: form,
        message: error.message,
        valid: false
      });
    }

    return false;
  });

  uploadInput.addEventListener('change', () => {
    if (uploadInput.files && uploadInput.files[0]) {
      var reader = new FileReader();

      reader.onload = (e) => {
        deletePreview();

        const preview = document.createElement('img');
        preview.classList.add('preview');
        preview.src = e.target.result;

        upload.appendChild(preview);
      }

      reader.readAsDataURL(uploadInput.files[0]);
    }
  });

  return add;
}

function createModalListWorks({onAdd}) {
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

  toAdd.addEventListener('click', onAdd);

  return list;
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