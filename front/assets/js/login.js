import {login} from "./repositories.js";

function check(input, constraint, message) {
  const inputError = input.closest('.form-group').querySelector('.input-error');

  if (!constraint(input.value)) {
    input.classList.add('is-invalid');
    inputError.textContent = message;
    return false;
  }

  input.classList.remove('is-invalid');
  inputError.textContent = '';
  return true;
}

const form = document.querySelector('#login-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.querySelector('#email');
  const password = document.querySelector('#password');

  if (
    !check(email, (value) => value.trim() !== '', 'Veuillez saisir une adresse email.')
    || !check(password, (value) => value.trim() !== '', 'Veuillez saisir un mot de passe.')
  ) {
    return;
  }

  login({email: email.value, password: password.value})
    .then(token => {
      let formError = form.querySelector('.form-error');
      if (formError !== null) {
        formError.remove();
      }

      localStorage.setItem('token', JSON.stringify(token));
      window.location.href = './';
    })
    .catch(error => {
      let formError = form.querySelector('.form-error');

      if (formError === null) {
        formError = document.createElement('div');
        formError.classList.add('form-error');
        form.insertBefore(formError, form.firstChild);
      }

      formError.textContent = error.message;
    });
});
