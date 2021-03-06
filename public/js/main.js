// Crea el canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
canvas.height = window.innerHeight || document.documentElement.clientWidth || document.body.clientWidth;
document.querySelector('body').appendChild(canvas);
window.addEventListener('resize', resizeCanvas, false);
window.addEventListener('orientationchange', resizeCanvas, false);
var currentMusic;
function resizeCanvas() {
    canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    canvas.height = window.innerHeight || document.documentElement.clientWidth || document.body.clientWidth;
}
{
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var context = new AudioContext();
    var audioElement = document.createElement("audio");
    var source = context.createMediaElementSource(audioElement);
    var analyser = context.createAnalyser();
    var gainNode =  context.createGain();
    audioElement.src = "./audio/roses.mp3";
    audioElement.preload = true;
    audioElement.controls = true;
    audioElement.className = "cuadro";
    audioElement.id = "music";
    source.connect(analyser);
    source.connect(gainNode);
    analyser.connect(context.destination);
    gainNode.connect(context.destination);
    let cuadro = document.createElement("form");
    cuadro.className = "cuadro";
    cuadro.action = "/";
    let inp = document.createElement("input");
    inp.type = "file"
    inp.accept = "audio/*";
    inp.multiple = "multiple";
    let inp2 = document.createElement("input");
    inp2.type = "submit";
    inp2.addEventListener("click", function(e){
        e.preventDefault();
        currentMusic = 0;
        let url = URL.createObjectURL(inp.files[currentMusic]);  
        audioElement.setAttribute('src', url);
        audioElement.play();
    });
    audioElement.addEventListener('ended', function(){
        if(inp.files[currentMusic + 1]){
            currentMusic += 1;
            let url = URL.createObjectURL(inp.files[currentMusic]);  
            audioElement.setAttribute('src', url);
            audioElement.play();
        }else{
            currentMusic = 0;
            audioElement.play();
        }
    });
    cuadro.appendChild(inp2);
    cuadro.appendChild(inp);
    document.getElementById("container").appendChild(audioElement);
    document.getElementById("container").appendChild(cuadro);
}