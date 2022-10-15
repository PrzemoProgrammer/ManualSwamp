class Rubbish extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);
    this.scene = scene;
    this.maxX = x;
    this.maxY = y;
    this.sprite = sprite;

    this.speed = Math.floor(Phaser.Math.Between(12000, 50000));
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this);

    // this.play(this.sprite);
  }

  move(player) {
    this.swimTween = this.scene.tweens.add({
      targets: this,
      y: player.y,
      x: player.x,
      duration: this.speed,
      onComplete: () => {},
    });
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
    this.y = this.letRandomNumber(500, 1080);
  }

  letRandomNumber(minX, maxX) {
    return Math.floor(Phaser.Math.Between(minX, maxX));
  }

  disappearing(cb) {
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      duration: 2000,
      onComplete() {
        cb();
      },
    });
  }
}
