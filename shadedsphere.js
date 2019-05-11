



function ShadedSphere(gl,inittrans,vs,fs,oben){
   
      
        console.log(oben);
        this.shaderProgram = initShaders(gl,vs, fs);
        this.oben = oben;
      
        console.log(vs);
        console.log(fs);
        this.locations = {
            attribute: {
                aPosition: gl.getAttribLocation( this.shaderProgram, "aPosition"),
                aNormal: gl.getAttribLocation(this.shaderProgram,"aNormal"),
                aColor:gl.getAttribLocation(this.shaderProgram,"aColor"),
               
            },
            uniform: {
                uMMatrix: gl.getUniformLocation( this.shaderProgram, "uMMatrix"),
                uCMatrix: gl.getUniformLocation(this.shaderProgram,"camera"),
                uPMatrix: gl.getUniformLocation( this.shaderProgram, "uPMatrix"),
                matdiff: gl.getUniformLocation(this.shaderProgram,"diffColor"),
                matspec: gl.getUniformLocation(this.shaderProgram,"specColor"),
                matnormal: gl.getUniformLocation(this.shaderProgram,"normalMatrix"),
                matlightPos: gl.getUniformLocation(this.shaderProgram,"lightPos"),
                smode: gl.getUniformLocation(this.shaderProgram,"mode"),
                shine: gl.getUniformLocation(this.shaderProgram,"shin"), 
                
                uMLight: gl.getUniformLocation(this.shaderProgram,"lightModelMatrix"),




            }
        };
        gl.enableVertexAttribArray( this.locations.attribute.aPosition);
        gl.enableVertexAttribArray( this.locations.attribute.aNormal);
        gl.enableVertexAttribArray( this.locations.attribute.aColor);
   

        if(Spherepoints.length==0){
            console.log(this.oben);
            fillshadedSpoints(this.oben);}
        else{
            console.log("uahhh");

            Spherepoints=[];
            fillshadedSpoints(this.oben)
        }
      
  

        this.pBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.pBuffer);
         gl.bufferData(gl.ARRAY_BUFFER, flatten (Spherepoints), gl.STATIC_DRAW);
        
        this.nBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.nBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten (Spherenormals), gl.STATIC_DRAW);

        this.cBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER,this.cBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,flatten(Spherecolors),gl.STATIC_DRAW);
        
       
        
        this.buffers = {
            pBuffer: this.pBuffer,
            cBuffer: this.cBuffer,
            nBuffer: this.nBuffer,


            pComponents: 4, 
            cComponents: 4,
            nComponents: 4,
            
        };
        
    
    
    this.position = inittrans;
    this.transM = mat4.create();
   
    
    this.rotationY = 0.0;
    this.rotationX = 0.0;
    this.rotationZ = 0.0;
    this.rotaM = mat4.create();

    this.GlMatrix= mat4.create();
    this.gltrans = mat4.create();
    this.glrota= mat4.create();
  
    
    this.scaleY = 0.0;
    this.scaleX = 0.0;
    this.scaleZ = 0.0;
    this.scaleM=mat4.create();
    this.ctm = mat4.create();



    this.mMatrix = mat4.create();
    this.mMatrixTInv = mat3.create();
    this.camera = mat4.create();
    mat4.lookAt(this.camera,[0,0,10],[0,0,0],[0,1,0]);


    this.angle = degToRad(45);
        this.cameraM = mat4.create();
        mat4.rotateX(this.cameraM,this.cameraM,this.angle);
        mat4.translate(this.cameraM,this.cameraM,[0,0,5]);
        mat4.invert(this.cameraM,this.cameraM);




    this.draw = function(gl, pMatrix) {
      
        gl.useProgram( this.shaderProgram);
        
        gl.uniformMatrix4fv( this.locations.uniform.uPMatrix, false, pMatrix);
        gl.uniformMatrix4fv( this.locations.uniform.uMMatrix, false, this.ctm);
        gl.uniformMatrix4fv(this.locations.uniform.uCMatrix,false,CAMERA);

        
      //  gl.uniform4fv( this.locations.uniform.uColor, [1.0, 0.0, 0.0, 1.0]);
        
        gl.bindBuffer(gl.ARRAY_BUFFER,  this.buffers.pBuffer);
        gl.vertexAttribPointer( this.locations.attribute.aPosition,
            this.buffers.pComponents,
                               gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER,  this.buffers.cBuffer);
        gl.vertexAttribPointer( this.locations.attribute.aColor,
            this.buffers.cComponents,
                               gl.FLOAT, false, 0, 0);

                               
        for( var i=0; i<shadeds_index; i+=3){ 
           


            gl.drawArrays( gl.TRIANGLES, i, 3 );


        }
    };

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

     
        gl.useProgram( this.shaderProgram);
        gl.uniformMatrix4fv( this.locations.uniform.uPMatrix, false, pMatrix);
        gl.uniformMatrix4fv( this.locations.uniform.uMMatrix, false, this.ctm);
        gl.uniform4fv(this.locations.uniform.matdiff,new Float32Array(diffProduct));
        gl.uniform4fv(this.locations.uniform.matspec,new Float32Array(specProduct));
        gl.uniformMatrix4fv(this.locations.uniform.matnormal,false,flatten(normalM));
        gl.uniform4fv(this.locations.uniform.matlightPos,new Float32Array(light.lightpos));
        gl.uniform1f(this.locations.uniform.smode,mode);
        gl.uniform1f(this.locations.uniform.shine,shin);
        gl.uniformMatrix4fv(this.locations.uniform.uCMatrix,false,CAMERA);

        gl.uniformMatrix4fv(this.locations.uniform.uMLight, false, light.GlMatrix);


        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.pBuffer);
        gl.vertexAttribPointer(this.locations.attribute.aPosition,
            this.buffers.pComponents,
            gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.nBuffer);
        gl.vertexAttribPointer(this.locations.attribute.aNormal,
            this.buffers.nComponents,
            gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.cBuffer);
        gl.vertexAttribPointer(this.locations.attribute.aColor,
            this.buffers.cComponents,
            gl.FLOAT, false, 0, 0);


        for (var i = 0; i < shadeds_index; i += 3) {



            gl.drawArrays( gl.TRIANGLES, i, 3 );


        }




    };
    this.update=function(theta){
        const rot = theta*(-1.5);
        this.updateRota([theta*0,theta*0,rot]);

    }


    
    this.name ="sphere";
    this.updateRota=function(r){
   
        mat4.rotateX(this.rotaM,this.rotaM,r[0]);
        mat4.rotateY(this.rotaM,this.rotaM,r[1]);
        mat4.rotateZ(this.rotaM,this.rotaM,r[2]);
      //  mat4.translate(this.rotaM,this.rotaM,this.position);
       this.updateAll();

    };
    this.updateGlRota=function(r){
        
        mat4.rotateX(this.glrota,this.glrota,r[0]);
        mat4.rotateY(this.glrota,this.glrota,r[1]);
        mat4.rotateZ(this.glrota,this.glrota,r[2]);
        this.updateGlAll();
       
        

    };
    this.updateTrans = function (t) {
     //   console.log(this.transM);
       // console.log(t);
        var lt = mat4.create();
        mat4.translate(lt, lt, t);
      
        var help = mat4.create();
        var rotainv = mat4.create();
        mat4.invert(rotainv, this.rotaM);
        


        //   rechnungen
        mat4.multiply(help, this.rotaM, lt);       
        mat4.multiply(help, help, rotainv);
     
        
        mat4.multiply(this.transM, this.transM, help);
       


        console.log("NOEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");


        // mat4.multiply(this.transM,this.transM,help);



        //console.log("habede");
        this.updateAll();
    };

    this.updateScale = function(s){
        mat4.scale(this.scaleM,this.scaleM,s);
        this.updateAll();
    };
    this.updateGlTrans = function(t){
        
        console.log(activesp);
        console.log(paths[activesp]);
        var l = paths[activesp].neighbors.length;
        var helpx = mat4.create();
        helpx = mat4.clone(this.gltrans);
        
        mat4.translate(helpx,helpx,t);
        //console.log(this.gltrans);  
        for(i = 0;i<l;i++){
      
           var res=  paths[activesp].neighbors[i].check(helpx[12],helpx[14]);
      //      console.log(res);

           if(res.status){
              
               activesp=res.n
               console.log("do step");  
               mat4.translate(this.gltrans,this.gltrans,t);     
             console.log(this.gltrans);   
              this.updateGlAll();  

              return;

           }
           console.log("dont step");  



        }
        //mat4.translate(this.gltrans,this.gltrans,t);     
        //console.log(this.gltrans);   
       //this.updateGlAll();  
     
       
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











function flatten( v )
{
    if ( v.matrix === true ) {
        v = transpose( v );
    }

    var n = v.length;
    var elemsAreArrays = false;

    if ( Array.isArray(v[0]) ) {
        elemsAreArrays = true;
        n *= v[0].length;
    }

    var floats = new Float32Array( n );

    if ( elemsAreArrays ) {
        var idx = 0;
        for ( var i = 0; i < v.length; ++i ) {
            for ( var j = 0; j < v[i].length; ++j ) {
                floats[idx++] = v[i][j];
            }
        }
    }
    else {
        for ( var i = 0; i < v.length; ++i ) {
            floats[i] = v[i];
        }
    }

    return floats;
}

function dozero(){
    for(i =0;i<Spherepoints.length;i++){

    }

}