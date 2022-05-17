// --------------- responsive
const hero = document.querySelector(".hero");
const navSec = document.querySelector(".nav");
const footer = document.querySelector(".footer");
// tempory section
const aboutProject = document.querySelector(".about-project");

function responsive() {
  let width = window.innerWidth;

  if (width <= 550) {
    navSec.querySelector(".bottom-nav").classList.add("flex-center-between");

    // assuming the bug occurs because 
    // the property line doesn't know the new class yet
    const nav = document.querySelector(".nav");
    nav.querySelectorAll(".list-menu").forEach((list) => {
      line(list)
    });
    // footer
    footer.querySelector(".bottom-footer").classList.add("flex-column-reverse");
    footer.querySelector(".section.left").classList.replace("flex-center-evenly-column", "flex-center-center-column");
    footer.querySelector(".lists").classList.replace("flex", "flex-center-center");
    footer.querySelector(".app-section").classList.replace("flex-left-evenly-column", 'flex-center-evenly-column');
    footer.querySelector(".app").classList.add("flex-center-center");
  } else {
    navSec.querySelector(".bottom-nav").classList.remove("flex-center-between");
    // footer
    footer.querySelector(".bottom-footer").classList.remove("flex-column-reverse");
    footer.querySelector(".section.left").classList.replace("flex-center-center-column", "flex-center-evenly-column");
    footer.querySelector(".lists").classList.replace("flex-center-center", "flex");
    footer.querySelector(".app-section").classList.replace("flex-center-evenly-column", 'flex-left-evenly-column');
    footer.querySelector(".app").classList.remove("flex-center-center");
  }

  if (width <= 768) {
    hero.querySelector(".type-content").classList.remove("flex-center-between");
    // tempory section
    aboutProject.classList.add("flex-center-center-column-reverse");
  } else {
    hero.querySelector(".type-content").classList.add("flex-center-between");
    // tempory section
    aboutProject.classList.remove("flex-center-center-column-reverse");
  }
}

responsive(); // when page loads
window.addEventListener("resize", responsive); // when the window is resized, run the responsive function

// ------------ maximum character limit

function limitCharacters(className, limit) {
  const newsDescription = document.querySelectorAll(`.${className}`);
  for (news of newsDescription) {
    let desc = news.textContent; // to get text news description
    if (desc.length > limit) {
      // get the length of the text description

      // 110 characters, and 110++ hidden
      // 110 character + ...
      // character 0 - 100 + ...
      let text = news.textContent.substring(0, limit) + "...";
      news.innerHTML = text;
    }
  }
}


limitCharacters("news-summary", 350)
if (window.innerWidth >= 1080) {
  limitCharacters("title-same-news", 150);
  limitCharacters("desc-news", 150);
  limitCharacters("desc-breaking-news", 100);

} else {
  limitCharacters("title-same-news", 70);
  limitCharacters("desc-news", 115);
  limitCharacters("desc-breaking-news", 50);
}