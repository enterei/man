
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

    walls.push(wall1);
    walls.push(wall2);
    walls.push(wall3);
    walls.push(wall4);
console.log(walls[0]);
    for (i = 0; i < walls.length; i++) {
        console.log(i);
        walls[i].updateTrans(walls[i].position);
        console.log(walls[i].ctm);

    }

}
