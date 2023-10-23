/**
 * @callback cbFunction
 * @returns {void}
 */

/**
 * @typedef {object} AppType
 * @property {number} pageNumber
 * @property {number} _maxPage
 */

/** @type {AppType} */
export class App {
	constructor() {
		this.pageNumber = 1;
		/** @protected */
		this._maxPage = 2;
	}

	/**
	 * @param {string} selector
	 * @param {cbFunction} [onLoad]
	 */
	moveOut(selector, onLoad = null) {
		$(selector).fadeOut("medium", onLoad);
		$("#indicator").fadeIn("medium");
	}

	/**
	 * @param {string} selector
	 */
	moveIn(selector) {
		$("#indicator").fadeOut("medium", () => {
			$(selector).fadeIn("medium");
		});
	}

	/**
	 * @param {number} [page]
	 * @returns {void}
	 */
	switchPage(page = 1) {
		this.pageNumber = page;
		this.moveOut("main", () => {
			const link = `./pages/${this.pageNumber}.html`;
			$("#include").load(link);

			if (this.pageNumber >= this._maxPage) {
				$(".Arrow:last-child").css("visibility", "hidden");
			} else {
				$(".Arrow:last-child").css("visibility", "visible");
			}

			if (this.pageNumber == 1) {
				$(".Arrow:first-child").css("visibility", "hidden");
			} else {
				$(".Arrow:first-child").css("visibility", "visible");
			}
		});
		setTimeout(() => {
			this.moveIn("main");
		}, 500);
	}

	/**
	 * @returns {void}
	 */
	onStart() {
		if (document.readyState !== "complete") {
			document.getElementById("indicator").style.display = "block";
		} else {
			setTimeout(() => {
				this.switchPage();
				this.init();
			}, 3000);
		}
	}

	init() {
		$(".Arrow:first-child").on("click", () => {
			this.pageNumber -= 1;
			this.switchPage(this.pageNumber);
		});
		$(".Arrow:last-child").on("click", () => {
			this.pageNumber += 1;
			this.switchPage(this.pageNumber);
		});
	}
}
