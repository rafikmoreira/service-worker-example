import { Counter } from "./counter";

const counter = new Counter();

export type Message = {
  type: Messages;
};

export enum Messages {
  START = "start",
  STOP = "stop",
  PAUSE = "pause",
  RESUME = "resume",
  RESTART = "restart",
}

self.addEventListener("install", (event) => {
  console.log("Countdown Service Worker instalado");
});

self.addEventListener("activate", (event) => {
  console.log("Countdown Service Worker ativado.");
});

self.addEventListener("message", (event) => {
  const message = event.data as Message;

  switch (message.type) {
    case Messages["START"]:
      counter.start();
      break;

    case Messages["STOP"]:
      counter.stop();
      break;

    case Messages["PAUSE"]:
      counter.pause();
      break;

    case Messages["RESUME"]:
      counter.resume();
      break;

    case Messages["RESTART"]:
      counter.resetCounter();
      break;
  }
});
