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
var radioDeRotacionZ = 0;

var movX = canvas.width/2;
var movY = canvas.height/2; 

var tam = 5;
function setup(){
}

function update(){
}


function draw(){
    let m, k = [];
    for(let i = 0; i < puntos.length; i++){
        k.push(sumMatriz(puntos[i],[[Math.floor((radioDeRotacionX/numScale))],[Math.floor((radioDeRotacionY/numScale))], [Math.floor(radioDeRotacionZ/numScale)]]));
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
document.getElementById("input0").value = numScale;
document.getElementById("input0").addEventListener("keyup", e =>{
    if(/[0-9]+/i.test(e.srcElement.value)){
        numScale = parseInt( e.srcElement.value);
    }else{
        numScale = 50;
    }
});
document.getElementById("input1").value = angleSum;
document.getElementById("input1").addEventListener("keyup", e =>{
    if(/[0-9]+/i.test(e.srcElement.value)){
        angleSum = parseInt(e.srcElement.value);
    }else{
        angleSum = 0.01;
    }
});
document.getElementById("input2").value = rotar;
document.getElementById("input2").addEventListener("change", e =>{
    rotar = parseInt( e.srcElement.value);
    if(rotar >6){
        rotar = 4;
    }
});
document.getElementById("input3").value = radioDeRotacionX;
document.getElementById("input3").addEventListener("keyup", e =>{
    if(/[0-9]+/i.test(e.srcElement.value)){
        radioDeRotacionX = parseInt( e.srcElement.value);
    }else{
        radioDeRotacionX = 0;
    }
});
document.getElementById("input4").value = radioDeRotacionY;
document.getElementById("input4").addEventListener("keyup", e =>{
    if(/[0-9]+/i.test(e.srcElement.value)){
        radioDeRotacionY = parseInt( e.srcElement.value);
    }else{
        radioDeRotacionY = 0;
    }
});
document.getElementById("input7").value = radioDeRotacionZ;
document.getElementById("input7").addEventListener("keyup", e =>{
    if(/[0-9]+/i.test(e.srcElement.value)){
        radioDeRotacionZ = parseInt( e.srcElement.value);
    }else{
        radioDeRotacionZ = 0;
    }
});
document.getElementById("input5").value = movX;
document.getElementById("input5").addEventListener("keyup", e =>{
    if(/[0-9]+/i.test(e.srcElement.value)){
        movX = parseInt(e.srcElement.value);
    }else{
        movX = canvas.width/2;
    }
});

document.getElementById("input6").value = movY;
document.getElementById("input6").addEventListener("keyup", e =>{
    if(/[0-9]+/i.test(e.srcElement.value)){
        movY = parseInt(e.srcElement.value);
    }else{
        movY = canvas.height/2;
    }
});
