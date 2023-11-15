import gsap from "gsap";

/**
 * @callback cbFunction
 * @returns {void}
 */

/**
 * @typedef {object} AppType
 * @property {number} pageNumber
 * @property {number} _maxPage
 * @property {URLSearchParams} urlParams
 */

/** @type {AppType} */
export class App {
    /**
     *
     * @returns {void}
     */
    static setUrlParams() {
        if (!this.urlParams.has("page")) {
            console.log("setParams");
            this.urlParams.set("page", this.pageNumber.toString());
            window.history.replaceState(
                null,
                null,
                "?" + this.urlParams.toString()
            );
            return;
        }

        if (this.urlParams.get("page") != this.pageNumber.toString()) {
            console.log(this.pageNumber);
            this.urlParams.set("page", this.pageNumber.toString());
            window.history.replaceState(
                null,
                null,
                "?" + this.urlParams.toString()
            );
        }
    }

    /**
     * @param {number} [pageOffset]
     * @returns {void}
     */
    static switchPage(pageOffset = 0) {
        this.pageNumber += pageOffset;
        if (this.pageNumber > this._maxPage) {
            this.pageNumber = 1;
        } else if (this.pageNumber < 1) {
            this.pageNumber = this._maxPage;
        }
        gsap.to("#include", {
            x: (-pageOffset / Math.abs(pageOffset)) * 200,
            opacity: 0,
            onComplete: () => {
                if (this.pageNumber == this._maxPage) {
                    $(".Arrow:last-child").css("visibility", "hidden");
                } else {
                    $(".Arrow:last-child").css("visibility", "visible");
                }

                if (this.pageNumber == 1) {
                    $(".Arrow:first-child").css("visibility", "hidden");
                } else {
                    $(".Arrow:first-child").css("visibility", "visible");
                }

                let include = document.querySelector("include");
                let file = `./${this.pageNumber}.html`;
                load_file(file, (text) => {
                    include.innerHTML = text;
                    gsap.fromTo(
                        "#include",
                        {
                            x: (pageOffset / Math.abs(pageOffset)) * 200,
                            opacity: 0,
                        },
                        { x: 0, opacity: 1 }
                    );
                    this.setUrlParams();
                });
                function load_file(filename, callback) {
                    fetch(filename)
                        .then((response) => response.text())
                        .then((text) => callback(text));
                }

                // $("#include").load(`./${this.pageNumber}.html`, () => {
                //     gsap.fromTo(
                //         "#include",
                //         {
                //             x: (pageOffset / Math.abs(pageOffset)) * 200,
                //             opacity: 0,
                //         },
                //         { x: 0, opacity: 1 }
                //     );
                //     this.setUrlParams();
                // });
            },
        });
    }

    /**
     * @returns {void}
     */
    static onStart() {
        this.pageNumber = 1;
        this._maxPage = 4;
        this.urlParams = new URLSearchParams(window.location.search);

        if (this.urlParams.has("page")) {
            this.pageNumber = Number(this.urlParams.get("page"));
        }
        this.setUrlParams();

        if (document.readyState !== "complete") {
            document.getElementById("indicator").style.display = "block";
        } else {
            setTimeout(() => {
                $("#indicator").fadeOut("medium", () => {
                    $("main").fadeIn("medium", () => {
                        this.switchPage();
                        $("#include").css("opacity", 1);
                        this.init();
                    });
                });
            }, 500);
        }
    }

    static init() {
        document
            .querySelector(".Arrow:first-child")
            .addEventListener("click", this.switchPage.bind(this, -1));
        document
            .querySelector(".Arrow:last-child")
            .addEventListener("click", this.switchPage.bind(this, 1));
        addEventListener("keydown", (e) => {
            switch (e.key) {
                case "Enter":
                    this.switchPage(1);
                    break;
                case "ArrowRight":
                    this.switchPage(1);
                    break;
                case "ArrowLeft":
                    this.switchPage(-1);
                    break;
                default:
                    break;
            }
        });
    }
}
