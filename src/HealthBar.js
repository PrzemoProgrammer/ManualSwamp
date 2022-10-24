class HealthBar {
  constructor(scene, x, y, sprite) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = sprite;

    this.hits = 0;

    this.text = this.scene.add.text(this.x, this.y, "ENERGY", {
      fontFamily: "ESCAPE",
      fontSize: "70px",
      color: "#FFFFFF",
      stroke: "#000000",
      strokeThickness: 5,
      shadow: { blur: 0, stroke: false, fill: false },
    });

    this.energyBar = this.scene.add
      .sprite(
        this.text.x + this.text.displayWidth + 30,
        this.text.y + this.text.displayHeight / 2 - 7,
        this.sprite
      )
      .setOrigin(0, 0.5)
      .setScale(1.2);
  }

  updateTexture() {
    let texture = null;
    switch (this.hits) {
      case 0:
        texture = "powerBar1";
        break;
      case 1:
        texture = "powerBar2";
        break;
      case 2:
        texture = "powerBar3";
        break;
      case 3:
        texture = "powerBar4";
        break;
      case 4:
        texture = "powerBar5";
        break;
    }
    this.energyBar.setTexture(texture);
  }

  energyUP() {
    if (this.isFull()) return;
    this.hits--;
    this.updateTexture();
  }

  isDead() {
    return this.hits === 4;
  }

  isFull() {
    return this.hits === 0;
  }

  getDamage(cb) {
    if (this.isDead()) {
      cb();
      return;
    }
    this.hits++;
    this.updateTexture();
  }
}
