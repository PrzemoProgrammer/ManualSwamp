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

        this.load.image(
          `Character Walking ${i}${j}`,
          `Walking Character ${i}/0${j}.png`
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
    const charID =
      new URLSearchParams(window.location.search).get("charid") || "1";

    this.gw = this.game.config.width;
    this.gh = this.game.config.height;

    for (let i = 1; i <= 4; i++) {
      const frames = [];
      const frames2 = [];
      for (let j = 1; j <= 6; j++) {
        frames.push({ key: `Character ${i}${j}`, frame: null });
        frames2.push({ key: `Character Walking ${i}${j}`, frame: null });
      }

      this.anims.create({
        key: `Character ${i} swim`,
        frames,
        frameRate: 10,
        repeat: -1,
      });

      this.anims.create({
        key: `Character ${i} Walking`,
        frames: frames2,
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
      `Character ${charID} swim`,
      `Character ${charID} Walking`
    );
    this.addGarbage();
    this.addLadder();
    this.addArrowDetector();
    this.setClickAble();
    this.addLifebuoys();
    this.timer = new Timer(this, 40, 40);

    this.playerLadderDistance = this.getDistance(this.player, this.ladder);
    this.ladderStepDistance = this.playerLadderDistance / HITS_TO_WIN;
  }

  update() {
    this.timer.updateTimer();
    this.rubbish.forEach((junk) => {
      if (Phaser.Math.Distance.BetweenPoints(junk, this.player) <= 140) {
        if (this.player.life == 0) {
          LOSE_SERVER_REQUEST(this.timer.result);
          this.scene.start("EndScene");
          return;
        }

        if (junk.moveStop) return;
        junk.moveStop = true;
        junk.swimTween.remove();
        junk.disappearing(() => junk.destroy());

        if (this.isWin) return;

        this.player.life--;
        this.ladder.x += this.ladderStepDistance;

        // if (junk.moveStop) return;
        // console.log("hit");
        // junk.moveStop = true;
        // this.player.life--;
        // junk.swimTween.stop();
        // junk.disappearing(() => {
        //   junk.setAlpha(1);
        //   junk.swimTween.remove();
        //   junk.setRandomPosition(this.gw, this.gh);
        //   junk.move(this.player);
        //   if (junk.x <= this.player.x) {
        //     junk.setFlipX(true);
        //   }
        // });
      }
    });

    this.updateDepth();
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
    if (skin === "crocSprite") {
      junk.play(skin).once("animationcomplete", () => {
        junk.playReverse(skin);
      });
    }
    junk.setRandomPosition(this.gw, this.gh);
    junk.move(this.player);

    if (junk.x <= this.player.x) {
      junk.setFlipX(true);
    }
  }

  addGarbage() {
    for (let i = 0; i < RUBBISH_COUNT; i++) {
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
    this.setRandomRubbishToLowestSpeed();
  }

  addLadder() {
    this.ladder = this.add.image(this.gw / 2 + 600, 280, "ladder");
  }

  addArrowDetector() {
    this.arrowDetector = new ArrowDetector(this, this.gw / 2, this.gh - 100);
  }

  setRandomRubbishToLowestSpeed() {
    let randomIndex = Phaser.Math.Between(0, this.rubbish.length - 1);
    this.rubbish[randomIndex].swimTween.remove();
    this.rubbish[randomIndex].speed = SLOWEST_RUBBISH_PATH_DURATION;
    this.rubbish[randomIndex].move(this.player);
  }

  setClickAble() {
    this.input.on("pointerdown", (pointer) => {
      if (this.isWin) return;
      if (
        this.arrowDetector.arrow.angle <= 10 &&
        this.arrowDetector.arrow.angle >= -10
      ) {
        this.moveLadder();
      } else {
        this.arrowDetector.arrowTween.restart();
      }
    });
  }

  getDistance(object1, object2) {
    return Phaser.Math.Distance.BetweenPoints(object1, object2);
  }

  moveLadder() {
    if (this.ladder.x >= this.player.x + 50) {
      this.ladder.x -= this.ladderStepDistance;
    } else {
      this.isWin = true;
      this.player.goUp(() => {
        this.scene.start("EndScene");
      });
      WIN_SERVER_REQUEST(this.timer.result);
      // AJAX REQUEST PLAYER WIN
    }
  }

  addLifebuoy() {
    const lifebuoy = new Lifebuoy(this, this.gw, this.gh);
    lifebuoy.setRandomPosition(this.gw, this.gh);
    lifebuoy.timeToDestroy(LIFEBUOY_LIVE_DURATION);
    lifebuoy.onClick(() => {
      lifebuoy.destroy();
      this.arrowDetector.slow();
      this.returnArrowSpeed();
    });
  }

  addLifebuoys() {
    this.time.addEvent({
      delay: LIFEBUOY_SPAWN_RATE,
      callback: () => this.addLifebuoy(),
      loop: true,
    });
  }

  returnArrowSpeed() {
    this.time.addEvent({
      delay: LIFEBOUY_EFFECT_DURATION,
      callback: () => this.arrowDetector.returnSpeed(),
      loop: true,
    });
  }

  updateDepth() {
    this.rubbish.forEach((junk) => junk.setDepth(junk.y));
    this.player.setDepth(this.player.y);
  }
}
