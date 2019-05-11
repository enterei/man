var activesp = 0;
var path0 = new Path(-1.35,-0.44999999999999,-0.0001,0.00001,true,0);
var path1= new Path(-0.45,-0.449, -0.3999999165534973,.3999999165534973,false,1);
var path2 = new Path(-1.35,-0.4499999999,-0.4,-0.389999999999999999999,false,2); 
var path3 = new Path(-1.35,-1.34,-0.3999999165534973,+0.399999999999999999999,false,3); 
var path4 = new Path(-1.35,-1.0299994945526123,0.38,  0.4,false,4); 
var path5= new Path(-1.0599994659423828,-1.0299994945526123,0.0,0.3899999260902405,false,5);
var path6= new Path(-0.4500000476837158,1.0699992179870605,0.13,0.1600000113248825,false,6);
var path7= new Path(0.5499997138977051,0.5699996948242188,0.15,0.3899999260902405,false,7);
var path8= new Path(0.33999985456466675,0.36999982595443726,-0.3999999165534973,0.15000000596046448,false,8);
var path9= new Path(0.3499998450279236,1.349998950958252,-0.3999999165534973,-0.37999993562698364,false,9);
var path10= new Path(1.0599992275238037,1.0699992179870605,-0.3999999165534973,0.3999999165534973,false,10);
var path11= new Path(1.3399989604949951,1.349998950958252,-0.3999999165534973,0.3999999165534973,false,11);
var path12= new Path(1.0599992275238037,1.349998950958252,-0.009999996051192284,0.020000003278255463,false,12);
var path13= new Path(1.0599992275238037,1.349998950958252,0.3999999165534973,0.3999999165534973,false,13);







//0.05000000074505806

path0.neighbors.push(path0);
path0.neighbors.push(path1);
path0.neighbors.push(path3);
path0.neighbors.push(path5);

path1.neighbors.push(path1);
path1.neighbors.push(path2);
path1.neighbors.push(path0);
path1.neighbors.push(path6);


path2.neighbors.push(path2);
path2.neighbors.push(path1);
path2.neighbors.push(path3);

path3.neighbors.push(path3);
path3.neighbors.push(path2);
path3.neighbors.push(path0);
path3.neighbors.push(path4);

path4.neighbors.push(path4);
path4.neighbors.push(path3);
path4.neighbors.push(path5);

path5.neighbors.push(path5);
path5.neighbors.push(path4);
path5.neighbors.push(path0);

path6.neighbors.push(path6);
path6.neighbors.push(path1);
path6.neighbors.push(path7);
path6.neighbors.push(path8);
path6.neighbors.push(path10);



path7.neighbors.push(path7);
path7.neighbors.push(path6);

path8.neighbors.push(path8);
path8.neighbors.push(path7);
path8.neighbors.push(path9);
path8.neighbors.push(path6);


path9.neighbors.push(path9);
path9.neighbors.push(path8);
path9.neighbors.push(path10);
path9.neighbors.push(path11);
path9.neighbors.push(path12);
path9.neighbors.push(path13);




path10.neighbors.push(path10);
path10.neighbors.push(path9);
path10.neighbors.push(path6);
path10.neighbors.push(path12);
path10.neighbors.push(path13);



path11.neighbors.push(path11);
path11.neighbors.push(path9);
path11.neighbors.push(path12);
path11.neighbors.push(path13);

path12.neighbors.push(path12);
path12.neighbors.push(path11);
path12.neighbors.push(path10);

path13.neighbors.push(path13);
path13.neighbors.push(path11);
path13.neighbors.push(path10);



var paths=[];
paths.push(path0);
paths.push(path1);
paths.push(path2);
paths.push(path3);
paths.push(path4);
paths.push(path5);
paths.push(path6);
paths.push(path7);
paths.push(path8);
paths.push(path9);
paths.push(path10);
paths.push(path11);
paths.push(path12);
paths.push(path13);






console.log(paths);