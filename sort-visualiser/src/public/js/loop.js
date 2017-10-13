export class Loop {
  constructor(ups=60, tickCb) {
    this.ups = ups;
    this.lastTime = (new Date()).getTime();
    this.tickCb = function () {}
    this.renderCb = function () {}
    this.tick = this.tick.bind(this);
    this.render = this.render.bind(this);

    this.step = 1000 / this.ups;

    this.frameId = 0;


    this.requestAnimationFrame = (
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame
    ).bind(window);

    this.cancelAnimationFrame = (
      window.cancelAnimationFrame ||
      window.mozCancelAnimationFrame
    ).bind(window);
  }

  start(tickCb, renderCb) {
    this.tickCb = tickCb;
    this.renderCb = renderCb;
    this.frameId = this.requestAnimationFrame(this.tick);
  }

  stop() {
    this.cancelAnimationFrame(this.frameId);
  }

  tick() {
    this.frameId = this.requestAnimationFrame(this.tick);

    this.currentTime = (new Date()).getTime();
    let delta = this.currentTime - this.lastTime;
    while (delta >= this.step) {
      delta -= this.step;
      this.tickCb(this.step);
    }
    
    this.render(delta / this.step);

    this.lastTime = this.currentTime;
  }

  render(frameRatio) {
    // need a better name for frameRatio
    // it is a percentage of how far into a tick the loop is
    // 8ms into a tick, frameRatio = 0.5
    this.renderCb(frameRatio);
  }
}
