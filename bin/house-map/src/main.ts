import { App } from "house-map/App";

const container = document.getElementById("container");
const app = new App();
container.appendChild(app.element());
window.addEventListener("DOMContentLoaded", () => app.init());
