// * customError
class CustomError extends Error {
  constructor(message) {
    super(message);
  }
}

// * get screen size code
// ! removed window.inner[Width/Height] (coz it takes all the higth including scroll bar height/width)
var w = document.body.clientWidth || document.documentElement.clientWidth;
var h = document.body.clientHeight || document.documentElement.clientHeight;
var navopen = false;

// * event listeners
//! on document only load
document.addEventListener("DOMContentLoaded", (e) => {
  heroimgresize(e);
  swiper(e);
  scrollout(e);
});

// ! on full document load
window.onload = (e) => {
  navBarAnim(e);
  navTextAnim(e);
  aboutscroll(e);
};

// ! on windw scroll
window.onscroll = (e) => {
  navBarAnim(e);
  // ! close navbar if open on mobile view
  if (navopen) {
    navbarclick(e);
  }
};

// ! on winodw resize
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
  } catch (error) {
    console.log(error);
  }
}

// !function for handling all scroll out js thing
function scrollout(e) {
  try {
    // * gallery
    ScrollOut({
      targets: ".img-scroll",
      threshhold: 0.5,
      cssProps: {
        visibleY: true,
      },
    });

    // * quality
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

    // * general
    ScrollOut({
      targets: ".data-scroll",
      threshold: 0.3,
      once: true,
      onShown: function (el) {
        el.style.opacity = 1;
        el.style.transform = "translate(0px,0px)";
      },
      onHidden: function (el) {
        el.style.opacity = 0;
        if (el.classList.contains("top")) {
          el.style.transform = "translateY(-50px)";
        } else if (el.classList.contains("left")) {
          el.style.transform = "translateX(-50px)";
        } else if (el.classList.contains("right")) {
          el.style.transform = "translateX(50px)";
        } else {
          el.style.transform = "translateY(50px)";
        }
      },
    });
  } catch (error) {
    console.log(error)
  }
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
    console.log(error);
  }
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
  } catch (error) {
    console.log(error);
  }
}

// ! functoin for hero images resize
function heroimgresize(e) {
  try {
    let slideImg = document.querySelectorAll(".slideimg");
    slideImg.forEach((element) => {
      let wrapper = element.parentElement.parentElement;
      let slider = element.parentElement;
      if (wrapper.classList.contains("index")) {
        if (wrapper.clientWidth > wrapper.clientHeight) {
          element.classList.add("imgw");
        } else {
          element.classList.add("imgh");
        }
      } else {
        if (slider.clientWidth > slider.clientHeight) {
          element.classList.add("imgw");
          if (slider.clientHeight >= element.clientHeight) {
            element.classList.add("imgh");
          }
        } else {
          element.classList.add("imgh");
          if (slider.clientWidth >= element.clientWidth) {
            element.classList.add("imgw");
          }
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}

// ! navbar click
function navbarclick(e) {
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
  } catch (error) {
    console.log(error);
  }
}

// ! news scroll (only for about and all product page page)
function aboutscroll(e) {
  try {
    document.querySelectorAll(".items").forEach((el) => {
      let elcount = el.childElementCount;
      let sw = el.scrollWidth;
      el.innerHTML += el.innerHTML;
      el.animate(
        [
          { transform: "translateX(0px)" },
          { transform: "translateX(-" + sw + "px)" },
        ],
        {
          duration: elcount * 2000 + w,
          iterations: Infinity,
        }
      );
    });
  } catch (error) {
    console.log(error)
  }
}

// ! swiper js
function swiper(e) {
  try {
    new Swiper(".swiper-container", {
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
  } catch (error) {
    console.log(error)
  }
}

function openWA() {
  var win = window.open("https://wa.me/919819211601", "_blank");
  win.focus();
}

// ! send mail
async function sendmail() {
  console.log("working");
  let name = document.querySelector("#name");
  let email = document.querySelector("#email");
  let phone = document.querySelector("#phone");
  let message = document.querySelector("#message");
  await Email.send({
    Host: "smtp.gmail.com",
    Username: "surbhimetalalloys@gmail.com",
    Password: "luuxnkajzjqjmhae",
    To: "rahulgupta.ra.com@gmail.com",
    From: email.value,
    Subject: "Enquire from : " + name.value,
    Body:
      "<strong>Name</strong> : " +
      name.value +
      "<br><br><strong>Email</strong> : " +
      email.value +
      "<br><br><strong>Phone</strong> : " +
      phone.value +
      "<br><br> <strong>Message</strong> : " +
      message.value,
  })
    .then((result) => {
      alert(result);
      name.value = "";
      email.value = "";
      phone.value = "";
      message.value = "";
    })
    .catch((err) => {
      alert(err);
      name.value = "";
      email.value = "";
      phone.value = "";
      message.value = "";
    });
}