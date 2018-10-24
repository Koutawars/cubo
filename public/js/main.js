// Crea el canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
canvas.height = window.innerHeight || document.documentElement.clientWidth || document.body.clientWidth;
document.querySelector('body').appendChild(canvas);
window.addEventListener('resize', resizeCanvas, false);
window.addEventListener('orientationchange', resizeCanvas, false);
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
    audioElement.src = "./audio/roses.mp3";
    audioElement.preload = true;
    audioElement.controls = true;
    audioElement.className = "cuadro";
    source.connect(analyser);
    analyser.connect(context.destination);
    document.getElementById("container").appendChild(audioElement);
}