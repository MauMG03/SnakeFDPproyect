// Importamos las librerias
let { append, cons, first, isEmpty, isList, length, rest, map, forEach }  = functionalLight;

// Actualiza los atributos del objeto y retorna una copia profunda
function update(data, attribute) {
  return Object.assign({}, data, attribute);
}

//////////////////////// Mundo inicial
let Mundo = {}
////////////////////////

let scoreElem;
let scoreValue;
/**
 * Actualiza la serpiente. Creando una nuevo cabeza y removiendo la cola
 */
function moveSnake(snake, dir) {
  const head = first(snake);
  return cons({x: head.x + dir.x, y: head.y + dir.y}, snake.slice(0, length(snake) - 1));
}

function growSnake(Mundo){
  return update(Mundo, {snake: append(Mundo.snake, incrementoColaSnake(Mundo))})
}

function incrementoColaSnake(Mundo){
  if(isEmpty(rest(Mundo.snake))) return {x:first(Mundo.snake)['x'] , y:first(Mundo.snake)['y']}
  else return incrementoColaSnake(update(Mundo, {snake: rest(Mundo.snake)}))
}

function colisionSnake(Mundo, i){
const headX = first(Mundo.snake)['x']
const headY = first(Mundo.snake)['y']

if((Mundo.snake[i]['x'] == headX) && (Mundo.snake[i]['y'] == headY)){
  console.log("GameOver") 
  return Mundo;
}
else if(i == length(Mundo.snake) -1) return update(Mundo, {snake: moveSnake(Mundo.snake, Mundo.dir)});
else return colisionSnake(Mundo, i + 1);
}

function colisionPared(Mundo){
const headX = first(Mundo.snake)['x']
const headY = first(Mundo.snake)['y'] 

if(headX == 25) return true
else if(headX == -1) return true
else if(headY == 25) return true
else if(headY == -1) return true
}

const dx = 20;
const dy = 20;

/**
 * Esto se llama antes de iniciar el juego
 */
function setup() {
  scoreValue =0;
 scoreElem = createDiv('Score = 0');
  scoreElem.position(20, 20);
  scoreElem.id = 'score';
  scoreElem.style('color', 'white');

  frameRate(10);
  createCanvas(500, 500);
  background(0, 0, 0);
  Mundo = {snake: [{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }], dir: {x: 1, y: 0}, food: {x: 5, y: 5 }};
}


// Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar
function drawGame(Mundo){
  background(38, 39, 104);
  

  fill(255,0,0);
  noStroke();
  
  rect(Mundo.food['x'] * dx,  Mundo.food['y'] * dy, dx, dy);

  fill(35, 167, 6);
  noStroke();
  forEach(Mundo.snake, s => {
    rect(s.x * dx, s.y * dy, dx, dy);
  });

  fill(28,125,6)
  noStroke()
  circle((Mundo.snake[0]['x'] * 20) + 5, (Mundo.snake[0]['y'] * 20) +5, 5)

  fill(28,125,6)
  noStroke()
  circle((Mundo.snake[0]['x'] * 20) + 5, (Mundo.snake[0]['y'] * 20) +15, 5)

  fill(255,0,0)
  noStroke()
  rect((Mundo.snake[0]['x'] * 20) + 20, (Mundo.snake[0]['y'] * 20) + 30,3,5)
}


// Esto se ejecuta en cada tic del reloj. Con esto se pueden hacer animaciones
function onTic(Mundo){
  
if((first(Mundo.snake)['x'] == Mundo.food['x']) && (first(Mundo.snake)['y'] == Mundo.food['y'])){
  scoreValue =scoreValue+100;
  scoreElem.html('Score = '+scoreValue)
  
  return update(growSnake(Mundo), {food: {x: Math.round(Math.random() * 24), y:Math.round(Math.random() * 24)}})    
}
else if(colisionPared(Mundo) == true){
  console.log("GameOver") 
  return Mundo;
}  
else return colisionSnake(Mundo, 1)
}

//Implemente esta función si quiere que su programa reaccione a eventos del mouse
function onMouseEvent (Mundo, event) {
   return update(Mundo,{});
}


/**
* Actualiza el mundo cada vez que se oprime una tecla. Retorna el nuevo stado del mundo
*/
function onKeyEvent (Mundo, keyCode) {
  // Cambiamos la dirección de la serpiente. Noten que no movemos la serpiente. Solo la dirección

  
  switch (keyCode) {
    case UP_ARROW:
      if(Mundo.dir['y'] == 1 ){
        if(keyCode == UP_ARROW)
          {
            return update(Mundo, {dir: {y: 1, x:0}})
          }
        }  
      else return update(Mundo, {dir: {y: -1, x: 0}});
      break;
    case DOWN_ARROW:
    if(Mundo.dir['y'] == -1 ){
      if(keyCode == DOWN_ARROW)
        {
          return update(Mundo, {dir: {y: -1, x:0}})
        }
      }  
      else return update(Mundo, {dir: {y: 1, x: 0}});
      break;
    case LEFT_ARROW:
      if(Mundo.dir['x'] == 1 ){
        if(keyCode == LEFT_ARROW)
          {
            return update(Mundo, {dir: {y: 0, x:1}})
          }
        }  
      else return update(Mundo, {dir: {y: 0, x: -1}});
      break;
    case RIGHT_ARROW:
      if(Mundo.dir['x'] == -1 ){
        if(keyCode == RIGHT_ARROW)
          {
            return update(Mundo, {dir: {y: 0, x:-1}})
          }
        }  
      else return update(Mundo, {dir: {y: 0, x: 1}});
      break;
    default:
      console.log(keyCode);
      return update(Mundo, {});
  }
}