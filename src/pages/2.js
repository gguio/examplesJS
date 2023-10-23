import gsap from "gsap";

/**
 *
 * @param {IntersectionObserverEntry[]} entries
 * @param {IntersectionObserver} observer
 */
let callback = (entries, observer) => {
	entries.forEach((element) => {
		console.log("observed");

		if (!element.isIntersecting) {
			return;
		}

		switch (element.target.classList.value) {
			case "fade-in":
				gsap.to(element.target, { opacity: 1 });
				break;
			case "fade-in moveFromLeft":
				gsap.fromTo(
					element.target,
					{ opacity: 0, x: -200 },
					{ opacity: 1, x: 0 }
				);
				break;
			case "fade-in moveFromRight":
				gsap.fromTo(
					element.target,
					{ opacity: 0, x: 200 },
					{ opacity: 1, x: 0 }
				);
				break;
			default:
				break;
		}
		observer.unobserve(element.target);
	});
};

let options = {
	root: null,
	rootMargin: "-100px",
	threshold: 0.5,
};

function startup() {
	let observer = new IntersectionObserver(callback, options);
	let elements = document.querySelectorAll(".fade-in");
	elements.forEach((el) => {
		observer.observe(el);
	});
}

let listen = setInterval(() => {
	if ($("main").is(":visible")) {
		startup();
		clearInterval(listen);
		console.log("cleared");
	}
}, 500);
