
  (function () {
    const track = document.querySelector(".review-track");
    if (!track) return;

    const cards = Array.from(track.querySelectorAll(".review-card"));
    const dots = Array.from(document.querySelectorAll(".review-dot"));
    const prevBtn = document.querySelector(".review-arrow--prev");
    const nextBtn = document.querySelector(".review-arrow--next");
    const section = document.querySelector(".reviews-section");

    let currentIndex = 0;
    let autoTimer = null;
    const AUTO_DELAY = 6000; // ms

    function updateDots(index) {
      dots.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === index);
      });
    }

    function goToSlide(index, smooth = true) {
      if (!cards.length) return;

      if (index < 0) index = cards.length - 1;
      if (index >= cards.length) index = 0;

      currentIndex = index;
      const card = cards[index];
      const left = card.offsetLeft - track.offsetLeft;

      track.scrollTo({
        left,
        behavior: smooth ? "smooth" : "auto",
      });

      updateDots(index);
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    // autoplay
    function startAuto() {
      if (autoTimer) return;
      autoTimer = setInterval(nextSlide, AUTO_DELAY);
    }

    function stopAuto() {
      if (!autoTimer) return;
      clearInterval(autoTimer);
      autoTimer = null;
    }

    // events
    nextBtn.addEventListener("click", () => {
      stopAuto();
      nextSlide();
      startAuto();
    });

    prevBtn.addEventListener("click", () => {
      stopAuto();
      prevSlide();
      startAuto();
    });

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const index = Number(dot.dataset.index || 0);
        stopAuto();
        goToSlide(index);
        startAuto();
      });
    });

    // Optional: pause autoplay on hover
    if (section) {
      section.addEventListener("mouseenter", stopAuto);
      section.addEventListener("mouseleave", startAuto);
    }

    // init
    goToSlide(0, false);
    startAuto();
  })();

