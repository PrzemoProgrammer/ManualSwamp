class Timer {
  constructor(scene, x, y) {
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.minutes = 0;
    this.seconds = 0;

    this.timeText = this.scene.add
      .text(this.x, this.y, "TIME ", {
        fontFamily: "ESCAPE",
        fontSize: "70px",
        color: "#FFFFFF",
        stroke: "#000000",
        strokeThickness: 5,
        shadow: { blur: 0, stroke: false, fill: false },
      })
      .setDepth(30);

    this.startTime = new Date();
    this.timeElapsed = 0;
    this.createTimer();
  }

  update() {}

  createTimer() {
    this.timeLabel = this.scene.add
      .text(
        this.timeText.x + this.timeText.displayWidth,
        this.timeText.y,
        "00:00",
        { font: "70px ESCAPE", fill: "#fff" }
      )
      .setDepth(29);
  }

  updateTimer() {
    this.currentTime = new Date();
    this.timeDifference = this.startTime.getTime() - this.currentTime.getTime();

    this.timeElapsed = Math.abs(this.timeDifference / 1000);
    this.timeRemaining = this.timeElapsed;

    this.getMinutes();
    this.getSeconds();

    this.timeLabel.text = this.result;

    // if (me.timeElapsed >= me.totalTime) {
    //Do what you need to do
    //   }
  }

  getMinutes() {
    this.minutes = Math.floor(this.timeElapsed / 60);
    this.result = this.minutes < 10 ? "0" + this.minutes : this.minutes;
  }

  getSeconds() {
    this.seconds = Math.floor(this.timeElapsed) - 60 * this.minutes;
    this.result += this.seconds < 10 ? ":0" + this.seconds : ":" + this.seconds;
  }
}
