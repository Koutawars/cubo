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
var trans3Dto2D = [[1,0,0],[0,1,0]];
var numScale = 50;
var angleNow = 0;
var angleSum = 0.01;
var rotar = 3;
var radioDeRotacionX = 0;
var radioDeRotacionY = 0;
var radioDeRotacionZ = 0;

var movX = canvas.width/2;
var movY = canvas.height/2; 
var angulo = 0;

var tam = 5;
function setup(){
    console.log(analyser);
}

function update(){
    let fbc_array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(fbc_array);
    numScale = fbc_array[0];
    if(numScale < 50)numScale = 50;
    document.getElementById("input0").value = numScale;
}


function draw(){
    let m, k = [];
    // Coloca una suma de matrices para agregar un radio de rotación
    for(let i = 0; i < puntos.length; i++){
        k.push(sumMatriz(puntos[i],[[Math.floor((radioDeRotacionX/numScale))],[Math.floor((radioDeRotacionY/numScale))], [Math.floor(radioDeRotacionZ/numScale)]]));
    }
    puntos = k;
    for(let i = 0; i < puntos.length; i++){
        m = puntos[i];
        // se escala 
        m = multiMatrix(m, scale(numScale));
        // Opciones para escalar
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
            default:
            m = multiMatrix(m, rotateL(angleNow, Math.cos(angulo), Math.sin(angulo)));
            break;
        }
        // se pasa de 3d a 2D
        m = multiMatrix(m, trans3Dto2D);
        // guarda los puntos en el vector position
        position[i] = {x:m[0][0] + movX, y:m[1][0] + movY}
    }
    
    // Suma el angulo por cada ciclo
    angleNow = angleSum + angleNow % (2*Math.PI);
    // se une con una raya para formar un cubo
    for(var i = 0; i < 4; i++){
        unir(position[i], position[(i+1)%4]);
        unir(position[i+4], position[(i+1)%4 + 4]);
        unir(position[i], position[i+4]);
    }
    puntos = puntosSave;
}
// vector de escalar
function scale(a){
    return [[a,0,0],[0,a,0],[0,0,a]];
}
// vector para rotar en cualquier dirección
function rotateL(angle, x, y, z = 0){
    let cos = Math.cos(angle);
    let sen = Math.sin(angle);
    return [
            [cos + x*x*(1-cos)   , x*y*(1-cos) - z*sen , x*z*(1-cos) + y*sen],
            [y*x*(1-cos) + z*sen , cos + y*y*(1-cos)   , y*z*(1-cos) - x*sen],
            [z*x*(1-cos) - y*sen , z*y*(1-cos) + x*sen , cos + z*z*(1-cos)]
            ];
}
// vector para rotar en la z dando un angulo
function rotateZ(angle){
    return [[Math.cos(angle),Math.sin(angle),0],[-Math.sin(angle),Math.cos(angle),0],[0,0,1]];
}
// vector para rotar en la x dando un angulo
function rotateX(angle){
    return [[1,0,0],[0,Math.cos(angle),Math.sin(angle)],[0,-Math.sin(angle),Math.cos(angle)]];
}
// vector para rotar en la z dando un angulo
function rotateY(angle){
    return [[Math.cos(angle),0,Math.sin(angle)],[0,1,0],[-Math.sin(angle),0, Math.cos(angle)]];
}

// se une dos puntos con una linea
function unir(initial, final){
    ctx.beginPath();
    ctx.lineWidth = 2*(numScale/50);
    ctx.strokeStyle = '#003300';
    ctx.moveTo(initial.x,initial.y);
    ctx.lineTo(final.x,final.y);
    ctx.stroke();
}
// eventlistener de los botones
document.body.addEventListener("wheel", function (e) {
    numScale += e.wheelDelta > 0 ? 5: -5; 
    document.getElementById("input0").value = numScale;
});

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
        angleSum = parseFloat(e.srcElement.value);
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
document.getElementById("rotation").addEventListener("change", e =>{
    rotar = e.srcElement.checked ? 3:1000;
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
var x1, x2, y1, y2, puesta = false;
canvas.addEventListener("mousedown", function(e) {
    if(!puesta){
        x1 = e.pageX;
        y1 = e.pageY;
        puesta = true;
    }
});
canvas.addEventListener("mouseup", function(e) {
    if(puesta){
        puesta = false;
    }
});
canvas.addEventListener("mousemove", function(e) {
    if(puesta){
        x2 = e.pageX;
        y2 = e.pageY;
        angulo = getAngle(x1, y1, x2, y2);
    }
});

// función para calcular el angulo entre dos puntos
function getAngle (x1, y1, x2, y2) {
    let distY = y1-y2; 
    let distX = x1-x2; 
    return (Math.PI) + (Math.atan2(distY,distX))/2;
}