// Ugrimuu - Játékos (tehén) kezelése

const Player = {

    x: 50,
    y: 220,

    width: 45,
    height: 40,

    velocityY: 0,
    speed: 0,

    maxSpeed: 4.5,

    gravity: 0.5,
    jumpPower: -10,

    grounded: true,

    running: false,
    jumping: false,


    init() {
        this.reset();
        console.log("Player rendszer betöltve");
    },


    reset() {
        this.x = 50;
        this.y = 220;

        this.velocityY = 0;
        this.speed = 0;

        this.grounded = true;
        this.running = false;
        this.jumping = false;
    },


    update() {

        // Futás gyorsítása
        if (this.running) {
            this.speed = Math.min(
                this.speed + 0.15,
                this.maxSpeed
            );
        } 
        else {
            this.speed = Math.max(
                this.speed - 0.1,
                0
            );
        }


        this.x += this.speed;


        // Ugrás
        if (this.jumping && this.grounded) {

            this.velocityY = this.jumpPower;
            this.grounded = false;
        }


        // Gravitáció
        this.velocityY += this.gravity;

        this.y += this.velocityY;


        // Talaj ütközés
        if (this.y >= 220) {

            this.y = 220;
            this.velocityY = 0;
            this.grounded = true;
        }
    },


    runStart() {
        this.running = true;
    },


    runStop() {
        this.running = false;
    },


    jumpStart() {

        if (this.grounded) {
            this.jumping = true;
        }
    },


    jumpStop() {
        this.jumping = false;
    },


    draw(ctx) {

        // Test
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(
            this.x,
            this.y,
            45,
            30
        );


        // Foltok
        ctx.fillStyle = "#000000";

        ctx.fillRect(
            this.x + 10,
            this.y + 5,
            10,
            10
        );

        ctx.fillRect(
            this.x + 25,
            this.y + 12,
            8,
            8
        );


        // Fej
        ctx.fillStyle = "#ffffff";

        ctx.fillRect(
            this.x + 35,
            this.y - 5,
            12,
            15
        );


        // Orr
        ctx.fillStyle = "#ffb6c1";

        ctx.fillRect(
            this.x + 42,
            this.y,
            5,
            8
        );


        // Láb animáció
        let legMove =
            Math.sin(Date.now() * 0.01 * this.speed) * 5;


        if (this.speed === 0) {
            legMove = 0;
        }


        ctx.fillStyle = "#ffffff";

        ctx.fillRect(
            this.x + 5,
            this.y + 30,
            6,
            10 + legMove
        );

        ctx.fillRect(
            this.x + 15,
            this.y + 30,
            6,
            10 - legMove
        );

        ctx.fillRect(
            this.x + 25,
            this.y + 30,
            6,
            10 + legMove
        );

        ctx.fillRect(
            this.x + 35,
            this.y + 30,
            6,
            10 - legMove
        );
    }
};
