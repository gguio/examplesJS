import { moveOut, moveIn } from "./loader.js";

const mPage = 2;

/**
 *
 * @param {number} pageNumber
 * @param {number} [maxPage=mPage]
 */
function switchPage(pageNumber, maxPage = mPage) {
	moveOut("main", () => {
		const link = `pages/${pageNumber}.html`;
		$("#include").load(link);

		if (pageNumber >= maxPage) {
			$(".Arrow:last-child").css("visibility", "hidden");
		} else {
			$(".Arrow:last-child").css("visibility", "visible");
		}

		if (pageNumber == 1) {
			$(".Arrow:first-child").css("visibility", "hidden");
		} else {
			$(".Arrow:first-child").css("visibility", "visible");
		}
	});
	setTimeout(() => {
		moveIn("main");
	}, 500);
}

$(function () {
	let currPage = 1;

	if (currPage == 1) {
		$(".Arrow:first-child").css("visibility", "hidden");
		$("#include").load("pages/1.html");
	} else {
		$(".Arrow:first-child").css("visibility", "visible");
	}

	$(".Arrow:last-child").on("click", function () {
		currPage += 1;
		switchPage(currPage);
	});
	$(".Arrow:first-child").on("click", function () {
		currPage -= 1;
		switchPage(currPage);
	});
});
