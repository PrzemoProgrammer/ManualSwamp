class Rubbish extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);
    this.scene = scene;
    this.maxX = x;
    this.maxY = y;
    this.sprite = sprite;

    this.speed = Math.floor(Phaser.Math.Between(90000, 20000));
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this);
  }

  move(player) {
    this.swimTween = this.scene.tweens.add({
      targets: this,
      y: player.y,
      x: player.x,
      duration: this.speed,
    });
  }

  setRandomPosition(w, h) {
    let randomNumber = Phaser.Math.Between(0, 1);
    let minX = null;
    let maxX = null;

    switch (randomNumber) {
      case 0:
        (minX = 50), (maxX = 150);
        break;
      case 1:
        (minX = w - 150), (maxX = w - 50);
        break;
    }
    this.x = Phaser.Math.Between(minX, maxX);
    this.y = Phaser.Math.Between(500, 1000);
  }

  disappearing(cb) {
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      duration: 1500,
      onComplete() {
        cb();
      },
    });
  }
}
