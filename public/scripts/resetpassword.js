const form = document.querySelector('form');
const alert_msg = document.querySelector('.alert-msg');
const alert_msg_success = document.querySelector('.alert-msg-success');
const resetpassword = async details => {
  const token = window.location.pathname.split('/').pop(); // Extract token from the URL
  details.token = token; // Add the token to the details object
  console.log(token);
  const req = await fetch(`/resetpassword/${token}`, {
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
    password: e.target.password.value,
    reenter: e.target.reenter.value,
  };
  resetpassword(details);
});
