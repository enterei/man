function Path(x1,x2,z1,z2,act,n){
    this.n = n;
    this.x1 = x1;
    this.x2=x2;
    this.z1=z1;
    this.z2=z2;

    this.neighbors = [];
    this.act = act;


    this.check= function(x,z){

       
      //  console.log(this.x1,this.x2,this.z1,this.z2);
       /* if(Math.round(x)>=Math.round(this.x1)) {console.log(true)
            console.log(x,this.x1);
            ;}
        if(Math.round(x)<=Math.round(this.x2) ){console.log(true)
            console.log(x,this.x2);
            if(Math.round(0)<=Math.round(-0.45))console.log("is kleiner");
            ;}
        if(Math.round(z)>=Math.round(this.z1)) console.log(true);
        if(Math.round(z)<=Math.round(this.z2) )console.log(true);


        if(Math.round(x)>=Math.round(this.x1)&&Math.round(x)<=Math.round(this.x2)&&Math.round(z)>=Math.round(this.z1)&&Math.round(z)<=Math.round(this.z2)) return {
            status: true,
            n:this.n
        };*/
        xn = parseInt(x*1000000);
        x1n=parseInt(this.x1*1000000);
        x2n=parseInt(this.x2*1000000);
        zn = parseInt(z*1000000);
        z1n=parseInt(this.z1*1000000);
        z2n=parseInt(this.z2*1000000);
      //  console.log(this.n);
       // console.log(x1n,x2n,z1n,z2n);

       // console.log(xn,zn);
       // if(parseInt(x*100000)>=parseInt(this.x1*1000000)) console.log(true);
        //if(parseInt(x*100000)<=parseInt(this.x2*1000000)) console.log(true);
       /* if(xn>=x1n) console.log(true);
        if(xn<=x2n) console.log(true);
        else{
            console.log(parseInt(x*1000000),parseInt(this.x2*1000000));
        }*/
    /*    if(xn>=x1n) console.log(true);
        if(xn<=x2n) console.log(true);
        if(zn>=z1n) console.log(true);
        if(zn<=z2n) console.log(true);*/
       // else{
       //     console.log(zn,z2n);
       // }
        if(xn>=x1n&&xn<=x2n&&zn>=z1n&&zn<=z2n) return{status:true,n:this.n}
        return {
            status: false,
            n:activesp,
        };
    };
}