const nav = document.getElementById("nav");
const progress = document.getElementById("progress");
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const hero = document.querySelector(".hero");
const gallery = document.getElementById("heroGallery");
const title = document.querySelector(".display-title");

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  nav.classList.toggle("scrolled", y > 30);
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${Math.min(100, (y / max) * 100)}%`;

  if (hero && y < innerHeight * 1.05) {
    const fade = Math.max(0, 1 - y / (innerHeight * .9));
    title.style.opacity = fade;
    title.style.transform = `translate3d(0,${y * -.08}px,0) scale(${1 - y*.00005})`;
    gallery.style.transform = `translate3d(0,${y * -.035}px,0)`;
  }
}, {passive:true});

menuBtn.addEventListener("click", () => menu.classList.toggle("open"));
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => menu.classList.remove("open")));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, {threshold:.14});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

if (window.matchMedia("(pointer:fine)").matches && gallery) {
  gallery.addEventListener("mousemove", (e) => {
    const r = gallery.getBoundingClientRect();
    const x = (e.clientX-r.left)/r.width-.5;
    const y = (e.clientY-r.top)/r.height-.5;
    gallery.querySelector(".card-front").style.transform = `rotate(${2+x*2}deg) translate3d(${x*12}px,${y*10}px,80px)`;
    gallery.querySelector(".card-mid").style.transform = `rotate(${-6+x*3}deg) translate3d(${x*8}px,${y*8}px,20px)`;
    gallery.querySelector(".card-back").style.transform = `rotate(${8+x*2}deg) translate3d(${x*5}px,${y*5}px,-80px)`;
  });
  gallery.addEventListener("mouseleave", () => {
    gallery.querySelector(".card-front").style.transform = "rotate(2deg) translateZ(80px)";
    gallery.querySelector(".card-mid").style.transform = "rotate(-6deg) translateZ(20px)";
    gallery.querySelector(".card-back").style.transform = "rotate(8deg) translateZ(-80px)";
  });
}
