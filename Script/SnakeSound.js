// Importamos las librerias
let { append, cons, first, isEmpty, isList, length, rest, map, forEach } = functionalLight;

// Actualiza los atributos del objeto y retorna una copia profunda
function update(data, attribute) {
  return Object.assign({}, data, attribute);
}

//////////////////////// Mundo inicial
let Mundo = {};
////////////////////////

let scoreElem;
let scoreValue;
let vidasElem;
let vidasValue;
let gameOver;
let gameOverInfo;
let title;
let jugar;
let instrucciones;
let instruccionesInfo;
let Infodesarrollador;
let desarrolladorInfo;
let atras;
let sound;
let drum;
let introS;

/**
 * Actualiza la serpiente. Creando una nuevo cabeza y removiendo la cola
 */


/*
* Mundo = {snake: array, dir: object, food: object, life: number, section: string}

Proposito: Mover el cuerpo del snake cambiando la posicion de la cabeza dependiendo de la direccion de movimiento y eliminar la cola de la serpiente
Contrato: Mundo -> Mundo
Prototipo: moveSnake(snake, dir)
Ejemplos

*/

function moveSnake(snake, dir) {
  const head = first(snake);
  return cons({ x: head.x + dir.x, y: head.y + dir.y }, snake.slice(0, length(snake) - 1));
}

/*
* Mundo = {snake: array, dir: object, food: object, life: number, section: string}

Proposito: Incrementar la longitud del snake. 
Contrato: Mundo -> Mundo
Prototipo: growSnake(Mundo)
Ejemplos

*/

function growSnake(Mundo) {
  return update(Mundo, { snake: append(Mundo.snake, incrementoColaSnake(Mundo)) });
}

/*
* Mundo = {snake: array, dir: object, food: object, life: number, section: string}

Proposito: Buscar la cola del snake y crear cuerpo.
Contrato: Mundo -> Mundo
Prototipo: incrementoColaSnake(Mundo)
Ejemplos

*/

function incrementoColaSnake(Mundo) {
  if (isEmpty(rest(Mundo.snake))) {
    return { x: first(Mundo.snake)['x'], y: first(Mundo.snake)['y'] };
  }
  else {
    return incrementoColaSnake(update(Mundo, { snake: rest(Mundo.snake) }));
  }
}

/*
* Mundo = {snake: array, dir: object, food: object, life: number, section: string}

Proposito: Cambiar la posicion de la fruta en cualquier posicion de forma aleatoria cuando la cabeza del snake pase por ella; cuando se obtengan 10.000 puntos aumentar la cantidad de vidas en 1.
Contrato: Mundo -> Mundo
Prototipo: comer(Mundo)
Ejemplos

*/

function comer(Mundo) {
  scoreValue = scoreValue + 100;
  scoreElem.html('Score = ' + scoreValue);
  drum.play();

  if ((scoreValue % 10000) == 0) {
    vidasValue = vidasValue + 1;
    vidasElem.html('Vidas = ' + vidasValue);
    Mundo.life = vidasValue;
    return update(growSnake(Mundo), { food: { x: Math.round(Math.random() * 24), y: Math.round(Math.random() * 24) } });
  }
  return update(growSnake(Mundo), { food: { x: Math.round(Math.random() * 24), y: Math.round(Math.random() * 24) } });
}

/*
* Mundo = {snake: array, dir: object, food: object, life: number, section: string}

Proposito: Validar si la fruta aparece encima del cuerpo de snake.
Contrato: Mundo, i -> Mundo
Prototipo: posicionFood(Mundo, i)
Ejemplos

*/

function posicionFood(Mundo, i) {
  if ((Mundo.food['x'] == (Mundo.snake)[i]['x']) && (Mundo.food['y'] == (Mundo.snake)[i]['y'])) {
    return 1;
  }
  else if (i != length(Mundo.snake) - 1) {
    return posicionFood(Mundo, i + 1)
  }
}

/*
* Mundo = {snake: array, dir: object, food: object, life: number, section: string}

Proposito: Cambiar la posicion de la fruta de forma aleatoria en el area del canvas.
Contrato: Mundo -> Mundo
Prototipo: cambiarFood(Mundo)
Ejemplos

*/

function cambiarFood(Mundo) {
  return update(Mundo, { food: { x: Math.round(Math.random() * 24), y: Math.round(Math.random() * 24) } });
}

/*
* Mundo = {snake: array, dir: object, food: object, life: number, section: string}

Proposito: Comprobar si la cabeza de snake choca con alguna parte del cuerpo y disminuir la cantidad de vidas; si las vidas llega a 0, se termina el juego. Si el cabeza no ha chocado, mover a la serpiente.
Contrato: Mundo, i -> Mundo
Prototipo: colisionSnake(Mundo,i)
Ejemplos

*/

function colisionSnake(Mundo, i) {
  const headX = first(Mundo.snake)['x'];
  const headY = first(Mundo.snake)['y'];

  if ((Mundo.dir['x'] == 0) && (Mundo.dir['y'] == 0)) {
    return Mundo;
  }
  if ((Mundo.snake[i]['x'] == headX) && (Mundo.snake[i]['y'] == headY)) {
    if (Mundo.life > 1) {
      vidasValue = Mundo.life - 1;
      vidasElem.html('Vidas = ' + vidasValue);
      Mundo = { snake: [{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }], dir: { x: 0, y: 0 }, food: { x: Math.round(Math.random() * 24), y: Math.round(Math.random() * 24) }, life: Mundo.life - 1, section: "Jugar" };
      return Mundo;
    }
    else {
      vidasValue = 0;
      vidasElem.html('Vidas = ' + vidasValue);
      GameOver();
      return Mundo;
    }
  }
  else if (i == length(Mundo.snake) - 1) {
    return update(Mundo, { snake: moveSnake(Mundo.snake, Mundo.dir) });
  }
  else {
    return colisionSnake(Mundo, i + 1);
  }
}

/*
* Mundo = {snake: array, dir: object, food: object, life: number, section: string}

Proposito: Comprobar si la cabeza de snake choco con el limite del canvas. Si el jugador tiene más de una vida retorna 1, si es igual 1 retorna 0.
Contrato: Mundo -> number
Prototipo: colisionPared(Mundo)
Ejemplos

*/

function colisionPared(Mundo) {
  const headX = first(Mundo.snake)['x'];
  const headY = first(Mundo.snake)['y'];

  if (headX == 25 || headX == -1 || headY == 25 || headY == -1) {
    if (Mundo.life > 1) {
      return 1;
    }
    else {
      return 0;
    }
  }
}

/*
* Mundo = {snake: array, dir: object, food: object, life: number, section: string}

Proposito: Desplegar un mensaje de GameOver y detener el juego.
Contrato: () -> divID = gameover
Prototipo: GameOver()
Ejemplos

*/

function GameOver() {
  title.html("<p class='menu'>Game Over</p>");
  gameOverInfo.html("<p class='info' style='text-align:center'>Tu Puntuacion final: " + scoreValue + "<br><br>Presiona ENTER para reiniciar<br>Presiona ESCAPE para ir al Menu</p>");
}

const dx = 20;
const dy = 20;

/*
* Mundo = {snake: array, dir: object, food: object, life: number, section: string}

Proposito: buscar y cargar archivos de musica.
Contrato:
Prototipo: preload() 
Ejemplos

*/

function preload(){
    sound = loadSound('../Sound/Monkeys.mp3');
    drum = loadSound('../Sound/drum.mp3');
    introS = loadSound('../Sound/Intro.mp3')
}

/**
 * Esto se llama antes de iniciar el juego
 */

/*
Se crean div donde se pondra strings, 
Se asigna una posicion dentro HTML.
Se ponen id para identidicar.
Se asigna una fuente de texto
Se asigna color blanco al texto
*/

function setup() {
  title = createDiv("");
  title.position(0, -450);
  title.id("title");
  title.class("txt-Neon_pixel");
  title.style("color", "White");

  scoreValue = 0;
  scoreElem = createDiv("");
  scoreElem.position(430, 590);
  scoreElem.id('score');
  scoreElem.class("txt-pixel");
  scoreElem.style('color', 'white');

  vidasValue = 3;
  vidasElem = createDiv("");
  vidasElem.position(820, 590);
  vidasElem.id('vidas');
  vidasElem.class("txt-pixel");
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

  jugar = createDiv("");
  jugar.position(0, -100);
  jugar.id("jugar");
  jugar.class("txt-pixel");
  jugar.style("color", "white");

  instrucciones = createDiv("");
  instrucciones.position(0, 0);
  instrucciones.id("instrucciones");
  instrucciones.class("txt-pixel");
  instrucciones.style("color", "white");

  instruccionesInfo = createDiv("");
  instruccionesInfo.position(0, -300);
  instruccionesInfo.id("instruccionesInfo");
  instruccionesInfo.class("txt-pixel");
  instruccionesInfo.style("color", "white");

  desarrollador = createDiv("");
  desarrollador.position(0, 100);
  desarrollador.id("desarrollador");
  desarrollador.class("txt-pixel");
  desarrollador.style("color", "white");

  desarrolladorInfo = createDiv("");
  desarrolladorInfo.position(0, -300);
  desarrolladorInfo.id("desarrolladorInfo");
  desarrolladorInfo.class("txt-pixel");
  desarrolladorInfo.style("color", "white");

  atras = createDiv("");
  atras.position(0, 320);
  atras.id("atras");
  atras.class("txt-pixel");
  atras.style("color", "white");

/*
Se ajusta cuadros por segundo
Se crea area del canvas
Se da color en RGB al canvas
Se crea el mundo inicial (Big Bang)
*/

  frameRate(10);
  createCanvas(500, 500);
  background(0, 0, 0);
  Mundo = { snake: [{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }], dir: { x: 0, y: 0 }, food: { x: Math.round(Math.random() * 24), y: Math.round(Math.random() * 24) }, life: 3, section: "Menu" };
}


// Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar
function drawGame(Mundo) {

  fill(38, 39, 104)//fill('rgba(38, 39, 104,0.8)');
  stroke(255, 255, 255);
  strokeWeight(5);
  rect(0, 0, 500, 500);

 /*
 Dependiendo de Mundo.section, desplegar un texto con los div creados en el setup.
 */ 

  if (Mundo.section == "Menu") {    
    title.html("<p class='menu'>Snake Rattle n' Roll</p>");
    jugar.html("<p class='menu'>Jugar</p>");
    instrucciones.html("<p class='menu'>Instrucciones</p>");
    desarrollador.html("<p class='menu'>Desarrollador</p>");
  }
  if (Mundo.section == "Instrucciones") {
    title.html("<p class='menu'>Instrucciones</p>");
    instruccionesInfo.html("<p class='info'>Usa las flechas para cambiar la direccion de la serpiente.<br><br>Intenta obtener la mayor cantidad de puntos posibles, contaras con 3 vidas para ello. Cada 10.000 puntos que obtengas ganaras 1 vida extra.<br><br>Perderas una vida si la cabeza de snake choca con su cuerpo o con las paredes. Si te quedas sin vidas, el juego termina. Buena Suerte!</p>");
  }
  if (Mundo.section == "Desarrollador") {
    title.html("<p class='menu'>Desarrollador</p>");
    desarrolladorInfo.html("<p class='info'>Mauricio Munoz Gutierrez</p>");
  }
  if ((Mundo.section != "Menu") && (Mundo.section != "Jugar")) {
    atras.html("<p class='menu'>Atras</p>");
  }
  if (Mundo.section == "Jugar") {
    scoreElem.html("Score = " + scoreValue);
    vidasElem.html("Vidas = " + vidasValue);

/*
Se da color rojo a la fruta.
*/

    fill(255, 0, 0);
    noStroke();
    rect(Mundo.food['x'] * dx, Mundo.food['y'] * dy, dx, dy);

/*
Se pinta el cuerpo de la serpiente
Dependiendo de la direccion pintar circulos en la cabeza de snake (Ojos)  
*/

    fill(35, 167, 6);
    noStroke();
    forEach(Mundo.snake, s => {
      rect(s.x * dx, s.y * dy, dx, dy);
    });
    if (Mundo.dir['x'] == 1) {
      fill(28, 125, 6);
      noStroke();
      circle((Mundo.snake[0]['x'] * 20) + 5, (Mundo.snake[0]['y'] * 20) + 5, 5);

      fill(28, 125, 6);
      noStroke();
      circle((Mundo.snake[0]['x'] * 20) + 5, (Mundo.snake[0]['y'] * 20) + 15, 5);

    }
    if (Mundo.dir['x'] == -1) {
      fill(28, 125, 6);
      noStroke();
      circle((Mundo.snake[0]['x'] * 20) + 15, (Mundo.snake[0]['y'] * 20) + 5, 5);

      fill(28, 125, 6);
      noStroke();
      circle((Mundo.snake[0]['x'] * 20) + 15, (Mundo.snake[0]['y'] * 20) + 15, 5);

    }
    if (Mundo.dir['y'] == 1) {
      fill(28, 125, 6);
      noStroke();
      circle((Mundo.snake[0]['x'] * 20) + 5, (Mundo.snake[0]['y'] * 20) + 5, 5);

      fill(28, 125, 6);
      noStroke();
      circle((Mundo.snake[0]['x'] * 20) + 15, (Mundo.snake[0]['y'] * 20) + 5, 5);

    }
    if (Mundo.dir['y'] == -1) {
      fill(28, 125, 6);
      noStroke();
      circle((Mundo.snake[0]['x'] * 20) + 5, (Mundo.snake[0]['y'] * 20) + 15, 5);

      fill(28, 125, 6);
      noStroke();
      circle((Mundo.snake[0]['x'] * 20) + 15, (Mundo.snake[0]['y'] * 20) + 15, 5);
    }
  }
}


// Esto se ejecuta en cada tic del reloj. Con esto se pueden hacer animaciones
//Se ejecuta el juego y se llama a la funciones relacionadas con el movimiento y el cuerpo de snake
function onTic(Mundo) {
if(Mundo.section == "Menu"){
    sound.stop();
    if(introS.isPlaying() == false){
        introS.play();
        introS.setVolume(0.08)
        return Mundo;
    }
    return Mundo;
}  
if (Mundo.section == "Jugar") {
    introS.stop();
    if(sound.isPlaying() == false){
        sound.play();
        return Mundo;
    }
    if ((first(Mundo.snake)['x'] == Mundo.food['x']) && (first(Mundo.snake)['y'] == Mundo.food['y'])) {
      return comer(Mundo);
    }
    else if ((posicionFood(Mundo, 0)) == 1) {
      console.log("l")
      return cambiarFood(Mundo);
    }
    else if (colisionPared(Mundo) == 1) {
      vidasValue = Mundo.life - 1;
      vidasElem.html('Vidas = ' + vidasValue);
      Mundo = { snake: [{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }], dir: { x: 0, y: 0 }, food: { x: Math.round(Math.random() * 24), y: Math.round(Math.random() * 24) }, life: Mundo.life - 1, section: "Jugar" };
      return Mundo;
    }
    else if (colisionPared(Mundo) == 0) {
      vidasValue = 0;
      vidasElem.html('Vidas = ' + vidasValue);
      GameOver();
      return Mundo;
    }
    return colisionSnake(Mundo, 1);
  }
  else return Mundo;
}

//Implemente esta función si quiere que su programa reaccione a eventos del mouse
//Dependiendo de la posicion del mouse dentro del canvas, cuando sa da click se ejecuta una accion.
function onMouseEvent(Mundo, event) {
  if (event.action == "press") {
    if (Mundo.section == "Menu") {
      if ((mouseX >= 25) && (mouseX <= 475) && ((mouseY >= 235) && (mouseY <= 260))) {
        title.html("");
        jugar.html("");
        instrucciones.html("");
        desarrollador.html("");
        scoreValue = 0;
        vidasValue = 3;
        scoreElem.html("Score = " + scoreValue);
        vidasElem.html("Vidas = " + vidasValue);
        return update(Mundo, { section: "Jugar" });
      }
      if ((mouseX >= 25) && (mouseX <= 475) && ((mouseY >= 285) && (mouseY <= 310))) {
        jugar.html("");
        instrucciones.html("");
        desarrollador.html("");
        return update(Mundo, { section: "Instrucciones" });
      }
      if ((mouseX >= 25) && (mouseX <= 475) && ((mouseY >= 335) && (mouseY <= 360))) {
        jugar.html("");
        instrucciones.html("");
        desarrollador.html("");
        return update(Mundo, { section: "Desarrollador" });
      }
    }
    if ((Mundo.section != "Menu") && (Mundo.section != "Jugar")) {
      if ((mouseX >= 25) && (mouseX <= 475) && ((mouseY >= 445) && (mouseY <= 470))) {
        title.html("<p>Snake Rattle n' Roll</p>");
        jugar.html("<p>Jugar</p>");
        instrucciones.html("<p>Instrucciones</p>");
        desarrollador.html("<p>Desarrollador</p>");
        instruccionesInfo.html("");
        desarrolladorInfo.html("");
        atras.html("");
        return update(Mundo, { section: "Menu" });
      }
      else return Mundo;
    }
  }
  return update(Mundo, {});
}


/**
* Actualiza el mundo cada vez que se oprime una tecla. Retorna el nuevo stado del mundo
*/
function onKeyEvent(Mundo, keyCode) {
  // Cambiamos la dirección de la serpiente. Noten que no movemos la serpiente. Solo la dirección
  if (Mundo.section == "Jugar") {
    switch (keyCode) {
      case UP_ARROW:
        if (Mundo.dir['y'] == 1) {
          if (keyCode == UP_ARROW) {
            return update(Mundo, { dir: { y: 1, x: 0 } });
          }
        }
        else return update(Mundo, { dir: { y: -1, x: 0 } });
        break;
      case DOWN_ARROW:
        if (Mundo.dir['y'] == -1) {
          if (keyCode == DOWN_ARROW) {
            return update(Mundo, { dir: { y: -1, x: 0 } });
          }
        }
        else return update(Mundo, { dir: { y: 1, x: 0 } });
        break;
      case LEFT_ARROW:
        if (Mundo.dir['x'] == 1) {
          if (keyCode == LEFT_ARROW) {
            return update(Mundo, { dir: { y: 0, x: 1 } });
          }
        }
        else if ((Mundo.dir['x'] == 0) && (Mundo.dir['y'] == 0)) {
          return Mundo;
        }
        else return update(Mundo, { dir: { y: 0, x: -1 } });
        break;
      case RIGHT_ARROW:
        if (Mundo.dir['x'] == -1) {
          if (keyCode == RIGHT_ARROW) {
            return update(Mundo, { dir: { y: 0, x: -1 } });
          }
        }
        else return update(Mundo, { dir: { y: 0, x: 1 } });
        break;
      case ENTER:
        if (Mundo.life == 1) {
          title.html("");
          scoreValue = 0;
          vidasValue = 3;
          scoreElem.html("Score = " + scoreValue);
          vidasElem.html("Vidas = " + vidasValue);
          gameOverInfo.html("");
          Mundo = { snake: [{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }], dir: { x: 0, y: 0 }, food: { x: Math.round(Math.random() * 24), y: Math.round(Math.random() * 24) }, life: 3, section: "Jugar" };
          return Mundo;
        }
        else return Mundo;
        break;
      case ESCAPE:
        if (Mundo.life == 1) {
          title.html("");
          scoreElem.html("");
          vidasElem.html("");
          title.html("<p>Snake Rattle n' Roll</p>");
          jugar.html("<p>Jugar</p>");
          instrucciones.html("<p>Instrucciones</p>");
          desarrollador.html("<p>Desarrollador</p>");
          gameOverInfo.html("");
          Mundo = { snake: [{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }], dir: { x: 0, y: 0 }, food: { x: Math.round(Math.random() * 24), y: Math.round(Math.random() * 24) }, life: 3, section: "Menu" };
          return Mundo;
        }
      default:
        console.log(keyCode);
        return update(Mundo, {});
    }
  }
  else return Mundo;
}