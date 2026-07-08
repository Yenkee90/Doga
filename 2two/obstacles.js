// Ugrimuu - Akadály rendszer

const Obstacles = {

    list: [],


    init() {
        this.list = [];
        console.log("Akadály rendszer betöltve");
    },


    reset() {
        this.list = [];
    },


    generate(playerX, zone) {

        // Ne legyen túl sok akadály egyszerre
        if (this.list.length >= 3) {
            return;
        }


        // Véletlenszerű megjelenés

        if (Math.random() > 0.007) {
            return;
        }


        let types = [];


        if (zone === "FARM") {

            types = [
                "bale",
                "fence"
            ];

        }
        else if (zone === "FOREST") {

            types = [
                "log",
                "bush"
            ];

        }
        else {

            types = [
                "hydrant",
                "box"
            ];
        }



        let type =
            types[
                Math.floor(
                    Math.random() *
                    types.length
                )
            ];



        let width = 25;
        let height = 25;



        if (type === "fence") {

            width = 35;
            height = 25;
        }


        if (type === "log") {

            width = 40;
            height = 18;
        }


        if (type === "bush") {

            width = 35;
            height = 30;
        }



        this.list.push({

            x:
                playerX +
                450 +
                Math.random() * 200,

            type: type,

            width: width,

            height: height
        });
    },



    update(player, cameraX) {


        this.list.forEach(
            (obs, index) => {


                if (
                    obs.x <
                    cameraX - 50
                ) {

                    this.list.splice(
                        index,
                        1
                    );
                }

            }
        );
    },



    collision(player) {


        for (
            let obs of this.list
        ) {


            if (

                player.x + 40 >
                obs.x &&

                player.x <
                obs.x + obs.width &&

                player.y + 30 >
                250 - obs.height

            ) {

                return true;
            }

        }


        return false;
    },



    draw(ctx) {


        this.list.forEach(
            obs => {


                ctx.save();


                ctx.translate(
                    obs.x,
                    250 - obs.height
                );



                if (obs.type === "bale") {


                    ctx.fillStyle =
                        "#cca125";

                    ctx.fillRect(
                        0,
                        0,
                        obs.width,
                        obs.height
                    );


                    ctx.strokeStyle =
                        "#997311";

                    ctx.strokeRect(
                        3,
                        3,
                        obs.width - 6,
                        obs.height - 6
                    );

                }



                else if (
                    obs.type === "fence"
                ) {


                    ctx.fillStyle =
                        "#7a5230";


                    ctx.fillRect(
                        0,
                        4,
                        obs.width,
                        4
                    );


                    ctx.fillRect(
                        0,
                        obs.height - 8,
                        obs.width,
                        4
                    );


                    for (
                        let i = 2;
                        i < obs.width;
                        i += 8
                    ) {

                        ctx.fillRect(
                            i,
                            0,
                            4,
                            obs.height
                        );
                    }

                }



                else if (
                    obs.type === "log"
                ) {


                    ctx.fillStyle =
                        "#5c3a21";

                    ctx.fillRect(
                        0,
                        0,
                        obs.width,
                        obs.height
                    );


                    ctx.fillStyle =
                        "#d1a17b";


                    ctx.beginPath();

                    ctx.arc(
                        obs.width,
                        obs.height / 2,
                        obs.height / 2,
                        0,
                        Math.PI * 2
                    );

                    ctx.fill();

                }



                else if (
                    obs.type === "bush"
                ) {


                    ctx.fillStyle =
                        "#1e5c1e";


                    ctx.beginPath();


                    ctx.arc(
                        10,
                        15,
                        12,
                        0,
                        Math.PI * 2
                    );


                    ctx.arc(
                        25,
                        12,
                        14,
                        0,
                        Math.PI * 2
                    );


                    ctx.arc(
                        18,
                        22,
                        12,
                        0,
                        Math.PI * 2
                    );


                    ctx.fill();

                }



                else if (
                    obs.type === "hydrant"
                ) {


                    ctx.fillStyle =
                        "#d62424";


                    ctx.fillRect(
                        6,
                        0,
                        obs.width - 12,
                        obs.height
                    );


                    ctx.fillRect(
                        2,
                        6,
                        obs.width - 4,
                        6
                    );

                }



                else if (
                    obs.type === "box"
                ) {


                    ctx.fillStyle =
                        "#b58750";


                    ctx.fillRect(
                        0,
                        0,
                        obs.width,
                        obs.height
                    );


                    ctx.fillStyle =
                        "#8a6132";


                    ctx.fillRect(
                        0,
                        0,
                        obs.width,
                        4
                    );


                    ctx.fillRect(
                        obs.width / 2 - 2,
                        0,
                        4,
                        obs.height
                    );

                }


                ctx.restore();

            }
        );
    }
};
