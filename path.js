function Path(x1,x2,z1,z2,act,n,vert,bc){
    this.n = n;
    this.x1 = x1;
    this.x2=x2;
    this.z1=z1;
    this.z2=z2;
    this.bc=bc;


    this.neighbors = [];
    this.act = act;
    this.vert= vert;


    this.check= function(x,z){
      //  console.log(x);
       // console.log(z);

       
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
        if(xn>=x1n&&xn<=x2n&&zn>=z1n&&zn<=z2n) {
            this.checkballs(x,z);
            return{
                status:true,
                n:this.n}
            }
        return {
            status: false,
            n:activesp,
        };
    };
    this.checkballs = function(x,z){
        if(vert){
           // if(x==this.bc){
               console.log("hieeeeeeeeeeeeeer");
               if(this.inrangee(x)){
                if(balls[this.n].viewable){
                    balls[this.n].viewable=false;
                    counter = counter+1;
                   // console.log(counter%balln);

                    if(counter ==14){
                        makeballsv();
                    }

                }
                
            }

        }
        else{
          //  if(z==this.bc){
              if(this.inrangee(z)){
                if(balls[this.n].viewable){
                    balls[this.n].viewable=false;
                    counter = counter+1;
                 //   console.log(counter%balln);
                    if(counter ==14){
                        makeballsv();
                    }


                }
            }

        }
    }
    this.inrangee=function(l){
        loc = parseInt(l*100000);
        if(this.bc<0){
          /*  newbc= this.bc*-1;
            
            x=parseInt(this.bc*100000)*-1;
            
            unten=((parseInt(x+x*0.05)))*-1;
            x2=parseInt(x-x*0.05);
            console.log(unten);
            console.log(x2);
            console.log(loc);
            if(unten>loc)console.log("true");*/
           // else {console.log("false");}
            //if(x1<<loc&&x2>>loc) return true;
            if(this.bc+this.bc*0.05<l&&this.bc-this.bc*0.05>l) return true;

        }
        else{
            console.log();
            console.log();
            console.log();
             if(this.bc-this.bc*0.05<l&&this.bc+this.bc*0.05>l) return true;
        }
        return false;


    }
}

function makeballsv(){
    console.log("olaa");
    counter=0;
    for(i=0;i<balls.length;i++){
        balls[i].viewable=true;
    }
}

