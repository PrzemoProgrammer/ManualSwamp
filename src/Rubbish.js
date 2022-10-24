class Rubbish extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.scene = scene;
    this.maxX = x;
    this.maxY = y;

    this.setTexture(this.randomSkin());

    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this);

    this.body.allowGravity = false;
    this.body.immovable = true;

    this.body.width = 140;
    this.body.offset.x = 70;

    this.body.height = 200;
    this.body.offset.y = 90;

    // console.log(this);
  }

  move() {
    this.x -= 6.5;
  }

  randomSkin() {
    let randomNumber = Math.floor(Phaser.Math.Between(0, 5));
    let skin = null;
    switch (randomNumber) {
      case 0:
        skin = "cd-submerged";
        break;
      case 1:
        skin = "usb-submerged";
        break;
      case 2:
        skin = "circuit-submerged";
        break;
      case 3:
        skin = "floppydisc-submerged";
        break;
      case 4:
        skin = "pc-submerged";
        break;
      case 5:
        skin = "ladder";
        break;
    }
    return skin;
  }
}
