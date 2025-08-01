const menu_btn = document.querySelector('.menu-btn');
const nav_menu = document.querySelector('.nav_menu');
const edit_btn = document.querySelector('.edit_btn');
const edit_profile = document.querySelector('.edit_profile');
const close_btn = document.querySelector('.close_btn');
const userImg = document.querySelector('.userImg-update');
const input_image = document.querySelector('#image');
const form = document.querySelector('form');
const alert_msg = document.querySelector('.alert-msg');
const alert_msg_success = document.querySelector('.alert-msg-success');
edit_btn.addEventListener('click', () => {
  edit_profile.classList.toggle('open');
});
close_btn.addEventListener('click', () => {
  edit_profile.classList.toggle('open');
});
menu_btn.addEventListener('click', () => {
  menu_btn.classList.toggle('open');
  nav_menu.classList.toggle('mobile');
});

input_image.addEventListener('change', () => {
  userImg.src = URL.createObjectURL(input_image.files[0]);
});
const uploadImg = async (file, name, phone, batch, branch, image) => {
  const data = await fetch('/profile', {
    method: 'post',
    body: JSON.stringify({ file, name, batch, phone, branch, image }),
    headers: { 'Content-type': 'application/json' },
  });
  const res = await data.json();

  if (res.status === 'Success') {
    alert_msg_success.innerHTML = `<ion-icon name="warning-outline"></ion-icon><span>${res.message}</span>`;
    alert_msg_success.classList.add('active');
    setTimeout(() => {
      alert_msg_success.classList.remove('active');
      location.assign('/');
    }, 4000);
  } else if (res.status === 'Failed') {
    alert_msg.innerHTML = `<ion-icon name="warning-outline"></ion-icon><span>${res.error}</span>`;
    alert_msg.classList.add('active');
    setTimeout(() => {
      alert_msg.classList.remove('active');
    }, 4000);
  }
};
form.addEventListener('submit', e => {
  const name = e.target.name.value;
  const phone = e.target.phone.value;
  const batch = e.target.batch.value;
  const branch = e.target.branch.value;
  const image = e.target.image.value;
  userImg.src = URL.createObjectURL(input_image.files[0]);
  uploadImg(
    URL.createObjectURL(input_image.files[0]),
    name,
    phone,
    batch,
    branch,
    image
  );
});
