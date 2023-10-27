let counter = 0;
let isCounting = false;
let interval: number | undefined = undefined;

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
      if (!isCounting) {
        interval = setInterval(() => {
          console.log(`Valor do contador ${counter}, agora é ${counter + 1}`);
          counter++;
          self.postMessage(counter);
        }, 1000);

        isCounting = true;
      }
      break;

    case Messages["STOP"]:
      if (isCounting) {
        clearInterval(interval);
        counter = 0;
        isCounting = false;
      }
      self.postMessage(counter);
      break;

    case Messages["PAUSE"]:
      if (isCounting) {
        clearInterval(interval);
        isCounting = false;
      }
      self.postMessage(counter);
      break;

    case Messages["RESUME"]:
      if (!isCounting) {
        interval = setInterval(() => {
          console.log(`Valor do contador ${counter}, agora é ${counter + 1}`);
          counter++;
          self.postMessage(counter);
        }, 1000);
        isCounting = true;
      }
      break;

    case Messages["RESTART"]:
      if (isCounting) {
        clearInterval(interval);
        counter = 0;
        interval = setInterval(() => {
          console.log(`Valor do contador ${counter}, agora é ${counter + 1}`);
          counter++;
          self.postMessage(counter);
        }, 1000);
        isCounting = true;
      }
      break;
  }
});
