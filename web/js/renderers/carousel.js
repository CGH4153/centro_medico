document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carouselTrack");
  const items = document.querySelectorAll(".carousel-item-custom");
  const totalItems = items.length;
  const visibleItems = 3;
  let currentIndex = 0;

  function moveSlide(direction) {
    const maxIndex = totalItems - visibleItems;
    currentIndex += direction;

    if (currentIndex < 0) currentIndex = maxIndex;
    if (currentIndex > maxIndex) currentIndex = 0;

    const offset = currentIndex * (100 / visibleItems);
    track.style.transform = `translateX(-${offset}%)`;
  }

  document.querySelector(".carousel-control-prev").addEventListener("click", () => moveSlide(-1));
  document.querySelector(".carousel-control-next").addEventListener("click", () => moveSlide(1));

  setInterval(() => {
    moveSlide(1);
  }, 4000);
});