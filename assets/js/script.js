function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const video = document.querySelector(".background");
let result = randomIntFromInterval(1, 3);

let animData = {
  wrapper: document.querySelector("#animationWindow"),
  animType: "svg",
  loop: true,
  prerender: true,
  autoplay: true,
  path: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/35984/LEGO_loader_chrisgannon.json",
};
let anim = bodymovin.loadAnimation(animData);
anim.setSpeed(3.4);

const preloader = document.querySelector(".main_preloader");
const preloaderBtn = document.querySelector(".main_preloader button");
const loaded = sessionStorage.getItem("preloaderShown") || true;

// Check if the preloader has been shown before
if (sessionStorage.getItem("preloaderShown") && loaded) {
  // Show the preloader
  document.getElementById("animationWindow").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  // Function to check if all media are loaded
  function areAllMediaLoaded() {
    // Check if all images are loaded
    const images = document.querySelectorAll("img");
    const allImagesLoaded = Array.from(images).every((img) => img.complete);

    // Check if all videos are loaded
    const videos = document.querySelectorAll("video");
    const allVideosLoaded = Array.from(videos).every(
      (video) => video.readyState >= 3
    );

    return allImagesLoaded && allVideosLoaded;
  }
  // Function to handle password submission
  function handlePasswordSubmission() {
    const password = document.getElementById("passwordField").value;
    const submitButton = document.getElementById("submitButton");
    // Check if the password is correct
    if (password === "ukrsurt") {
      // Check if all media are loaded
      if (areAllMediaLoaded()) {
        submitButton.disabled = !areAllMediaLoaded();
        // Fade out the preloader gradually
        fadeOutPreloader();
      } else {
        // If media are not loaded, wait for them to load
        submitButton.disabled = areAllMediaLoaded();
        document.addEventListener("load", function () {
          if (areAllMediaLoaded()) {
            submitButton.disabled = !areAllMediaLoaded();
            fadeOutPreloader();
          }
        });
      }

      // Enable the submit button
      document.getElementById("submitButton").disabled = false;
      document.getElementById("submitButton").textContent = "Loading...";
    }
  }

  // Function to fade out the preloader gradually
  function fadeOutPreloader() {
    let preloader = document.getElementById("animationWindow");
    let opacity = 1;

    let fadeOutInterval = setInterval(function () {
      if (opacity > 0) {
        opacity -= 0.05;
        preloader.style.opacity = opacity;
      } else {
        clearInterval(fadeOutInterval);
        preloader.style.display = "none"; // Hide the preloader

        // Mark that the preloader has been shown
        sessionStorage.setItem("preloaderShown", "true");
      }
    }, 50);
  }

  // Enable the submit button when the password is correct
  document
    .getElementById("passwordField")
    .addEventListener("input", function () {
      const submitButton = document.getElementById("submitButton");
      submitButton.disabled = this.value.trim() !== "ukrsurt";
    });

  // Handle submit button click
  document
    .getElementById("submitButton")
    .addEventListener("click", handlePasswordSubmission);
});

// Function to toggle password visibility
function togglePasswordVisibility() {
  let passwordField = document.getElementById("passwordField");
  let toggleIcon = document.querySelector(".toggle-password i");

  if (passwordField.type === "password") {
    passwordField.type = "text";
    toggleIcon.classList.remove("fa-eye");
    toggleIcon.classList.add("fa-eye-slash");
  } else {
    passwordField.type = "password";
    toggleIcon.classList.remove("fa-eye-slash");
    toggleIcon.classList.add("fa-eye");
  }
}

// Preloader runs once
// if (loaded && window.localStorage.getItem("isLoaded") !== "false") {
//   setTimeout(() => {
//     // preloaderBtn.disabled = true;
//   }, 3000);

//   preloaderBtn.addEventListener("click", (event) => {
//     event.target.innerText = "Loading...";
//     preloader.classList.add("preloader-none");
//     setTimeout(() => {
//       preloader.style.display = "none";
//       window.localStorage.setItem("isLoaded", false);
//     }, 5000);
//   });
// } else if (window.localStorage.getItem("isLoaded") === "false") {
//   preloader.style.display = "none";
// }

// On page load
window.onload = function () {
  if (result === 1) video.src = video.src.replace("bg.mp4", "bg.mp4");
  else if (result === 2) video.src = video.src.replace("bg.mp4", "bg1.mp4");
  else if (result === 3) video.src = video.src.replace("bg.mp4", "bg2.mp4");

  const hoverMusic = new Audio("assets/audio/hover.wav");
  hoverMusic.volume = 0.1;
  document.querySelectorAll(".owl-nav button i.fa").forEach((elem) => {
    elem.addEventListener("click", () => {
      if (!elem.parentElement.classList.contains("disabled")) hoverMusic.play();
    });
  });
};

// Slider jQuery Code
$(document).ready(function () {
  let owl = $(".owl-carousel");
  owl.owlCarousel({
    loop: true,
    center: true,
    // margin: 50,
    nav: true,
    smartSpeed: 600,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      1150: {
        items: 2,
        center: false,
      },
      1710: {
        items: 3,
      },
    },
  });
  $(".owl-prev").html('<i class="fa fa-chevron-left" aria-hidden="true"></i>');
  $(".owl-next").html('<i class="fa fa-chevron-right" aria-hidden="true"></i>');

  const owlItems = document.querySelectorAll(".owl-item");
  const owlItemsA = document.querySelectorAll(".owl-item a");
  function onMouseEnter(node) {
    if (node.tagName !== "IMG") {
      node.play();
    }
  }
  function onMouseLeave(node) {
    if (node.tagName !== "IMG") {
      node.pause();
    }
  }
  // Постоянная прослушка наведения мыши
  owlItemsA.forEach((item) => {
    if (item.parentElement.classList.contains("center")) {
      item.childNodes[1].style = `filter: grayscale(0)`;
      item.childNodes[3].style = `filter: grayscale(0)`;
    }
    item.addEventListener("mouseover", () => {
      item.childNodes[1].style = `filter: grayscale(0)`;
      item.childNodes[3].style = `filter: grayscale(0)`;
      onMouseEnter(item.childNodes[1]);
    });
    item.addEventListener("mouseout", () => {
      onMouseLeave(item.childNodes[1]);
      if (!item.parentElement.classList.contains("center")) {
        item.childNodes[1].style = `filter: grayscale(100)`;
        item.childNodes[3].style = `filter: grayscale(100)`;
      }
    });
  });

  // Прослушка при прокручивании мыши
  owl.on("mousewheel", ".owl-stage", function (e) {
    if (e.originalEvent.wheelDelta > 0) owl.trigger("prev.owl");
    else owl.trigger("next.owl");

    owlItems.forEach((elem) => {
      if (elem.classList.contains("center")) {
        elem.children[0].children[0].style = `filter: grayscale(0)`;
        elem.children[0].children[1].style = `filter: grayscale(0)`;
      } else {
        elem.children[0].children[0].style = `filter: grayscale(100)`;
        elem.children[0].children[1].style = `filter: grayscale(100)`;
      }
    });
    e.preventDefault();
  });

  // Прослушка при нажатии на стрелки
  $(".owl-prev").on("click", function (e) {
    owlItems.forEach((elem) => {
      if (elem.classList.contains("center")) {
        elem.children[0].children[0].style = `filter: grayscale(0)`;
        elem.children[0].children[1].style = `filter: grayscale(0)`;
      } else {
        elem.children[0].children[0].style = `filter: grayscale(100)`;
        elem.children[0].children[1].style = `filter: grayscale(100)`;
      }
    });
  });
  $(".owl-next").on("click", function (e) {
    owlItems.forEach((elem) => {
      if (elem.classList.contains("center")) {
        elem.children[0].children[0].style = `filter: grayscale(0)`;
        elem.children[0].children[1].style = `filter: grayscale(0)`;
      } else {
        elem.children[0].children[0].style = `filter: grayscale(100)`;
        elem.children[0].children[1].style = `filter: grayscale(100)`;
      }
    });
  });
});

/* CACHE MEDIA */
// Open or create a database
let request = indexedDB.open("savedContentDB", 1);
let db;

request.onerror = function (event) {
  console.error("Database error: " + event.target.errorCode);
};

request.onsuccess = function (event) {
  db = event.target.result;
  retrieveAndSetContent();
};

request.onupgradeneeded = function (event) {
  let db = event.target.result;
  let objectStore = db.createObjectStore("content", { keyPath: "id" });
  objectStore.createIndex("images", "images", { unique: false });
  objectStore.createIndex("videos", "videos", { unique: false });
};

function storeContent(images, videos) {
  let transaction = db.transaction(["content"], "readwrite");
  let objectStore = transaction.objectStore("content");

  let content = { id: 1, images: images, videos: videos };
  objectStore.put(content);
}

function retrieveAndSetContent() {
  let transaction = db.transaction(["content"]);
  let objectStore = transaction.objectStore("content");
  let request = objectStore.get(1);

  request.onerror = function (event) {
    console.error("Error retrieving content: " + event.target.errorCode);
  };

  request.onsuccess = function (event) {
    let savedContent = request.result;
    if (savedContent) {
      savedContent.images.forEach((src, index) => {
        document.querySelectorAll("img")[index].src = src;
      });

      savedContent.videos.forEach((src, index) => {
        document.querySelectorAll("video")[index].src = src;
      });
    } else {
      saveContent();
    }
    saveContent();
  };
}

function saveContent() {
  let images = Array.from(document.querySelectorAll("img"), (img) => img.src);
  let videos = Array.from(
    document.querySelectorAll("video"),
    (video) => video.src
  );
  storeContent(images, videos);
}
