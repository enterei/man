var points= [];
function Cube(gl,inittrans){

    
    
      
        Cube.shaderProgram = initShaders(gl, "vertex-shader", "fragment-shader");
        
        
        Cube.locations = {
            attribute: {
                aPosition: gl.getAttribLocation(Cube.shaderProgram, "aPosition"),
                aColor: gl.getAttribLocation(Cube.shaderProgram, "aColor"),
               
            },
            uniform: {
                uMMatrix: gl.getUniformLocation(Cube.shaderProgram, "uMMatrix"),
               
                uPMatrix: gl.getUniformLocation(Cube.shaderProgram, "uPMatrix"),

                uCMatrix: gl.getUniformLocation(Cube.shaderProgram,"camera"),
                uGLRMatrix: gl.getUniformLocation(Cube.shaderProgram,"glRota")
            }
        };
        gl.enableVertexAttribArray(Cube.locations.attribute.aPosition);
        gl.enableVertexAttribArray(Cube.locations.attribute.aColor);
        gl.enableVertexAttribArray(Cube.locations.attribute.aNormal);
    

        fillpoints();
       
        const pBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, pBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
        
       
        const cBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);        
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        
       
        
        Cube.buffers = {
            pBuffer: pBuffer,
            cBuffer: cBuffer,
          
            pComponents: 3, 
            cComponents: 3,
            
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








function fillpoints(){

    for (var i = 0; i < cube_indices.length; ++i) {
       var x = cube_vertices[cube_indices[i]];  
       points.push(x[0]);   
       points.push(x[1]);  
       points.push(x[2]);     
    }

}


var colors = [
     0.0, 0.0, 0.0 ,
     0.0, 0.0, 0.0 ,
     0.0, 0.0, 0.0 ,
     0.0, 0.0, 0.0 ,
     0.0, 0.0, 0.0 ,
     0.0, 0.0, 0.0 ,
     1.0, 0.0, 1.0 ,
     1.0, 0.0, 1.0 ,
     1.0, 0.0, 1.0 ,
     1.0, 0.0, 1.0 ,
     1.0, 0.0, 1.0 ,
     1.0, 0.0, 1.0 ,
     1.0, 1.0, 0.0 ,
     1.0, 1.0, 0.0 ,
     1.0, 1.0, 0.0 ,
     1.0, 1.0, 0.0 ,
     1.0, 1.0, 0.0 ,
     1.0, 1.0, 0.0 ,
     0.0, 1.0, 0.0 ,
     0.0, 1.0, 0.0 ,
     0.0, 1.0, 0.0 ,
     0.0, 1.0, 0.0 ,
     0.0, 1.0, 0.0 ,
     0.0, 1.0, 0.0 ,
     0.0, 0.0, 1.0 ,
     0.0, 0.0, 1.0 ,
     0.0, 0.0, 1.0 ,
     0.0, 0.0, 1.0 ,
     0.0, 0.0, 1.0 ,
     0.0, 0.0, 1.0 ,
     1.0, 0.0, 1.0 ,
     1.0, 0.0, 1.0 ,
     1.0, 0.0, 1.0 ,
     1.0, 0.0, 1.0 ,
     1.0, 0.0, 1.0 ,
     1.0, 0.0, 1.0 ,
  

];


var cube_vertices = [
    [-0.1, -0.0, 0.1],
    [-0.1, 0.1, 0.1],
    [0.1, 0.1, 0.1],
    [0.1, -0.0, 0.1],
    [-0.1, -0.0, -0.1],
    [-0.1, 0.1, -0.1],
    [0.1, 0.1, -0.1],
    [0.1, -0.0, -0.1]
];



var cube_indices = [

    0, 1, 2, 0, 2, 3,
    3, 2, 6, 3, 6, 7,
    7, 6, 5, 7, 4, 5,
    5, 6, 2, 5, 1, 2,
    1, 0, 4, 1, 5, 4,
    4, 7, 3, 4, 0, 3,

];