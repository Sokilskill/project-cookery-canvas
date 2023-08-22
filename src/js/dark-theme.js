const switchElement = document.querySelector('#switch');
const switchElement2 = document.querySelector('#switch2');
const body = document.querySelector('body');
const logoImg = document.getElementById('logo-img');

const logoImgDark = document.getElementById('logo-img-dark');

console.log('before', logoImg.src);

function darkmode() {
  if (switchElement.checked || switchElement.checked2) {
    localStorage.setItem('darkmode', 'true');
    body.classList.add('dark-theme');

    logoImg.src =
      "new URL('../img/header/logo-dark-theme.svg', import.meta.url)";
    // logoImg.style.display = 'none';
    // logoImgDark.style.display = 'block';
    console.log('dark', logoImg.src);
  } else {
    localStorage.setItem('darkmode', 'false');
    body.classList.remove('dark-theme');
    // logoImg.style.display = 'block';
    // logoImgDark.style.display = 'none';
    logoImg.src = "new URL('./img/header/logo.svg', import.meta.url)";
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const wasDarkMode = localStorage.getItem('darkmode') === 'true';
  console.log('load', logoImg.src);

  if (wasDarkMode) {
    switchElement.checked = true;
    switchElement2.checked = true;
  }

  darkmode();

  switchElement.addEventListener('click', function () {
    switchElement2.checked = switchElement.checked;
    darkmode();
  });

  switchElement.checked = switchElement2.checked;

  switchElement2.addEventListener('click', function () {
    switchElement.checked = switchElement2.checked;

    darkmode();
  });
});
