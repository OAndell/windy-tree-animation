function Leaf(c, x, y, h, w, parent){
    this.c = c;
    this.x1= x;
    this.y1= y;
    this.h = h;
    this.w = w;
    this.falling = false;
    this.landed = false;
    this.parent = parent;
    this.children=[]
    parent.registerChild(this);

    this.vx = 0;
    this.vy = 0;
  
    this.draw = function(){
      if(!this.landed){
        if(!this.falling){
          if(random(0,1) > 0.9999 && windstr > 0.5){
            this.falling = true;
          }
        }
        else{
          this.vx = windstr*10*cos(windangle);
          this.vy = -windstr*10*sin(windangle) + 9.82*0.5;
          this.y1 = this.y1 + this.vy;
          this.x1 = this.x1 + this.vx;

         if(this.y1 >= -10){
            this.landed=true;
          }
        }
      }
      noStroke();
      fill(this.c);
      ellipse(this.x1+random(-0.2,0.2),this.y1+random(-0.2,0.2),this.w,this.h);  
    }
  
  }