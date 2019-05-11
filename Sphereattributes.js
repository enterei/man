var Spherepoints= [];
var Spherecolors=[];
var Spherecolor =  [ 1.0, 1.0, 0.0, 1.0 ];
var Spherenormals = [];
var shadeds_index =0;
var shadednumTimesToSubdivide = 3;
var count =0;

var schwarzen = [];
var xc =0;
var yc =0;
var zc =0;

var xub=-0.85;
var xob=-0.5;

var yub= 0.5 ;
var yob = 0.7;

var zub1 = 0.0 ;
var zob1 = 2.8;

var zub2 = zob1*(-1);
var zob2 = zub1*(-1);
console.log(zub1);
console.log(zob2);
function fillshadedSpoints(oben){
    
    var va = [0.0, 0.0, -1.0,1.0];
    var vb = [0.0, 0.942809, 0.333333,1.0];
    var vc = [-0.816497, -0.471405, 0.333333,1.0];
    var vd = [0.816497, -0.471405, 0.333333,1.0];
    

   
    stetrahedron(va, vb, vc, vd, shadednumTimesToSubdivide,oben);
  
//    console.log(Spherepoints);


    console.log(xc);
    console.log(yc);
    console.log(zc);
    console.log(count); 
   // console.log(Spherecolors);
    console.log(schwarzen);

}

function stetrahedron(a, b, c, d, n,oben) {
    sdivideTriangle(a, b, c, n,oben);
    sdivideTriangle(d, c, b, n,oben);
    sdivideTriangle(a, d, b, n,oben);
    sdivideTriangle(a, c, d, n,oben);
    
}

function sdivideTriangle(a, b, c, count,oben) {
    
    if (count > 0) {
  //      var ab = normalize(mix(a, b, 0.5), true);
   //     var ac = normalize(mix(a, c, 0.5), true);
    //    var bc = normalize(mix(b, c, 0.5), true);  
        var ab = normalo(gaa(a, b));
        var ac = normalo(gaa(a, c));
          var bc = normalo(gaa(b, c));

    //    var ab = vec4.create();vec4.normalize(ab,mix(a, b, 0.5), true);
      //  var ac = vec4.create();vec4.normalize(ac,mix(a, c, 0.5), true);
       // var bc = vec4.create();vec4.normalize(bc,mix(b, c, 0.5), true);

        sdivideTriangle(a, ab, ac, count - 1,oben);
        sdivideTriangle(ab, b, bc, count - 1,oben);
        sdivideTriangle(bc, c, ac, count - 1,oben);
        sdivideTriangle(ab, bc, ac, count - 1,oben);
    }
    else {
        striangle(a, b, c,oben);
    }
}

function striangle(a, b, c,oben){
    com = -0.7
   // console.log(oben);
    if(oben){
      //  console.log("oben");
        if(a[1]<0){
            a[1]=0;
        }
        if(b[1]<0){
            b[1]=0;
        }
        if(c[1]<0){
            c[1]=0;
        }

    }
    else{
  //      console.log("unten");

        if(a[1]>0){
            a[1]=0;
        }
        if(b[1]>0){
            b[1]=0;
        }
        if(c[1]>0){
            c[1]=0;
        }

    }
   
    

    if(a[0]>com)xc +=1;
    if(b[0]>com)xc +=1;
    if(c[0]>com)xc +=1;
    if(a[1]>com)yc +=1;
    if(b[1]>com)yc +=1;
    if(c[1]>com)yc +=1;
    if(a[2]>com)zc +=1;
    if(b[2]>com)zc +=1;
    if(c[2]>com)zc +=1;

    Spherepoints.push(a);
    if(inbound(a)){
        console.log("shdfskjdfsjkdsf");
        Spherecolors.push([0.0,0.0,0.0,1.0]);
        schwarzen.push(a);
    }
    else{
        Spherecolors.push(Spherecolor);
    }
    

    Spherepoints.push(b);
    if(inbound(b)){
        console.log("shdfskjdfsjkdsf");
        Spherecolors.push([0.0,0.0,0.0,1.0]);
        schwarzen.push(b);
    }
    else{
        Spherecolors.push(Spherecolor);
    }
    Spherepoints.push(c);
    if(inbound(c)){
        console.log("shdfskjdfsjkdsf");
        Spherecolors.push([0.0,0.0,0.0,1.0]);
        schwarzen.push(c);
    }
    else{
        Spherecolors.push(Spherecolor);
    }
    shadeds_index += 3;

    Spherenormals.push(a[0],a[1], a[2], 0.0);
     Spherenormals.push(b[0],b[1], b[2], 0.0);
     Spherenormals .push(c[0],c[1], c[2], 0.0);


    }

    //this is my function to get the normal, because for some reasons the mat4 function didnt get it right
function normalo(u){
    var last = u.pop();
    var len =  Math.sqrt( u[0]*u[0]+u[1]*u[1]+u[2]*u[2] );
    for ( var i = 0; i < u.length; ++i ) {
        u[i] /= len;
    }
    u.push( last );
    return u;
}
function gaa(a,b){
    var ret = [];
    for ( var i = 0; i < a.length; ++i ) {
        ret.push( 0.5 * a[i] + 0.5 * b[i] );
    }
    return ret;

}

function inbound(compare){
   

    if(compare[0]>=xub&&compare[0]<=xob&&compare[1]>=yub&&compare[1]<= yob&&compare[2]>=zub1&&compare[2]<=zob1) {
        count = count +1;
        console.log("IFFFFFFFFFFFFFFFFFF 1");
        return true;
    }
    if(compare[0]>=xub&&compare[0]<=xob&&compare[1]>=yub&&compare[1]<= yob&&compare[2]>=zub2&&compare[2]<=zob2) {
        count = count +1;
        console.log("IFFFFFFFFFFFFFFFFFF 2  ");

        return true;
    }
        
    else return false;
}