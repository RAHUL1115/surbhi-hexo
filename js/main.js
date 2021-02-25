// * get screen size code
// ! removed window.inner[Width/Height] (coz it takes all the higth including scroll bar height/width)
var w = document.body.clientWidth || document.documentElement.clientWidth;
var h = document.body.clientHeight || document.documentElement.clientHeight;
var navopen = false;

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

// * event listeners
window.onload = (e) => {
  navBarAnim(e);
  heroimgresize(e);
  navTextAnim(e);
  scrollout(e);
};

window.onscroll = (e) => {
  navBarAnim(e);
  // ! close navbar if open on mobile view
  if (navopen) {
    navbarclick(e);
  }
};

window.onresize = (e) => {
  updateWidHig(e);
  heroimgresize(e);
};

// * functions
// ! fumction for updating variable w and h on window widthchange
function updateWidHig(e) {
  try {
    w =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    h =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
  } catch (error) {}
}

// !function for handling all scroll out js thing
function scrollout(e) {
  try {
    ScrollOut({
      threshold: 0.3,
      once: true,
    });
    ScrollOut({
      targets: ".scroll-child",
      threshold: 0.4,
      once: true,
      onShown: function (el) {
        let num = 0;
        for (let i = 0; i < el.children.length; i++) {
          const element = el.children[i];
          setTimeout(() => {
            element.animate(
              [
                { opacity: 0, transform: "translateY(50px)" },
                { opacity: 1, transform: "translateY(0px)" },
              ],
              {
                easing: "cubic-bezier(.44,.47,.86,1.31)",
                duration: 500,
                iterations: 1,
                fill: "forwards",
              }
            );
          }, (num += 200));
        }
      },
      onHidden: function (el) {
        for (let i = 0; i < el.children.length; i++) {
          const element = el.children[i];
          element.style.opacity = 0;
          element.style.transform = "translateY(50px)";
        }
        return;
      },
    });
  } catch (error) {}
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
  } catch (error) {}
}

// ! function for change nav bar color animation on scroll
function navBarAnim(e) {
  try {
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
  } catch (error) {}
}

// ! functoin for hero images resize
function heroimgresize(e) {
  try {
    let slideImg = document.querySelectorAll(".slideimg");
    let swiper = document.querySelector(".swiper-wrapper");
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
  } catch (error) {
    console.log("hero image resize");
  }
}

// ! navbar click
function navbarclick(e, state) {
  try {
    let navsvg = document.querySelector("#navsvg");
    document.querySelectorAll(".navmobile").forEach((element) => {
      if (element.classList.contains("navopen")) {
        navopen = false;
        navsvg.children[0].classList.remove("line1");
        navsvg.children[1].classList.remove("line2");
        navsvg.children[2].classList.remove("line3");
        element.classList.remove("navopen");
      } else {
        navopen = true;
        navsvg.children[0].classList.add("line1");
        navsvg.children[1].classList.add("line2");
        navsvg.children[2].classList.add("line3");
        element.classList.add("navopen");
      }
    });
  } catch (error) {}
}
