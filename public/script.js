const container = document.querySelector('.container');
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');

signUpButton.addEventListener('click', () => {
  container.classList.add("active");
});

signInButton.addEventListener('click', () => {
  container.classList.remove("active");
});
