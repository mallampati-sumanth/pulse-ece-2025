const menu_btn = document.querySelector('.menu-btn');
const nav_menu = document.querySelector('.nav_menu');
const form = document.querySelector('form');
const tbody = document.querySelector('.tbody');
const loader_container = document.querySelector('.loader_container');
const blood = document.querySelector('.blood');
blood.addEventListener('animationend', () => {
  blood.classList.add('active');
});
window.addEventListener('load', () => {
  setTimeout(() => {
    loader_container.classList.add('active');
  }, 3000);
});

menu_btn.addEventListener('click', () => {
  menu_btn.classList.toggle('open');
  nav_menu.classList.toggle('mobile');
});
const bloodRequest = async details => {
  const req = await fetch('/blood', {
    method: 'post',
    body: JSON.stringify(details),
    headers: { 'Content-type': 'application/json' },
  });
  const res = await req.json();
  tbody.innerHTML = '';
  res.users.forEach((user, i) => {
    const data = `  <tr>
                <td>${i + 1}</td>
                <td>${user.name}</td>
                <td>${user.role}</td>
                <td>${user.phone}</td>
                <td class="blood_group">${user.blood}</td>
              </tr>`;
    tbody.insertAdjacentHTML('afterbegin', data);
  });
};
form.addEventListener('submit', e => {
  e.preventDefault();

  const details = {
    bloodGrp: e.target.bloodGrp.value,
  };
  console.log(details);
  bloodRequest(details);
});
