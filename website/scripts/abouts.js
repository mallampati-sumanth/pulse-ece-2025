gsap.registerPlugin(ScrollTrigger);

const ele = document.querySelector('.about_pulse--join');

const t1 = gsap.timeline({
  scrollTrigger: {
    trigger: '.about_kl',
    start: 'top 80%',
    end: 'bottom 60%',
    scrub: true,
  },
});

const t2 = gsap.timeline({
  scrollTrigger: {
    trigger: '.about_pulse',
    start: 'top 60%',
    end: 'bottom 50%',
  },
});

const t3 = gsap.timeline({
  scrollTrigger: {
    trigger: '.about_zrotriya',
    start: 'top 60%',
    end: 'bottom 50%',
    scrub: true,
  },
});
t1.fromTo(
  '.about_kl--logo',
  { x: -100, opacity: 0 },
  { duration: 1, x: 0, opacity: 1, ease: 'lineBreak.easeNone' },
  'start'
);
t1.fromTo(
  '.about_kl--content',
  { x: 80, opacity: 0 },
  { duration: 1, x: 0, opacity: 1, ease: 'lineBreak.easeNone' },
  'start'
);

t2.fromTo(
  '.about_pulse--logo',
  { x: 80, opacity: 0 },
  { duration: 1, x: 0, opacity: 1, ease: 'lineBreak.easeNone' },
  'start'
);
t2.fromTo(
  '.about_pulse--content',
  { x: -100, opacity: 0 },
  { duration: 1, x: 0, opacity: 1, ease: 'lineBreak.easeNone' },
  'start'
)
  .fromTo('.about_pulse--join-bg', { scale: '0' }, { scale: '1' })
  .to('.about_pulse--join-bg', {
    width: '100%',
    duration: 1,
    ease: 'bounce.out',
  })
  .to('.about_pulse--join', {
    opacity: 1,
  });

t3.fromTo(
  '.about_zrotriya--logo',
  { x: -100, opacity: 0 },
  { duration: 1, x: 0, opacity: 1, ease: 'lineBreak.easeNone' },
  'start'
);
t3.fromTo(
  '.about_zrotriya--content',
  { x: 80, opacity: 0 },
  { duration: 1, x: 0, opacity: 1, ease: 'lineBreak.easeNone' },
  'start'
);

let split = new SplitType('.about_pulse--content', { type: 'chars' });
//now animate each character into place from 100px above, fading in:
gsap.from(split.chars, {
  scrollTrigger: {
    trigger: split.chars,
    start: 'top 80%',
    end: '-=100%',
    scrub: true,
  },
  opacity: 0.2,
  stagger: 1000,
  duration: 2,
});

let split3 = new SplitType('.about_zrotriya--content', { type: 'chars' });
//now animate each character into place from 100px above, fading in:
gsap.from(split3.chars, {
  scrollTrigger: {
    trigger: split3.chars,
    start: 'top 90%',
    end: 'bottom 60%',
    scrub: true,
  },
  opacity: 0.2,
  stagger: 1000,
  duration: 2,
});

// t1.fromTo('.about_pulse', { x: -100 }, { duration: 1, x: 0 });
