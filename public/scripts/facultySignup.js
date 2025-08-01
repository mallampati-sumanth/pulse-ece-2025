const form = document.querySelector('form');
const alert_msg = document.querySelector('.alert-msg');
const alert_msg_success = document.querySelector('.alert-msg-success');

const signuprequest = async details => {
  const data = await fetch('/faculty/signup', {
    method: 'post',
    body: JSON.stringify(details),
    headers: { 'Content-type': 'application/json' },
  });
  const res = await data.json();
  console.log(res);
  if (res.status === 'Success') {
    alert_msg_success.innerHTML = ` <ion-icon name="checkmark-done-outline"></ion-icon><span>${res.message}</span>`;
    alert_msg_success.classList.add('active');
    setTimeout(() => {
      alert_msg_success.classList.remove('active');
      location.assign('/faculty/signin');
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
    phone: e.target.phone.value,
    password: e.target.password.value,
    blood: e.target.bloodGrp.value,
  };
  console.log(details);
  signuprequest(details);
});
