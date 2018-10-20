
var puntos = [[[1],[1],[1]],
            [[-1],[1],[1]],
            [[1],[-1],[1]],
            [[-1],[-1],[1]],
            [[1],[1],[-1]],
            [[-1],[1],[-1]],
            [[1],[-1],[-1]],
            [[-1],[-1],[-1]]];
var trans3Dto2D = [[1,0,0],[0,1,0], [0,0,1]];

var numScale = 50;
var angleNow = 0;
var angleSum = 0.01;
var rotar = 6;

var tam = 5;
function setup(){
    console.log("numScale: escalar, angleSum: gira mas rapido, rotar: 0,1,2,3,4,5,6")
}

function update(){
}


function draw(){
    ctx.save();
    ctx.transform(1,0,0,1,canvas.width/2,canvas.height/2);
    let m;
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
        ctx.beginPath();
        ctx.arc(m[0][0], m[1][0], tam, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.lineWidth = 2;  
        ctx.strokeStyle = '#003300';
        ctx.stroke();
    }
    
    angleNow += angleSum;

    ctx.restore();
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
