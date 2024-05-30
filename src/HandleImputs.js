class HandleInputs {
  constructor(scene) {
    this.scene = scene;
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.keySPACE = scene.input.keyboard.addKey("SPACE");

    this.init();
  }

  init() {
    this.initAttackKeys();
  }

  initAttackKeys() {
    this.keySPACE.on("down", () => {
      this.scene.player.jump();
    });
  }

  removeSpace() {
    game.plugins.game.input.keyboard.destroy();
  }
}
