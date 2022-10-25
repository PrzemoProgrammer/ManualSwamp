class UpperLadder extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);
    this.scene = scene;
    this.maxX = x;
    this.maxY = y;

    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this);

    this.body.allowGravity = false;
    this.body.immovable = true;

    //   this.body.width = 140;
    //   this.body.offset.x = 70;

    //   this.body.height = 200;
    //   this.body.offset.y = 90;

    // console.log(this);
  }

  move() {
    this.scene.tweens.add({
      targets: this,
      x: -this.displayWidth,
      duration: 5900,
      onComplete: () => this.destroy(),
    });
  }
}
