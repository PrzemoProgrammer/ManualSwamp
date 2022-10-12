class Bottle {
    constructor(scene, x, y, sprite) {
      this.scene = scene;
      this.x = x
      this.y = y
      this.sprite = sprite;
    }
  }
  
  
  class Bottle extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite) {
      super(scene, x, y, sprite);
      this.scene = scene;
      this.x = x
      this.y = y
      this.sprite = sprite;
    }
  }
  }
  
  
  