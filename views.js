var angY=0 ;


angleX = degToRad(310);
angleY = degToRad(45);
angleX = degToRad(-90 );
angleY = degToRad(0);
angleX = degToRad(310);
angleY = degToRad(45);


cameraX = -0.45 ;
cameraY= 0.0;
cameraZ=-5.0
CAMERA = mat4.create();
mat4.rotateX(CAMERA,CAMERA,angleX );
console.log(CAMERA);
mat4.rotateY(CAMERA,CAMERA,angleY );
console.log(CAMERA);

mat4.translate(CAMERA,CAMERA,[cameraX,cameraY,cameraZ]);
mat4.invert(CAMERA,CAMERA);


function radToDeg(r) {
    return r * 180 / Math.PI;
  }

  function degToRad(d) {
    return d * Math.PI / 180;
  }
function updateC(){
    CAMERA = mat4.create();

 mat4.rotateX(CAMERA,CAMERA,angleX );
mat4.rotateY(CAMERA,CAMERA,angleY );

mat4.translate(CAMERA,CAMERA,[cameraX,cameraY,cameraZ]);
mat4.invert(CAMERA,CAMERA);

}