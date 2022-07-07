/// <reference lib="dom" />

import "./index.ts";
const a = "Hello World!";
const el = <HTMLElement> document.querySelector("#app");
el.innerText = a;
el.style.display = "flex";
el.style.justifyContent = "center";
el.style.alignItems = "center";
el.style.minHeight = "68vh";
el.style.fontSize = "32px";
