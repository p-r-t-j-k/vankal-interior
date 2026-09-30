const loader=document.getElementById("loader"),nav=document.getElementById("nav"),menuBtn=document.getElementById("menu"),navMenu=document.getElementById("navMenu"),progress=document.getElementById("scrollLine"),glow=document.getElementById("cursorGlow"),stage=document.getElementById("heroStage");
window.addEventListener("load",()=>setTimeout(()=>loader.classList.add("hide"),500));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(e=>io.observe(e));
menuBtn?.addEventListener("click",()=>navMenu.classList.toggle("open"));
navMenu?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>navMenu.classList.remove("open")));

let ticking=false;
function scrollFX(){
 const y=scrollY,max=document.documentElement.scrollHeight-innerHeight;
 progress.style.height=`${Math.min(100,y/max*100)}%`;
 nav.classList.toggle("scrolled",y>40);
 document.querySelectorAll("[data-parallax]").forEach(el=>{
   const speed=parseFloat(el.dataset.parallax||0);
   el.style.transform=`translate3d(0,${y*speed}px,0)`;
 });
 const hero=document.querySelector(".hero");
 if(hero&&y<innerHeight*1.15){
   const fade=Math.max(.15,1-y/(innerHeight*.9));
   hero.querySelector(".hero-copy").style.opacity=fade;
   hero.querySelector(".hero-copy").style.transform=`translate3d(0,${y*-.035}px,0)`;
   stage.style.transform=`translate3d(0,${y*-.018}px,0)`;
 }
 ticking=false;
}
window.addEventListener("scroll",()=>{if(!ticking){requestAnimationFrame(scrollFX);ticking=true}},{passive:true});scrollFX();

if(stage&&matchMedia("(pointer:fine)").matches){
 const cards=[...stage.querySelectorAll(".image-card")];
 stage.addEventListener("pointermove",e=>{
   const r=stage.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
   cards.forEach((c,i)=>{
     const d=+c.dataset.depth||10;
     const base=i===0?"rotate(7deg)":i===1?"rotate(-5deg)":"rotate(2.5deg)";
     c.style.transform=`${base} translate3d(${x*d}px,${y*d}px,${d*2}px)`;
   });
   glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px";glow.style.opacity=".9";
 });
 stage.addEventListener("pointerleave",()=>{cards[0].style.transform="rotate(7deg) translateZ(-80px)";cards[1].style.transform="rotate(-5deg) translateZ(10px)";cards[2].style.transform="rotate(2.5deg) translateZ(80px)";glow.style.opacity="0"});
}
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{const el=document.querySelector(a.getAttribute("href"));if(el){e.preventDefault();el.scrollIntoView({behavior:"smooth",block:"start"})}}));
