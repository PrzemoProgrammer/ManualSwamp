class HealthBar {
  constructor(scene, x, y) {
    this.scene = scene;
    this.x = x;
    this.y = y;

    // this.hits = 0;
    this.life = this.addLife();
    this.lifeCount = this.life.length;

    this.text = this.scene.add.text(this.x, this.y, "ENERGY", {
      fontFamily: "ESCAPE",
      fontSize: "70px",
      color: "#FFFFFF",
      stroke: "#000000",
      strokeThickness: 5,
      shadow: { blur: 0, stroke: false, fill: false },
    });

    // this.energyBar = this.scene.add
    //   .sprite(
    //     this.text.x + this.text.displayWidth + 30,
    //     this.text.y + this.text.displayHeight / 2 - 7,
    //     this.sprite
    //   )
    //   .setOrigin(0, 0.5)
    //   .setScale(1.2);
  }

  addLife() {
    const life = [];

    for (let i = -1; i < 2; i++) {
      const lifeImg = this.scene.add
        .sprite(100 * i + 400, 70, "life")
        .setScale(1.5)
        .setDepth(2);

      this.scene.tweens.add({
        targets: lifeImg,
        scale: 1.3,
        yoyo: true,
        repeat: -1,
        duration: 1000,
      });
      life.push(lifeImg);
    }
    return life;
  }

  getDamage(cb) {
    if (this.isDead()) {
      console.log(1);
      cb();
      return;
    }
    this.life[this.lifeCount - 1].setAlpha(0.2);
    this.lifeCount--;
  }

  heal() {
    if (this.lifeCount === this.life.length) return;
    this.lifeCount++;
    this.life[this.lifeCount - 1].setAlpha(1);
  }

  isDead() {
    return this.lifeCount - 1 === 0;
  }

  // updateTexture() {
  //   let texture = null;
  //   switch (this.hits) {
  //     case 0:
  //       texture = "powerBar1";
  //       break;
  //     case 1:
  //       texture = "powerBar2";
  //       break;
  //     case 2:
  //       texture = "powerBar3";
  //       break;
  //     case 3:
  //       texture = "powerBar4";
  //       break;
  //     case 4:
  //       texture = "powerBar5";
  //       break;
  //   }
  //   this.energyBar.setTexture(texture);
  // }

  // energyUP() {
  //   if (this.isFull()) return;
  //   this.hits--;
  //   this.updateTexture();
  // }

  // isFull() {
  //   return this.hits === 0;
  // }

  // getDamage(cb) {
  //   if (this.isDead()) {
  //     cb();
  //     return;
  //   }
  //   this.hits++;
  //   this.updateTexture();
  // }
}
