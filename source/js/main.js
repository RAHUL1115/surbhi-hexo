// * get screen size code
// ! removed window.inner[Width/Height] (coz it takes all the higth including scroll bar height/width)
var w = document.body.clientWidth || document.documentElement.clientWidth;
var h = document.body.clientHeight || document.documentElement.clientHeight;

// * swiper js
const swiper = new Swiper(".swiper-container", {
  // Optional parameters
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  parallax: true,
  speed: 600,
  spaceBetween: 10,
  direction: "horizontal",
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

ScrollOut({
  threshold : 0.2,
  once : true,
});

// * event listeners
window.onload = (e) => {
  navBarAnim(e);
  heroimgresize(e);
  navTextAnim(e);
};

window.onscroll = (e) => {
  navBarAnim(e);
};

window.onresize = (e) => {
  updateWidHig(e);
  heroimgresize(e);
};

// * functions
// ! fumction for updating variable w and h on window widthchange
function updateWidHig(e) {
  w =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  h =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
}

// ! function for nav bar link-text and link-outline animation
function navTextAnim(e) {
  try {
   document.querySelectorAll(".navtext").forEach((element) => {
     element.addEventListener("mouseover", function (event) {
       element.children[1].classList.remove("w-0");
       element.children[1].classList.add("w-full");
     });
     element.addEventListener("mouseout", function (event) {
       element.children[1].classList.add("w-0");
       element.children[1].classList.remove("w-full");
     });
   }); 
  } catch (error) {
  }
}

// ! function for change nav bar color animation on scroll
function navBarAnim(e) {
  if (
    document.body.scrollTop > h * 0.02 ||
    document.documentElement.scrollTop > h * 0.02
  ) {
    document.getElementById("navbar").classList.add("shadow-lg");
    document.getElementById("navbar").classList.remove("bg-opacity-50");
  } else {
    document.getElementById("navbar").classList.remove("shadow-lg");
    document.getElementById("navbar").classList.add("bg-opacity-50");
  }
}

// ! functoin for hero images resize
function heroimgresize(e) {
  let slideImg = document.querySelectorAll(".slideimg");
  let swiper = document.querySelector('.swiper-wrapper');
  slideImg.forEach((element) => {
    if (swiper.clientWidth > swiper.clientHeight) {
      element.classList.remove("h-full");
      element.classList.add("w-full");
    } else {
      element.classList.remove("w-full");
      element.classList.add("h-full");
    }
    element.classList.remove("invisible");
  });
}

// ! navbar click
function navbarclick(e){
  document.querySelectorAll(".navmobile").forEach(element => {
    if (element.classList.contains("navopen")){
      element.classList.remove("navopen");
    } else{
      element.classList.add("navopen");
    }
  });
}
