// Ugrimuu - Játék vezérlő

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


// Játék állapot

let gameState = "PLAYING";

let gameStarted = false;



// Kamera

const camera = {

    x: 0,

    follow: true

};



// Játékos (tehén)

const player = {


    x: 50,


    y: 220,


    width:45,


    height:30,


    speed:0,


    velocityY:0,


    grounded:true

};



// Irányítás

const keys = {


    run:false,


    jump:false

};



// UI elemek

const uiDiv =
document.getElementById("ui");


const overlay =
document.getElementById("screen-overlay");


const overlayTitle =
document.getElementById("overlay-title");


const overlayDesc =
document.getElementById("overlay-desc");


const startButton =
document.getElementById("start-btn-overlay");



// Kezdés

function startGame(){


    gameState =
    "PLAYING";


    gameStarted =
    true;


    player.x = 50;

    player.y = 220;

    player.speed = 0;

    player.velocityY = 0;



    camera.x = 0;


    Obstacles.reset();


    UFO.reset();


    World.reset();



    overlay.style.display =
    "none";



    console.log(
        "Ugrimuu elindult"
    );

}



// Vége

function endGame(type){


    gameState =
    "END";



    overlay.style.display =
    "flex";



    if(type==="WIN"){


        overlayTitle.innerHTML =
        "GYŐZELEM!";


        overlayTitle.style.color =
        "#33ff33";


        overlayDesc.innerHTML =
        "A tehén biztonságba ért a rendőrségre!";


    }

    else{


        overlayTitle.innerHTML =
        "JÁTÉK VÉGE";


        overlayTitle.style.color =
        "#ff3333";


        overlayDesc.innerHTML =
        "Az UFO elkapta a tehenet!";

    }

}

// Irányítás gombok


const leftBtn =
document.getElementById("left-btn");


const rightBtn =
document.getElementById("right-btn");



leftBtn.addEventListener(
    "touchstart",
    (e)=>{

        e.preventDefault();

        keys.run = true;

    }
);


leftBtn.addEventListener(
    "touchend",
    (e)=>{

        e.preventDefault();

        keys.run = false;

    }
);


leftBtn.addEventListener(
    "mousedown",
    ()=>{

        keys.run = true;

    }
);


leftBtn.addEventListener(
    "mouseup",
    ()=>{

        keys.run = false;

    }
);




rightBtn.addEventListener(
    "touchstart",
    (e)=>{

        e.preventDefault();

        keys.jump = true;

    }
);


rightBtn.addEventListener(
    "touchend",
    (e)=>{

        e.preventDefault();

        keys.jump = false;

    }
);


rightBtn.addEventListener(
    "mousedown",
    ()=>{

        keys.jump = true;

    }
);


rightBtn.addEventListener(
    "mouseup",
    ()=>{

        keys.jump = false;

    }
);





// Fizika


function updatePlayer(){



    // gyorsulás futáskor


    if(keys.run){


        player.speed =
        Math.min(
            player.speed + 0.15,
            4.5
        );


    }

    else{


        player.speed =
        Math.max(
            player.speed - 0.1,
            0
        );

    }



    player.x +=
    player.speed;





    // ugrás


    if(
        keys.jump &&
        player.grounded
    ){


        player.velocityY =
        -10;


        player.grounded =
        false;

    }



    // gravitáció


    player.velocityY +=
    0.5;



    player.y +=
    player.velocityY;





    // talaj


    if(
        player.y >=220
    ){


        player.y = 220;


        player.velocityY = 0;


        player.grounded = true;

    }





    // kamera követés


    if(
        camera.follow &&
        player.x > 250
    ){


        camera.x =
        player.x - 250;

    }




    // UFO aktiválása


    if(
        player.x > 250
    ){


        UFO.activate();

    }





    // akadály generálás


    Obstacles.generate(

        player.x,

        World.zone

    );



    Obstacles.update(

        player,

        camera.x

    );



    // ütközés


    if(
        Obstacles.collision(player)
    ){


        player.speed =
        0.5;

    }



}
// UFO ellenőrzés és pálya logika


function updateWorld(){


    World.update(
        player
    );



    let ufoResult =
    UFO.update(
        player,
        camera
    );



    if(
        ufoResult === "CAUGHT"
    ){


        endGame(
            "LOSE"
        );


        return;

    }





    // Győzelem feltétel

    // A rendőrség a pálya végén van

    if(
        World.zone === "TOWN" &&
        World.distance >= 5900
    ){


        // Kamera megáll,
        // a tehén befut az épületbe


        camera.follow =
        false;



        if(
            player.x >= 6200
        ){


            endGame(
                "WIN"
            );

        }

    }



}





// Információs szöveg frissítése


function updateUI(){


    let zoneName =
    World.zones[
        World.zone
    ].name;



    uiDiv.innerHTML =

    "Zóna: " +
    zoneName +

    " | Távolság: " +

    Math.floor(
        World.distance
    ) +

    " m" +


    (
        UFO.abductionTime > 0

        ?

        " ⚠️ UFO VESZÉLY!"

        :

        ""

    );


}





// Fő játékhurok


function gameLoop(){



    if(
        gameState === "PLAYING"
    ){


        updatePlayer();


        updateWorld();


        updateUI();


    }



    Render.draw(

        ctx,

        player,

        camera

    );



    requestAnimationFrame(
        gameLoop
    );

}





// indulás


World.init();


Obstacles.init();


UFO.init();


startGame();


gameLoop();
