var activesp = 0;
var path0 = new Path(-1.35,-0.44999999999999,-0.0001,0.00001,true,0);
var path1= new Path(-0.45,-0.449, -0.3999999165534973,.3999999165534973,false,1);
var path2 = new Path(-1.35,-0.4499999999,-0.4,-0.389999999999999999999,false,2); 
var path3 = new Path(-1.35,-1.34,-0.3999999165534973,+0.399999999999999999999,false,3); 
var path4 = new Path(-1.35,-1.0299994945526123,0.38,  0.4,false,4); 
//var path5= new Path(-1.399999,-0.10299999999,-0.3999999165534973,3.501772871672415,false,5);

path0.neighbors.push(path0);
path0.neighbors.push(path1);
path0.neighbors.push(path3);
//path0.neighbors.push(path5);
path1.neighbors.push(path1);
path1.neighbors.push(path2);
path1.neighbors.push(path0);
path2.neighbors.push(path2);
path2.neighbors.push(path1);
path2.neighbors.push(path3);
path3.neighbors.push(path3);
path3.neighbors.push(path2);
path3.neighbors.push(path0);
path3.neighbors.push(path4);
path4.neighbors.push(path4);
path4.neighbors.push(path3);
//path4.neighbors.push(path5);
//path5.neighbors.push(path5);
//path5.neighbors.push(path0);


var paths=[];
paths.push(path0);
paths.push(path1);
paths.push(path2);
paths.push(path3);
paths.push(path4);
paths.push(path5);
console.log(paths);