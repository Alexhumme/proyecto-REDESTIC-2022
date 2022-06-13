var pieza, cursor; var segundo, conteoFrames = 0;
// funcion de inicializacion
function iniciarPrototipo(){
    pieza= new constructor(1,100,100,200,200);
    let main =document.getElementById("principal"); main.innerHTML = "";
    let c = main.insertBefore(document.createElement("canvas"),null); c.id = "canvas";
    gameSpace.iniciar();
    generarEscenario(eNv1,50,50,Nv1);
    generarEscenario(eNv2,50,50,Nv2);
    cursor = new constructor("cursor",0,0,50,50);
}
// juego
var gameSpace = {
    iniciar: function(){
        this.canva = document.getElementById("canvas");
        this.canva.width = 500;
        this.canva.height = 500;
        this.canva.style.cursor = "none";
        
        this.ctx = this.canva.getContext("2d");

        this.interval = setInterval(actualizarFrame, 20);
        window.addEventListener("mousemove", (e)=>{ //actualiza la posicion del juego a la del cursor
            gameSpace.x = e.x-gameSpace.canva.offsetLeft;
            gameSpace.y = e.y-gameSpace.canva.offsetTop;
        }, false);
        window.addEventListener("mousedown", (e)=>{
            console.log("click");
            gameSpace.x = e.x-gameSpace.canva.offsetLeft;
            gameSpace.y = e.y-gameSpace.canva.offsetTop;
            for (let ele of Nv2){
                if(
                    cursor.x+cursor.ancho/2 > ele.x &&
                    cursor.y+cursor.alto/2 > ele.y &&
                    cursor.x+cursor.ancho/2 < ele.x+ele.ancho &&
                    cursor.y+cursor.alto/2 < ele.y+ele.alto
                ){
                    ele.sel = true;
                    console.log(Nv2.indexOf(ele))
                }
            }
        }, false);
        window.addEventListener("mouseup",(e)=>{
            console.log("offclick");
            gameSpace.x = e.x-gameSpace.canva.offsetLeft;
            gameSpace.y = e.y-gameSpace.canva.offsetTop;
            for (let ele of Nv2){
                if(
                    cursor.x+cursor.ancho/2 > ele.x &&
                    cursor.y+cursor.alto/2 > ele.y &&
                    cursor.x+cursor.ancho/2 < ele.x+ele.ancho &&
                    cursor.y+cursor.alto/2 < ele.y+ele.alto
                ){
                    ele.sel = false;
                }
            }
        }, false);
    },
    limpiar: function(){
        this.ctx.clearRect(0,0,this.canva.width,this.canva.height);
        capa1 = [];
    }
}

function constructor(tipo,x,y,ancho,alto){
    this.tipo = tipo,
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.val = tipo;
    this.sel = false;
    this.dibujar = function(){
        ctx = gameSpace.ctx;
        switch (tipo){
            case 0:ctx.strokeStyle = "green";ctx.strokeRect(this.x, this.y, ancho, alto); break;
            case 1:
            ctx.fillStyle = "yellow";
            ctx.fillRect(this.x, this.y, ancho, alto);
            gameSpace.ctx.font = "bold 15pt sans-serif";
            ctx.fillStyle = "red";
            ctx.fillText(tipo,this.x+this.ancho/2,10+this.y+this.alto/2);
            break;
            case 2:
            ctx.fillStyle = "orange";
            ctx.fillRect(this.x, this.y, ancho, alto);
            gameSpace.ctx.font = "bold 15pt sans-serif";
            ctx.fillStyle = "purple";
            ctx.fillText(tipo,this.x+this.ancho/2,10+this.y+this.alto/2);
            break;
            case 3:
            ctx.fillStyle = "purple";
            ctx.fillRect(this.x, this.y, ancho, alto);
            gameSpace.ctx.font = "bold 15pt sans-serif";
            ctx.fillStyle = "yellow";
            ctx.fillText(tipo,this.x+this.ancho/2,10+this.y+this.alto/2);
            break;
            case 4:
            ctx.fillStyle = "red";
            ctx.fillRect(this.x, this.y, ancho, alto);
            gameSpace.ctx.font = "bold 15pt sans-serif";
            ctx.fillStyle = "orange";
            ctx.fillText(tipo,this.x+this.ancho/2,10+this.y+this.alto/2);
            break;
            case "voidX": ctx.strokeStyle = "red";ctx.strokeRect(this.x, this.y, ancho, alto); break;
            case "cursor": 
            ctx.strokeStyle = "yellow";
            ctx.strokeRect(this.x, this.y, ancho, alto);
            ctx.strokeRect(this.x+this.ancho/4, this.y+this.alto/4, ancho*0.5, alto*0.5);
            break;

        }
    }
    this.mover = function(){
        if(this.sel){
            this.x = gameSpace.x;
            this.y = gameSpace.y;
        }
        if (gameSpace.x && gameSpace.y){
            cursor.x = gameSpace.x;
            cursor.y = gameSpace.y;
        }
    }
    this.encajar = function(){
        if (this.x%25 != 0 && this.y%25!=0){
            for (let e of capa1){
                if(
                    this.x+this.ancho/2 > e.x &&
                    this.y+this.alto/2 > e.y &&
                    this.x+this.ancho/2 < e.x+e.ancho &&
                    this.y+this.alto/2 < e.y+e.alto
                ){
                  this.x = e.x;
                  this.y = e.y;  
                }
            }
        }
    }

}
function prueba(capa1,capa2,tiempo,puntos,victoria){
    this.capa1 = capa1;
    this.capa2 = capa2;
    this.tiempo = tiempo;
    this.puntos = puntos;
    this.victoria = victoria; 
}
function gp(){
    if(
        ((Nv2[0].x == Nv1[18].x &&
        Nv2[0].y == Nv1[18].y) &&
        (Nv2[1].x == Nv1[19].x &&
        Nv2[1].y == Nv1[19].y))
        ||
        ((Nv2[1].x == Nv1[18].x &&
        Nv2[1].y == Nv1[18].y) &&
        (Nv2[0].x == Nv1[19].x &&
        Nv2[0].y == Nv1[19].y))
        ){
            alert("prueba completada!");
        }
}
function consultarFrames(){
    var seg = Math.floor(Date.now()/1000);
    if (seg != segundo)
    {
        segundo = seg;
        fps = conteoFrames;
        conteoFrames = 1;
    } else {conteoFrames++};

    gameSpace.ctx.font = "bold 10pt sans-serif";
    gameSpace.ctx.fillStyle = "red";
    gameSpace.ctx.textAlign = "center"
    gameSpace.ctx.fillText("FPS: "+ fps + " || cx = "+cursor.x + " || cy = "+cursor.y, gameSpace.canva.width/2, 20)
}
function actualizarFrame(){
    gameSpace.limpiar();
    
    generarEscenario(fondo,25,25,capa1);
    for(e of Nv1){e.dibujar();}
    for(i of Nv2){i.mover();i.encajar();i.dibujar();}
    cursor.mover();cursor.encajar();cursor.dibujar();
    gp();
    consultarFrames();
}