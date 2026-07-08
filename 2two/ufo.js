// Ugrimuu - UFO rendszer

const UFO = {

    active: false,

    x: -150,
    y: 25,

    width: 80,

    abductionTime: 0,

    maxAbductionTime: 180, // kb. 3 másodperc 60 FPS mellett


    init() {
        this.reset();
        console.log("UFO rendszer betöltve");
    },


    reset() {

        this.active = false;

        this.x = -150;

        this.abductionTime = 0;
    },


    activate() {

        this.active = true;
    },


    update(player, camera) {

        if (!this.active) return;


        let playerScreenX =
            player.x - camera.x;


        // Ha gyorsan fut a tehén, az UFO lemarad
        // Ha lassul, közeledik

        let targetX;


        if (player.speed > 3.5) {

            targetX = -150;

        } 
        else {

            targetX = playerScreenX - 20;
        }


        this.x +=
            (targetX - this.x) * 0.05;



        // Vonósugár találat vizsgálata

        if (
            playerScreenX > this.x - 10 &&
            playerScreenX < this.x + 90 &&
            this.x > 0
        ) {

            this.abductionTime++;


            if (
                this.abductionTime >=
                this.maxAbductionTime
            ) {

                return "CAUGHT";
            }

        } 
        else {

            this.abductionTime =
                Math.max(
                    this.abductionTime - 2,
                    0
                );
        }


        return "OK";
    },



    draw(ctx) {

        if (!this.active) return;


        // Sárga vonósugár

        let gradient =
            ctx.createLinearGradient(
                this.x + 40,
                30,
                this.x + 40,
                250
            );


        gradient.addColorStop(
            0,
            "rgba(255,230,0,0.5)"
        );

        gradient.addColorStop(
            1,
            "rgba(255,230,0,0)"
        );


        ctx.fillStyle = gradient;


        ctx.beginPath();

        ctx.moveTo(
            this.x + 20,
            30
        );

        ctx.lineTo(
            this.x + 60,
            30
        );

        ctx.lineTo(
            this.x + 80,
            250
        );

        ctx.lineTo(
            this.x,
            250
        );


        ctx.closePath();

        ctx.fill();



        // UFO test

        ctx.fillStyle = "#888899";

        ctx.beginPath();

        ctx.ellipse(
            this.x + 40,
            25,
            40,
            13,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();



        // UFO üveg

        ctx.fillStyle = "#00ffff";

        ctx.beginPath();

        ctx.arc(
            this.x + 40,
            20,
            14,
            Math.PI,
            0
        );

        ctx.fill();
    }
};
