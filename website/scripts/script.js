const footer = document.querySelector('.section__footer');
const loader_container = document.querySelector('.loader_container');
const bodyEl = document.querySelector('.body');
const bar = document.querySelector('.bar');
const gallery = document.querySelector('.section_gallery');
const aboutSvgLine = document.querySelectorAll('.lines');
const aboutHead = document.querySelector('.head');
const about = document.querySelector('.section_about');

aboutSvgLine.forEach(line => {
  line.addEventListener('animationend', () => {
    aboutHead.classList.add('active');
    line.classList.add('active');
  });
});
aboutHead.addEventListener('animationend', () => {
  about.classList.add('active');
});
const updateBar = () => {
  let scrollPos =
    (window.scrollY / (bodyEl.scrollHeight - window.innerHeight)) * 100;

  bar.style.width = `${scrollPos}%`;
  requestAnimationFrame(updateBar);
};
updateBar();
setTimeout(() => {
  loader_container.classList.add('active');
}, 8000);

const callback = (enteries, observer) => {
  const [entery] = enteries;
  console.log(entery);
  if (entery.isIntersecting) {
    entery.target.classList.add('active');
  } else {
    entery.target.classList.remove('active');
  }
};
const callback1 = (enteries, observer) => {
  const [entery] = enteries;
  console.log(entery);
  if (entery.isIntersecting) {
    entery.target.classList.add('active');
  } else {
    entery.target.classList.remove('active');
  }
};
const observer = new IntersectionObserver(callback, {
  root: null,
  threshold: 0.5,
});
const observer1 = new IntersectionObserver(callback1, {
  root: null,
  threshold: 0.8,
});
observer.observe(footer);
observer1.observe(gallery);
