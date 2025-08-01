const menu_btn = document.querySelector('.menu-btn');
const nav_menu = document.querySelector('.nav_menu');
const loader_container = document.querySelector('.loader_container');

menu_btn.addEventListener('click', () => {
  menu_btn.classList.toggle('open');
  nav_menu.classList.toggle('mobile');
});
window.addEventListener('load', () => {
  setTimeout(() => {
    loader_container.classList.add('active');
  }, 4000);
});

gsap.registerPlugin(ScrollTrigger);

const btn = gsap
  .timeline({
    scrollTrigger: {
      trigger: '.join__pulse-bg',
      start: 'top 100%',
      end: 'bottom 8%',
    },
  })
  .fromTo(
    '.join__pulse-btn',
    {
      scale: 0,
      transformOriginX: '50%',
      transformOriginY: '50%',
    },
    {
      scale: 1,
      transformOriginX: '50%',
      transformOriginY: '50%',
      duration: 1,
    }
  )
  .to('.join__pulse-btn', {
    width: '200px',
    height: '65px',
    x: -60,
    padding: '20px 20px',
    duration: 1,
    onComplete: function () {
      // Add your code to set the text content here
      const joinBtn = document.querySelector('.join__pulse-btn');
      joinBtn.textContent = 'Join pulse';
    },
  });

const t1 = gsap.timeline({
  scrollTrigger: {
    trigger: '.event1',
    start: 'top 70%',
    end: 'bottom 0%',
    toggleActions: 'play none restart none',
  },
});
t1.from('.event1 .event_poster', { opacity: 0, y: -100, duration: 0.5 });
t1.from('.event1 .event_info', { opacity: 0, y: 100, duration: 1 });

const t2 = gsap.timeline({
  scrollTrigger: {
    trigger: '.event2',
    start: 'top 70%',
    end: 'bottom 0%',
    toggleActions: 'play none restart none',
  },
});
t2.from('.event2 .event_poster', { opacity: 0, y: -100, duration: 0.5 });
t2.from('.event2 .event_info', { opacity: 0, y: 100, duration: 1 });

const t3 = gsap.timeline({
  scrollTrigger: {
    trigger: '.event3',
    start: 'top 70%',
    end: 'bottom 0%',
    toggleActions: 'play none restart none',
  },
});
t3.from('.event3 .event_poster', { opacity: 0, y: -100, duration: 0.5 });
t3.from('.event3 .event_info', { opacity: 0, y: 100, duration: 1 });

Array.from(document.querySelectorAll('.event_poster')).forEach(e => {
  console.log(e);
  const imgs = Array.from(e.querySelectorAll('img'));
  new hoverEffect({
    parent: e,
    intensity: 0.3,
    image1: imgs[1].getAttribute('src'),
    image2: imgs[0].getAttribute('src'),
    displacementImage: './../displacement/displacement.png',
    imagesRatio: 1.2,
  });
});
