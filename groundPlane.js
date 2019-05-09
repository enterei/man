function GroundPlane(gl){
    this.permMat= mat4.create();

    this.syspoints  =[
        -1.5,0.0,0.0,
        1.5,0.0,0.0,
        -1.5,0.0,-1.0,
        -1.5,0.0,-1.0,
        1.5,0.0,-1.0,
        1.5,0.0,-0.0,];

    
        GroundPlane.shaderProgram = initShaders(gl, "vertex-shader", "fragment-shader");
        
      
        GroundPlane.locations = {
            attribute: {
                aPosition: gl.getAttribLocation(GroundPlane.shaderProgram, "aPosition"),
                aColor: gl.getAttribLocation(GroundPlane.shaderProgram, "aColor"),
               
            },
            uniform: {
                uMMatrix: gl.getUniformLocation(GroundPlane.shaderProgram, "uMMatrix"),
                uCMatrix: gl.getUniformLocation(GroundPlane.shaderProgram,"camera"),
                uPMatrix: gl.getUniformLocation(GroundPlane.shaderProgram, "uPMatrix")
            }
        };
        gl.enableVertexAttribArray(GroundPlane.locations.attribute.aPosition);
        gl.enableVertexAttribArray(GroundPlane.locations.attribute.aColor);
        gl.enableVertexAttribArray(GroundPlane.locations.attribute.aNormal);
    


        const pBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, pBuffer);
        
       
       console.log(this.syspoints);
        
  
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.syspoints), gl.STATIC_DRAW);
        
      
        const cBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
        
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(syscolors), gl.STATIC_DRAW);
        
       
        
        GroundPlane.buffers = {
            pBuffer: pBuffer,
            cBuffer: cBuffer,
          
            pComponents: 3, 
            cComponents: 3, 
            
        };
    

        this.camera = mat4.create();
        mat4.lookAt(this.camera,[0,0,0],[0,0,0],[0,1,0]);
        mat4.translate(this.permMat, this.permMat, [0.0,0.0,0.5]);
        console.log(this.permMat);

       /* this.angle = degToRad(45);
        this.cameraM = mat4.create();
        mat4.rotateX(this.cameraM,this.cameraM,this.angle);
        mat4.translate(this.cameraM,this.cameraM,   [0.0,0,2]);
        mat4.invert(this.cameraM,this.cameraM);*/



    this.draw = function(gl, pMatrix) {
        
        
        gl.useProgram(GroundPlane.shaderProgram);
        gl.uniformMatrix4fv(GroundPlane.locations.uniform.uPMatrix, false, pMatrix);
        gl.uniformMatrix4fv(GroundPlane.locations.uniform.uMMatrix, false, this.permMat);
        gl.uniformMatrix4fv(GroundPlane.locations.uniform.uCMatrix,false,CAMERA);     
        
        gl.uniform4fv(GroundPlane.locations.uniform.uColor, [1.0, 0.0, 0.0, 1.0]);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, GroundPlane.buffers.pBuffer);
        gl.vertexAttribPointer(GroundPlane.locations.attribute.aPosition,
                               GroundPlane.buffers.pComponents,
                               gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, GroundPlane.buffers.cBuffer);
        gl.vertexAttribPointer(GroundPlane.locations.attribute.aColor,
                               GroundPlane.buffers.cComponents,
                               gl.FLOAT, false, 0, 0);
     
       
       // gl.drawArrays(gl.TRIANGLES, 0, 6);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
   
    
   


}



var syscolors =[
1.0,1.0,0.0,
1.0,1.0,0.0,
1.0,1.0,0.0,
1.0,1.0,0.0,
1.0,1.0,0.0,
1.0,1.0,0.0,
];