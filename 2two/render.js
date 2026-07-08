// Ugrimuu - Grafikai megjelenítés

const Render = {


    draw(ctx, player, camera) {


        // Háttér

        World.drawBackground(
            ctx,
            camera.x
        );



        ctx.save();



        // Kamera mozgatás

        ctx.translate(
            -camera.x,
            0
        );



        // Kezdő csűr

        this.drawBarn(
            ctx
        );



        // Rendőrség a pálya végén

        this.drawPolice(
            ctx,
            player
        );



        // Akadályok

        Obstacles.draw(
            ctx
        );



        // Tehén

        this.drawCow(
            ctx,
            player
        );



        ctx.restore();



        // UFO mindig képernyőhöz igazodva

        UFO.draw(
            ctx
        );

    },




    drawBarn(ctx) {


        ctx.fillStyle =
            "#5a1a1a";


        ctx.fillRect(
            -100,
            100,
            200,
            150
        );



        // Nyitott ajtó

        ctx.fillStyle =
            "#000000";


        ctx.fillRect(
            0,
            150,
            60,
            100
        );



        // Tető

        ctx.fillStyle =
            "#3a1010";


        ctx.beginPath();


        ctx.moveTo(
            -110,
            100
        );


        ctx.lineTo(
            0,
            50
        );


        ctx.lineTo(
            110,
            100
        );


        ctx.fill();

    },




    drawPolice(ctx, player) {


        // Csak a pálya végén jelenik meg

        if(
            World.zone !== "TOWN"
        ) {
            return;
        }



        if(
            World.distance < 4800
        ){
            return;
        }



        let x =
            6000;



        ctx.fillStyle =
            "#223355";


        ctx.fillRect(
            x,
            80,
            220,
            170
        );



        // Nyitott ajtó

        ctx.fillStyle =
            "#000000";


        ctx.fillRect(
            x+70,
            150,
            70,
            100
        );



        // Felirat

        ctx.fillStyle =
            "#ffffff";


        ctx.font =
            "bold 18px sans-serif";


        ctx.fillText(
            "POLICE",
            x+60,
            115
        );



        // Villogó rendőrségi fény

        ctx.fillStyle =
            (
                Math.floor(
                    Date.now()/200
                )
                %2===0
            )

            ?
            "#00f"
            :
            "#f00";



        ctx.beginPath();


        ctx.arc(
            x+105,
            70,
            10,
            0,
            Math.PI*2
        );


        ctx.fill();


    },





    drawCow(ctx,player){


        let x =
            player.x;


        let y =
            player.y;



        // Test

        ctx.fillStyle =
            "#ffffff";


        ctx.fillRect(
            x,
            y,
            45,
            30
        );



        // Foltok

        ctx.fillStyle =
            "#000000";


        ctx.fillRect(
            x+10,
            y+5,
            10,
            10
        );


        ctx.fillRect(
            x+25,
            y+12,
            8,
            8
        );



        // Fej

        ctx.fillStyle =
            "#ffffff";


        ctx.fillRect(
            x+35,
            y-5,
            12,
            15
        );



        // Orr

        ctx.fillStyle =
            "#ffb6c1";


        ctx.fillRect(
            x+42,
            y,
            5,
            8
        );



        // Láb animáció


        let move =
            Math.sin(
                Date.now()*0.01*
                player.speed
            )
            *5;



        ctx.fillStyle =
            "#ffffff";



        ctx.fillRect(
            x+5,
            y+30,
            6,
            10+move
        );


        ctx.fillRect(
            x+15,
            y+30,
            6,
            10-move
        );


        ctx.fillRect(
            x+25,
            y+30,
            6,
            10+move
        );


        ctx.fillRect(
            x+35,
            y+30,
            6,
            10-move
        );


    }

};
