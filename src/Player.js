class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = sprite;

    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this);
    this.setDepth(100);

    this.life = 5;

    this.play("Character 1 swim");
  }

  goUp() {
    this.scene.tweens.add({
      targets: this,
      y: 0 - this.height,
      duration: 2500,
      onComplete: () => {
        console.log("you win");
      },
    });
  }
}
