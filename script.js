const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('password2');

const showError = function (input, msg) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  const label = formControl.querySelector('label').textContent;
  small.innerText = `${label} ${msg}`;
};

const showSuccess = function (input, msg) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
};

const checkEmail = function (input) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  !re.test(input.value.trim().toLowerCase())
    ? showError(input, 'is not valid')
    : showSuccess(input);
};

const checkRequired = function (inputArr) {
  inputArr.forEach((input) => {
    input.value.trim() === ''
      ? showError(input, 'is required')
      : showSuccess(input);
  });
};

const checkLength = function (inputArr) {
  inputArr.forEach((item) => {
    if (item.input.value.length < item.min) {
      showError(item.input, `must be at least ${item.min} characters`);
    } else if (item.input.value.length > item.max) {
      showError(item.input, `must be less than ${item.max} characters`);
    } else {
      showSuccess(item.input);
    }
  });
};

const checkPasswordsMatch = function (inputPass, inputConfirmPass) {
  inputPass.value !== inputConfirmPass.value &&
    showError(inputConfirmPass, 'Password do not match');
};

form.addEventListener('submit', function (e) {
  e.preventDefault();
  checkRequired([username, email, password, confirmPassword]);
  checkLength([
    { input: username, min: 3, max: 15 },
    { input: password, min: 6, max: 25 },
  ]);
  checkEmail(email);
  checkPasswordsMatch(password, confirmPassword);
});
