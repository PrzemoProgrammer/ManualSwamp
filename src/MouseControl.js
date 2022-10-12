class MouseControl {
    constructor(scene){
        this.scene = scene

        this.target = new Phaser.Math.Vector2();

        this.addEvents();
    }

    addEvents(){
        //! /////////////////////////////////////////////////////////////////////////////
        this.scene.input.on('pointerdown', pointer => {

            this.target.x = pointer.worldX - this.scene.player.characterContainer.body.width/2
            this.target.y = pointer.worldY - this.scene.player.characterContainer.body.height

            this.scene.physics.moveToObject(this.scene.player.characterContainer, this.target, this.scene.player.speed)

            this.scene.player.mouseMove(this.target.x)
        })

        //! /////////////////////////////////////////////////////////////////////////////
        this.scene.input.on('pointerup', pointer => {

     
        })

        //! /////////////////////////////////////////////////////////////////////////////
        this.input.on('pointermove', function (pointer) {

            light.x = pointer.x;
            light.y = pointer.y;
    
        });

        //! /////////////////////////////////////////////////////////////////////////////
        sprite.on('pointerover', function (event) {

            this.setTint(0xff0000);
    
        });

        //! /////////////////////////////////////////////////////////////////////////////
        sprite.on('pointerout', function (event) {
    
            this.clearTint();
    
        });
    }

    handleMovement(){
        if(this.target.length() === 0) return

        const distance = Phaser.Math.Distance.BetweenPoints(this.scene.player.characterContainer.body, this.target);

        if(distance < 4) {
            this.scene.player.characterContainer.body.reset(this.target.x, this.target.y);
            this.scene.player.setIdle()
            this.target.reset()
        }
    }
}

export default MouseControl