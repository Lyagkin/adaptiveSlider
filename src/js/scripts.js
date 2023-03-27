window.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider"),
        slidersLine = slider.querySelector(".slider-line"),
        sliderImgs = slidersLine.querySelectorAll("img"),
        arrowLeft = slider.querySelector(".slider-arrowLeft"),
        arrowRight = slider.querySelector(".slider-arrowRight"),
        dotsWrapper = slider.querySelector(".dots-wrapper");

  let slideIndex = 0,
      sliderWidth;


  sliderImgs.forEach((slide, slideIndex) => {
    const dot = document.createElement("div");
    dot.classList.add("foot");
    dot.setAttribute("data-index", slideIndex);

    dot.insertAdjacentHTML("beforeend",  `
    <div class="circle-1"></div>
    <div class="circle-2"></div>
    <div class="circle-3"></div>
    <div class="circle-4"></div>
    `);
    dotsWrapper.append(dot);
  });

  function showActiveDot(i = 0) {
    const dots = document.querySelectorAll(".foot");

    dots.forEach(dot => dot.classList.remove("activeFoot"));

    dots[i].classList.add("activeFoot");
  }

  showActiveDot();

  function resizeSlider() {
    sliderWidth = slider.clientWidth;
    slidersLine.style.width = sliderWidth * sliderImgs.length + "px";
    sliderImgs.forEach(slide => slide.style.width = sliderWidth + "px");
  }

  resizeSlider();
  
  window.addEventListener("resize", () => {
    resizeSlider();
    moveSlide();
  });

  function moveSlide(slideIndex = 0) {
    slidersLine.style.transform = `translateX(${- slideIndex * sliderWidth}px)`;
  }

  function nextSlide() {
    slideIndex++;

    if(slideIndex >= sliderImgs.length) {
      slideIndex = 0;
    }

    moveSlide(slideIndex);
    showActiveDot(slideIndex);
  }

  arrowRight.addEventListener("click", nextSlide);

  function prevSlide() {
    slideIndex--;
    console.log(slideIndex);

    if(slideIndex < 0) {
      slideIndex = sliderImgs.length - 1;
    }

    moveSlide(slideIndex);
    showActiveDot(slideIndex);
  }

  arrowLeft.addEventListener("click", prevSlide);

  dotsWrapper.addEventListener("click", (e) => {
    if(e.target && e.target.classList.contains("foot")) {

      const dots = document.querySelectorAll(".foot");

      dots.forEach((dot, dotIndex) => {
        if (dot === e.target) {
          slideIndex = dotIndex;
          showActiveDot(slideIndex);
          moveSlide(slideIndex);
        }
      })
    }
  });

});