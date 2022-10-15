class ArrowDetector {
  constructor(scene, x, y, sprite) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = sprite;

    this.area = this.scene.add.sprite(0, 0, "arrowSwingBox").setScale(0.3);
    this.target = this.scene.add
      .sprite(0, this.area.y - 35, "arrowTarget")
      .setScale(0.3);
    this.arrow = this.scene.add
      .sprite(0, this.area.y + 50, "arrow")
      .setAngle(-70)
      .setOrigin(0.5, 1)
      .setScale(0.3);

    this.container = this.scene.add.container(this.x, this.y, [
      this.area,
      this.target,
      this.arrow,
    ]);

    this.arrowAngleMove();
  }

  arrowAngleMove() {
    this.arrowTween = this.scene.tweens.add({
      targets: this.arrow,
      angle: 70,
      yoyo: 1,
      repeat: -1,
      duration: ARROW_SPEED,
    });
  }

  slow() {
    this.arrowTween.setTimeScale(0.5);
  }

  returnSpeed() {
    this.arrowTween.setTimeScale(1);
  }
}
