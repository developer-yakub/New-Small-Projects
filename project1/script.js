var timeout;

const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function firstPageAnimate() {
  const t1 = gsap.timeline();
  t1.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.2,
    ease: Expo.easeInOut,
  })
    .to(".boundingElement", {
      y: "0",
      delay: -1,
      duration: 1.2,
      ease: Expo.easeInOut,
      stagger: 0.2,
    })
    .from("#homefooter", {
      y: "-10",
      opacity: 0,
      duration: 1.5,
      ease: Expo.easeInOut,
      delay: -1,
    });
}

function circlemousefollower(xScale, yScale) {
  window.addEventListener("mousemove", function sendsmousedata(data) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${data.clientX}px,${data.clientY}px) scale(${xScale},${yScale})`;
  });
}

function skewMouseFollower() {
  var xScale = 1;
  var yScale = 1;

  var xPrev = 0;
  var yPrev = 0;

  window.addEventListener("mousemove", function giveData(data) {
    this.clearTimeout(timeout);
    xScale = gsap.utils.clamp(0.8, 1.2, data.clientX - xPrev);
    yScale = gsap.utils.clamp(0.8, 1.2, data.clientY - yPrev);
    xPrev = data.clientX;
    yPrev = data.clientY;

    circlemousefollower(xScale, yScale);

    timeout = setTimeout(function skewchecker() {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${data.clientX}px,${data.clientY}px) scale(1,1)`;
    }, 100);
  });
}

document.querySelectorAll(".elements").forEach(function (elements) {
  var diffRot = 0;
  var rotate = 0;
  elements.addEventListener("mousemove", function (details) {
    var diff = details.clientY - elements.getBoundingClientRect().top;
    diffRot = details.clientX - rotate;
    rotate = details.clientX;
    gsap.to(elements.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: details.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffRot * 0.9),
    });
  });
  elements.addEventListener("mouseleave", function (details) {
    gsap.to(elements.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });
});

circlemousefollower();
firstPageAnimate();
skewMouseFollower();
