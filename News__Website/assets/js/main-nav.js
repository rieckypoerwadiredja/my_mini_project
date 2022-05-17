const nav = document.querySelector(".nav");

//  Add event listener to nav
// to dropdown menu
nav.querySelector(".dropdown").addEventListener("click", function (e) {
  e.preventDefault(); // for not to refresh the page, because it is a link tag a
  nav.querySelector(".dropdown-icon").classList.toggle("open--dropdown");
  nav.querySelector(".dropdown-container").classList.toggle("open--dropdown");
});

nav.querySelectorAll(".list-menu").forEach((list) => {
  line(list)
  list.addEventListener("click", () => {
    // remove class open--dropdown
    nav.querySelectorAll(".list-menu").forEach((list) => {
      if (list.classList.contains("page--active"))
        list.classList.remove("page--active");
    });

    // add class remove open--dropdown on click
    if (!list.classList.contains("page--active"))
      list.classList.add("page--active");

    if (list.classList.contains("page--active")) {
      line(list);
    }


  });
});

function line(list) {
  // border-bottom on active page
  const navLine = document.querySelector(".bottom-nav .under-line");

  let padding = getComputedStyle(list, null).getPropertyValue("padding-left");
  let listWidth = list.getBoundingClientRect().width; // get width of list
  navLine.style.width = `${listWidth}px`;

  let listLeft = list.getBoundingClientRect().x; // get left position of list
  listLeft = parseInt(listLeft);
  let position = parseInt(listLeft) - parseInt(padding) - 10; // get position of list

  navLine.style.left = `${position}px`;
}

// Add event on scroll to nav

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.classList.add("active--nav");
  } else {
    nav.classList.remove("active--nav");
  }
});