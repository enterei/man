
var walls = [];




function updateWalls(gl){

    var wall1 = new Cube(gl, [0.0, 0.0, 0.5]);
    wall1.updateScale([15.0, 0.5, 0.5]);


    var wall2 = new Cube(gl, [0.0, 0.0, -0.5]);
    wall2.updateScale([15.0, 0.5, 0.5]);
   
    var wall3 = new Cube(gl, [1.45, 0.0, 0.0]);
    wall3.updateScale([0.5, 0.5, 5.0]);

    var wall4 = new Cube(gl, [-1.45, 0.0, 0.0]);
    wall4.updateScale([0.5,0.5, 5.0]);

    var wall5 = new Cube(gl,[-0.9,0.0,-0.2]);
    wall5.updateScale([4.0,0.5,1.5]);

    wall6= new Cube(gl,[-1.2,0.0,0.2]);
    wall6.updateScale([1.0,0.5,1.5]);

    var wall7 = new Cube(gl,[0.71,0.0,-0.13]);
    wall7.updateScale([3.0,0.5,2.2]);


    var wall8 = new Cube(gl,[1.2,0.0,-0.2]);
    wall8.updateScale([0.8,0.5,1.5]);


    var wall9 = new Cube(gl,[1.2,0.0,0.2]);
    wall9.updateScale([0.8,0.5,1.5]);

    var wall10 = new Cube(gl,[-0.74  ,0.0,0.3   ]);
    wall10.updateScale([2.4,0.5,2.5]);

    var wall11 = new Cube(gl,[-0.05,0.0,-0.2]);
    wall11.updateScale([3.5,0.5,2.9]);

    var wall12 = new Cube(gl,[0.05,0.0,0.35]);
    wall12.updateScale([4.5,0.5,1.5]);

    var wall13 = new Cube(gl,[0.81,0.0,0.34]);
    wall13.updateScale([2.0,0.5,1.4]);

    walls.push(wall1);
    walls.push(wall2);
    walls.push(wall3);
    walls.push(wall4);

    
    walls.push(wall5);
    walls.push(wall6);
    walls.push(wall7);
    walls.push(wall8);
    walls.push(wall9);
    walls.push(wall10);
    walls.push(wall11);
    walls.push(wall12);
    walls.push(wall13);

    


    for (i = 0; i < walls.length; i++) {
        console.log(i);
        walls[i].updateTrans(walls[i].position);
        console.log(walls[i].ctm);

    }

}
