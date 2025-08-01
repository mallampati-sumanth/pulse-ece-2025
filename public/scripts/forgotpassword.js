const form = document.querySelector('form');
const send_btn = document.querySelector('.send_btn');
const sub_loader = document.querySelector('.sub-loader');
const button_control = document.querySelector('.button_control');
const alert_msg = document.querySelector('.alert-msg');
const alert_msg_success = document.querySelector('.alert-msg-success');
const forgotpassword = async details => {
  const req = await fetch('/forgotpassword', {
    method: 'post',
    body: JSON.stringify(details),
    headers: { 'Content-type': 'application/json' },
  });
  const res = await req.json();
  if (res.status === 'Success') {
    alert_msg_success.innerHTML = ` <ion-icon name="warning-outline"></ion-icon
              ><span>${res.message}</span>`;
    alert_msg_success.classList.add('active');
    setTimeout(() => {
      alert_msg.classList.remove('active');
      location.assign('/sentmail');
    }, 4000);
  }
  if (res.status === 'Failed') {
    alert_msg.innerHTML = ` <ion-icon name="warning-outline"></ion-icon
              ><span>${res.error}</span>`;
    alert_msg.classList.add('active');
    setTimeout(() => {
      alert_msg.classList.remove('active');
      location.assign('/signup');
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
  };
  forgotpassword(details);
});
