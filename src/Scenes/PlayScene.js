// let score = 0;
// let bestScore = Number(localStorage.getItem("bestScore")) || 0;

class PlayScene extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  preload() {
    this.load.setPath("./src/assets");
    this.load.image("background", "background.png");
    this.load.image("water", "water.png");

    this.load.image("cd", "cd.png");
    this.load.image("cd-submerged", "cd-submerged.png");
    this.load.image("circuit", "circuit.png");
    this.load.image("circuit-submerged", "circuit-submerged.png");
    this.load.image("floppydisc", "floppydisc.png");
    this.load.image("floppydisc-submerged", "floppydisc-submerged.png");
    this.load.image("harddrive", "harddrive.png");
    this.load.image("harddrive-submerged", "harddrive-submerged.png");
    this.load.image("pc", "pc.png");
    this.load.image("pc-submerged", "pc-submerged.png");
    this.load.image("ring1", "ring1.png");
    this.load.image("ring1-submerged", "ring1-submerged.png");
    this.load.image("ring2", "ring2.png");
    this.load.image("ring2-submerged", "ring2-submerged.png");
    this.load.image("usbstick", "usbstick.png");
    this.load.image("usb-submerged", "usb-submerged.png");

    this.load.image("ladder", "ladder.png");
    this.load.image("ripple", "ripple.png");

    this.load.image("Manual Swamp Logo", "Manual Swamp Logo.png");

    //   this.load.spritesheet("spider1Sprite", "spider1Sprite.png", {
    //     frameWidth: 186 / 2,
    //     frameHeight: 99,
    //   });

    //   this.load.audio("bazookaShoot", "audio/bazookaShoot.mp3");
  }

  create() {
    this.gw = this.game.config.width;
    this.gh = this.game.config.height;

    this.addBackground();
    this.addWater();
  }

  update() {}

  addBackground() {
    this.background = this.add.image(0, 0, "background").setOrigin(0, 0);
  }

  addWater() {
    this.water = this.add.image(0, 0, "water").setOrigin(0, 0);
  }
}
