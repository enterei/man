function main() {
    init();
}
var audio = new Audio(' pacm.m4a');
audio.play();
var pacman = null;
var trans = [0, 0, 0];
var ltrans = [0, 0, 0];
var cubes = [];

var fragments1 = [];
var fragments2 = [];
var selected = 10;
var xxxx = true;
var mode = 2.0;
var lightran = mat4.create();
var lightrot = mat4.create();
var shin = 100.0;
var lightmode = false;

var materialDiffuse = [0.2, 0.3, 0.5, 0.0];
var materialSpecular = [0.3, 0.5, 0.1, 1.0];
var lightPosition = [0.0, 10.0, -0.0, 1.0];
var light = new light();



var diffProduct = vec4.create();
var specProduct = vec4.create();

//rotation
var rotas = [0, 0, 0];
// scaling
var scale = [1, 1, 1];
//var cubes = [];

function init() {
    console.log(Cubepoints.length);
    console.log(Cubecolors.length);
    console.log(Cubenormals.length);

    const canvas = document.getElementById("glCanvas");
    const gl = canvas.getContext("webgl");
    gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);
    gl.clearColor(1.0, 0.9, 0.9, 1.0);
    gl.enable(gl.DEPTH_TEST);


    let pMatrix = mat4.create();
    let perspectiveMatrix = mat4.create();
    const asp = canvas.clientWidth / canvas.clientHeight;
    const bottom = -1;
    const zNear = -10;
    const zFar = 100;
    var fieldOfViewRadians = degToRad(5);
    var cameraAngleRadians = degToRad(0);

    mat4.ortho(pMatrix, -asp, asp, bottom, -bottom, zNear, zFar);
    perspectiveMatrix = mat4.perspective(perspectiveMatrix, fieldOfViewRadians, canvas.width / canvas.height, 0.01, 30);







    

    pacman = new ShadedSphere(gl, [-0.44999999, 0.05, 0.0], "gauraud-vertex-shader", "gauraud-fragment-shader",true,true);
    pacman2 = new ShadedSphere(gl, [-0.44999999, 0.05, 0.0], "gauraud-vertex-shader", "gauraud-fragment-shader",false,true);




    pacman.updateScale([0.05, 0.05, 0.05]);
    pacman2.updateScale([0.05, 0.05, 0.05]);

    var gP = new GroundPlane(gl);


    updateWalls(gl);




    var lightDiffuse = [1.0, 0.5, 0.4, 0.0];
    var lightSpecular = [0.2, 0.0, 0.2, 1.0];
    vec4.multiply(diffProduct, lightDiffuse, materialDiffuse);
    vec4.create(); vec4.multiply(specProduct, lightSpecular, materialSpecular);
    diffProduct = [0.6, 0.15, 0.3, 0.5];
    diffProduct = [0.6, 0.15, 0.7, 0.5];



    console.log("gaa");
    pacman.updateGlTrans(pacman.position);
    pacman2.updateGlTrans(pacman.position);

    cubes.push(pacman);

    var then = 0;
    var rotcounter =0;
    var up = true;
    function render(now) {




        now *= 0.001;
      
      const theta= now-then;
      then=now;
    if(rotcounter==35){

        up=!up;
        rotcounter=0;
        if(up){
            pacman.update(theta);
            pacman2.update(theta*(-1))

        }
        else{
            pacman.update(theta*(-1));
            pacman2.update(theta);

        }
    }
    else{
        
        if(up){
            pacman.update(theta);
            pacman2.update(theta*(-1));

        }
        else{
            pacman.update(theta*(-1));
            pacman2.update(theta);

        }
    }
        
        rotcounter += 1;


        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);



        pacman.drawL(gl, pMatrix);
        pacman2.drawL(gl, pMatrix);

        for (i = 0; i < walls.length; i++) walls[i].drawL(gl, pMatrix);
        gP.draw(gl, pMatrix);



        if (xxxx) requestAnimationFrame(render);
    }

    // Start rendering
    requestAnimationFrame(render);

}



window.onkeydown = function (event) {

    var key = String.fromCharCode(event.keyCode);
    switch (key) {
        case '0': selected = 10;
            mode = 0.0;

            break;

        case '1':
            selected = 0;
            mode = 1.0;

            break;
        case '2':
            selected = 1;
            mode = 2.0;
            break;
        case '3':

            selected = 2;
            mode = 3.0;
            break;
        case '4':
            selected = 3;
            break;
        case '5':
            selected = 4;
            break;
        case '6':
            selected = 5;
            break;
        case '7':
            selected = 6;
            break;
        case '8':
            selected = 7;
            break;
        case '9':
            selected = 8;
            break;





    }
    var key = event.keyCode;
    switch (key) {


        case 37:
            trans[0] = -0.01;
            //   console.log("habede");

            ltrans[0] = -0.5;
            // cubes[selected].updateTrans(trans);
            if(update_trans(trans)){
                console.log("rotaaaa");
                pacman.updateGlRota([0,0,0]);  
                pacman2.updateGlRota([0,0,0]); 

            }

            break;

        case 39:
            //  console.log("habede");

            trans[0] = 0.01;
            ltrans[0] = 0.5;
            // cubes[selected].updateTrans(trans);
            if(update_trans(trans)){
                pacman.updateGlRota([0,2*raddeg(90),0]);  
                pacman2.updateGlRota([0,2*raddeg(90),0]); 

            }
            break;

        case 38:
            trans[2] = -0.01;
            ltrans[1] = 0.5;
            if(update_trans(trans)){
                pacman.updateGlRota([0,3*raddeg(90),0]);  
                pacman2.updateGlRota([0,3*raddeg(90),0]); 

            }
            break;
        case 40:
            trans[2] = 0.01;
            ltrans[1] = -0.5;
            if(update_trans(trans)){
                pacman.updateGlRota([0,1*raddeg(90),0]);  
                pacman2.updateGlRota([0,1*raddeg(90),0]); 

            }
            break;
        case 190:
            trans[2] = 0.01;
            ltrans[2] = 0.5;
            // cubes[selected].updateTrans(trans);
            update_trans(trans);
            break;


        case 188: trans[2] = -0.01;
            ltrans[0] = -0.5;
            // cubes[selected].updateTrans(trans);
            update_trans(trans);
            break;

        //rotation

        case 83:
            rotas[0] = -0.1;
            // cubes[selected].updateRota(rotas);
            update_rota();


            break;

        case 87: rotas[0] = 0.1;
            // cubes[selected].updateRota(rotas);
            update_rota();
            break;
        case 81: rotas[1] = 0.1;
            // cubes[selected].updateRota(rotas);
            update_rota();
            break;
        case 69: rotas[1] = -0.1;
            // cubes[selected].updateRota(rotas);
            update_rota();
            break;
        case 65: rotas[2] = 0.1;
            // cubes[selected].updateRota(rotas);
            update_rota();

            break;
        case 68: rotas[2] = -0.1;
            // cubes[selected].updateRota(rotas);
            update_rota();
            break;
        case 88:
            scale[0] = 0.9;
            update_scale();
            break;
        case 86:
            scale[0] = 1.1;
            update_scale();
            break;
        case 89:
            scale[1] = 0.9;
            update_scale();
            break;
        case 66:
            scale[1] = 1.1;
            update_scale();
            break;
        case 90:
            scale[2] = 0.9;
            update_scale();
            break;


        case 85:
            mode = 0.0;
            break;
        case 73:
            mode = 1.0;
            break;
        case 79:
            mode = 2.0;
            break;
        case 80:
        pacman.updateGlRota([0,raddeg(90),0]);  
        pacman2.updateGlRota([0,raddeg(90),0]);  

                    break;
        case 76:
            lightmode = !lightmode;
            break
        case 77:
            angleY = angY + 15;
            console.log(angleY);
            break;
        case 78:
            angleY = angY - 15;
            break;


    }


}


window.onkeyup = function (event) {


    rotas[0] = 0.0;
    rotas[1] = 0.0;
    rotas[2] = 0.0;
    trans[0] = 0.0;
    trans[1] = 0.0;
    trans[2] = 0.0;
    ltrans[0] = 0.0;
    ltrans[1] = 0.0;
    ltrans[2] = 0.0;
    scale[0] = 1.0;
    scale[1] = 1.0;
    scale[2] = 1.0;
}

function setfalse() {
    xxxx = false;
}


function update_trans() {
    if (pacman.updateGlTrans(trans) && pacman2.updateGlTrans(trans)) {
        cameraX += 0.6* trans[0];
       // cameraZ +=  trans[2];
        cameraY += -0.7*trans[2];


        updateC();
        return true

    }
    
    return false;
  
}


function update_rota() {

    pacman.updateRota(rotas);
  


    updateC();

}




function raddeg(degrees){
    return degrees * Math.PI / 180;
}