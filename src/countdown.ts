import { Message, Messages } from "./worker/index";

export class Countdown {
  private numberText: HTMLSpanElement;
  private worker: Worker;

  constructor() {
    this.numberText = document.querySelector("#number") as HTMLSpanElement;
    this.worker = new Worker(new URL("./worker/index.ts", import.meta.url), {
      type: "module",
      name: "CountdownWorker",
    });
    this.registerServiceWorker();
    this.addEventListeners();
  }

  private registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register(new URL("./worker/index.ts", import.meta.url), {
          type: "module",
        })
        .then((registration) => {
          this.worker.onmessage = (event) => {
            this.numberText.textContent = event.data;
          };
        })
        .catch((error) => {
          console.log("Erro ao registrar o Service Worker:", error);
        });
    }
  }

  private addEventListeners() {
    const startButton = document.querySelector("#start") as HTMLButtonElement;
    const stopButton = document.querySelector("#stop") as HTMLButtonElement;
    const pauseButton = document.querySelector("#pause") as HTMLButtonElement;
    const resumeButton = document.querySelector("#resume") as HTMLButtonElement;
    const resetButton = document.querySelector("#reset") as HTMLButtonElement;
    const blockThreadButton = document.querySelector(
      "#block-thread"
    ) as HTMLButtonElement;

    startButton.addEventListener("click", () => {
      this.worker.postMessage({
        type: Messages["START"],
      } as Message);
    });

    stopButton.addEventListener("click", () => {
      this.worker.postMessage({
        type: Messages["STOP"],
      } as Message);
    });

    pauseButton.addEventListener("click", () => {
      this.worker.postMessage({
        type: Messages["PAUSE"],
      } as Message);
    });

    resumeButton.addEventListener("click", () => {
      this.worker.postMessage({
        type: Messages["RESUME"],
      } as Message);
    });

    resetButton.addEventListener("click", () => {
      this.worker.postMessage({
        type: Messages["RESTART"],
      } as Message);
    });

    blockThreadButton.addEventListener("click", () => {
      alert("Thread bloqueada, vamos parar o processo do contador? 🤔");
    });
  }
}
