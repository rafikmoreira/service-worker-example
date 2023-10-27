import { Message, Messages } from "./worker/index";

const numberText = document.querySelector("#number") as HTMLSpanElement;

const worker = new Worker(new URL("./worker/index.ts", import.meta.url), {
  type: "module",
  name: "CountdownWorker",
});

if (window != undefined) {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register(new URL("./worker/index.ts", import.meta.url), {
        type: "module",
      })
      .then((registration) => {
        worker.onmessage = (event) => {
          numberText.textContent = event.data;
        };
      })
      .catch((error) => {
        console.log("Erro ao registrar o Service Worker:", error);
      });
  }
}

const startButton = document.querySelector("#start") as HTMLButtonElement;
const stopButton = document.querySelector("#stop") as HTMLButtonElement;
const pauseButton = document.querySelector("#pause") as HTMLButtonElement;
const resumeButton = document.querySelector("#resume") as HTMLButtonElement;
const resetButton = document.querySelector("#reset") as HTMLButtonElement;
const blockThreadButton = document.querySelector(
  "#block-thread"
) as HTMLButtonElement;

startButton.addEventListener("click", () => {
  worker.postMessage({
    type: Messages["START"],
  } as Message);
});

stopButton.addEventListener("click", () => {
  worker.postMessage({
    type: Messages["STOP"],
  } as Message);
});

pauseButton.addEventListener("click", () => {
  worker.postMessage({
    type: Messages["PAUSE"],
  } as Message);
});

resumeButton.addEventListener("click", () => {
  worker.postMessage({
    type: Messages["RESUME"],
  } as Message);
});

resetButton.addEventListener("click", () => {
  worker.postMessage({
    type: Messages["RESTART"],
  } as Message);
});

blockThreadButton.addEventListener("click", () => {
  alert("Thread bloqueada, vamos parar o processo do contador? 🤔");
});
