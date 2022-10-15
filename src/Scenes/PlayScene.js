// let score = 0;
// let bestScore = Number(localStorage.getItem("bestScore")) || 0;

class PlayScene extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  preload() {
    this.load.setPath("./src/assets");
    this.load.image("background", "background.png");
    // this.load.image("water", "water.png");

    this.load.image("cd", "cd.png");
    this.load.image("cd-submerged", "cd-submerged.png");
    this.load.image("circuit", "circuit.png");
    this.load.image("circuit-submerged", "circuit-submerged.png");
    this.load.image("floppydisc", "floppydisc.png");
    this.load.image("floppydisc-submerged", "floppydisc-submerged.png");
    this.load.image("pc", "pc.png");
    this.load.image("pc-submerged", "pc-submerged.png");
    this.load.image("ring1", "ring1.png");
    this.load.image("ring1-submerged", "ring1-submerged.png");
    this.load.image("ring2", "ring2.png");
    this.load.image("ring2-submerged", "ring2-submerged.png");
    this.load.image("usbstick", "usbstick.png");
    this.load.image("usb-submerged", "usb-submerged.png");

    this.load.image("ladder", "ladder.png");
    this.load.image("player", "player.png");
    this.load.image("ripple", "ripple.png");

    this.load.image("arrow", "arrow.png");
    this.load.image("arrowTarget", "arrowTarget.png");
    this.load.image("arrowSwingBox", "arrowSwingBox.png");

    this.load.image("Manual Swamp Logo", "Manual Swamp Logo.png");

    for (let i = 1; i <= 4; i++) {
      for (let j = 1; j <= 6; j++) {
        this.load.image(
          `Character ${i}${j}`,
          `Swimming Character ${i}/0${j}.png`
        );
      }
    }

    this.load.spritesheet("crocSprite", "crocSprite.png", {
      frameWidth: 924 / 3,
      frameHeight: 308,
    });

    // this.load.audio("bazookaShoot", "audio/bazookaShoot.mp3");
  }

  create() {
    this.gw = this.game.config.width;
    this.gh = this.game.config.height;

    for (let i = 1; i <= 4; i++) {
      const frames = [];
      for (let j = 1; j <= 6; j++) {
        frames.push({ key: `Character ${i}${j}`, frame: null });
      }

      const anim = this.anims.create({
        key: `Character ${i} swim`,
        frames,
        frameRate: 10,
        repeat: -1,
      });
    }

    this.rubbish = [];

    this.anims.create({
      key: "crocSprite",
      frames: "crocSprite",
      frameRate: 10,
    });

    this.addBackground();
    // this.addWater();
    this.player = new Player(
      this,
      this.gw / 2,
      this.gh / 2 + 100,
      "Character 1 swim"
    );
    this.addGarbage();
    this.addLadder();
    this.addArrowDetector();
    this.setClickAble();
    this.addLifebuoys();

    this.playerLadderDistance = this.getDistance(this.player, this.ladder);
  }

  update() {
    this.rubbish.forEach((junk) => {
      // console.log(this.player.life);
      if (Phaser.Math.Distance.BetweenPoints(junk, this.player) <= 140) {
        if (this.player.life == 0) {
          // console.log("you lost");
          this.scene.restart();
          return;
        }

        console.log("hit");
        this.player.life--;
        // junk.swimTween.stop();
        // junk.disappearing(() => {});

        junk.swimTween.remove();
        junk.setRandomPosition(this.gw, this.gh);
        junk.move(this.player);
        if (junk.x <= this.player.x) {
          junk.setFlipX(true);
        }
      }
    });
  }

  addBackground() {
    this.background = this.add.image(0, 0, "background").setOrigin(0, 0);
  }

  addWater() {
    this.water = this.add.image(0, 0, "water").setOrigin(0, 0);
  }

  addRubbish(skin) {
    const junk = new Rubbish(this, this.gw, this.gh, skin);
    this.rubbish.push(junk);
    junk.play(skin);
    junk.setRandomPosition(this.gw, this.gh);
    junk.move(this.player);

    if (junk.x <= this.player.x) {
      junk.setFlipX(true);
    }
  }

  addGarbage() {
    for (let i = 0; i <= 5; i++) {
      let skin = null;
      switch (i) {
        case 0:
          skin = "cd-submerged";
          break;
        case 1:
          skin = "usb-submerged";
          break;
        case 2:
          skin = "circuit-submerged";
          break;
        case 3:
          skin = "floppydisc-submerged";
          break;
        case 4:
          skin = "pc-submerged";
          break;
        case 5:
          skin = "crocSprite";
          break;
      }
      this.addRubbish(skin);
    }
    this.setRandomRubbish();
  }

  addLadder() {
    this.ladder = this.add.image(this.gw / 2 + 600, 280, "ladder");
  }

  addArrowDetector() {
    this.arrowDetector = new ArrowDetector(this, this.gw / 2, this.gh - 100);
  }

  setRandomRubbish() {
    let randomIndex = Phaser.Math.Between(0, this.rubbish.length - 1);
    this.rubbish[randomIndex].speed = 120000;
  }

  setClickAble() {
    this.input.on("pointerdown", (pointer) => {
      if (
        this.arrowDetector.arrow.angle <= 10 &&
        this.arrowDetector.arrow.angle >= -10
      ) {
        this.moveLadder();
        console.log("perfect");
      } else {
        console.log("fail");
        this.arrowDetector.arrowTween.restart();
      }
    });
  }

  // setClickAble(lifebuoy) {
  //   lifebuoy.onClick(() => {});
  // }

  getDistance(object1, object2) {
    return Phaser.Math.Distance.BetweenPoints(object1, object2);
  }

  moveLadder() {
    if (this.ladder.x >= this.player.x + 50) {
      this.ladderStepDistance = this.playerLadderDistance / 6;
      this.ladder.x -= this.ladderStepDistance;
    } else {
      this.player.goUp();
      console.log("go up");
    }
  }

  addLifebuoy() {
    const lifebuoy = new Lifebuoy(this, this.gw, this.gh);
    lifebuoy.setRandomPosition(this.gw, this.gh);
    lifebuoy.destroyTimer(5000);
    lifebuoy.onClick(() => {
      lifebuoy.destroy();
      this.arrowDetector.slow();
      this.returnArrowSpeed();

      // this.arrowDetector.arrowTween.updateTo("duration", 10000000000);
      // this.arrowDetector.arrowTween.restart();
      // this.arrowDetector.arrowTween.play();
      console.log("help");
    });
  }

  addLifebuoys() {
    this.time.addEvent({
      delay: 5000,
      callback: () => this.addLifebuoy(),
      loop: true,
    });
  }

  returnArrowSpeed() {
    this.time.addEvent({
      delay: 3000,
      callback: () => this.arrowDetector.returnSpeed(),
      loop: true,
    });
  }
}
