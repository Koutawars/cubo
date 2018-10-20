var loop = {
    id: null,
    lastRegister: 0,
    aps:0,
    fps:0,
    texto:"",
    iterar: term => {
        loop.id = window.requestAnimationFrame(loop.iterar);
        loop.clean();
        loop.Update();
        loop.Draw();
        if(term - loop.lastRegister > 999){
            loop.lastRegister = term;
            loop.texto = "FPS: "+ loop.fps + " APS: "+ loop.aps;
            loop.aps = 0;
            loop.fps = 0;
        }
    },
    clean: function(){
        // function clean of canvas.
        ctx.fillStyle = "#000";
        ctx.fillRect(0,0, canvas.width,canvas.height);
    },
    Update: function(){
        draw();
        loop.aps++;
    },
    Draw: function(){
        update();
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(loop.texto,0,50);
        loop.fps++;
    }
};
document.addEventListener('DOMContentLoaded', function(){
    setup();
    loop.iterar();
});