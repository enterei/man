var Cubepoints= [];
var Cubenormals = [];
var Cubecolors= [];
var CubeColor = [0.1,0.2,0.0,0.9];


function CubefillColors(){
    
    for(i =0;i<37;i++){
        Cubecolors.push(CubeColor[0]);
        Cubecolors.push(CubeColor[1]);
        Cubecolors.push(CubeColor[2]);
        Cubecolors.push(CubeColor[3]);


    }

};

 
var cube_indices = [

    /*   0, 1, 2, 0, 2, 3,
       3, 2, 6, 3, 6, 7,
       7, 6, 5, 7, 4, 5,
       5, 6, 2, 5, 1, 2,
       1, 0, 4, 1, 5, 4,
       4, 7, 3, 4, 0, 3,*/
       1,0,3,1,3,2,
       2,3,7,2,7,6,
       4,5,6,4,6,7,
       6,5,1,6,1,2,
       5,4,0,5,0,1,
       3,0,4,3,4,7,
   
   
   
   
   ];

var Cubevertices = [
    [-0.1, -0.0, 0.1,1.0],
    [-0.1, 0.1, 0.1,1.0],
    [0.1, 0.1, 0.1,1.0],
    [0.1, -0.0, 0.1,1.0],
    [-0.1, -0.0, -0.1,1.0],
    [-0.1, 0.1, -0.1,1.0],
    [0.1, 0.1, -0.1,1.0],
    [0.1, -0.0, -0.1,1.0]
];
var cube_vertices=[
[ -0.1, -0.1,  0.1, 1.0 ],
[ -0.1,  0.1,  0.1, 1.0 ],
[ 0.1,  0.1,  0.1, 1.0 ],
[ 0.1, -0.1,  0.1, 1.0 ],
[ -0.1, -0.1, -0.1, 1.0 ],
[ -0.1,  0.1, -0.1, 1.0 ],
[ 0.1,  0.1, -0.1, 1.0 ],
[ 0.1, -0.1, -0.1, 1.0 ]

];

function quad(a, b, c, d) {

    var t1 = vec4.create();
    vec4.subtract(t1,cube_vertices[b], cube_vertices[a]);     
    var t2 = vec4.create(); 
    vec4.subtract(t2,cube_vertices[c], cube_vertices[b]);
    
    var normal = vec4.create(); 
    vec3.cross(normal,t1, t2);
    
    


    Cubepoints.push(cube_vertices[a]);
    
    Cubenormals.push(normal);
    Cubepoints.push(cube_vertices[b]);
    Cubenormals.push(normal);
    Cubepoints.push(cube_vertices[c]);
    Cubenormals.push(normal);
    Cubepoints.push(cube_vertices[a]);
    Cubenormals.push(normal);
    Cubepoints.push(cube_vertices[c]);
    Cubenormals.push(normal);
    Cubepoints.push(cube_vertices[d]);
    Cubenormals.push(normal);
}


function colorCube()
{
   quad( 1, 0, 3, 2 );
   quad( 2, 3, 7, 6 );
   quad( 3, 0, 4, 7 );
   quad( 6, 5, 1, 2 );
   quad( 4, 5, 6, 7 );
   quad( 5, 4, 0, 1 );
}

function Cubefillpoints(){

    for (var i = 0; i < cube_indices.length; ++i) {
       var x = cube_vertices[cube_indices[i]];  
       Cubepoints.push(x[0]);   
       Cubepoints.push(x[1]);  
       Cubepoints.push(x[2]);     
       Cubepoints.push(x[3]);
    }


}
function normals(a,b,c,d){
    n1 = vec4.fromValues(a);
    n2 = vec4.fromValues(b);
    n3 = vec4.fromValues(c);
    n4 = vec4.fromValues(d);

    v1 = vec4.create();
    v2 = vec4.create();
    vec4.subtract(v1,n1,n2);
    vec4.subtract(v2,n3,n4);
    n = vec4.create();
    vec3.cross(n,v1,v2);
    for(i = 0; i <6;i++){
        Cubenormals.push(n[0]);
        Cubenormals.push(n[1]);
        Cubenormals.push(n[2]);
        Cubenormals.push(n[3]);

    }

}

function Cubefillnormals(){
 /*   normals(cube_vertices[0],cube_vertices[1],cube_vertices[2],cube_vertices[3]);
    normals(cube_vertices[3],cube_vertices[2],cube_vertices[6],cube_vertices[7]);
    normals(cube_vertices[4],cube_vertices[6],cube_vertices[5],cube_vertices[7]);
    normals(cube_vertices[1],cube_vertices[2],cube_vertices[5],cube_vertices[6]);
    normals(cube_vertices[0],cube_vertices[1],cube_vertices[4],cube_vertices[5]);
    normals(cube_vertices[0],cube_vertices[3],cube_vertices[4],cube_vertices[7]);*/
    for(i = 0; i <6;i++){
        Cubenormals.push(0.0);
        Cubenormals.push(0.0);
        Cubenormals.push(-1.0);
        Cubenormals.push(1.0);

    }
    for(i = 0; i <6;i++){
        Cubenormals.push(1.0);
        Cubenormals.push(0.0);
        Cubenormals.push(0.0);
        Cubenormals.push(1.0);

    }
    for(i = 0; i <6;i++){
        Cubenormals.push(0.0);
        Cubenormals.push(0.0);
        Cubenormals.push(1.0);
        Cubenormals.push(1.0);

    }
    for(i = 0; i <6;i++){
        Cubenormals.push(0.0);
        Cubenormals.push(1.0);
        Cubenormals.push(0.0);
        Cubenormals.push(1.0);

    }
    for(i = 0; i <6;i++){
        Cubenormals.push(-1.0);
        Cubenormals.push(0.0);
        Cubenormals.push(0.0);
        Cubenormals.push(1.0);

    }
    for(i = 0; i <6;i++){
        Cubenormals.push(0.0);
        Cubenormals.push(-1.0);
        Cubenormals.push(0.0);
        Cubenormals.push(1.0);

    }
   

    


     
}