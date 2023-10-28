export class Counter {
  private _counter;
  private _isCounting;
  private _interval: number | undefined;

  constructor() {
    this._counter = 0;
    this._isCounting = false;
  }

  increment() {
    this._counter++;
  }

  get counter() {
    return this._counter;
  }

  reset() {
    this._counter = 0;
  }

  toString() {
    return this._counter.toString();
  }

  get isCounting() {
    return this._isCounting;
  }

  start() {
    if (!this.isCounting) {
      this._interval = setInterval(() => {
        this.showCounterValue();
        this._counter++;
        self.postMessage(this._counter);
      }, 1000);
      this._isCounting = true;
    }
  }

  stop() {
    if (this.isCounting) {
      clearInterval(this._interval);
      this._counter = 0;
      this._isCounting = false;
    }
    self.postMessage(this._counter);
  }

  resetCounter() {
    this._counter = 0;
  }

  pause() {
    if (this.isCounting) {
      clearInterval(this._interval);
      this._isCounting = false;
    }
    self.postMessage(this._counter);
  }

  resume() {
    if (!this.isCounting) {
      this._interval = setInterval(() => {
        this.showCounterValue();
        this._counter++;
        self.postMessage(this._counter);
      }, 1000);
      this._isCounting = true;
    }
  }

  private showCounterValue() {
    console.log(
      `Valor do contador ${this._counter}, agora é ${this._counter + 1}`
    );
  }
}
