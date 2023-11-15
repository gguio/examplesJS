import { LoremIpsum } from "lorem-ipsum";

/**
 * @callback cb
 * @returns {void}
 */

/**
 *
 * @param {Element} el
 * @param {string} text
 * @param {number} [speed]
 * @param {boolean} [removeBlink]
 * @param {cb} [cb]
 * @returns {void}
 */
const typing = (el, text, speed = 50, removeBlink = true, cb = null) => {
	let oldBlinks = document.querySelectorAll(".blink");
	oldBlinks.forEach((i) => {
		i.parentElement.removeChild(i);
	});

	let textSpan = document.createElement("span");
	textSpan.setAttribute("class", "text");
	el.appendChild(textSpan);
	let blink = document.createElement("span");
	blink.innerText = "|";
	el.appendChild(blink);
	let count = 0;
	let int = setInterval(() => {
		textSpan.innerText += text.charAt(count);
		count += 1;
		if (count >= text.length) {
			clearInterval(int);
			if (removeBlink) {
				el.removeChild(blink);
			}
			blink.setAttribute("class", "blink");
			if (cb) {
				cb();
			}
		}
	}, speed);
};

let lorem = new LoremIpsum({
	sentencesPerParagraph: {
		max: 8,
		min: 4,
	},
	wordsPerSentence: {
		max: 16,
		min: 4,
	},
});

$(() => {
	let h1 = document.querySelector("h1");
	let h1Text = "Эффект напечатанного текста";

	typing(h1, h1Text, 50, false);

	let p1 = document.querySelector(".p1");
	let p1Text =
		"Эффект можно применять одновременно в нескольких местах на странице или вызывать по событию.";
	setTimeout(() => {
		typing(p1, p1Text, 25, false, () => {
			$(".button1").fadeIn("medium");
		});
	}, 3000);

	let button1 = document.querySelector(".button1");
	$(".button1").on("click", () => {
		let newPar = document.createElement("p");
		document.querySelector("#include").insertBefore(newPar, button1);
		typing(newPar, lorem.generateParagraphs(1), 10, false);
	});
});
