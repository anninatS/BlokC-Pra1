// Chat logs from chat.openai.com used to create the slides:
//     https://chat.openai.com/share/7d422151-0ce7-4ec5-8d0c-8f69e89822df

let currentSlide = 0;
const slides = $(".slide");
const totalSlides = slides.length;
let enableScrollTracking = true;
let isNavigationDisabled = false;

$("#prevButton").click(function () {
    if (!isNavigationDisabled && currentSlide > 0) {
        disableNavigationTemporarily();
        currentSlide--;
        updateSlide();
        disableScrollTrackingTemporarily();
    }
});

$("#nextButton").click(function () {
    if (!isNavigationDisabled && currentSlide < totalSlides - 1) {
        disableNavigationTemporarily();
        currentSlide++;
        updateSlide();
        disableScrollTrackingTemporarily();
    }
});

function updateSlide() {
    console.log(`Navigating to slide ${currentSlide + 1}`);
    slides[currentSlide].scrollIntoView({
        behavior: "smooth",
        block: "center",
    });
}

updateSlide();

slides.each(function () {
    const randomColor = getRandomColor();
    $(this).css("background-color", randomColor);
});

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

$(window).scroll(function () {
    if (enableScrollTracking) {
        const slideContainer = $(".slide-container");
        const scrollPosition = $(window).scrollTop();
        const newCurrentSlide = Math.round(scrollPosition / window.innerHeight);

        if (
            newCurrentSlide !== currentSlide &&
            newCurrentSlide >= 0 &&
            newCurrentSlide < totalSlides
        ) {
            currentSlide = newCurrentSlide;
            updateSlide();
        }
    }
});

function disableScrollTrackingTemporarily() {
    enableScrollTracking = false;
    setTimeout(function () {
        enableScrollTracking = true;
    }, 2000);
}

function disableNavigationTemporarily() {
    isNavigationDisabled = true;
    $("#prevButton").prop("disabled", true);
    $("#nextButton").prop("disabled", true);
    setTimeout(function () {
        isNavigationDisabled = false;
        $("#prevButton").prop("disabled", false);
        $("#nextButton").prop("disabled", false);
    }, 2000);
}
