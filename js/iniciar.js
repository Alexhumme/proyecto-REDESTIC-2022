function iniciarPrototipo(){
    gameSpace.iniciar();
}

var gameSpace = {
    canva : function(){
        c = document.getElementById("principal").insertBefore(document.createElement("canva"),null);
        c.id = "canvas";
        c = document.getElementById("canvas");
        return c;
    },
    iniciar: function(){
        this.canva().width = 750;
        this.canva().height = 500;
        this.canva().style.cursor = "none";
        
        this.ctx = this.canva().getContext("2d");

        console.log(this.ctx);
        this.ctx.fillStyle = "red";
        this.ctx.lineTo(100,100);
        this.ctx.stroke();
    }
}