export class TimeoutAction {
  private action: (...args: any[]) => Promise<any>;
  private delay: number;
  private timeout: any;

  constructor(save: (...args: any[]) => Promise<any>, delay: number) {
    this.action = save;
    this.delay = delay;
  }

  public trigger(...args: any[]) {
    if (this.timeout) {
      return this.timeout;
    }
    this.timeout =
      new Promise((resolve, reject) => {
        setTimeout(() => {
          delete this.timeout;
          resolve(this.run(...args));
        }, this.delay);
      });
    return this.timeout;
  }

  private run(...args: any[]) {
    return this.action(...args).then((res) => {
      return res;
    });
  }
}
