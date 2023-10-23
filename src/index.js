import { App } from "./App.js";
import _ from "lodash";

const app = new App();

document.onreadystatechange = () => {
	app.onStart();
};
