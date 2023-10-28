import { Message, Messages } from "./worker/index";

export class Countdown {
  private _numberText: HTMLSpanElement;
  private _workerUrl: URL;
  private _startButton: HTMLButtonElement;
  private _stopButton: HTMLButtonElement;
  private _pauseButton: HTMLButtonElement;
  private _resumeButton: HTMLButtonElement;
  private _resetButton: HTMLButtonElement;
  private _blockThreadButton: HTMLButtonElement;

  constructor() {
    this._startButton = document.querySelector("#start") as HTMLButtonElement;
    this._stopButton = document.querySelector("#stop") as HTMLButtonElement;
    this._pauseButton = document.querySelector("#pause") as HTMLButtonElement;
    this._resumeButton = document.querySelector("#resume") as HTMLButtonElement;
    this._resetButton = document.querySelector("#reset") as HTMLButtonElement;
    this._blockThreadButton = document.querySelector(
      "#block-thread"
    ) as HTMLButtonElement;

    this._workerUrl = new URL("./worker/counter.ts", import.meta.url);
    this._numberText = document.querySelector("#number") as HTMLSpanElement;
    this.registerServiceWorker();
    this.addEventListeners();
  }

  private registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register(this._workerUrl, {
          type: "module",
        })
        .then((registration) => {
          const worker = new Worker(this._workerUrl);

          worker.onmessage = (event) => {
            this._numberText.textContent = event.data;
          };
        })
        .catch((error) => {
          console.log("Erro ao registrar o Service Worker:", error);
        });
    }
  }

  private addEventListeners() {
    this._startButton.addEventListener("click", () => {
      self.postMessage({
        type: Messages["START"],
      } as Message);
    });

    this._stopButton.addEventListener("click", () => {
      self.postMessage({
        type: Messages["STOP"],
      } as Message);
    });

    this._pauseButton.addEventListener("click", () => {
      self.postMessage({
        type: Messages["PAUSE"],
      } as Message);
    });

    this._resumeButton.addEventListener("click", () => {
      self.postMessage({
        type: Messages["RESUME"],
      } as Message);
    });

    this._resetButton.addEventListener("click", () => {
      self.postMessage({
        type: Messages["RESTART"],
      } as Message);
    });

    this._blockThreadButton.addEventListener("click", () => {
      alert("Thread bloqueada, vamos parar o processo do contador? 🤔");
    });
  }
}
