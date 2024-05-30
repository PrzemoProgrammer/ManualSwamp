class DeadScene extends Phaser.Scene {
  constructor() {
    super("DeadScene");
  }

  create() {
    this.gw = this.game.config.width;
    this.gh = this.game.config.height;
    this.cameras.main.setBackgroundColor(0xffffff);

    this.add
      .image(this.gw / 2, 40, "Manual Swamp Logo")
      .setOrigin(0.5, 0)
      .setScale(0.1);

    this.add
      .text(
        this.gw / 2,
        this.gh / 2,

        "Oh no! The swamp was a bit too tricky to navigate that time around\n" +
          "Why not try again to see if you can make it through to the end (gaining more points as you go)?",
        { align: "center", font: "50px Arial", color: "black" }
      )
      .setOrigin(0.5)
      .setWordWrapWidth(this.gw * 0.8);

    const playButton = this.add
      .image(this.gw / 2, this.gh - 40, "button")
      .setInteractive()
      .setOrigin(0.5, 1);

    playButton.on("pointerdown", () => {
      this.scene.start("PlayScene");
    });
  }

  update() {}
}
