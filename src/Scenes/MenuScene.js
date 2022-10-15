class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  preload() {
    this.load.setPath("./src/assets");
    this.load.image("background", "background.png");
    this.load.image("Manual Swamp Logo", "Manual Swamp Logo.png");
    this.load.image("button", "button.png");
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

        "USE YOUR ARROW KEYS TO NAVIGATE YOUR WAY OUT OF THE DENSE" +
          "TRIANGLE OF THE COMPLEXITY JUNGLE. " +
          "AVOID THOSE PESKY BUGS BUT KEEP AN" +
          "EYE OUT FOR SPOT POWERUPS" +
          "IT'S A RACE AGAINST THE CLOCK",
        { align: "center", font: "30px Arial", color: "black" }
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
