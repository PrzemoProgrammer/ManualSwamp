const config = {
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },

  scale: {
    mode: Phaser.Scale.FIT,
    width: 5625,
    height: 2161,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [PlayScene],
};

const game = new Phaser.Game(config);
