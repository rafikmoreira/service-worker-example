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
  private _channel: MessageChannel;
  private _counterWorker: ServiceWorker | null = null;

  constructor() {
    this._numberText = document.querySelector("#number") as HTMLSpanElement;
    this._startButton = document.querySelector("#start") as HTMLButtonElement;
    this._stopButton = document.querySelector("#stop") as HTMLButtonElement;
    this._pauseButton = document.querySelector("#pause") as HTMLButtonElement;
    this._resumeButton = document.querySelector("#resume") as HTMLButtonElement;
    this._resetButton = document.querySelector("#reset") as HTMLButtonElement;
    this._blockThreadButton = document.querySelector(
      "#block-thread"
    ) as HTMLButtonElement;

    this._channel = new MessageChannel();
    this._workerUrl = new URL("./worker/index.ts", import.meta.url);

    this.registerServiceWorker();
    this.addEventListeners();
  }

  private registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register(this._workerUrl, {
          type: "module",
        })
        .then(async (registration) => {
          this._channel.port1.onmessage = (event) => {
            const message = event.data as number;
            this._numberText.textContent = message.toString();
          };

          this._counterWorker = registration.active;
        })
        .catch((error) => {
          console.log("Erro ao registrar o Service Worker:", error);
        });
    }
  }

  private addEventListeners() {
    this._startButton.addEventListener("click", () => {
      this._counterWorker?.postMessage(
        {
          type: Messages["START"],
        } as Message,
        [this._channel.port2]
      );
    });

    this._stopButton.addEventListener("click", () => {
      this._counterWorker?.postMessage(
        {
          type: Messages["STOP"],
        } as Message,
        [this._channel.port2]
      );
    });

    this._pauseButton.addEventListener("click", () => {
      this._counterWorker?.postMessage(
        {
          type: Messages["PAUSE"],
        } as Message,
        [this._channel.port2]
      );
    });

    this._resumeButton.addEventListener("click", () => {
      this._counterWorker?.postMessage(
        {
          type: Messages["RESUME"],
        } as Message,
        [this._channel.port2]
      );
    });

    this._resetButton.addEventListener("click", () => {
      this._counterWorker?.postMessage(
        {
          type: Messages["RESTART"],
        } as Message,
        [this._channel.port2]
      );
    });

    this._blockThreadButton.addEventListener("click", () => {
      alert("Thread bloqueada, vamos parar o processo do contador? 🤔");
    });
  }
}
