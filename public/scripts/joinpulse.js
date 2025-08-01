// var tl = gsap.timeline({ defaults: { duration: 2, ease: 'none' } });

// tl.to('#text1', {
//   duration: 4,
//   scrambleText: {
//     text: 'PULSE',
//     chars: 'XO',
//     revealDelay: 1,
//     tweenLength: false,
//     speed: 0.4,
//   },
// });
const menu_btn = document.querySelector('.menu-btn');
const nav_menu = document.querySelector('.nav_menu');
const form = document.querySelector('form');
const alert_msg = document.querySelector('.alert-msg');
const alert_msg_success = document.querySelector('.alert-msg-success');
menu_btn.addEventListener('click', () => {
  menu_btn.classList.toggle('open');
  nav_menu.classList.toggle('mobile');
});
const joinrequest = async details => {
  const req = await fetch('/joinpulse', {
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
      alert_msg.classList.remove('active');
      location.assign('/');
    }, 4000);
  }
  if (res.status === 'Failed') {
    alert_msg.innerHTML = ` <ion-icon name="warning-outline"></ion-icon
              ><span>${res.error}</span>`;
    alert_msg.classList.add('active');
    setTimeout(() => {
      alert_msg.classList.remove('active');
    }, 4000);
  }
};
form.addEventListener('submit', e => {
  e.preventDefault();

  const details = {
    name: e.target.name.value,
    email: e.target.email.value,
    id: e.target.id.value,
    phone: e.target.phone.value,
    batch: e.target.batch.value,
    wing: e.target.wing.value,
  };
  joinrequest(details);
});
