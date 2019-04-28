function main() {
    init();
}
var pacman = null;
var trans = [0, 0, 0];
var ltrans = [0, 0, 0];
var cubes = [];

var fragments1 = [];
var fragments2 = [];
var selected = 10;
var xxxx = true;
var mode = 0.0;
var lightran = mat4.create();
var lightrot = mat4.create();
var shin = 100.0;
var lightmode = false;

var materialDiffuse = [1.0, 0.8, 0.0, 1.0];
var materialSpecular = [1.0, 1.0, 1.0, 1.0];
var lightPosition = [0.0, 10.0, -0.0, 1.0];


var diffProduct = vec4.create();
var specProduct = vec4.create();

//rotation
var rotas = [0, 0, 0];
// scaling
var scale = [1, 1, 1];
//var cubes = [];

function init() {


    const canvas = document.getElementById("glCanvas");
    const gl = canvas.getContext("webgl");
    gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);
    gl.clearColor(1.0, 0.9, 0.9, 1.0);
    gl.enable(gl.DEPTH_TEST);


    let pMatrix = mat4.create();
    let perspectiveMatrix = mat4.create();
    const asp = canvas.clientWidth / canvas.clientHeight;
    const bottom = -1;
    const zNear = -10 ;
    const zFar = 100;
      var fieldOfViewRadians = degToRad(5);
      var cameraAngleRadians = degToRad(0);

    mat4.ortho(pMatrix, -asp, asp, bottom, -bottom, zNear, zFar);
    perspectiveMatrix = mat4.perspective(perspectiveMatrix, fieldOfViewRadians, canvas.width / canvas.height, 0.01, 30);







    // reason for calling "gauraud vertex/fragment" shader is that i iniatially wanted to make 2 diffrent shaders and initiallize every sphere twice but then i used the mode variable
     pacman = new ShadedSphere(gl, [0.0, 0.05, 0.0], "vertex-shader", "fragment-shader");

    pacman.updateScale([0.05,0.05,0.05]);
    var gP =  new GroundPlane(gl);

   
        updateWalls(gl);




    var lightDiffuse = [1.0, 1.0, 1.0, 1.0];
    var lightSpecular = [1.0, 1.0, 1.0, 1.0];





    pacman.updateTrans(pacman.position);
   cubes.push(pacman);
   


    
    /*for (var i = 0; i < cubes.length; i++)cubes[i].updateTrans(cubes[i].position); // for alls cubes todo
    for (var i = 0; i < cubes.length; i++)cubes[i].updateScale([0.5, 0.5, 0.5]); // for alls cubes todo
    for (var i = 0; i < fragments1.length; i++)fragments1[i].updateTrans(fragments1[i].position); // for alls cubes todo
    for (var i = 0; i < fragments2.length; i++)fragments2[i].updateTrans(fragments2[i].position); // for alls cubes todo

*/

   

    var then = 0;
    function render(now) {

        

        now *= 0.001;
       
        then = now;



        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);











        
      /*   cubes[0].draw(gl, perspectiveMatrix,CAMERA);
         for(i = 0; i<walls.length;i++) walls[i].draw(gl,perspectiveMatrix,CAMERA);
          gP.draw(gl,perspectiveMatrix,CAMERA);*/

          pacman.draw(gl, pMatrix);
          for(i = 0; i<walls.length;i++) walls[i].draw(gl,pMatrix);
           gP.draw(gl,pMatrix);

      //   cubes[0].draw(gl, perspectiveMatrix);
       //  for(i = 0; i<walls.length;i++) walls[i].draw(gl,perspectiveMatrix);
       //  gP.draw(gl,perspectiveMatrix);


        
     //    gP.draw(gl,pMatrix);
      //    cubes[0].draw(gl, pMatrix);


        //cubes[selected].draw(gl, pMatrix);
        //    coord.draw(gl, pMatrix, cubes[selected].mMatrix);

        if (xxxx) requestAnimationFrame(render);
    }

    // Start rendering
    requestAnimationFrame(render);

}



window.onkeydown = function (event) {

    var key = String.fromCharCode(event.keyCode);
    switch (key) {
        case '0': selected = 10;
        alert("gaa");

            break;

        case '1':
            selected = 0;

            break;
        case '2':
            selected = 1;
            break;
        case '3':

            selected = 2;
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
            update_trans(trans);

            break;

        case 39:
      //  console.log("habede");

            trans[0] = 0.01;
            ltrans[0] = 0.5;
            // cubes[selected].updateTrans(trans);
            update_trans(trans);
            break;

        case 38:
            trans[2] = 0.01;
            ltrans[1] = 0.5;
            // cubes[selected].updateTrans(trans);
            update_trans(trans);
            break;
        case 40:
            trans[2] = -0.01;
            ltrans[1] = -0.5;
            // cubes[selected].updateTrans(trans);
            update_trans(trans);
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
        case 78:
            scale[2] = 1.1;
            update_scale();
            break;
        //trst

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
            mode = 3.0;
            break;
        case 76:
            lightmode = !lightmode;



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
 
    pacman.updateTrans(trans);
   //cubes[0].updateGlTrans(trans);
   console.log(pacman.transM);
   
    cameraX += 0.5*trans[0];
    cameraZ += 0.5*trans[2];

    
    updateC();

   }



/*function update_scale() {
    if (lightmode) {

    }
    else {
        if (selected == 10) {

            for (i = 0; i < cubes.length; i++) {
                cubes[i].updateScale(scale);
            }

        }
        else cubes[selected].updateScale(scale);
    }
}*/


