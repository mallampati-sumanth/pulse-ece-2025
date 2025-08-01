gsap.registerPlugin(DrawSVGPlugin);
//draws all elements with the "draw-me" class applied
gsap.from('.pluse', { duration: 3, drawSVG: 0 });
const t1 = gsap.timeline({
  defaults: { opacity: 0, duration: 1, ease: 'power3.out' },
});
t1.fromTo(
  '.backg',
  { yPercent: -100, opacity: 0 },
  { yPercent: 0, opacity: 1, stagger: 0.2 }
);
t1.fromTo(
  '.input_control',
  { yPercent: -50, opacity: 0 },
  { yPercent: 0, opacity: 1, stagger: 0.4 },
  '-0.5'
);
t1.fromTo(
  '.ion',
  { y: 100, opacity: 0 },
  { y: -40, opacity: 0.5, stagger: -0.3 },
  '-7'
);

// let mm = gsap.matchMedia();
// mm.add('(max-width: 425px)', () => {
//   const t2 = gsap.timeline({
//     defaults: { opacity: 1, duration: 1, ease: 'power3.out' },
//   });
//   t2.fromTo(
//     '.backg',
//     { yPercent: 0, opacity: 1 },
//     { yPercent: 0, opacity: 1, stagger: 0.2 }
//   )
//     .fromTo(
//       '.input_control',
//       { yPercent: -50, opacity: 0 },
//       { yPercent: 0, opacity: 1, stagger: 0.4 }
//     )
//     .fromTo(
//       '.ion',
//       { y: 100, opacity: 0 },
//       { y: -40, opacity: 0.5, stagger: -0.3 }
//     );
// });
