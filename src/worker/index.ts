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
      console.log("Starting countdown...");
      counter.start(event);
      break;

    case Messages["STOP"]:
      counter.stop(event);
      break;

    case Messages["PAUSE"]:
      counter.pause(event);
      break;

    case Messages["RESUME"]:
      counter.resume(event);
      break;

    case Messages["RESTART"]:
      counter.resetCounter();
      break;
  }
});
