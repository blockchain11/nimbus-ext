// import "@webcomponents/webcomponentsjs/webcomponents-bundle.js";
import App from "./App.svelte";
import * as bg from "../background/main";
import * as browser from "webextension-polyfill";

// customElements.define("my-element", App);

browser.storage.sync.get("options").then((res) => {
  new App({
    target: document.getElementById("app"),
  });
})
