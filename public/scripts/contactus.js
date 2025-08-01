gsap.registerPlugin(ScrollTrigger);
const t1 = gsap.timeline();
gsap
  .timeline({
    scrollTrigger: {
      trigger: '.map_container',
      start: 'top 80%',
      end: 'bottom 60%',
    },
  })
  .fromTo('.map', { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 2 });
t1.fromTo('iframe', { scale: 3 }, { scale: 1, duration: 3 });
const menu_btn = document.querySelector('.menu-btn');
const nav_menu = document.querySelector('.nav_menu');
const form = document.querySelector('form');
const alert_msg = document.querySelector('.alert-msg');
const alert_msg_success = document.querySelector('.alert-msg-success');
const send_btn = document.querySelector('.contact-us');
const sub_loader = document.querySelector('.sub-loader');
const button_control = document.querySelector('.button_control');
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
const contactusRequest = async details => {
  const req = await fetch('/contactus', {
    method: 'post',
    body: JSON.stringify(details),
    headers: { 'Content-type': 'application/json' },
  });
  const res = await req.json();
  console.log(res);
  if (res.status === 'Success') {
    alert_msg_success.innerHTML = ` <ion-icon name="warning-outline"></ion-icon
              ><span>${res.message}</span>`;
    alert_msg_success.classList.add('active');
    setTimeout(() => {
      alert_msg_success.classList.remove('active');
      location.assign('/contactus-form-submitted');
    }, 4000);
  }
  if (res.status === 'Failed') {
    alert_msg.innerHTML = ` <ion-icon name="warning-outline"></ion-icon
              ><span>${res.error}</span>`;
    alert_msg.classList.add('active');
    setTimeout(() => {
      alert_msg.classList.remove('active');
      location.assign('/contactus');
    }, 4000);
  }
};
form.addEventListener('submit', e => {
  e.preventDefault();
  send_btn.textContent = '';
  button_control.classList.add('active');
  send_btn.innerHTML = ' <div class="sub-loader active"></div>';
  const details = {
    email: e.target.email.value,
    name: e.target.name.value,
    number: e.target.number.value,
    message: e.target.message.value,
  };
  console.log(details);
  contactusRequest(details);
});
