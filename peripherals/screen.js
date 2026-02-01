export class Screen {
  constructor(width = 16, height = 16, elementId = null) {
    this.width = width;
    this.height = height;
    this.buffer = Array(width * height).fill(0);

    if(elementId) {
      this.canvas = document.getElementById(elementId);
    } else {
      this.canvas = document.createElement("canvas");
      this.canvas.width = width*20;
      this.canvas.height = height*20;
      document.body.appendChild(this.canvas);
    }
    this.ctx = this.canvas.getContext("2d");
    this.draw();
  }

  draw() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    const size = 20;

    ctx.fillStyle = "#111";
    ctx.fillRect(0,0,w*size,h*size);

    for(let y=0;y<h;y++){
      for(let x=0;x<w;x++){
        const idx = y*w+x;
        ctx.fillStyle = this.buffer[idx] ? "#0f0" : "#111";
        ctx.fillRect(x*size, y*size, size-1, size-1);
      }
    }
  }

  setPixel(x, y, value) {
    if(x<0||x>=this.width||y<0||y>=this.height) return;
    this.buffer[y*this.width+x] = value ? 1 : 0;
    this.draw();
  }
}
