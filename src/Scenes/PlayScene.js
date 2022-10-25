// let score = 0;
// let bestScore = Number(localStorage.getItem("bestScore")) || 0;

class PlayScene extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  preload() {
    this.load.setPath("./src/assets");
    this.load.image("background", "background.png");

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
    this.load.image("firstPlatform", "firstPlatform.png");

    this.load.image("upperLadder", "upperLadder.png");
    this.load.image("ripple", "ripple.png");
    this.load.image("powerBar1", "powerBar1.png");
    this.load.image("powerBar2", "powerBar2.png");
    this.load.image("powerBar3", "powerBar3.png");
    this.load.image("powerBar4", "powerBar4.png");
    this.load.image("powerBar5", "powerBar5.png");

    this.load.spritesheet(
      "character1Spritesheet",
      "character1Spritesheet.png",
      {
        frameWidth: 1260 / 6,
        frameHeight: 310,
      }
    );

    this.load.image("Manual Swamp Logo", "Manual Swamp Logo.png");
  }

  create() {
    const charID =
      new URLSearchParams(window.location.search).get("charid") || "1";

    this.gw = this.game.config.width;
    this.gh = this.game.config.height;

    this.rubbish = [];
    this.score = 50;

    this.anims.create({
      key: "character1-walk",
      frames: "character1Spritesheet",
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "crocSprite",
      frames: "crocSprite",
      frameRate: 10,
    });

    this.addBackground();

    this.player = new Player(
      this,
      this.gw / 6,
      this.gh / 2 + 120,
      "character1Spritesheet"
    );

    this.addUpperLadders();
    this.addGarbage();
    this.setClickAble();
    this.addLifebuoys();
    this.addHealthBar();
    this.addLifebuoys();
    this.timer = new Timer(this, 40, this.healthBar.y + 70);

    this.handleInputs = new HandleInputs(this);
  }

  update() {
    this.timer.updateTimer(() => {
      this.scene.start("EndScene");
      // AJAX REQUEST HERE
      // this.score
    });

    if (this.player.body.touching.down) {
      this.player.startWalk();
    } else {
      this.player.stop();
    }

    this.moveRubbish();
    if (this.player.isFellDown(this.gh)) {
      this.healthBar.getDamage(() => {
        this.scene.start("DeadScene");
        // AJAX REQUEST HERE
        // this.score
      });
      this.restartPlayerPosition();
      this.updateScore("-");
      console.log(this.score);
    }
    this.moveBackground();
  }

  addBackground() {
    this.background = this.add
      .tileSprite(0, 0, 1920, 1080, "background")
      .setOrigin(0, 0);
  }

  moveBackground() {
    this.background.tilePositionX += 5;
  }

  setClickAble() {
    this.input.on("pointerdown", (pointer) => {});
  }

  addHealthBar() {
    this.healthBar = new HealthBar(this, 40, 30, "powerBar1");
  }

  addGarbage() {
    for (let i = 0; i <= 4; i++) {
      this.addRubbish(550 * i - 100);
    }
    this.setFirstPlatform();
    this.addGarbagePerTime();
  }

  addRubbish(x) {
    let randomLengthX = Math.floor(Phaser.Math.Between(0, 150));
    const junk = new Rubbish(this, x + randomLengthX - 50, 900);

    this.rubbish.push(junk);
    this.physics.add.collider(this.player, junk);
  }

  moveRubbish() {
    this.rubbish.forEach((rubbish) => {
      rubbish.move();
      if (rubbish.x + rubbish.displayWidth < 0) {
        rubbish.destroy();
      }
    });
  }

  addGarbagePerTime() {
    this.time.addEvent({
      delay: 1500,
      callback: () => this.addRubbish(this.gw),
      loop: true,
    });
  }

  setFirstPlatform() {
    let firstRubbish = this.rubbish[0];
    firstRubbish.setTexture("firstPlatform");
    firstRubbish.body.offset.y = 0;
    firstRubbish.y = 900;
    firstRubbish.body.width = 950;
  }

  addLifebuoys() {
    this.time.addEvent({
      delay: 15000,
      loop: true,
      callback: () => {
        this.addLifebuoy(), (this.collisionBlock = false);
      },
    });
  }

  addLifebuoy() {
    const lifebuoy = new Lifebuoy(this, this.gw, 900);
    lifebuoy.move();

    this.physics.add.overlap(this.player, lifebuoy, () => {
      lifebuoy.destroy();
      if (this.collisionBlock) return;
      this.healthBar.energyUP();
      this.updateScore("+");
      console.log(this.score);
      this.collisionBlock = true;
    });
    this.physics.add.collider(this.player, lifebuoy);
  }

  restartPlayerPosition() {
    this.player.setPosition(this.gw / 6, this.gh / 2 - 220);
    this.player.flick();
    this.addPlayerPlatform();
  }

  addPlayerPlatform() {
    const junk = new Rubbish(this, this.player.body.x + 70, 890);
    this.physics.add.collider(this.player, junk);
    this.time.delayedCall(2000, () => {
      junk.destroy();
    });
  }

  updateScore(value) {
    if (
      (this.score === 50 && value === "+") ||
      (this.score === 0 && value === "-")
    )
      return;
    switch (value) {
      case "-":
        this.score -= 10;
        break;
      case "+":
        this.score += 10;
        break;
    }
  }

  addUpperLadder() {
    const upperLadder = new UpperLadder(this, this.gw + 50, 600, "upperLadder");
    this.physics.add.collider(this.player, upperLadder);
    upperLadder.move();
  }

  addUpperLadders() {
    this.time.addEvent({
      delay: 10000,
      loop: true,
      callback: () => {
        this.addUpperLadder();
      },
    });
  }
}
