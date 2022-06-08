// funcion de inicializacion
function iniciarPrototipo(){
    let main =document.getElementById("principal"); main.innerHTML = "";
    let c = main.insertBefore(document.createElement("canvas"),null); c.id = "canvas";
    gameSpace.iniciar();
}
// juego
var gameSpace = {
    iniciar: function(){
        this.canva = document.getElementById("canvas");
        this.canva.width = 750;
        this.canva.height = 500;
        this.canva.style.cursor = "none";
        
        this.ctx = this.canva.getContext("2d");

        this.interval = setInterval(actualizar, 20);
    },
    limpiar: function(){
        this.ctx.clearRect(0,0,this.canva.width,this.canva.height);
    }
}

function constructor(tipo){
    this.tipo = tipo,
    this.actualizar = function(){
        ctx = gameSpace.ctx;
        ctx.fillStyle = color;
        ctx.fillRect(100, 100, 100, 100);
    }

}
function actualizarFrame(){
    gameSpace.limpiar();
    constructor.actualizar();
}