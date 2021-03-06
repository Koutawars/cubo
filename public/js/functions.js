function multiMatrix(a, b){
    if(a.length == b[0].length){
        let sum = 0;
        let retMatrix = [];
        let column = [];
        for(let i = 0; i < b.length; i++){
            for(let j = 0; j < a[0].length; j++){
                for(let k = 0; k < b[0].length;k++){
                    sum += a[k][j] * b[i][k];
                }
                column.push(sum);
                sum = 0;
            }
            retMatrix.push(column);
            column = [];
        }
        return retMatrix;
    }else{
        console.error("Error multiply matrix  rows and columns not match");
        return null;
    }
}
function MatrixToVector(a){
    retVect = [];
    for(let i = 0; i < a.length; i++){
        for(let j = 0; j < a[i].length;j++){
            retVect.push(a[i][j]);
        }
    }
    return retVect;
}

function sumMatriz(a, b){
   if(a[0].length == b[0].length && a.length == b.length){
       let retMatrix = [];
       let matrixTemp = [];
       let sum = 0;
        for(let i = 0; i < a.length; i++){
            for(let j = 0; j < b[0].length;j++){
                matrixTemp.push(a[i][j]+b[i][j]);
            }
            retMatrix.push(matrixTemp)
            matrixTemp = [];
        }
        return retMatrix;
   }else{
       console.error("Error at sum matrix");
       return null;
   }
}
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
}