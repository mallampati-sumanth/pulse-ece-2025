const form = document.querySelector('form');
const alert_msg = document.querySelector('.alert-msg');

const signuprequest = async details => {
  const req = await fetch('/signin', {
    method: 'post',
    body: JSON.stringify(details),
    headers: { 'Content-type': 'application/json' },
  });
  const res = await req.json();
  if (res.status === 'Success') {
    location.assign('/');
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
    email: e.target.email.value,
    password: e.target.password.value,
  };
  console.log(details);
  signuprequest(details);
});
