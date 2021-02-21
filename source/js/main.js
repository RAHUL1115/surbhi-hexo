// * mobile view code
class swipe {
  swipe(data) {
    this.touchstart = [0, 0];
    this.touchstart = [0, 0];
    this.elname = document.getElementById(data.elname);
    this.elname.addEventListener(
      "touchstart",
      function (event) {
        touchstart[0] = event.changedTouches[0].screenX;
        touchstart[1] = event.changedTouches[0].screenY;
      },
      false
    );
    this.elname.addEventListener(
      "touchend",
      function (event) {
        touchend[0] = event.changedTouches[0].screenX;
        touchend[1] = event.changedTouches[0].screenY;
        handleSwipe();
      },
      false
    );
    if (data.left) {
      this.left = data.left;
    }
    if (data.right) {
      this.right = data.right;
    }
    if (data.top) {
      this.top = data.top;
    }
    if (data.bottom) {
      this.bottom = data.bottom;
    }
  }
  handleSwipe() {
    let xdif = touchstart[0] - touchend[0];
    let ydif = touchstart[1] - touchend[1];
    if (xdif ** 2 > ydif ** 2) {
      if (xdif < -20) {
        this.right();
      }
      if (xdif > 20) {
        this.left();
      }
    } else {
      if (ydif < -20) {
        this.top();
      }
      if (ydif > 20) {
        this.bottom();
      }
    }
  }
}

// * get screen size code
// ! removed window.inner[Width/Height] (coz it takes all the higth including scroll bar height/width)
var w =
  document.body.clientWidth ||
  document.documentElement.clientWidth;
var h =
  document.body.clientHeight ||
  document.documentElement.clientHeight;

// * event listeners
window.onload = (e) => {
  navTextAnim(e);
  navBarAnim(e);
  heroScroll(e);
};

window.onscroll = (e) => {
  navBarAnim(e);
};

window.onresize = (e) => {
  updateWidHig(e);
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

// ! functoin for hero scroll
function heroScroll(e) {
  let imageSlider = document.querySelector("#imgcontainer");
  let total = document.querySelectorAll(".slideimg").length;
  let counter = 1;
  setInterval(() => {
    if (counter > total - 1) {
      counter = 0;
    }
    imageSlider.scrollTo({
      top: 0,
      left: w * counter,
      behavior: "smooth",
    });
    counter++;
  }, 2000);
}
