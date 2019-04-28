function Path(x1,x2,z1,z2,nbs,act){
    this.x1 = x1;
    this.x2=x2;
    this.z1=z1;
    this.z2=z2;

    this.neighbors = nbs;
    this.act = act;


    this.check= function(x,z){
        if(x>=this.x1&&x<=this.x2&&z>=this.z1&&z<=this.z2) return true;
        return false;
    };
}