function multiMatrix(a, b){
    if(a.length == b[0].length){
        let sum = 0;
        let retMatrix = [];
        for(let i = 0; i < a[0].length; i++){
            for(let j = 0; j < b.length;j++){
                for(let k = 0; k < b[0].length; k++){
                    sum += a[k][i] * b[j][k];
                }
                retMatrix.push([sum]);
                sum = 0;
            }
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