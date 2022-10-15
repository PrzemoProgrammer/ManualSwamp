class Lifebuoy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, sprite) {
    super(scene, x, y, "ring1-submerged");
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = sprite;

    this.setInteractive();
    this.scene.add.existing(this);
    this.setScale(0);
    this.respawnTween();
    this.setDepth(1000);
  }

  setRandomPosition(w, h) {
    let randomNumber = this.letRandomNumber(0, 1);
    let minX = null;
    let maxX = null;

    switch (randomNumber) {
      case 0:
        (minX = 50), (maxX = w / 4);
        break;
      case 1:
        (minX = w / 2 + w / 3), (maxX = h - 50);
        break;
    }
    this.x = this.letRandomNumber(minX, maxX);
    this.y = this.letRandomNumber(500, 1000);
  }

  letRandomNumber(minX, maxX) {
    return Math.floor(Phaser.Math.Between(minX, maxX));
  }

  onClick(cb) {
    this.on("pointerdown", () => {
      cb();
    });
  }

  timeToDestroy(time) {
    this.scene.time.delayedCall(time, () => this.destroy(), null, this);
  }

  respawnTween() {
    this.scene.tweens.add({
      targets: this,
      scale: 1,
      duration: 1000,
    });
  }
}
