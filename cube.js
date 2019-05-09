

function Cube(gl,inittrans){

    
    
      
    Cube.shaderProgram = initShaders(gl, "gauraud-vertex-shader", "gauraud-fragment-shader");
    
    
    Cube.locations = {
        attribute: {
            aPosition: gl.getAttribLocation(Cube.shaderProgram, "aPosition"),
            aColor: gl.getAttribLocation(Cube.shaderProgram, "aColor"),
         
            aNormal: gl.getAttribLocation(Cube.shaderProgram,"aNormal"),
          
           
        },
        uniform: {
            uMMatrix: gl.getUniformLocation(Cube.shaderProgram, "uMMatrix"),
           
            uPMatrix: gl.getUniformLocation(Cube.shaderProgram, "uPMatrix"),

            uCMatrix: gl.getUniformLocation(Cube.shaderProgram,"camera"),
            uGLRMatrix: gl.getUniformLocation(Cube.shaderProgram,"glRota"),
            matdiff: gl.getUniformLocation(Cube.shaderProgram,"diffColor"),
            matspec: gl.getUniformLocation(Cube.shaderProgram,"specColor"),
            matnormal: gl.getUniformLocation(Cube.shaderProgram,"normalMatrix"),
            matlightPos: gl.getUniformLocation(Cube.shaderProgram,"lightPos"),
            smode: gl.getUniformLocation(Cube.shaderProgram,"mode"),
            shine: gl.getUniformLocation(Cube.shaderProgram,"shin"), 
            
            uMLight: gl.getUniformLocation(Cube.shaderProgram,"lightModelMatrix"),
        }
    };
    gl.enableVertexAttribArray(Cube.locations.attribute.aPosition);
    gl.enableVertexAttribArray(Cube.locations.attribute.aNormal);
    gl.enableVertexAttribArray(Cube.locations.attribute.aColor);

//    colorCube();

    Cubefillpoints();
    Cubefillnormals();
    CubefillColors();
  // console.log(points);
    const pBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Cubepoints), gl.STATIC_DRAW);
    
   
    const cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);        
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Cubecolors), gl.STATIC_DRAW);

    const nBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer);
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Cubenormals), gl.STATIC_DRAW);
    
   
    
    Cube.buffers = {
        pBuffer: pBuffer,
        cBuffer: cBuffer,
        nBuffer: nBuffer,
      
        pComponents: 4, 
        cComponents: 3,
        nComponents: 4,
        
    };
    


this.position = inittrans;
this.transM = mat4.create();
//this.oldpos=this.position;

this.rotationY = 0.0;
this.rotationX = 0.0;
this.rotationZ = 0.0;
this.rotaM = mat4.create();
this.camera = mat4.create();
mat4.lookAt(this.camera,[0,0,5],[0,0,0],[0,1,0]);

this.angle = degToRad(45);
    this.cameraM = mat4.create();
    mat4.rotateX(this.cameraM,this.cameraM,this.angle);
    mat4.translate(this.cameraM,this.cameraM, [0.0,0,2]);
    mat4.invert(this.cameraM,this.cameraM);

this.scaleY = 0.0;
this.scaleX = 0.0;
this.scaleZ = 0.0;
this.scaleM=mat4.create();


this.mMatrix = mat4.create();
this.mMatrixTInv = mat3.create();

this.GlMatrix= mat4.create();
this.gltrans = mat4.create();
this.glrota= mat4.create();

this.ctm = mat4.create();
this.drawL=function(gl,pMatrix){
    
    normalM = mat4.create();
    mat4.transpose(normalM,this.ctm);
    mat4.invert(normalM,normalM);

    normalM3 = mat3.create();
    for(i = 0;i<3;i++){
        for (u=0;u<3;u++){
            normalM3[i][u]= this.ctm[i][u];

//                console.log(normalM3[i]);
//              console.log(this.ctm[i]);

        
        }
    }
 //   console.log(this.ctm);
  //  console.log(normalM3);

 
    gl.useProgram( Cube.shaderProgram);
    gl.uniformMatrix4fv( Cube.locations.uniform.uPMatrix, false, pMatrix);
    gl.uniformMatrix4fv( Cube.locations.uniform.uMMatrix, false, this.ctm);
    gl.uniform4fv(Cube.locations.uniform.matdiff,new Float32Array(diffProduct));
    gl.uniform4fv(Cube.locations.uniform.matspec,new Float32Array(specProduct));
    gl.uniformMatrix4fv(Cube.locations.uniform.matnormal,false,flatten(normalM));
    gl.uniform4fv(Cube.locations.uniform.matlightPos,new Float32Array(light.lightpos));
    gl.uniform1f(Cube.locations.uniform.smode,mode);
    gl.uniform1f(Cube.locations.uniform.shine,shin);
    gl.uniformMatrix4fv(Cube.locations.uniform.uCMatrix,false,CAMERA);
 
    gl.uniformMatrix4fv(Cube.locations.uniform.uMLight,false,light.GlMatrix);

    
    gl.bindBuffer(gl.ARRAY_BUFFER,  Cube.buffers.pBuffer);
    gl.vertexAttribPointer( Cube.locations.attribute.aPosition,
        Cube.buffers.pComponents,
        gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, Cube.buffers.nBuffer);
    gl.vertexAttribPointer(Cube.locations.attribute.aNormal,
        Cube.buffers.nComponents,
        gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, Cube.buffers.nBuffer);

    gl.bindBuffer(gl.ARRAY_BUFFER, Cube.buffers.cBuffer);
    gl.vertexAttribPointer(Cube.locations.attribute.aColor,
        Cube.buffers.cComponents,
        gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, Cube.buffers.cBuffer);



    for (var i = 0; i < 36; i += 3) {



        gl.drawArrays( gl.TRIANGLES, i, 3 );


    }




};


this.draw = function(gl, pMatrix) {
    


    gl.useProgram(Cube.shaderProgram);
    gl.uniformMatrix4fv(Cube.locations.uniform.uPMatrix, false, pMatrix);
    gl.uniformMatrix4fv(Cube.locations.uniform.uMMatrix, false, this.ctm);
    gl.uniformMatrix4fv(Cube.locations.uniform.uCMatrix,false,CAMERA);
    gl.uniformMatrix4fv(Cube.locations.uniform.uGLRMatrix,false,this.GlMatrix);


    
    gl.uniform4fv(Cube.locations.uniform.uColor, [1.0, 0.0, 0.0, 1.0]);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, Cube.buffers.pBuffer);
    gl.vertexAttribPointer(Cube.locations.attribute.aPosition,
                           Cube.buffers.pComponents,
                           gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, Cube.buffers.cBuffer);
    gl.vertexAttribPointer(Cube.locations.attribute.aColor,
                           Cube.buffers.cComponents,
                           gl.FLOAT, false, 0, 0);
                           
 
    gl.drawArrays(gl.TRIANGLES, 0, 36);
};



this.updateRota=function(r){

    mat4.rotateX(this.rotaM,this.rotaM,r[0]);
    mat4.rotateY(this.rotaM,this.rotaM,r[1]);
    mat4.rotateZ(this.rotaM,this.rotaM,r[2]);
    

   this.updateAll();

};
this.updateGlRota=function(r){


    mat4.rotateX(this.glrota,this.glrota,r[0]);
    mat4.rotateY(this.glrota,this.glrota,r[1]);
    mat4.rotateZ(this.glrota,this.glrota,r[2]);
    this.updateGlAll();


   
    

};
this.updateTrans = function (t) {

    //unneccassary complicated but i had a diffrent way of global transformations and i needed this but i should work fine without i guess...
    var lt = mat4.create();
    mat4.translate(lt, lt, t);
    var help = mat4.create();
    var rotainv = mat4.create();
    mat4.invert(rotainv, this.rotaM);

    //   rechnungen
    mat4.multiply(help, this.rotaM, lt);       
    mat4.multiply(help, help, rotainv);
    mat4.multiply(this.transM, this.transM, help);
   
   

    this.updateAll();

};

this.updateGlTrans = function(t){

    mat4.translate(this.gltrans,this.gltrans,t);        
    this.updateGlAll();
   
}

this.updateScale = function(s){
//      console.log(s);
    mat4.scale(this.scaleM,this.scaleM,s);
//        console.log(this.scaleM);

  
    this.updateAll();
};

this.updateAll= function(){
    mat4.identity(this.mMatrix);
    


    mat4.multiply(this.mMatrix,this.mMatrix,this.transM);
  
    mat4.multiply(this.mMatrix,this.mMatrix,this.rotaM);
    mat4.multiply(this.mMatrix,this.mMatrix,this.scaleM);
 //  mat4.multiply(this.mMatrix,this.transM,this.rotaM);
 this.updateAllALL();

}
this.updateGlAll= function(){
    mat4.identity(this.GlMatrix);
    


    mat4.multiply(this.GlMatrix,this.GlMatrix,this.gltrans);
  
    mat4.multiply(this.GlMatrix,this.GlMatrix,this.glrota);
    this.updateAllALL();
  

}
this.updateAllALL = function(){
    mat4.identity(this.ctm);
    mat4.multiply(this.ctm,this.GlMatrix,this.mMatrix);
}

}












