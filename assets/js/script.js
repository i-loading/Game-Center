$(document).ready(function () {
  let owl = $(".owl-carousel");
  owl.owlCarousel({
    loop: false,
    margin: 50,
    nav: true,
    smartSpeed: 600,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      1280: {
        items: 2,
      },
      1920: {
        items: 3,
      },
    },
  });
  owl.on("mousewheel", ".owl-stage", function (e) {
    if (e.originalEvent.wheelDelta > 0) owl.trigger("prev.owl");
    else owl.trigger("next.owl");
    e.preventDefault();
  });

  $(".owl-prev").html('<i class="fa fa-chevron-left" aria-hidden="true"></i>');
  $(".owl-next").html('<i class="fa fa-chevron-right" aria-hidden="true"></i>');
});

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const video = document.querySelector(".background");
let result = randomIntFromInterval(1, 3);

// let animData = {
//   wrapper: document.querySelector("#animationWindow"),
//   animType: "svg",
//   loop: true,
//   prerender: true,
//   autoplay: true,
//   path: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/35984/LEGO_loader.json",
// };
// let anim = bodymovin.loadAnimation(animData);
// anim.setSpeed(3.4);

window.onload = function () {
  if (result === 1) {
    video.src = video.src.replace("bg.mp4", "bg.mp4");
  } else if (result === 2) {
    video.src = video.src.replace("bg.mp4", "bg1.mp4");
  } else if (result === 3) {
    video.src = video.src.replace("bg.mp4", "bg2.mp4");
  }

  const hoverMusic = new Audio("assets/audio/hover.wav");
  hoverMusic.volume = 0.1;
  document.querySelectorAll(".owl-nav button i.fa").forEach((elem) => {
    elem.addEventListener("click", () => {
      if (!elem.parentElement.classList.contains("disabled")) hoverMusic.play();
    });
  });

  // setTimeout(() => {
  //   document.querySelector(".main_preloader button").style.opacity = "1";
  // }, 3000);
  // document
  //   .querySelector(".main_preloader button")
  //   .addEventListener("click", (event) => {
  //     event.target.innerText = "Loading...";
  //     document.querySelector(".main_preloader").classList.add("preloader-none");
  //     setTimeout(() => {
  //       document.querySelector(".main_preloader").style.display = "none";
  //       document.querySelector(".main_preloader").remove();
  //     }, 5000);
  //   });
};
