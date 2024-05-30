class Lifebuoy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, sprite) {
    super(scene, x, y, "ring1-submerged");
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = sprite;

    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this);

    this.body.allowGravity = false;
    this.body.immovable = true;

    this.body.width = 140;
    this.body.offset.x = 70;

    this.body.height = 200;
    this.body.offset.y = 90;

    // this.setInteractive();
    // this.scene.add.existing(this);
    // this.setScale(0);
    // this.respawnTween();
    // this.setDepth(1000);
  }

  move() {
    this.scene.tweens.add({
      targets: this,
      x: 0,
      duration: 4000,
      onComplete: () => {
        this.destroy();
      },
    });
  }

  // setRandomPosition(w, h) {
  //   let randomNumber = Phaser.Math.Between(0, 1);
  //   let minX = null;
  //   let maxX = null;

  //   switch (randomNumber) {
  //     case 0:
  //       (minX = 50), (maxX = 150);
  //       break;
  //     case 1:
  //       (minX = w - 150), (maxX = w - 50);
  //       break;
  //   }
  //   this.x = Phaser.Math.Between(minX, maxX);
  //   this.y = Phaser.Math.Between(500, 1000);
  // }

  // onClick(cb) {
  //   this.on("pointerdown", () => {
  //     cb();
  //   });
  // }

  // timeToDestroy(time) {
  //   this.scene.time.delayedCall(
  //     time,
  //     () => {
  //       this.scene &&
  //         this.scene.tweens.add({
  //           targets: this,
  //           duration: 1000,
  //           alpha: 0,
  //           onComplete: () => {
  //             this.active && this.destroy();
  //           },
  //         });
  //     },
  //     null,
  //     this
  //   );
  // }

  // respawnTween() {
  //   this.scene.tweens.add({
  //     targets: this,
  //     scale: 1,
  //     duration: 1000,
  //   });
  // }
}
