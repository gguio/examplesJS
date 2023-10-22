/**
 * @callback cbFunction
 * @returns {void}
 */

/**
 *
 * @param {string} selector
 * @param {cbFunction} [onLoad=null]
 */
export function moveOut(selector, onLoad) {
	$(selector).fadeOut("medium", onLoad);
	$("#indicator").fadeIn("medium");
}

/**
 *
 * @param {string} selector
 */
export function moveIn(selector) {
	$("#indicator").fadeOut("medium", () => {
		$(selector).fadeIn("medium");
	});
}

document.onreadystatechange = function () {
	if (document.readyState !== "complete") {
		document.getElementById("indicator").style.display = "block";
	} else {
		setTimeout(() => {
			$("#indicator").fadeOut("medium", function () {
				$("#include").load("pages/1.html");
				$("main").fadeIn("medium");
			});
		}, 3000);
	}
};
