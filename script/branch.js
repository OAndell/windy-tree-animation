function Branch(len, width, c, x1, y1, x2, y2, rotation,parent){
    this.len = len;
    this.width = width;
    this.c = c;
    this.rotation = rotation;
    this.x1= x1;
    this.x2= x2;
    this.y1= y1;
    this.y2= y2;
    this.parent = parent;
    this.children=[];
    this.isSwaying = false;
    this.maxSway = PI/4;
    this.currentSway = 0;

    if(this.parent!=null){
        parent.registerChild(this);
    }

    this.draw = function(){
      stroke(this.c);
      strokeWeight(this.width);
      line(this.x1, this.y1, this.x2, this.y2);
    }

    this.registerChild=function(child){
        this.children.push(child)
    }

    this.sway = function(){
        
    }

  }