const navSlide = () => {
  const burger = document.querySelector('.burger');
  burger.addEventListener('click', () => {
    navSlidingEvent();
    // burger.classList.toggle('toggle');
    burger.classList.toggle('toggle');
  });
};

const navSlidingEvent = () => {
  const nav = document.querySelector('.nav-slider-links');
  const navLinks = document.querySelectorAll('.nav-slider-link-item');

  nav.classList.toggle('nav-active');

  //Animate Links from Main Navegation
  ulContentSliderAnimation(navLinks);
};

const ulContentSliderAnimation = list => {
  list.forEach((li, index) => {
    if (li.style.animation) {
      li.style.animation = '';
    } else {
      li.style.animation = `liFade 0.5s ease forwards ${index / 7 + 0.5}s`;
    }
  });
};
navSlide();
