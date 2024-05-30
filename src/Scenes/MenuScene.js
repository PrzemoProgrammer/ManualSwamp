class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  preload() {
    this.load.setPath("./src/assets");
    this.load.image("background", "background.png");
    this.load.image("Manual Swamp Logo", "Manual Swamp Logo.png");
    this.load.image("button", "button.png");
    this.load.image("whiteBackground", "whiteBackground.png");

    this.load.spritesheet("Character 1", "Character 1.png", {
      frameWidth: 1260 / 6,
      frameHeight: 310,
    });

    this.load.spritesheet("Character 2", "Character 2.png", {
      frameWidth: 1320 / 6,
      frameHeight: 330,
    });

    this.load.spritesheet("Character 3", "Character 3.png", {
      frameWidth: 1260 / 6,
      frameHeight: 310,
    });

    this.load.spritesheet("Character 4", "Character 4.png", {
      frameWidth: 1260 / 6,
      frameHeight: 310,
    });
  }

  create() {
    const charID =
      new URLSearchParams(window.location.search).get("charid") || "1";

    this.gw = this.game.config.width;
    this.gh = this.game.config.height;

    this.addAnims();

    // this.selectedSkin = `Character 2`;
    this.selectedSkin = `Character ${charID}`;
    this.addBackground();
    this.addText();
    this.addLogo();
    this.addPlayButton();
    this.addCharacter();
  }

  update() {
    this.moveBackground();
  }

  addLogo() {
    this.add
      .image(this.gw / 2, 40, "Manual Swamp Logo")
      .setOrigin(0.5, 0)
      .setScale(0.2);
  }

  addBackground() {
    this.background = this.add
      .tileSprite(0, 0, 1920, 1080, "background")
      .setOrigin(0, 0);
  }

  moveBackground() {
    this.background.tilePositionX += 5;
  }

  addText() {
    this.addTextBackground();
    this.add
      .text(
        this.gw / 2,
        this.gh / 2,

        "USE YOUR ARROW KEYS TO NAVIGATE YOUR WAY OUT OF THE DENSE" +
          "TRIANGLE OF THE COMPLEXITY JUNGLE. " +
          "AVOID THOSE PESKY BUGS BUT KEEP AN" +
          "EYE OUT FOR SPOT POWERUPS" +
          "IT'S A RACE AGAINST THE CLOCK",
        { align: "center", font: "40px Arial", color: "black" }
      )
      .setOrigin(0.5)
      .setWordWrapWidth(this.gw * 0.6);
  }

  addPlayButton() {
    const playButton = this.add
      .image(this.gw / 2, this.gh - 200, "button")
      .setInteractive()
      .setOrigin(0.5, 1)
      .setScale(1.5);

    playButton.on("pointerdown", () => {
      this.scene.start("PlayScene");
    });
  }

  addTextBackground() {
    this.textBackground = this.add.sprite(
      this.gw / 2,
      this.gh / 2,
      "whiteBackground"
    );
  }

  addCharacter() {
    this.character = this.add
      .sprite(50, this.gh - 500, this.selectedSkin)
      // .sprite(50, this.gh - 500, `Character ${charID}1`)
      .setOrigin(0, 0)
      .setScale(1.5);
    this.character.play(this.character.texture.key + " walk");
  }

  addAnims() {
    this.anims.create({
      key: "Character 1 walk",
      frames: "Character 1",
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "Character 2 walk",
      frames: "Character 2",
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "Character 3 walk",
      frames: "Character 3",
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "Character 4 walk",
      frames: "Character 4",
      frameRate: 10,
      repeat: -1,
    });
  }
}
