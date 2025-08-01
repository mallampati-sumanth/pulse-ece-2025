gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
//draws all elements with the "draw-me" class applied
gsap.from('.pluse', { duration: 6, drawSVG: 0 });
document.querySelectorAll('.wrapper').forEach(e => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: e, // Use the current .wrapper element as the trigger
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

Array.from(document.querySelectorAll('.wrapper')).forEach(e => {
  const imgs = Array.from(e.querySelectorAll('img'));
  new hoverEffect({
    parent: e,
    intensity: 0.3,
    image1: imgs[0].getAttribute('src'),
    image2: imgs[1].getAttribute('src'),
    displacementImage: './../displacement/displacement.png',
    imagesRatio: 1.5,
  });
});
