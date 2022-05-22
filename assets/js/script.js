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
  path: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/35984/LEGO_loader.json",
};
let anim = bodymovin.loadAnimation(animData);
anim.setSpeed(3.4);

const preloader = document.querySelector(".main_preloader");
const preloaderBtn = document.querySelector(".main_preloader button");
const loaded = window.localStorage.getItem("isLoaded") || true;

// Preloader runs once
if (loaded && window.localStorage.getItem("isLoaded") !== "false") {
  setTimeout(() => {
    preloaderBtn.style.opacity = "1";
  }, 3000);

  preloaderBtn.addEventListener("click", (event) => {
    event.target.innerText = "Loading...";
    preloader.classList.add("preloader-none");
    setTimeout(() => {
      preloader.style.display = "none";
      window.localStorage.setItem("isLoaded", false);
    }, 5000);
  });
} else if (window.localStorage.getItem("isLoaded") === "false") {
  preloader.style.display = "none";
}

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
      item.childNodes[2].style = `filter: grayscale(0)`;
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
