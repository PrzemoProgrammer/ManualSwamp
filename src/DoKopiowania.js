
    // ! IMAGE / SPRITE /////////
    this.background = this.add
    .image(0, 0, "background")
    .setOrigin(0, 0)
    .setDisplaySize(this.gw, this.gh);
    
    
    
    // ! RANDOM NUMBER ///////////
    this.randomNumber =  Math.floor(Phaser.Math.Between(0, 9))
    
    
    
    // ! ANIMS /////////////////
    this.anims.create({
      key: "cannon",
      frames: "cannon",
      frameRate: 10,
      repeat: 0,
    });
    
    // ? ///////////
    this.penguin.play("penguin-death")
    .once("animationcomplete", () => {
    
    });
    
    // ? ///////////
    .on('animationupdate', (anim, frame) => {   
        this.character.off('animationupdate')
      })
    
    
    
    // ! TEXT /////////////////
    this.penguinsLeftText = this.add
      .text(
        this.gw / 2 - 20,
        75,
        "Penguins left: " + this.penguinsToKillCount,
        {
          fontFamily: "LuckiestGuy",
          fontSize: "30px",
          color: "#FF0000",
          stroke: "#000000",
          strokeThickness: 5,
          shadow: { blur: 0, stroke: false, fill: false },
        }
      )
      .setOrigin(0.5);
    
    
    
    // ! SOUND ///////////////
      this.bazookaShootAudio = this.sound.add('bazookaShoot')
      this.bazookaShootAudio.volume = 0.3
    
      // ? ///////////
      this.bazookaShootAudio.play() 
    
      }
    
    
    // ! TIME ///////////////
      setTimeout(() => {
        // this.hudScene.healthBar.getDamage()
     }, 2000);
    
     //////////////////////////
     setInterval(func,1000)
    /////////////////////////
    var timer = scene.time.addEvent({
      delay: 500,  
      callback: callback,
      //args: [],
      callbackScope: thisArg,
      loop: true
    });
    
    
     // ! SCENE ///////////////
    //odwołanie do sceny jak trzeba się do niej odwołać po jakimś czasie (po zrobieni creatów)
     this.hudScene = this.scene.get('HudScene');
    
    // odwołanei do sceny w trzeba się do niej odwołać podczas robienia creatów
     this.hudScene.events.on("create", )
    
    
      this.scene.start("HudScene")
    
