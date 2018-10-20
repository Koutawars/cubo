var puntos = [[[1],[1],[1]],
            [[1],[-1],[1]],
            [[-1],[-1],[1]],
            [[-1],[1],[1]],
            [[1],[1],[-1]],
            [[1],[-1],[-1]],
            [[-1],[-1],[-1]],
            [[-1],[1],[-1]]];
var position = [];
var puntosSave = puntos;
var trans3Dto2D = [[1,0,0],[0,1,0], [0,0,1]];

var numScale = 50;
var angleNow = 0;
var angleSum = 0.01;
var rotar = 3;
var radioDeRotacionX = 0;
var radioDeRotacionY = 0;

var movX = canvas.width/2;
var movY = canvas.height/2; 

var tam = 5;
function setup(){
    console.log("numScale: escalar, angleSum: gira mas rapido, rotar: 0,1,2,3,4,5,6, - radioDeRotacionX/radioDeRotacionY: radio de rotacion");
    console.log("movX: posición en X, movY: posicion en Y");
}

function update(){
}


function draw(){
    let m, k = [];
    for(let i = 0; i < puntos.length; i++){
        k.push(sumMatriz(puntos[i],[[Math.floor((radioDeRotacionX/numScale))],[Math.floor((radioDeRotacionY/numScale))], [0]]));
    }
    puntos = k;
    for(let i = 0; i < puntos.length; i++){
        m = puntos[i];
        // se escala
        m = multiMatrix(m, scale(numScale));
        // se rota en la Z
        switch(rotar){
            case 0:
            m = multiMatrix(m, rotateY(angleNow));
            break;
            case 1:
            m = multiMatrix(m, rotateX(angleNow));
            break;
            case 2:
            m = multiMatrix(m, rotateZ(angleNow));
            break;
            case 3:
            m = multiMatrix(m, rotateY(angleNow));
            m = multiMatrix(m, rotateX(angleNow));
            break;
            case 4:
            m = multiMatrix(m, rotateY(angleNow));
            m = multiMatrix(m, rotateZ(angleNow));
            break;
            case 5:
            m = multiMatrix(m, rotateX(angleNow));
            m = multiMatrix(m, rotateZ(angleNow));
            break;
            case 6:
            m = multiMatrix(m, rotateX(angleNow));
            m = multiMatrix(m, rotateY(angleNow));
            m = multiMatrix(m, rotateZ(angleNow));
            break;
        }
        // se pasa de 3d a 2D
        m = multiMatrix(m, trans3Dto2D);
        position[i] = {x:m[0][0] + movX, y:m[1][0] + movY}
    }
    
    angleNow += angleSum;
    for(var i = 0; i < 4; i++){
        unir(position[i], position[(i+1)%4]);
        unir(position[i+4], position[(i+1)%4 + 4]);
        unir(position[i], position[i+4]);
    }

    position.forEach(punto=> {
        showPunto(punto.x, punto.y);
    })
    puntos = puntosSave;
}
function scale(a){
    return [[a,0,0],[0,a,0],[0,0,a]];
}
function rotateZ(angle){
    return [[Math.cos(angle),Math.sin(angle),0],[-Math.sin(angle),Math.cos(angle),0],[0,0,1]];
}
function rotateX(angle){
    return [[1,0,0],[0,Math.cos(angle),Math.sin(angle)],[0,-Math.sin(angle),Math.cos(angle)]];
}

function rotateY(angle){
    return [[Math.cos(angle),0,Math.sin(angle)],[0,1,0],[-Math.sin(angle),0, Math.cos(angle)]];
}

function unir(initial, final){
    ctx.beginPath();
    ctx.moveTo(initial.x,initial.y);
    ctx.lineTo(final.x,final.y);
    ctx.stroke();
}
function showPunto(x, y){
    ctx.beginPath();
    ctx.arc(x, y, tam, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.lineWidth = 2;  
    ctx.strokeStyle = '#003300';
    ctx.stroke();
}