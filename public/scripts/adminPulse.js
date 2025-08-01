const toggle_btn = document.querySelector('.toggle-btn');
const aside_bar = document.querySelector('.aside_bar');
const aside_container = document.querySelector('.aside_container');

toggle_btn.addEventListener('click', () => {
  aside_bar.classList.toggle('active');
  aside_container.classList.toggle('active');
});
