const passwordEl = document.querySelector("#password");
const confirmPasswordEl = document.querySelector("#confirm-password");
const form = document.querySelector("#change_password");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // prevent the form from submitting

  // validate fields
  let isPasswordValid = checkPassword(),
    isConfirmPasswordValid = checkConfirmPassword();
  let isFormValid = isPasswordValid && isConfirmPasswordValid;

  // submit to the server if the form is valid
  if (isFormValid) {
    document.querySelector(".errormsg").style.display = "none";
    window.location.assign("./dashboard.html");
  }
});

// Different kinds of validation

// Reusable utility functions
const isRequired = (value) => (value === "" ? false : true);

const showError = (input, message) => {
  // get the form-field element
  const formField = input;
  // change color of border of field
  formField.style.borderColor = "#b00020";
  // show the error message
  const error = document.querySelector(".errormsg");
  error.style.display = "block";
  error.style.color = "#b00020";
  error.textContent = message;
};

const showSuccess = (input) => {
  // get the form-field element
  const formField = input;
  // change border color
  formField.style.borderColor = "#132f6b";
};

const isPasswordSecure = (password) => {
  const re = new RegExp("^(?=.{3,})");
  return re.test(password);
};

const checkPassword = () => {
  let valid = false;
  const password = passwordEl.value.trim();
  if (!isRequired(password)) {
    showError(passwordEl, "Password cannot be blank.");
  } else if (!isPasswordSecure(password)) {
    showError(passwordEl, "Password must have at least 3 characters");
  } else {
    showSuccess(passwordEl);
    valid = true;
  }
  return valid;
};

const checkConfirmPassword = () => {
  let valid = false;
  // check confirm password
  const confirmPassword = confirmPasswordEl.value.trim();
  const password = passwordEl.value.trim();
  if (!isRequired(confirmPassword)) {
    showError(confirmPasswordEl, "Please enter the password again");
  } else if (password !== confirmPassword) {
    showError(confirmPasswordEl, "The password does not match");
  } else {
    showSuccess(confirmPasswordEl);
    valid = true;
  }
  return valid;
};
