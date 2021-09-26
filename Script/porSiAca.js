// Importamos las librerias

//Trae las funciones de la libreria functional-Light,
let { append, cons, first, isEmpty, isList, length, rest, map, forEach } = functionalLight;

/* 
*data = object
*attribute = JSON keys 

Proposito: Actualiza los atributos del objeto y retorna una copia profunda.
Contrato: data, attribute -> object
Prototipo: update(data,attribute);
Ejemplos
Obj = { key : 10}

update(Obj, {key:5})              ->    Obj = { key:5 }
update(Obj, {key: Obj.key + 5})   ->    Obj = { key:15 }

*/
function update(data, attribute) {
    return Object.assign({}, data, attribute);
}

//////////////////////// Mundo inicial
let Mundo = {};
/*
Mundo = {
        snake:   list, 
        dir:     JSON, 
        snake2:  list, 
        dir2:    JSON, 
        apple:   JSON, 
        life:    number,
        score:   number, 
        tPower:  boolean, 
        clock:   JSON, 
        pReset:  number, 
        wall:    list, 
        section: string
        }
*/
////////////////////////


///////////////////variables para div de HTML
let scoreElem;
let vidasElem;
let gameOver;
let gameOverInfo;
let title;
let opcion1;
let opcion2;
let opcion3;
let infoInstructions;
let desarrolladorInfo;
let behind;
////////////////////////////////////////////


///////////variables para archivos de sonido
let appleEatSound;
let introSound;
let humbleSound;
let gameOverSound;
let lifeSound;
let deadSound;
let gameOverVSound;
let clockSound;
let slowDownSound;
let speedUpSound;
///////////////////////////////////////////


//////////////////////Variables para imagenes
let appleImg;
let clockImg;
let blockImg;
/////////////////////////////////////////////


///////////////////variables para dimensiones
const canvasX = 500;
const canvasY = 500;
const dx = 20;
const dy = 20;
const espacioX = canvasX / dx;
const espacioY = canvasY / dy;
////////////////////////////////////////////

/*        
Proposito: generar un valor aleratorio entre 0 y el numero de posiciones del canvas en el eje X.
Contrato: () -> number
Prototipo: changeRandomX()
Ejemplos
changeRandomX() -> 20 
changeRandomX() -> 38 
changeRandomX() -> 5 
*/

changeRandomX = () => { return Math.round(Math.random() * (espacioX - 2)) }

/*        
Proposito: generar un valor aleratorio entre 0 y el numero de posiciones del canvas en el eje Y.
Contrato: () -> number
Prototipo: changeRandomY()
Ejemplos
changeRandomY() -> 50 
changeRandomY() -> 12 
changeRandomY() -> 42 
*/

changeRandomY = () => { return Math.round(Math.random() * (espacioY - 2)) }

/*        
*Mundo = 
{ 
    snake:    list, 
    dir:      JSON, 
    snake2:   list, 
    dir2:     JSON, 
    apple:    JSON, 
    tPower:   boolean, 
    clock:    JSON,  
    wall:     list, 
    section:  string 
};

Proposito: cambiar los valores del Mundo para ajustarlo al modo de juego 1.
Contrato: Mundo -> Mundo
Prototipo: mundo1(Mundo);
Ejemplos
mundo1(Mundo) -> Mundo = { snake: [{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }], dir: { x: 0, y: 0 }, snake2: [], dir2: {}, apple: { x: changeRandomX(), y: changeRandomY() }, tPower: false, clock: {}, wall: [], section: "gameMode1" })}; 
*/

mundo1 = (Mundo) => {
    return update(Mundo, {
        snake: [{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }],
        dir: { x: 0, y: 0 },
        snake2: [],
        dir2: {},
        apple: { x: changeRandomX(), y: changeRandomY() },
        tPower: false,
        clock: {},
        wall: [],
        section: "gameMode1"
    })
};

/*        
*Mundo = 
{ 
    snake:    list, 
    dir:      JSON, 
    snake2:   list, 
    dir2:     JSON, 
    apple:    JSON, 
    tPower:   boolean, 
    clock:    JSON,  
    wall:     list, 
    section:  string 
};

Proposito: cambiar los valores del Mundo para ajustarlo al modo de juego 2.
Contrato: Mundo -> Mundo
Prototipo: mundo2(Mundo);
Ejemplos
mundo2(Mundo) -> Mundo = { snake: [{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }], dir: { x: 0, y: 0 }, snake2: [], dir2: {}, apple: { x: changeRandomX(), y: changeRandomY() }, tPower: false, clock: { x: (espacioX), y: (espacioY) }, wall: [{ x: changeRandomX(), y: changeRandomY() }], section: "gameMode2" })}; 
*/

mundo2 = (Mundo) => {
    return update(Mundo, {
        snake: [{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }],
        dir: { x: 0, y: 0 },
        snake2: [],
        dir2: {},
        apple: { x: changeRandomX(), y: changeRandomY() },
        tPower: false,
        clock: { x: (espacioX), y: (espacioY) },
        wall: [{ x: changeRandomX(), y: changeRandomY() }],
        section: "gameMode2"
    })
};

/*        
*Mundo = 
{ 
    snake:    list, 
    dir:      JSON, 
    snake2:   list, 
    dir2:     JSON, 
    apple:    JSON, 
    tPower:   boolean, 
    clock:    JSON,  
    wall:     list, 
    section:  string 
};

Proposito: cambiar los valores del Mundo para ajustarlo al modo de juego 3.
Contrato: Mundo -> Mundo
Prototipo: mundo3(Mundo);
Ejemplos
mundo3(Mundo) -> Mundo = { snake: [{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }], dir: { x: 0, y: 0 }, snake2: [{ x: espacioX - 4, y: espacioY - 2 }, { x: espacioX - 3, y: espacioY - 2 }, { x: espacioX - 2, y: espacioY - 2 }], dir2: { x: 0, y: 0 }, apple: { x: changeRandomX(), y: changeRandomY() }, tPower: false, clock: {}, wall: [], section: "gameMode3" })}; 
*/

mundo3 = (Mundo) => {
    return update(Mundo, {
        snake: [{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }],
        dir: { x: 0, y: 0 },
        snake2: [{ x: espacioX - 4, y: espacioY - 2 }, { x: espacioX - 3, y: espacioY - 2 }, { x: espacioX - 2, y: espacioY - 2 }],
        dir2: { x: 0, y: 0 },
        apple: { x: changeRandomX(), y: changeRandomY() },
        tPower: false,
        clock: {},
        wall: [],
        section: "gameMode3"
    })
}

/*
*Mundo = {
        snake:   list, 
        dir:     JSON, 
        }

*snake = Mundo.snake;
*dir = Mundo.dir;        

Proposito: Permitir que el cuerpo de la Snake se desplaze de posicion, cambiando consigo la posicion de la cabeza en base a la direccion del movimiento y eliminar la cola de la serpiente.
Contrato: snake, dir -> array
Prototipo: moveSnake(snake, dir)
Ejemplos
moveSnake([{x:5,y:2},{x:4,y:2},{x:3,y:2}],{x:1,y:0}) ->   [{x:5,y:2},{x:4,y:2},{x:3,y:2}]
moveSnake([{x:5,y:4},{x:5,y:3},{x:5,y:2}],{x:0,y:1}) ->   [{x:5,y:5},{x:5,y:4},{x:5,y:3}]
moveSnake([{x:5,y:4},{x:5,y:5},{x:5,y:6}],{x:0,y:-1}) ->  [{x:5,y:3},{x:5,y:4},{x:5,y:5}]
*/

function moveSnake(snake, dir) {
    const head = first(snake);
    return cons({ x: head.x + dir.x, y: head.y + dir.y }, snake.slice(0, length(snake) - 1));
}

/*
*Mundo = 
    {
    snake:    list,  
    snake2:   list,  
    section:  string 
    }

Proposito: Incrementar la longitud del snake, si se encuentra en el modo de juego 3, incrementar la longitud de ambas serpientes. 
Contrato: Mundo -> Mundo
Prototipo: growSnake(Mundo)
Ejemplos
growSnake({snake:[{x:5,y:2},{x:4,y:2},{x:3,y:2}],section: "gamemode1"}) ->  {snake:[{x:5,y:2},{x:4,y:2},{x:3,y:2},{x:3,y:2}], section: "gamemode1"};
growSnake({snake:[{x:5,y:2},{x:4,y:2},{x:3,y:2}],snake2:[{x:5,y:2},{x:4,y:2},{x:3,y:2}],section: "gamemode3"}) ->  {snake:[{x:5,y:2},{x:4,y:2},{x:3,y:2},{x:3,y:2}],snake2:[{x:5,y:2},{x:4,y:2},{x:3,y:2},{x:3,y:2}], section: "gamemode1"};
*/

function growSnake(Mundo) {
    if (Mundo.section == "gameMode3") {
        return update(Mundo, { snake: append(Mundo.snake, snakeTail(Mundo)), snake2: append(Mundo.snake2, snakeTail2(Mundo)) });
    }
    else return update(Mundo, { snake: append(Mundo.snake, snakeTail(Mundo)) });
}

/*
*Mundo = 
    {
    snake:    list,   
    }
    
*object = {x: number, y: number}   

Proposito: retornar la cola del snake.
Contrato: Mundo -> object
Prototipo: snakeTail(Mundo)
Ejemplos
snakeTail({snake:[{x:5,y:2},{x:4,y:2},{x:3,y:2}]}) ->  {x:3,y:2}
snakeTail({snake:[{x:4,y:5},{x:4,y:6},{x:4,y:7}]}) ->  {x:4,y:7}
*/

function snakeTail(Mundo) {
    if (isEmpty(rest(Mundo.snake))) {
        return { x: first(Mundo.snake)['x'], y: first(Mundo.snake)['y'] };
    }
    else {
        return snakeTail(update(Mundo, { snake: rest(Mundo.snake) }));
    }
}

/*
*Mundo = 
    {
    snake:    list,   
    }
    
*object = {x: number, y: number}   

Proposito: retornar la cola del segundo snake.
Contrato: Mundo -> object
Prototipo: snakeTail2(Mundo)
Ejemplos
snakeTail2({snake:[{x:5,y:2},{x:4,y:2},{x:3,y:2}]}) ->  {x:3,y:2}
snakeTail2({snake:[{x:4,y:5},{x:4,y:6},{x:4,y:7}]}) ->  {x:4,y:7}
*/

function snakeTail2(Mundo) {
    if (isEmpty(rest(Mundo.snake2))) {
        return { x: first(Mundo.snake2)['x'], y: first(Mundo.snake2)['y'] };
    }
    else {
        return snakeTail2(update(Mundo, { snake2: rest(Mundo.snake2) }));
    }
}

/*        
*Mundo = 
{ 
    snake:    list
    snake2:   list
    apple:    JSON,
    life:     number,
    score:    number, 
    wall:     list, 
    section:  string 
};

Proposito: aumentar la cantidad de puntos al comer una fruta y cambiar la posicion de la fruta, si es el caso, aumentar la cantidad de bloques, aumentar en uno el contador del poder del reloj y aumentar la cantidad de vidas del mundo. Reproduce los archivos de audio correspondientes a cada situacion.
Contrato: Mundo -> Mundo
Prototipo: eatFruit(Mundo);
Ejemplos
eatFruit({ snake: [{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }], snake2: [{ x: 21, y: 23 }, { x: 22, y: 23 }, { x: 23, y: 23 }], apple: { x: 10, y: 12 }, life: 2, score:2500, wall: [], section: "gameMode3" })}) -> Mundo = { snake: [{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 1 }], snake2: [{ x: 21, y: 23 }, { x: 22, y: 23 }, { x: 23, y: 23 }, { x: 23, y: 23 }], apple: { x: 15, y: 12 }, life: 3, score:2600 ,wall: [], section: "gameMode3" })};

eatFruit({ snake: [{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }], snake2: [], apple: { x: 10, y: 12 }, life: 2, score: 3200, wall: [{x:12, y:14},{x:22, y:10}], section: "gameMode2" })}) -> Mundo = { snake: [{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 1 }], snake2: [], apple: { x: 11, y: 2}, life: 2, score: 3300, wall: [{x:12, y:14},{x:22, y:10},{x:20,y;10}], section: "gameMode2"})}; 
*/

function eatFruit(Mundo) {
    appleEatSound.play();
    appleEatSound.setVolume(0.25);

    if (Mundo.pReset == 2) {
        speedUpSound.play();
        speedUpSound.setVolume(0.2);
    }

    if (Mundo.section == "gameMode2") {
        if ((Mundo.score % 2500 == 0) && ((Mundo.score % 200) == 0) && (Mundo.score != 0)) {
            lifeSound.play();
            lifeSound.setVolume(0.1)
            return update(growSnake(Mundo), { apple: { x: changeRandomX(), y: changeRandomY() }, life: Mundo.life + 1, wall: append([{ x: changeRandomX(), y: changeRandomY() }], Mundo.wall), pReset: Mundo.pReset + 1, score: Mundo.score + 100 })
        }
        if ((Mundo.score % 2500 == 0) && (Mundo.score != 0)) {
            lifeSound.play();
            lifeSound.setVolume(0.1)
            return update(growSnake(Mundo), { apple: { x: changeRandomX(), y: changeRandomY() }, life: Mundo.life + 1, score: Mundo.score + 100 });
        }
        if ((Mundo.score % 200) == 0 && (Mundo.score != 0)) {
            return update(growSnake(Mundo), { apple: { x: changeRandomX(), y: changeRandomY() }, wall: append([{ x: changeRandomX(), y: changeRandomY() }], Mundo.wall), pReset: Mundo.pReset + 1, score: Mundo.score + 100 });
        }
        else return update(growSnake(Mundo), { apple: { x: changeRandomX(), y: changeRandomY() }, pReset: Mundo.pReset + 1, score: Mundo.score + 100 });
    }
    else {
        if ((Mundo.score % 2500 == 0) && (Mundo.score != 0)) {
            lifeSound.play();
            lifeSound.setVolume(0.1)
            return update(growSnake(Mundo), { apple: { x: changeRandomX(), y: changeRandomY() }, life: Mundo.life + 1, score: Mundo.score + 100 })
        }
        return update(growSnake(Mundo), { apple: { x: changeRandomX(), y: changeRandomY() }, score: Mundo.score + 100 });
    }
}

/*        
*Mundo = 
{ 
    snake:    list,  
    snake2:   list, 
    apple:    JSON,   
    wall:     list, 
    section:  string 
};

Proposito: comprobar si la fruta aparece encima del cuerpo de una de las dos serpientes, o si aparece encima de un muro.
Contrato: Mundo -> number/undefined
Prototipo: validationFruit(Mundo);
Ejemplos
validationFruit({ snake: [{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }], snake2: [], apple: { x: 10, y: 12 }, wall: [{x:10, y:12},{x:22, y:10}], section: "gameMode2" })}) -> 1

validationFruit({ snake: [{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }], snake2: [], apple: { x: 1, y: 1 }, wall: [{x:3, y:12},{x:22, y:10}], section: "gameMode2" })}) -> 1

validationFruit({ snake: [{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }], snake2: [], apple: { x: 14, y: 12 }, wall: [{x:10, y:12},{x:22, y:10}], section: "gameMode2" })}) -> undefined
*/

function validationFruit(Mundo) {

    if ((Mundo.apple['x'] == (first(Mundo.snake)['x']) && (Mundo.apple['y'] == (first(Mundo.snake)['y'])))) {
        return 1;
    }
    else if (length(Mundo.snake) != 1) {
        return validationFruit(update(Mundo, { snake: rest(Mundo.snake) }))
    }

    if (Mundo.section == "gameMode3") {
        if ((Mundo.apple['x'] == (first(Mundo.snake2)['x']) && (Mundo.apple['y'] == (first(Mundo.snake2)['y'])))) {
            return 1;
        }
        else if (length(Mundo.snake2) != 1) {
            return validationFruit(update(Mundo, { snake2: rest(Mundo.snake2) }))
        }
    }

    if (Mundo.section == "gameMode2") {
        if ((Mundo.apple['x'] == (first(Mundo.wall)['x']) && (Mundo.apple['y'] == (first(Mundo.wall)['y'])))) {
            return 1;
        }
        if (length(Mundo.wall) != 1) {
            return validationFruit(update(Mundo, { wall: rest(Mundo.wall) }))
        }
    }
}

/*        
*Mundo = 
{ 
    snake:    list,  
    snake2:   list,    
    wall:     list, 
    section:  string 
};

Proposito: comprobar si un bloque aparece encima del cuerpo de la dos serpiente.
Contrato: Mundo -> number/undefined
Prototipo: validationWall(Mundo);
Ejemplos
validationWall({ snake: [{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }], wall: [{x:2, y:1},{x:22, y:10}], section: "gameMode2" })}) -> 1

validationWall({ snake: [{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }], wall: [{x:21, y:12},{x:22, y:10}], section: "gameMode2" })}) -> undefined

*/

function validationWall(Mundo) {
    if (Mundo.section == "gameMode2") {
        if (!isEmpty(rest(Mundo.snake))) {
            if ((first(Mundo.wall)['x'] == (first(rest(Mundo.snake)))['x']) && ((first(Mundo.wall))['y'] == (first(rest(Mundo.snake)))['y'])) {
                return 1;
            }
            else if (length(Mundo.snake) != 1) {
                return validationWall(update(Mundo, { snake: rest(Mundo.snake) }))
            }
        }
    }
}

/*        
*Mundo = 
{   
    apple:   JSON    
};

Proposito: cambiar de forma aleatoria la posicion de la fruta en el canvas.
Contrato: Mundo -> Mundo
Prototipo: changeRandomFood(Mundo);
Ejemplos
changeRandomFood({apple:{x:12,y:21}})}) -> {apple:{x:21,y:5}}
changeRandomFood({apple:{x:10,y:15}})}) -> {apple:{x:1,y:12}}
*/

function changeRandomFood(Mundo) {
    return update(Mundo, { apple: { x: changeRandomX(), y: changeRandomY() } });
}

/*        
*Mundo = 
{   
        snake:   list, 
        dir:     JSON, 
        snake2:  list, 
        dir2:    JSON, 
        apple:   JSON, 
        life:    number,
        score:   number, 
        tPower:  boolean, 
        clock:   JSON, 
        pReset:  number, 
        wall:    list, 
        section: string
};

*body = Mundo.snake
*body2 = Mundo.snake2

Proposito: comprobar si la cabeza de la serpiente a golpeado alguna parte de su cuerpo. En caso de estar en el modo de juego 3, comprobar si la cabeza de la serpiente 1 choca con alguna parte del cuerpo de la serpiente 2. Si la cabeza choca, restar una vida y cambiar valores dependiendo del modo de juego, de lo contrario continua el juego.  
Contrato: Mundo, body, body2 -> Mundo
Prototipo: snakeColissionBody(Mundo,body,body2);
Ejemplos
snakeColissionBody({ snake: [{ x: 3, y: 1 },{ x: 3, y: 2 },{ x: 4, y: 2 },{ x: 4, y: 1 },{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }], dir: {x:0,y:-1} ,snake2: [], dir2:{} ,apple: { x: 10, y: 12 }, life: 2, score:3700, tPower: false, clock: {}, pReset: 4, wall [],section: "gameMode1" }, [{ x: 3, y: 1 },{ x: 3, y: 2 },{ x: 4, y: 2 },{ x: 4, y: 1 },{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }],[]) ->                 {snake:    [{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }], dir: { x: 0, y: 0 }, snake2: [], dir2: {}, apple: { x: changeRandomX(), y: changeRandomY() }, tPower: false, clock: {},  wall: [], section:  "gameMode1" }))}
snakeColissionBody(Mundo,body,body2)
*/

function snakeColissionBody(Mundo, body, body2) {
    const headX = first(Mundo.snake)['x'];
    const headY = first(Mundo.snake)['y'];

    if ((Mundo.dir['x'] == 0) && (Mundo.dir['y'] == 0)) {
        return Mundo;
    }
    if (length(body) == 1) {
        if (Mundo.section == "gameMode3") {
            return update(Mundo, { snake: moveSnake(Mundo.snake, Mundo.dir), snake2: moveSnake(Mundo.snake2, Mundo.dir2) });
        }
        else return update(Mundo, { snake: moveSnake(Mundo.snake, Mundo.dir) });
    }
    if (((first(rest(body)))['x'] == headX) && ((first(rest(body)))['y'] == headY)) {
        if (Mundo.life > 1) {
            deadSound.play();
            deadSound.setVolume(0.3);
            update(Mundo, { life: Mundo.life - 1 })
            vidasElem.html('Vidas = ' + Mundo.life);
            if (Mundo.section == "gameMode1") {
                return update(mundo1(Mundo), { life: Mundo.life - 1 });
            }
            if (Mundo.section == "gameMode2") {
                /* if (Mundo.score >= 15000) {
                     frameRate(20);
                 }
                 else if (Mundo.score >= 12000) {
                     frameRate(18);
                 }
                 else if (Mundo.score >= 9000) {
                     frameRate(16);
                 }
                 else if (Mundo.score >= 6000) {
                     frameRate(14);
                 }
                 else if (Mundo.score >= 3000) {
                     frameRate(12);
                 }*/
                return update(mundo2(Mundo), { life: Mundo.life - 1, pReset: 4 })
            }
            if (Mundo.section == "gameMode3") {
                return update(mundo3(Mundo), { life: Mundo.life - 1 })
            }
            return Mundo;
        }
        else {
            update(Mundo, { life: 0 })
            vidasElem.html('Vidas = ' + 0);
            GameOver();
            if (Mundo.life == 1) {
                return update(Mundo, { life: Mundo.life - 1 })
            }
        }
    }

    if (Mundo.section == "gameMode3") {
        if (isEmpty(body2)) return snakeColissionBody(Mundo, rest(body), body2);
        else if (((first(body2))['x'] == headX) && ((first(body2))['y'] == headY)) {
            if (Mundo.life > 1) {
                deadSound.play();
                deadSound.setVolume(0.3);
                update(Mundo, { life: Mundo.life - 1 });
                vidasElem.html('Vidas = ' + Mundo.life);
                return update(mundo3(Mundo), { life: Mundo.life - 1 })
            }
            else {
                update(Mundo, { life: 0 });
                vidasElem.html('Vidas = ' + 0);
                GameOver();
                return update(Mundo, { section: "gameover3", life: 0 });
            }
        }
        else return snakeColissionBody(Mundo, body, rest(body2));
    }
    if (length(body) > 1) return snakeColissionBody(Mundo, rest(body), body2);
}

/*        
*Mundo = 
{   
        snake:   list, 
        life:    number,
        wall:    list, 
        section: string
};

*wall = Mundo.wall

Proposito: comprobar si la cabeza de la serpiente chocho con alguna pared del canvas, si es el caso comprobar tambien si choco con algun muro. De lo contrario continua el juego  
Contrato: Mundo, wall -> number/Mundo
Prototipo: snakeColissionWall(Mundo,wall);
Ejemplos
snakeColissionBody({ snake: [{ x: 4, y: 2 },{ x: 4, y: 1 },{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }], life: 2, wall [{x:4, y:2}],section: "gameMode2" }) -> 1

snakeColissionBody({ snake: [{ x: 25, y: 2 },{ x: 24, y: 2 },{ x: 23, y: 2 }, { x: 22, y: 2 }, { x: 21, y: 2 }], life: 2, wall [{x:4, y:2}],section: "gameMode2" }) -> 1
*/

function snakeColissionWall(Mundo, wall) {

    const headX = first(Mundo.snake)['x'];
    const headY = first(Mundo.snake)['y'];


    if (headX == Math.trunc(espacioX) || headX == -1 || headY == Math.trunc(espacioY) || headY == -1) {
        if (Mundo.life > 1) {
            deadSound.play();
            deadSound.setVolume(0.3);
            return 1;
        }
        else {
            return 0;
        }
    }


    if (Mundo.section == "gameMode2") {
        if (isEmpty(wall)) {
            return Mundo;
        }
        if ((headX == first(wall)['x']) && (headY == first(wall)['y'])) {
            if (Mundo.life > 1) {
                deadSound.play();
                deadSound.setVolume(0.3);
                return 1;
            }
            else {
                return 0;
            }
        }
        if (!isEmpty(rest(wall))) {
            return snakeColissionWall(Mundo, rest(wall));
        }
    }
}

/*
Proposito: detener el juego y mostrar un mensaje de Game Over. Cambiar la seccion del juego dependiendo del modo en el que estaba. 
Contrato: () -> Mundo;
Prototipo: GameOver()
Ejemplos
GameOver() -> {section: "gameover1"}
GameOver() -> {section: "gameover2"}
GameOver() -> {section: "gameover3"}
*/

function GameOver() {
    gameOverVSound.play();
    title.html("<p class='menu'>Game Over</p>");
    gameOverInfo.html("<p class='info' style='text-align:center'>Tu Puntuacion final: " + Mundo.score + "<br><br>Presiona ENTER para reiniciar<br>Presiona ESCAPE para ir al Menu</p>");
    if (Mundo.section == "gameMode1") {
        return update(Mundo, { section: "gameover1" });
    }
    if (Mundo.section == "gameMode2") {
        return update(Mundo, { section: "gameover2" });
    }
    if (Mundo.section == "gameMode3") {
        return update(Mundo, { section: "gameover3" });
    }
}

/*        
*Mundo = 
{   
       score:   number,
       pReset:  number,
       section: string
};

Proposito: Si se encuentra en el modo de juego 2, establecer un frameRate y con ello la velocidad del juego dependiendo de la cantidad de puntos y el contador del poder del reloj   
Contrato: Mundo -> Mundo/undefined
Prototipo: setSpeed(Mundo);
Ejemplos
setSpeed({score: 10000, pReset: 5,section: "gameMode2" }) -> {score: 10000, pReset: 5,section: "gameMode2" }

setSpeed({score: 10000, pReset: 4, section: "gameMode1" }) -> undefined
*/

function setSpeed(Mundo) {
    if (Mundo.section == "gameMode2") {
        if ((Mundo.score >= 15000) && (Mundo.pReset >= 3)) {
            frameRate(20);
            return Mundo;
        }
        else if ((Mundo.score >= 12000) && (Mundo.pReset >= 3)) {
            frameRate(18);
            return Mundo;
        }
        else if ((Mundo.score >= 9000) && (Mundo.pReset >= 3)) {
            frameRate(16);
            return Mundo;
        }
        else if ((Mundo.score >= 6000) && (Mundo.pReset >= 3)) {
            frameRate(14);
            return Mundo;
        }
        else if ((Mundo.score >= 3000) && (Mundo.pReset >= 3)) {
            frameRate(12);
            return Mundo;
        }
        else if ((Mundo.score >= 0) && (Mundo.pReset >= 3)) {
            frameRate(10);
            return Mundo;
        }
    }
}

/*        
*Mundo = 
{   
       score:   number,
       clock:   JSON,
       tPower:  boolean,
       section: string
};

Proposito: Hacer aparecer el powerUp del reloj para relentizar el siempre teniendo en cuenta la cantidad de puntos, si el reloj esta en cierta posicion o si ya habia adquirido el powerUp antes.En caso de que no se cumplan las condiciones sigue el juego normal, de lo contrario retorna 1.
Contrato: Mundo -> number/Mundo
Prototipo: clockAppear(Mundo);
Ejemplos
clockAppear({score: 3000, clock: {x:25,y:25}, tPower: false, section: "gameMode2" }) -> 1

setSpeed({score: 10000, pReset: 4, section: "gameMode1" }) -> undefined
*/

function clockAppear(Mundo) {
    if (Mundo.section == "gameMode2") {
        if (((Mundo.score % 1500) == 0) && (Mundo.score != 0) && (Mundo.clock['x'] == (espacioX)) && (Mundo.clock['y'] == (espacioY)) && (Mundo.tPower == false)) {
            return 1
        }
        else return Mundo;
    }
}

/*        
*Mundo = 
{   
       snake:   list,
       clock:   JSON,
       section: string
};

Proposito: Comprobar si la cabeza de la serpiente esta en la misma posicion que el powerUp del reloj, si es el caso retorna 1, de lo contrario continua el juego.
Contrato: Mundo -> number/Mundo
Prototipo: timePowerGet(Mundo);
Ejemplos
timePowerGet({snake: [{x:5,y:2},{x:6,y:2},{x:7,y:2}], clock: {x:5,y:2}, section: "gameMode2" }) -> 1;

timePowerGet({snake: [{x:5,y:2},{x:6,y:2},{x:7,y:2}], clock: {x:15,y:21}, section: "gameMode2" }) -> {snake: [{x:5,y:2},{x:6,y:2},{x:7,y:2}], clock: {x:15,y:21}, section: "gameMode2" }
*/

function timePowerGet(Mundo) {
    const headX = first(Mundo.snake)['x'];
    const headY = first(Mundo.snake)['y'];

    if (Mundo.section == "gameMode2") {
        if ((headX == Mundo.clock['x']) && (headY == Mundo.clock['y'])) {
            return 1;
        }
        else return Mundo
    }
}

/*
Proposito: buscar y cargar archivos de musica e imagen.
Contrato: () ->  ()
Prototipo: preload() 
Ejemplos

identificadorSound = loadSound('localizacionArchivo/Archivo.formato')
identificadorImagen = loadImage('localizacionArchivo/Archivo.formato')

*/

function preload() {
    appleEatSound = loadSound('../Sound/appleEat.mp3');
    introSound = loadSound('../Sound/Intro.mp3');
    humbleSound = loadSound('../Sound/Humble Match.mp3');
    gameOverSound = loadSound('../Sound/GameOverM.mp3');
    lifeSound = loadSound('../Sound/1Life.mp3');
    deadSound = loadSound('../Sound/deadSound.mp3');
    gameOverVSound = loadSound('../Sound/GameOverV.mp3');
    clockSound = loadSound('../Sound/clockSound.mp3');
    slowDownSound = loadSound('../Sound/slowDownEffect.mp3');
    speedUpSound = loadSound('../Sound/speedUp.mp3')

    appleImg = loadImage('../PNG/apple.png');
    clockImg = loadImage('../PNG/clock.png');
    blockImg = loadImage('../PNG/block.png');
}

/*
 Esta funcion se llama antes de iniciar el juego.

 Proposito: Crear Div, asignarles posicion, un identificador, darles clase y estilo. Crear el canvas donde se visualizara el juego, asignarle una tasa de frames por segundo y asignar el primer Mundo.
 Contrato: () -> ();
 Ejemplos

 ///////////////DIV
 variable = createDiv("");                Se crea el div y se pone el texto que se desea mostrar
 variable.position(x,y);                  Se le asigna una posicion en el HTML al div
 variable.id("id");                       Se le otorga un id al div
 variable.class("fuenteDeTexto");         Se le otorga una clase
 variable.style("color","colorDeseado")   Se le otorga un color
 //////////////////

 frameRate(<framesPorSegundo>);           <framesPorSegundo> -> number
 createCanvas(<x>,<y>);                   Se crea el canvas con <x> pixeles ancho y <y> pixeles alto
 background(R,G,B);                       Color del fondo del Canvas en RGB
 Mundo = {                                Se asignan los valores iniciales a Mundo
        snake:   list, 
        dir:     JSON, 
        snake2:  list, 
        dir2:    JSON, 
        apple:   JSON, 
        life:    number,
        score:   number, 
        tPower:  boolean, 
        clock:   JSON, 
        pReset:  number, 
        wall:    list, 
        section: string
         }
*/

function setup() {
    title = createDiv("");
    title.position(0, -450);
    title.id("title");
    title.class("txt-Neon_pixel");
    title.style("color", "White");

    scoreElem = createDiv("");
    scoreElem.position(-340, 550);
    scoreElem.id('score');
    scoreElem.class("vidas-txt");
    scoreElem.style('color', 'white');

    vidasElem = createDiv("");
    vidasElem.position(370, 550);
    vidasElem.id('vidas');
    vidasElem.class("vidas-txt");
    vidasElem.style('color', 'white');

    gameOver = createDiv("");
    gameOver.position(120, 250);
    gameOver.id("GameOver");
    gameOver.class("txt-Neon_pixel");
    gameOver.style("color", "white");

    gameOverInfo = createDiv("");
    gameOverInfo.position(0, -200);
    gameOverInfo.id("gameOverInfo");
    gameOverInfo.class("txt-pixel");
    gameOverInfo.style("color", "white");

    opcion1 = createDiv("");
    opcion1.position(0, -100);
    opcion1.id("opcion1");
    opcion1.class("txt-pixel");
    opcion1.style("color", "white");

    opcion2 = createDiv("");
    opcion2.position(0, 0);
    opcion2.id("opcion2");
    opcion2.class("txt-pixel");
    opcion2.style("color", "white");

    infoInstructions = createDiv("");
    infoInstructions.position(0, -300);
    infoInstructions.id("instruccionesInfo");
    infoInstructions.class("txt-pixel");
    infoInstructions.style("color", "white");

    opcion3 = createDiv("");
    opcion3.position(0, 100);
    opcion3.id("opcion3");
    opcion3.class("txt-pixel");
    opcion3.style("color", "white");

    desarrolladorInfo = createDiv("");
    desarrolladorInfo.position(0, -300);
    desarrolladorInfo.id("desarrolladorInfo");
    desarrolladorInfo.class("txt-pixel");
    desarrolladorInfo.style("color", "white");

    behind = createDiv("");
    behind.position(35, 320);
    behind.id("atras");
    behind.class("txt-pixel");
    behind.style("color", "white");

    classic = createDiv("");
    classic.position(0, -100);
    classic.id("classic");
    classic.class("txt-pixel");
    classic.style("color", "white");

    rattleNRoll = createDiv("");
    rattleNRoll.position(0, 0);
    rattleNRoll.id("rattleNRoll");
    rattleNRoll.class("txt-pixel");
    rattleNRoll.style("color", "white");

    mirror = createDiv("");
    mirror.position(0, 100);
    mirror.id("mirror");
    mirror.class("txt-pixel");
    mirror.style("color", "white");

    frameRate(10);
    createCanvas(canvasX, canvasY);
    background(0, 0, 0);
    Mundo = {
        snake: [{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }],
        dir: { x: 0, y: 0 },
        snake2: [{ x: espacioX - 4, y: espacioY - 2 }, { x: espacioX - 3, y: espacioY - 2 }, { x: espacioX - 2, y: espacioY - 2 }],
        dir2: { x: 0, y: 0 },
        apple: { x: changeRandomX(), y: changeRandomY() },
        life: 3,
        score: 0,
        tPower: false,
        clock: { x: (espacioX), y: (espacioY) },
        pReset: 4,
        wall: [{ x: changeRandomX(), y: changeRandomY() }],
        section: "Menu"
    };
}

/*
//Canvas. Aqui todo dibujo realizado  se pone para que se pueda pintar.

Mundo = {
        snake:   list, 
        dir:     JSON, 
        snake2:  list, 
        dir2:    JSON, 
        apple:   JSON, 
        life:    number,
        score:   number, 
        tPower:  boolean, 
        clock:   JSON, 
        pReset:  number, 
        wall:    list, 
        section: string
        }

Proposito: pintar todo lo relacionado con el juego, además de mostrar y cambiar el texto de los div del HTML dependiendo de la seccion del juego.
Contrato: Mundo -> ()
Prototipo: drawGame(Mundo)
Ejemplos

////////////Figuras con libreria p5

fill(R,G,B)                                                         Pintar figura con color en codigo en RGB
stroke(R,G,B)                                                       Pintar borde con color en codigo RGB
strokeWeight(<pixeles>)                                             Grosor del borde en pixeles
rect(<posicionX>,<posicionY>,<x>,<y>)                               Pintar un rectangulo con posicion y medidas

fill(R,G,B);                                                        Pintar figura con color en codigo RGB
noStroke();                                                         Sin borde    
circle(<posicionX>,<posicionY>,<radioDeCircunferencia>);            Pintar circulo con posicion y radio en pixeles

fill(R,G,B);                                                        Pintar figura con color en codigo RGB
noStroke();                                                         Sin borde
forEach(<list>, <value> => {                                        Por cada elemento <value> de la lista <list>  
image(<archivoDeImagenAPintar>,<posicionX>,<posicionY>,<x>,<y>);    Pintar archivo de imagen con posicion y dimensiones en pixeles
});

///////////////////////////////////

variableDiv.html("Texto_A_Mostrar_En_El_Div")

*/

function drawGame(Mundo) {

    const headX = first(Mundo.snake)['x'];
    const headY = first(Mundo.snake)['y'];

    fill(38, 39, 104)//fill('rgba(38, 39, 104,0.8)');
    stroke(255, 255, 255);
    strokeWeight(5);
    rect(0, 0, 500, 500);

    if (Mundo.section == "Menu") {
        vidasElem.html("")
        scoreElem.html("")
        title.html("<p class='menu'>Snake Rattle n' Roll</p>");
        opcion1.html("<p class='menu'>Jugar</p>");
        opcion2.html("<p class='menu'>Instrucciones</p>");
        opcion3.html("<p class='menu'>Desarrolladores</p>");
    }
    if (Mundo.section == "Instrucciones") {
        title.html("<p class='menu'>Instrucciones</p>");
        infoInstructions.html("<center><h6><p class='info'>El snake es un juego en el cual se maneja una pequeña serpiente cuyo objetivo es crecer a medida que come.<br><br>El control de la serpiente se ve en las flechas, intenta obtener la mayor cantidad de puntos posibles, contaras con 3 vidas para ello. Cada 2.500 puntos que obtengas ganaras 1 vida extra.<br><br>Perderas una vida si la cabeza de snake choca con su cuerpo o con las paredes. Si te quedas sin vidas, el juego termina.<br><br> ¡Buena Suerte!</p><h6></center>");
    }
    if (Mundo.section == "Desarrollador") {
        title.html("<p class='menu'>Desarrolladores</p>");
        desarrolladorInfo.html("<center><p class='info'>Mauricio Munoz Gutierrez <br><br> Carlos Daniel Corrales Arango <br><br> Daniel Esteban Gallego <br><br> Hanner Fernando Sinisterra</p></center>");
    }
    if (Mundo.section == "Jugar") {
        scoreElem.html("");
        vidasElem.html("");
        title.html("<p class='menu'>¡Selecciona tu modo de juego!</p>")
        opcion1.html("<p class='menu'>Clasico</p>");
        opcion2.html("<p class='menu'>Rattle N Roll</p>");
        opcion3.html("<p class='menu'>Mirror</p>");
    }
    if ((Mundo.section != "Menu") && (Mundo.section != "gameMode1") && (Mundo.section != "gameMode2") && (Mundo.section != "gameMode3") && (Mundo.section != "gameover1") && (Mundo.section != "gameover2") && (Mundo.section != "gameover3")) {
        behind.html("<p class='menu'>Atras</p>");
    }
    if ((Mundo.section == "gameMode1") || (Mundo.section == "gameMode2") || (Mundo.section == "gameMode3")) {
        scoreElem.html("Score = " + Mundo.score);
        vidasElem.html("Vidas = " + Mundo.life);

        if (Mundo.life > 0) {
            image(appleImg, Mundo.apple['x'] * dx, Mundo.apple['y'] * dy, dx, dy);

            if (Mundo.section == "gameMode2") {

                image(clockImg, Mundo.clock['x'] * dx, Mundo.clock['y'] * dy, dx, dy);


                fill(0, 0, 0);
                noStroke();
                forEach(Mundo.wall, w => {
                    image(blockImg, w.x * dx, w.y * dy, dx, dy);
                });
            }

            if (Mundo.section == "gameMode1" || Mundo.section == "gameMode2") {
                fill(35, 167, 6);
                noStroke();
                forEach(Mundo.snake, s => {
                    rect(s.x * dx, s.y * dy, dx, dy);
                });

                if (Mundo.dir['x'] == 1) {
                    fill(0, 0, 0);
                    noStroke();
                    circle((headX * dx) + (dx / 4), (headY * dy) + (dy / 4), (dx / 4));

                    fill(0, 0, 0);
                    noStroke();
                    circle((headX * dx) + dx / 4, (headY * dy) + (dy / (4 / 3)), (dx / 4));

                }
                if (Mundo.dir['x'] == -1) {
                    fill(0, 0, 0);
                    noStroke();
                    circle((headX * dx) + (dx * 3 / 4), (headY * dy) + (dy / 4), (dy / 4));

                    fill(0, 0, 0);
                    noStroke();
                    circle((headX * dx) + (dx * 3 / 4), (headY * dy) + (dx * 3 / 4), (dy / 4));

                }
                if (Mundo.dir['y'] == 1) {
                    fill(0, 0, 0);
                    noStroke();
                    circle((headX * dx) + (dy / 4), (headY * dy) + (dy / 4), (dy / 4));

                    fill(0, 0, 0);
                    noStroke();
                    circle((headX * dx) + (dx * 3 / 4), (headY * dy) + (dy / 4), (dy / 4));

                }
                if (Mundo.dir['y'] == -1) {
                    fill(0, 0, 0);
                    noStroke();
                    circle((headX * dx) + (dy / 4), (headY * dy) + (dx * 3 / 4), (dy / 4));

                    fill(0, 0, 0);
                    noStroke();
                    circle((headX * dx) + (dx * 3 / 4), (headY * dy) + (dx * 3 / 4), (dy / 4));
                }
            }

            if (Mundo.section == "gameMode3") {
                const head2X = first(Mundo.snake2)['x'];
                const head2Y = first(Mundo.snake2)['y'];

                fill(40, 36, 36);
                noStroke();
                forEach(Mundo.snake, s => {
                    rect(s.x * dx, s.y * dy, dx, dy);
                });

                if (Mundo.dir['x'] == 1) {
                    fill(255, 255, 255);
                    noStroke();
                    circle((headX * dx) + (dx / 4), (headY * dy) + (dy / 4), (dx / 4));

                    fill(255, 255, 255);
                    noStroke();
                    circle((headX * dx) + dx / 4, (headY * dy) + (dy / (4 / 3)), (dx / 4));

                }
                if (Mundo.dir['x'] == -1) {
                    fill(255, 255, 255);
                    noStroke();
                    circle((headX * dx) + (dx * 3 / 4), (headY * dy) + (dy / 4), (dy / 4));

                    fill(255, 255, 255);
                    noStroke();
                    circle((headX * dx) + (dx * 3 / 4), (headY * dy) + (dx * 3 / 4), (dy / 4));

                }
                if (Mundo.dir['y'] == 1) {
                    fill(255, 255, 255);
                    noStroke();
                    circle((headX * dx) + (dy / 4), (headY * dy) + (dy / 4), (dy / 4));

                    fill(255, 255, 255);
                    noStroke();
                    circle((headX * dx) + (dx * 3 / 4), (headY * dy) + (dy / 4), (dy / 4));

                }
                if (Mundo.dir['y'] == -1) {
                    fill(255, 255, 255);
                    noStroke();
                    circle((headX * dx) + (dy / 4), (headY * dy) + (dx * 3 / 4), (dy / 4));

                    fill(255, 255, 255);
                    noStroke();
                    circle((headX * dx) + (dx * 3 / 4), (headY * dy) + (dx * 3 / 4), (dy / 4));
                }

                fill(255, 255, 255);
                noStroke();
                forEach(Mundo.snake2, s => {
                    rect(s.x * dx, s.y * dy, dx, dy);
                });

                if (Mundo.dir2['x'] == 1) {
                    fill(0, 0, 0);
                    noStroke();
                    circle((head2X * dx) + (dx / 4), (head2Y * dy) + (dy / 4), (dx / 4));

                    fill(0, 0, 0);
                    noStroke();
                    circle((head2X * dx) + dx / 4, (head2Y * dy) + (dy / (4 / 3)), (dx / 4));

                }
                if (Mundo.dir2['x'] == -1) {
                    fill(0, 0, 0);
                    noStroke();
                    circle((head2X * dx) + (dx * 3 / 4), (head2Y * dy) + (dy / 4), (dy / 4));

                    fill(0, 0, 0);
                    noStroke();
                    circle((head2X * dx) + (dx * 3 / 4), (head2Y * dy) + (dx * 3 / 4), (dy / 4));

                }
                if (Mundo.dir2['y'] == 1) {
                    fill(0, 0, 0);
                    noStroke();
                    circle((head2X * dx) + (dy / 4), (head2Y * dy) + (dy / 4), (dy / 4));

                    fill(0, 0, 0);
                    noStroke();
                    circle((head2X * dx) + (dx * 3 / 4), (head2Y * dy) + (dy / 4), (dy / 4));

                }
                if (Mundo.dir2['y'] == -1) {
                    fill(0, 0, 0);
                    noStroke();
                    circle((head2X * dx) + (dy / 4), (head2Y * dy) + (dx * 3 / 4), (dy / 4));

                    fill(0, 0, 0);
                    noStroke();
                    circle((head2X * dx) + (dx * 3 / 4), (head2Y * dy) + (dx * 3 / 4), (dy / 4));
                }
            }
        }
    }
}

/*
// Aqui se ejecuta en cada tic del reloj, con esta seccion se puede realizar las animaciones.

Mundo = {
        snake:   list, 
        dir:     JSON, 
        snake2:  list, 
        dir2:    JSON, 
        apple:   JSON, 
        life:    number,
        score:   number, 
        tPower:  boolean, 
        clock:   JSON, 
        pReset:  number, 
        wall:    list, 
        section: string
        }

Proposito: realizar las animaciones, reproducir algunos archivos de sonido y ejecutar cada funcion creada en el script. Esta funcion se ejecuta en cada tic del reloj.
Contrato: Mundo -> Mundo
Prototipo: onTic(Mundo);
Ejemplos

*/
function onTic(Mundo) {
    setSpeed(Mundo);
    console.log(Mundo.life)
    console.log(Mundo.section)
    if (Mundo.section == "Menu" || Mundo.section == "Jugar") {
        introSound.stop();
        gameOverSound.stop();
        if (humbleSound.isPlaying() == false) {
            humbleSound.play();
            humbleSound.setVolume(0.1);
            return Mundo;
        }
        return Mundo;
    }
    if ((Mundo.section == "gameMode1") || (Mundo.section == "gameMode2") || (Mundo.section == "gameMode3") || (Mundo.section == "gameover1") || (Mundo.section == "gameover2") || (Mundo.section == "gameover3")) {
        humbleSound.stop();
        if ((introSound.isPlaying() == false) && Mundo.life != 0) {
            gameOverSound.stop();
            introSound.play();
            introSound.setVolume(0.01);
            return Mundo;
        }
        if ((introSound.isPlaying() == true) && (Mundo.life == 0)) {
            introSound.stop();
            if (gameOverSound.isPlaying() == false) {
                gameOverSound.play();
                gameOverSound.setVolume(0.1);
                return Mundo;
            }
            return Mundo;
        }
        if ((first(Mundo.snake)['x'] == Mundo.apple['x']) && (first(Mundo.snake)['y'] == Mundo.apple['y'])) {
            return eatFruit(Mundo);
        }

        if (snakeColissionWall(Mundo, Mundo.wall) == 1) {
            update(Mundo, { life: Mundo.life - 1 });
            vidasElem.html('Vidas = ' + Mundo.life);
            if (Mundo.section == "gameMode1") {
                return update(mundo1(Mundo), { life: Mundo.life - 1 });
            }
            if (Mundo.section == "gameMode2") {
                return update(mundo2(Mundo), { life: Mundo.life - 1, pReset: 3 })
                if (Mundo.score >= 15000) {
                    frameRate(20);
                }
                else if (Mundo.score >= 12000) {
                    frameRate(18);
                }
                else if (Mundo.score >= 9000) {
                    frameRate(16);
                }
                else if (Mundo.score >= 6000) {
                    frameRate(14);
                }
                else if (Mundo.score >= 3000) {
                    frameRate(12);
                }
            }
            if (Mundo.section == "gameMode3") {
                return update(mundo3(Mundo), { life: Mundo.life - 1 })
            }
        }

        if (Mundo.section == "gameMode3") {
            if ((first(Mundo.snake2)['x'] == Mundo.apple['x']) && (first(Mundo.snake2)['y'] == Mundo.apple['y'])) {
                return eatFruit(Mundo);
            }
        }
        if ((validationFruit(Mundo)) == 1) {
            console.log("l")
            return changeRandomFood(Mundo);
        }
        if (clockAppear(Mundo) == 1) {
            return update(Mundo, { clock: { x: changeRandomX(), y: changeRandomY() } });
        }
        if (validationWall(Mundo) == 1) {
            return update(Mundo, { wall: append([{ x: changeRandomX(), y: changeRandomY() }], rest(Mundo.wall)) })
        }

        if (snakeColissionWall(Mundo, Mundo.wall) == 0) {
            vidasElem.html('Vidas = ' + 0);
            GameOver();
            if (Mundo.section == "gameMode1") {
                return update(Mundo, { section: "gameover1", life: 0 });
            }
            if (Mundo.section == "gameMode2") {
                return update(Mundo, { section: "gameover2", life: 0 });
            }
            if (Mundo.section == "gameMode3") {
                return update(Mundo, { section: "gameover3", life: 0 });
            }
        }
        if (timePowerGet(Mundo) == 1) {
            clockSound.play();
            return update(Mundo, { clock: { x: (espacioX), y: (espacioY) }, tPower: true });
        }
        return snakeColissionBody(Mundo, Mundo.snake, Mundo.snake2);
    }
    else return Mundo;
}

/*
//Implemente esta función si quiere que su programa reaccione a eventos del mouse.

Mundo = {
        snake:   list, 
        dir:     JSON, 
        snake2:  list, 
        dir2:    JSON, 
        apple:   JSON, 
        life:    number,
        score:   number, 
        tPower:  boolean, 
        clock:   JSON, 
        pReset:  number, 
        wall:    list, 
        section: string
        }

evento = click con el mouse        

Proposito: Hacer que el juego reaccione a eventos del mouse
Contrato: Mundo, event -> Mundo
Prototipo onMouseEvent(Mundo,event);
Ejemplos
onMouseEvent({section: "Jugar"}, "press") -> {section: "Menu"}
*/
function onMouseEvent(Mundo, event) {
    if (event.action == "press") {
        if (Mundo.section == "Menu") {
            if ((mouseX >= 25) && (mouseX <= 475) && ((mouseY >= 235) && (mouseY <= 260))) {
                title.html("");
                opcion1.html("");
                opcion2.html("");
                opcion3.html("");
                return update(Mundo, { section: "Jugar", score: 0 });
            }
            if ((mouseX >= 25) && (mouseX <= 475) && ((mouseY >= 285) && (mouseY <= 310))) {
                opcion1.html("");
                opcion2.html("");
                opcion3.html("");
                return update(Mundo, { section: "Instrucciones" });
            }
            if ((mouseX >= 25) && (mouseX <= 475) && ((mouseY >= 335) && (mouseY <= 360))) {
                opcion1.html("");
                opcion2.html("");
                opcion3.html("");
                return update(Mundo, { section: "Desarrollador" });
            }
        }
        if (Mundo.section == "Jugar") {
            if ((mouseX >= 25) && (mouseX <= 475) && ((mouseY >= 235) && (mouseY <= 260))) {
                opcion1.html("");
                opcion2.html("");
                opcion3.html("");
                behind.html("");
                title.html("");
                return update(mundo1(Mundo), { section: "gameMode1" });
            }
            if ((mouseX >= 25) && (mouseX <= 475) && ((mouseY >= 285) && (mouseY <= 310))) {
                opcion1.html("");
                opcion2.html("");
                opcion3.html("");
                behind.html("");
                title.html("");
                return update(mundo2(Mundo), { section: "gameMode2" });
            }
            if ((mouseX >= 25) && (mouseX <= 475) && ((mouseY >= 335) && (mouseY <= 360))) {
                opcion1.html("");
                opcion2.html("");
                opcion3.html("");
                behind.html("");
                title.html("");
                return update(mundo3(Mundo), { section: "gameMode3" });
            }
        }
        if ((Mundo.section != "Menu") && (Mundo.section != "gameMode1") && (Mundo.section != "gameMode2") && (Mundo.section != "gameMode3") && (Mundo.section != "gameover1") && (Mundo.section != "gameover2") && (Mundo.section != "gameover3")) {
            if ((mouseX >= 25) && (mouseX <= 475) && ((mouseY >= 445) && (mouseY <= 470))) {
                title.html("<p>Snake Rattle n' Roll</p>");
                opcion1.html("<p>Jugar</p>");
                opcion2.html("<p>Instrucciones</p>");
                opcion3.html("<p>Desarrollador</p>");
                infoInstructions.html("");
                desarrolladorInfo.html("");
                behind.html("");
                return update(Mundo, { section: "Menu" });
            }
            else return Mundo;
        }
    }
    return update(Mundo, {});
}

/*
Mundo = {
        snake:   list, 
        dir:     JSON, 
        snake2:  list, 
        dir2:    JSON, 
        apple:   JSON, 
        life:    number,
        score:   number, 
        tPower:  boolean, 
        clock:   JSON, 
        pReset:  number, 
        wall:    list, 
        section: string
        }
keyCode = valor ASCII de la tecla del teclado

Proposito: Hacer que el juego reaccione a eventos del teclado, como ejemplo cambiar la direccion de la serpiente con las flechas. Se Renueva el mundo cada vez que se oprime una tecla. Retorna el nuevo estado del mundo.
Contrato: Mundo, keyCode -> Mundo;
Prototipo: onKeyEvent(Mundo, keyCode);
Ejemplos
onKeyEvent({dir:{x:1,y:0}, UP_ARROW}) -> {dir:{x:0,y:-1}}
onKeyEvent({dir:{x:1,y:0}, 83}) -> {dir:{x:0,y:1}}
onKeyEvent({tPower:true, 90}) -> {tPower:false}
*/
function onKeyEvent(Mundo, keyCode) {
    // Alteramos la direccion de la Snake, noten como no movemos la serpiente simplemnte la direccion.
    if ((Mundo.section == "gameMode1") || (Mundo.section == "gameMode2") || (Mundo.section == "gameMode3") || (Mundo.section == "gameover1") || (Mundo.section == "gameover2") || (Mundo.section == "gameover3")) {
        switch (keyCode) {
            case UP_ARROW:
                if (Mundo.dir['y'] == 1) {
                    if (keyCode == UP_ARROW) {
                        if (Mundo.section == "gameMode3") return update(Mundo, { dir: { y: 1, x: 0 }, dir2: { y: -1, x: 0 } });
                        else return update(Mundo, { dir: { y: 1, x: 0 } });
                    }
                }
                else {
                    if (Mundo.section == "gameMode3") return update(Mundo, { dir: { y: -1, x: 0 }, dir2: { y: 1, x: 0 } });
                    else return update(Mundo, { dir: { y: -1, x: 0 } });
                }
                break;
            case DOWN_ARROW:
                if (Mundo.dir['y'] == -1) {
                    if (keyCode == DOWN_ARROW) {
                        if (Mundo.section == "gameMode3") return update(Mundo, { dir: { y: -1, x: 0 }, dir2: { y: 1, x: 0 } });
                        else return update(Mundo, { dir: { y: -1, x: 0 } });
                    }
                }
                else {
                    if (Mundo.section == "gameMode3") return update(Mundo, { dir: { y: 1, x: 0 }, dir2: { y: -1, x: 0 } });
                    else return update(Mundo, { dir: { y: 1, x: 0 } });
                }
                break;
            case LEFT_ARROW:
                if (Mundo.dir['x'] == 0 && Mundo.dir['y'] == 0) {
                    return Mundo
                }
                if (Mundo.dir['x'] == 1) {
                    if (keyCode == LEFT_ARROW) {
                        if (Mundo.section == "gameMode3") return update(Mundo, { dir: { y: 0, x: 1 }, dir2: { y: 0, x: -1 } });
                        else return update(Mundo, { dir: { y: 0, x: 1 } });
                    }
                }
                else {
                    if (Mundo.section == "gameMode3") return update(Mundo, { dir: { y: 0, x: -1 }, dir2: { y: 0, x: 1 } });
                    else return update(Mundo, { dir: { y: 0, x: -1 } });
                }
                break;
            case RIGHT_ARROW:
                if (Mundo.dir['x'] == -1) {
                    if (keyCode == RIGHT_ARROW) {
                        if (Mundo.section == "gameMode3") return update(Mundo, { dir: { y: 0, x: -1 }, dir2: { y: 0, x: 1 } });
                        else return update(Mundo, { dir: { y: 0, x: -1 } });
                    }
                }
                else {
                    if (Mundo.section == "gameMode3") return update(Mundo, { dir: { y: 0, x: 1 }, dir2: { y: 0, x: -1 } });
                    else return update(Mundo, { dir: { y: 0, x: 1 } });
                }
                break;
            case 87:
                if (Mundo.dir['y'] == 1) {
                    if (keyCode == 87) {
                        if (Mundo.section == "gameMode3") return update(Mundo, { dir: { y: 1, x: 0 }, dir2: { y: -1, x: 0 } });
                        else return update(Mundo, { dir: { y: 1, x: 0 } });
                    }
                }
                else {
                    if (Mundo.section == "gameMode3") return update(Mundo, { dir: { y: -1, x: 0 }, dir2: { y: 1, x: 0 } });
                    else return update(Mundo, { dir: { y: -1, x: 0 } });
                }
                break;
            case 83:
                if (Mundo.dir['y'] == -1) {
                    if (keyCode == 83) {
                        if (Mundo.section == "gameMode3") return update(Mundo, { dir: { y: -1, x: 0 }, dir2: { y: 1, x: 0 } });
                        else return update(Mundo, { dir: { y: -1, x: 0 } });
                    }
                }
                else {
                    if (Mundo.section == "gameMode3") return update(Mundo, { dir: { y: 1, x: 0 }, dir2: { y: -1, x: 0 } });
                    else return update(Mundo, { dir: { y: 1, x: 0 } });
                }
                break;
            case 65:
                if (Mundo.dir['x'] == 0 && Mundo.dir['y'] == 0) {
                    return Mundo
                }
                if (Mundo.dir['x'] == 1) {
                    if (keyCode == 65) {
                        if (Mundo.section == "gameMode3") return update(Mundo, { dir: { y: 0, x: 1 }, dir2: { y: 0, x: -1 } });
                        else return update(Mundo, { dir: { y: 0, x: 1 } });
                    }
                }
                else {
                    if (Mundo.section == "gameMode3") return update(Mundo, { dir: { y: 0, x: -1 }, dir2: { y: 0, x: 1 } });
                    else return update(Mundo, { dir: { y: 0, x: -1 } });
                }
                break;
            case 68:
                if (Mundo.dir['x'] == -1) {
                    if (keyCode == 68) {
                        if (Mundo.section == "gameMode3") return update(Mundo, { dir: { y: 0, x: -1 }, dir2: { y: 0, x: 1 } });
                        else return update(Mundo, { dir: { y: 0, x: -1 } });
                    }
                }
                else {
                    if (Mundo.section == "gameMode3") return update(Mundo, { dir: { y: 0, x: 1 }, dir2: { y: 0, x: -1 } });
                    else return update(Mundo, { dir: { y: 0, x: 1 } });
                }
                break;
            case ENTER:
                if (Mundo.life == 0) {
                    frameRate(10);
                    title.html("");
                    gameOverInfo.html("");
                    if (Mundo.section == "gameover1") {
                        return update(mundo1(Mundo), { life: 3, score: 0, pReset: 4 })
                    }
                    if (Mundo.section == "gameover2") {
                        return update(mundo2(Mundo), { life: 3, score: 0, pReset: 4 })
                    }
                    if (Mundo.section == "gameover3") {
                        return update(mundo3(Mundo), { life: 3, score: 0, pReset: 4 })
                    }
                    return Mundo;
                }
                else return Mundo;
                break;
            case ESCAPE:
                if (Mundo.life == 0) {
                    frameRate(10);
                    title.html("");
                    title.html("<p>Snake Rattle n' Roll</p>");
                    opcion1.html("<p>Jugar</p>");
                    opcion2.html("<p>Instrucciones</p>");
                    opcion3.html("<p>Desarrollador</p>");
                    gameOverInfo.html("");
                    if (Mundo.section == "gameover1") {
                        return update(mundo1(Mundo), { section: "Menu", life: 3, score: 0, pReset: 4 })
                    }
                    if (Mundo.section == "gameover2") {
                        return update(mundo2(Mundo), { section: "Menu", life: 3, score: 0, pReset: 4 })
                    }
                    if (Mundo.section == "gameover3") {
                        return update(mundo3(Mundo), { section: "Menu", life: 3, score: 0, pReset: 4 })
                    }
                    return Mundo;
                }
            case 90:
                if (Mundo.section == "gameMode2") {
                    if (Mundo.tPower == true) {
                        slowDownSound.play();
                        slowDownSound.setVolume(0.25);
                        if (Mundo.score >= 15000) {
                            frameRate(9.5)
                            return update(Mundo, { tPower: false, pReset: 0 });
                        }
                        if (Mundo.score >= 12000) {
                            frameRate(9)
                            return update(Mundo, { tPower: false, pReset: 0 });
                        }
                        if (Mundo.score >= 9000) {
                            frameRate(8)
                            return update(Mundo, { tPower: false, pReset: 0 });
                        }
                        if (Mundo.score >= 6000) {
                            frameRate(7)
                            return update(Mundo, { tPower: false, pReset: 0 });
                        }
                        if (Mundo.score >= 3000) {
                            frameRate(6)
                            return update(Mundo, { tPower: false, pReset: 0 });
                        }
                        else {
                            frameRate(5)
                            return update(Mundo, { tPower: false, pReset: 0 });
                        }
                    }
                }
            default:
                console.log(keyCode);
                return update(Mundo, {});
        }
    }
    else return Mundo;
}