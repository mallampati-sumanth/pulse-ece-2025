const menu_btn = document.querySelector('.menu-btn');
const nav_menu = document.querySelector('.nav_menu');
const loader_container = document.querySelector('.loader_container');

menu_btn.addEventListener('click', () => {
  menu_btn.classList.toggle('open');
  nav_menu.classList.toggle('mobile');
});

window.addEventListener('load', () => {
  setTimeout(() => {
    loader_container.classList.add('active');
  }, 3000);
});
