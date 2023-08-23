const switchElement = document.querySelector('#switch');
const switchElement2 = document.querySelector('#switch2');
const body = document.querySelector('body');
const logoImg = document.getElementById('logo-img');

// const logoImgDark = document.getElementById('logo-img-dark');

function darkmode() {
  if (switchElement.checked || switchElement.checked2) {
    localStorage.setItem('darkmode', 'true');
    body.classList.add('dark-theme');

    logoImg.src = new URL('../img/header/logo-dark-theme.svg', import.meta.url);

    // logoImg.style.display = 'none';
    // logoImgDark.style.display = 'block';
    // console.log('dark', logoImg.src);
  } else {
    localStorage.setItem('darkmode', 'false');
    body.classList.remove('dark-theme');

    logoImg.src = new URL('../img/header/logo.svg', import.meta.url);

    // logoImg.style.display = 'block';
    // logoImgDark.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const wasDarkMode = localStorage.getItem('darkmode') === 'true';

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

// ========================================================
// рефакторінг за допопмогою forEach

// const switchesEl = document.querySelectorAll('[name="switch"');
// const body = document.querySelector('body');
// const logoImg = document.getElementById('logo-img');

// document.addEventListener('DOMContentLoaded', () => {
//   const wasDarkMode = localStorage.getItem('darkmode') === 'true';

//   switchesEl.forEach(switchEl => {
//     if (wasDarkMode) {
//       switchEl.checked = true;
//     }

//     switchEl.addEventListener('click', ev => {
//       switchesEl.forEach(switchElement => {
//         switchElement.checked = switchEl.checked;
//       });

//       darkmode();
//     });
//   });

//   darkmode();
// });

// function darkmode() {
//   switchesEl.forEach(switchEl => {
//     if (switchEl.checked) {
//       localStorage.setItem('darkmode', 'true');
//       body.classList.add('dark-theme');

//       logoImg.src = new URL(
//         '../img/header/logo-dark-theme.svg',
//         import.meta.url
//       );
//     } else {
//       localStorage.setItem('darkmode', 'false');
//       body.classList.remove('dark-theme');

//       logoImg.src = new URL('../img/header/logo.svg', import.meta.url);
//     }
//   });
// }
