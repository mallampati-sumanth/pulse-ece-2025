gsap.registerPlugin(ScrollTrigger);

const ele = document.querySelector('.about_pulse--join');
const pulse = document.querySelector('.pluse');

pulse.addEventListener('animationend', () => {
  pulse.classList.add('active');
});
const t1 = gsap.timeline({
  scrollTrigger: {
    trigger: '.about_kl',
    start: 'top 80%',
    end: 'bottom 60%',
    toggleActions: 'play none restart none',
  },
});

const t2 = gsap.timeline({
  scrollTrigger: {
    trigger: '.about_pulse',
    start: 'top 60%',
    end: 'bottom 50%',
    toggleActions: 'play none restart none',
  },
});

const t3 = gsap.timeline({
  scrollTrigger: {
    trigger: '.about_zrotriya',
    start: 'top 60%',
    end: 'bottom 50%',
    toggleActions: 'play none restart none',
  },
});
t1.fromTo(
  '.about_kl--logo',
  { x: -100, opacity: 0 },
  { duration: 1, x: 0, opacity: 1, ease: 'power4.out' },
  'start'
);
t1.fromTo(
  '.about_kl--content',
  { x: 80, opacity: 0 },
  { duration: 1.5, x: 0, opacity: 1, ease: 'power4.out' },
  'start'
);

t2.fromTo(
  '.about_pulse--logo',
  { x: 80, opacity: 0 },
  { duration: 1.5, x: 0, opacity: 1, ease: 'power4.out' },
  'start'
);
t2.fromTo(
  '.about_pulse--content',
  { x: -100, opacity: 0 },
  { duration: 1.5, x: 0, opacity: 1, ease: 'power4.out' },
  'start'
)
  .fromTo('.about_pulse--join-bg', { scale: '0' }, { scale: '1' })
  .to('.about_pulse--join-bg', {
    width: '100%',
    duration: 1.5,
    ease: 'bounce.out',
  })
  .to('.about_pulse--join', {
    opacity: 1,
  });

t3.fromTo(
  '.about_zrotriya--logo',
  { x: -40, opacity: 0 },
  { duration: 1.5, x: 0, opacity: 1, ease: 'power4.out' },
  'start'
);
t3.fromTo(
  '.about_zrotriya--content',
  { x: 30, opacity: 0 },
  { duration: 1.5, x: 0, opacity: 1, ease: 'power4.out' },
  'start'
);

// let split = new SplitType('.about_pulse--content p', { type: 'chars' });
// gsap.from(split.chars, {
//   scrollTrigger: {
//     trigger: split.chars,
//     start: 'top 80%',
//     end: 'bottom 30%',
//     scrub: true,
//   },
//   opacity: 0.2,
//   stagger: 1000,
//   duration: 2,
// });

// let split3 = new SplitType('.about_zrotriya--content', { type: 'chars' });
// gsap.from(split3.chars, {
//   scrollTrigger: {
//     trigger: split3.chars,
//     start: 'top 90%',
//     end: 'bottom 60%',
//     scrub: true,
//   },
//   opacity: 0.2,
//   stagger: 1000,
//   duration: 2,
// });
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
