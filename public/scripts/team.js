const menu_btn = document.querySelector('.menu-btn');
const nav_menu = document.querySelector('.nav_menu');
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

gsap.registerPlugin(ScrollTrigger);
document.querySelectorAll('.wrapper').forEach(e => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: e,
        start: 'top 40%',
        end: 'bottom 0%',
      },
    })
    .fromTo(
      e,
      { x: -250, opacity: 0 },
      { x: 0, opacity: 1, duration: 2.5, ease: 'power4.out', stagger: 4 }
    );
});

// Array.from(document.querySelectorAll('.wrapper')).forEach(e => {
//   const imgs = Array.from(e.querySelectorAll('img'));
//   new hoverEffect({
//     parent: e,
//     intensity: 0.3,
//     image1: imgs[0].getAttribute('src'),
//     image2: imgs[1].getAttribute('src'),
//     displacementImage: './../displacement/displacement.png',
//     imagesRatio: 1.5,
//   });
// });
