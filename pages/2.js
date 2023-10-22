/**
 *
 * @param {IntersectionObserverEntry[]} entries
 * @param {IntersectionObserver} observer
 */
let callback = (entries, observer) => {
	entries.forEach((element) => {
		console.log("observed");

		if (element.isIntersecting) {
			$(element.target).addClass("show");
			observer.unobserve(element.target);
		}
	});
};

let options = {
	root: null,
	rootMargin: "-100px",
	threshold: 1,
};

function startup() {
	console.log("fire");
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
