const form = document.querySelector('form');
const alert_msg = document.querySelector('.alert-msg');
const alert_msg_success = document.querySelector('.alert-msg-success');

const editRequest = async details => {
  const id = window.location.pathname.split('/')[4];
  console.log(window.location.pathname.split('/')[4]);
  const req = await fetch(`/admin/faculty/edit/${id}`, {
    method: 'put',
    body: JSON.stringify(details),
    headers: { 'Content-type': 'application/json' },
  });
  const res = await req.json();
  if (res.status === 'Success') {
    alert_msg_success.innerHTML = ` <ion-icon name="warning-outline"></ion-icon
              ><span>${res.message}</span>`;
    alert_msg_success.classList.add('active');
    setTimeout(() => {
      alert_msg_success.classList.remove('active');
      location.assign('/admin');
    }, 4000);
  }
  if (res.status === 'Failed') {
    alert_msg.innerHTML = ` <ion-icon name="warning-outline"></ion-icon
              ><span>${res.error}</span>`;
    alert_msg.classList.add('active');
    setTimeout(() => {
      alert_msg.classList.remove('active');
      location.assign(`/admin/user/edit/${id}`);
    }, 4000);
  }
};
form.addEventListener('submit', e => {
  e.preventDefault();

  const details = {
    name: e.target.name.value,
    phone: e.target.phone.value,
    blood: e.target.blood.value,
    role: e.target.role.value,
  };
  console.log(details);
  editRequest(details);
});
