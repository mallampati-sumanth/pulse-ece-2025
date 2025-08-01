gsap.registerPlugin(ScrollTrigger);
const menu_btn = document.querySelector('.menu-btn');
const nav_menu = document.querySelector('.nav_menu');
const loader_container = document.querySelector('.loader_container');
const embedded_iot = document.querySelector('.embedded_iot');
menu_btn.addEventListener('click', () => {
  menu_btn.classList.toggle('open');
  nav_menu.classList.toggle('mobile');
});

window.addEventListener('load', () => {
  setTimeout(() => {
    loader_container.classList.add('active');
  }, 3000);
});

const t1 = gsap.timeline({
  scrollTrigger: {
    trigger: '.embedded_iot',
    start: 'top 80%',
    end: 'bottom 70%',
    toggleClass: 'active',
    toggleActions: 'play none play none',
  },
});
t1.from('.embedded_iot .club_content', {
  y: -50,
  opacity: 0,
  duration: 1,
});

const t2 = gsap.timeline({
  scrollTrigger: {
    trigger: '.always_vlsi',
    start: 'top 70%',
    end: 'bottom 30%',
    toggleClass: 'active',
    toggleActions: 'play none none none',
    once: true,
  },
});
t2.from('.always_vlsi .club_content', {
  y: -50,
  opacity: 0,
  duration: 1,
});

const t3 = gsap.timeline({
  scrollTrigger: {
    trigger: '.ni_labview',
    start: 'top 70%',
    end: 'bottom 30%',
    toggleClass: 'active',
    toggleActions: 'play none none none',
    once: true,
  },
});
t3.from('.ni_labview .club_content', {
  y: -50,
  opacity: 0,
  duration: 1,
});
