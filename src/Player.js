class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = sprite;

    this.canJump = false;
    this.canWalk = true;

    this.scene.add.existing(this);
    // this.scene.physics.arcade.enable(this);
    this.scene.physics.world.enableBody(this);

    this.setDepth(100);

    this.body.width = 130;
    this.body.offset.x = 50;

    // this.body.height = 200;

    // this.body.mass = 100;
    // this.body.setMass(100);
    // console.log(this);

    this.life = PLAYER_LIVES;
  }

  jump() {
    if (!this.canJump) return;
    this.body.setVelocityY(-1200);
    this.canJump = false;
    this.canWalk = true;
  }

  startWalk() {
    if (!this.canWalk) return;

    this.play("character1-walk");
    this.canWalk = false;
    this.canJump = true;
  }

  stopWalk() {
    this.anims.stop();
  }

  isFellDown(gameHeight) {
    return this.y >= gameHeight + 1000;
  }

  flick() {
    this.scene.tweens.add({
      targets: this,
      alpha: 0.3,
      duration: 400,
      yoyo: true,
      repeat: 1,
    });
  }
}
