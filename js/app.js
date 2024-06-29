import { card } from "./card.js";
import { projects } from "./projects.js";
import { onScroll } from "./smooth-scroll.js";

const scrollContainer = document.querySelector("main");
const sticky = document.querySelector(".sticky");
const slider = document.querySelector(".slider");

function createProjects() {
  projects.forEach((proj) => {
    const cardTemplate = card(proj);
    slider.appendChild(cardTemplate);
  });
}

function animateSlider() {
  const sessionOffsetTop = getSectionDistanceFromTop();
  const mainScrolledPixel = getScrolledDistance();

  // if 1836, 1836
  const difference = mainScrolledPixel - sessionOffsetTop;

  const percentage = getPercentage(difference);
  const end = getEndWidth();
  const current = lerp(0, end, percentage);

  moveSliderX(current);
}

function getSectionDistanceFromTop() {
  // get session el distance from the scroll container
  return sticky.parentElement.offsetTop;
}

function getScrolledDistance() {
  // scrolled distance of scroller
  return scrollContainer.scrollTop;
}

function getPercentage(difference) {
  let percentage = difference / window.innerHeight;
  return percentage < 0 ? 0 : percentage > 1 ? 1 : percentage;
}

function getEndWidth() {
  return slider.clientWidth - window.innerWidth;
}

function moveSliderX(current) {
  slider.style.transform = `translate3d(${-current}px, 0 , 0)`;
}

function lerp(a, b, t) {
  // a=start, b=end, t=timetaken
  return a + (b - a) * t;
}

createProjects();

scrollContainer.addEventListener("wheel", (e) => {
  e.preventDefault();
  onScroll(e.deltaY, scrollContainer, animateSlider);
});
