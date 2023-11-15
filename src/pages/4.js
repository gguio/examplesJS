import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/all";

var height =
	document.documentElement.scrollHeight -
	document.documentElement.clientHeight;
function handleScroll() {
	var winScroll =
		document.body.scrollTop || document.documentElement.scrollTop;

	var scrolled = (winScroll / height) * 100;

	document.getElementById("progressBar").style.width = scrolled + "%";
}

let div = document.createElement("div");
div.setAttribute("class", "progress-bar");
div.setAttribute("id", "progressBar");
document.body.appendChild(div);
addEventListener("scroll", handleScroll);

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

let pathRect = document.querySelector(".path").getBoundingClientRect();

let circle = gsap.timeline({
	scrollTrigger: {
		trigger: ".path",
		start: 0,
		end: "+=" + pathRect.height,
		scrub: true,
		invalidateOnRefresh: true,
	},
});

circle.to(".circle", {
	ease: "none",
	motionPath: {
		path: ".path",
		alignOrigin: [0.5, 0.5],
		align: ".path",
	},
});

let h1Rect = document.querySelector("h1").getBoundingClientRect();
gsap.to("h1", {
	ease: "none",
	blur: 10,
	opacity: 0,
	transform: "translateY(100px)",
	scrollTrigger: {
		trigger: "h1",
		start: `top top+=${h1Rect.top}px`,
		end: "+=200",
		scrub: true,
	},
});
