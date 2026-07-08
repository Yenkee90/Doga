// Ugrimuu - Világ és pálya rendszer

const World = {

    zone: "FARM",

    distance: 0,

    stars: [],


    zones: {

        FARM: {
            name: "FARM PÁLYA",
            limit: 2000
        },

        FOREST: {
            name: "ERDŐ PÁLYA",
            limit: 3000
        },

        TOWN: {
            name: "KISVÁROS PÁLYA",
            limit: 5000
        }
    },


    init() {

        this.distance = 0;

        this.zone = "FARM";

        this.createStars();

        console.log(
            "Világ rendszer betöltve"
        );
    },



    reset() {

        this.distance = 0;

        this.zone = "FARM";

        this.createStars();
    },



    update(player) {


        this.distance =
            player.x / 2;



        if (
            this.distance < 2000
        ) {

            this.zone = "FARM";

        }
        else if (
            this.distance < 3000
        ) {

            this.zone = "FOREST";

        }
        else {

            this.zone = "TOWN";

        }

    },



    createStars() {


        this.stars = [];


        for (
            let i = 0;
            i < 60;
            i++
        ) {


            this.stars.push({

                x:
                    Math.random() * 600,

                y:
                    Math.random() * 130,

                size:
                    Math.random() * 2
            });

        }
    },



    drawBackground(ctx, cameraX) {


        // Égbolt

        if (
            this.zone === "FARM"
        ) {

            ctx.fillStyle =
                "#080820";

        }

        else if (
            this.zone === "FOREST"
        ) {

            ctx.fillStyle =
                "#020d05";

        }

        else {

            ctx.fillStyle =
                "#111125";

        }


        ctx.fillRect(
            0,
            0,
            600,
            300
        );



        // Csillagok

        ctx.fillStyle =
            "#ffffff";


        this.stars.forEach(
            star => {


                let x =
                    (
                        star.x -
                        cameraX * 0.1
                    )
                    % 600;


                if (x < 0) {
                    x += 600;
                }


                ctx.fillRect(

                    x,

                    star.y,

                    star.size,

                    star.size
                );

            }
        );



        // Háttér rajzolás

        if (
            this.zone === "FARM"
        ) {

            this.drawFarm(
                ctx,
                cameraX
            );

        }


        else if (
            this.zone === "FOREST"
        ) {


            this.drawForest(
                ctx,
                cameraX
            );

        }


        else {


            this.drawTown(
                ctx,
                cameraX
            );

        }



        // Talaj

        if (
            this.zone === "TOWN"
        ) {

            ctx.fillStyle =
                "#252525";

        }

        else {

            ctx.fillStyle =
                "#142914";

        }


        ctx.fillRect(
            0,
            250,
            600,
            50
        );

    },



    drawFarm(ctx,cameraX) {


        ctx.fillStyle =
            "#060612";


        ctx.beginPath();


        ctx.moveTo(
            0,
            250
        );


        for(
            let i=0;
            i<=600;
            i+=60
        ){

            ctx.lineTo(

                i,

                200 +
                Math.sin(
                    i +
                    cameraX*0.05
                )
                *15
            );

        }


        ctx.lineTo(
            600,
            250
        );


        ctx.fill();

    },



    drawForest(ctx,cameraX) {


        ctx.fillStyle =
            "#022002";


        for(
            let i=-50;
            i<650;
            i+=45
        ){


            let x =
            (
                i -
                cameraX*0.3
            )
            % 700;


            ctx.beginPath();


            ctx.moveTo(
                x,
                250
            );


            ctx.lineTo(
                x+20,
                140
            );


            ctx.lineTo(
                x+45,
                250
            );


            ctx.fill();

        }


    },



    drawTown(ctx,cameraX) {


        ctx.fillStyle =
            "#0d0d1a";


        for(
            let i=-100;
            i<700;
            i+=80
        ){


            let x =
            (
                i -
                cameraX*0.2
            )
            % 800;



            ctx.fillRect(
                x,
                110,
                60,
                140
            );


            ctx.fillStyle =
                "#ffaa00";


            ctx.fillRect(
                x+15,
                140,
                8,
                12
            );


            ctx.fillRect(
                x+35,
                180,
                8,
                12
            );


            ctx.fillStyle =
                "#0d0d1a";

        }


    }

};
