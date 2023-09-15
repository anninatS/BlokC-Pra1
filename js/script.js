//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMAGE SCROLLING CODE //// IMAGE SCROLLING CODE //// IMAGE SCROLLING CODE //// IMAGE SCROLLING CODE //// IMAGE SCROLLING CODE //// IMAGE SCROLLING CODE //// IMAGE SCROLLING CODE //// IMAGE SCROLLING CODE //// IMAGE SCROLLING CODE //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TODO Make relative to button clicked with event listener
// Update the scroll position
function updateScroll() {
    element.scroll({
        left: element.clientWidth * index,
        behavior: "smooth",
    });
}

// Sleep x milliseconds
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function scrollImage(dir) {
    // Change index in direction
    index += dir;

    // If index is out of range, set it to the other end smoothly
    if (index <= 0) {
        updateScroll();
        sleep(400).then(() => {
            index = maxIndex;
            element.scroll({
                left: element.clientWidth * index,
            });
        });
    }

    // If index is out of range, set it to the other end smoothly
    else if (index > maxIndex) {
        updateScroll();
        sleep(400).then(() => {
            index = 1;
            element.scroll({
                left: element.clientWidth * index,
            });
        });
    }

    // Normal case
    else {
        updateScroll();
    }

    // Disable the buttons for 0.4 seconds
    countDown();
}

// Disable the buttons for 0.4 seconds after clicking
function countDown() {
    // get all buttons
    var elements = document.getElementsByClassName("arrow-key");

    // disable all buttons if time is not 0
    if (timeUnit > 0) {
        for (var i = 0; i < elements.length; i++) {
            elements[i].disabled = true;
        }
    }

    // enable all buttons if time is 0
    else {
        for (var i = 0; i < elements.length; i++) {
            elements[i].disabled = false;
        }
        timeUnit = 4;
        return;
    }

    // decrease time by 1
    timeUnit -= 1;

    // call countDown() again after 0.1 seconds
    window.setTimeout(countDown, 100);
}

// Initialize variables
var image_plot;
try {
    var element = document.getElementsByClassName("image-plot")[0];
    var maxIndex = element.childElementCount;
    image_plot = true;
} catch (error) {
    image_plot = false;
    console.log("No image-plot found on this page");
}
var index = 1;
var timeUnit = 4;

// Clone first and last image for infinite scrolling
if (image_plot) {
    const firstImage = document.querySelector(".image-plot div:first-child");
    const lastImage = document.querySelector(".image-plot div:last-child");
    const firstImageClone = firstImage.cloneNode(true);
    const lastImageClone = lastImage.cloneNode(true);
    document.querySelector(".image-plot").appendChild(firstImageClone);
    document.querySelector(".image-plot").prepend(lastImageClone);

    // Set initial scroll position
    updateScroll();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CHANGE THE LOGO CODE //// CHANGE THE LOGO CODE //// CHANGE THE LOGO CODE //// CHANGE THE LOGO CODE //// CHANGE THE LOGO CODE //// CHANGE THE LOGO CODE //// CHANGE THE LOGO CODE //// CHANGE THE LOGO CODE //// CHANGE THE LOGO CODE //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Get a random logo
function getFile() {
    previousLogo = logo;
    var logo = files[Math.floor(Math.random() * files.length)];
    return logo;
}

// Change the logo
var previousLogo = "";
var files = ["code.svg", "gamepad.svg", "heart.svg", "debug.svg"];
document.getElementById("logoChoice").src = "img/" + getFile();

// Change the logo x seconds
setInterval(function () {
    // Make sure that the logo will change
    var newLogo = getFile();
    while (newLogo == previousLogo) {
        newLogo = getFile();
    }

    // Change the logo
    document.getElementById("logoChoice").src = "img/" + newLogo;
}, 1000);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CSS MEDIA TRIGGER CODE //// CSS MEDIA TRIGGER CODE //// CSS MEDIA TRIGGER CODE //// CSS MEDIA TRIGGER CODE //// CSS MEDIA TRIGGER CODE //// CSS MEDIA TRIGGER CODE //// CSS MEDIA TRIGGER CODE //// CSS MEDIA TRIGGER CODE //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Add a listener for when the window resizes
window.addEventListener("resize", () => {
    updateScroll();
});
