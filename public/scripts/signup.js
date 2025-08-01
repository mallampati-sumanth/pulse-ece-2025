const form = document.querySelector('form');
const alert_msg = document.querySelector('.alert-msg');
const signuprequest = async details => {
  const req = await fetch('/signup', {
    method: 'post',
    body: JSON.stringify(details),
    headers: { 'Content-type': 'application/json' },
  });
  const res = await req.json();
  console.log(res);
  if (res.status === 'Success') {
    location.assign('/signin');
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
    batch: e.target.batch.value,
    branch: e.target.branch.value,
    blood: e.target.bloodGrp.value,
  };
  signuprequest(details);
});
