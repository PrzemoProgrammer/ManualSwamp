const config = {
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      // gravity: { y: 0 },
      gravity: { y: 2000 },
    },
  },
  parent: "GameCanvas",
  scale: {
    mode: Phaser.Scale.FIT,
    width: 1920,
    height: 1080,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [MenuScene, PlayScene, EndScene, DeadScene],
};

const game = new Phaser.Game(config);
