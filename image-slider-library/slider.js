class ImageSlider {

    constructor(
        track,
        dotsContainer,
        previousButton,
        nextButton
    ) {
        this.track = track;
        this.dotsContainer = dotsContainer;
        this.previousButton = previousButton;
        this.nextButton = nextButton;

        this.slides = Array.from(
            this.track.querySelectorAll(".slide")
        );

        this.currentIndex = 0;

        this.initialize();
    }

    initialize() {
        this.createDots();
        this.updateSlider(false);
        this.addEventListeners();
    }

    createDots() {

        this.dotsContainer.innerHTML = "";

        this.slides.forEach((slide, index) => {

            const dot = document.createElement("button");

            dot.classList.add("slider-dot");

            dot.type = "button";

            dot.setAttribute(
                "aria-label",
                `Go to slide ${index + 1}`
            );

            dot.addEventListener("click", () => {
                this.goToSlide(index);
            });

            this.dotsContainer.appendChild(dot);
        });

        this.dots = Array.from(
            this.dotsContainer.querySelectorAll(".slider-dot")
        );
    }

    addEventListeners() {

        this.nextButton.addEventListener("click", () => {
            this.next();
        });

        this.previousButton.addEventListener("click", () => {
            this.previous();
        });

        window.addEventListener("resize", () => {
            this.updateSlider(false);
        });
    }

    updateSlider(animate = true) {

        this.track.style.transition = animate
            ? "transform 0.5s ease-in-out"
            : "none";

        const offset = this.currentIndex * 100;

        this.track.style.transform =
            `translateX(-${offset}%)`;

        this.updateDots();
    }

    updateDots() {

        this.dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === this.currentIndex
            );

        });
    }

    next() {

        if (this.currentIndex <
            this.slides.length - 1) {

            this.currentIndex++;

        } else {

            this.currentIndex = 0;
        }

        this.updateSlider(true);
    }

    previous() {

        if (this.currentIndex > 0) {

            this.currentIndex--;

        } else {

            this.currentIndex =
                this.slides.length - 1;
        }

        this.updateSlider(true);
    }

    goToSlide(index) {

        if (
            index >= 0 &&
            index < this.slides.length
        ) {
            this.currentIndex = index;
            this.updateSlider(true);
        }
    }
}

const sliderTrack =
    document.getElementById("sliderTrack");

const sliderDots =
    document.getElementById("sliderDots");

const previousButton =
    document.getElementById("previousButton");

const nextButton =
    document.getElementById("nextButton");

new ImageSlider(
    sliderTrack,
    sliderDots,
    previousButton,
    nextButton
);