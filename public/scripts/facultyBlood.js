gsap.registerPlugin(DrawSVGPlugin);

// Using GSAP animation to draw the stroke and fill with red
gsap.to('.blood', {
  drawSVG: 0, // Start with the stroke drawn
  fill: 'red', // Fill the SVG with red color
  duration: 3, // Set the duration of the animation
  ease: 'power2.inOut', // Set the easing function if needed
});
gsap.to('.hand', {
  drawSVG: 0, // Start with the stroke drawn
  fill: '#ffffff', // Fill the SVG with red color
  duration: 3, // Set the duration of the animation
  ease: 'power2.inOut', // Set the easing function if needed
});
const menu_btn = document.querySelector('.menu-btn');
const nav_menu = document.querySelector('.nav_menu');
const form = document.querySelector('form');
const tbody = document.querySelector('.tbody');
const loader_container = document.querySelector('.loader_container');

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
  const req = await fetch('/faculty/blood', {
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
