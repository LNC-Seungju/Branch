const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const radiusRefer = 100;
const mouse = {
  x: null,
  y: null
}
let active = false;

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
})

class Root {
  constructor(x, y, color, centerX, centerY) {
    this.x = x;
    this.y = y; 
    this.color = color;
    this.speedX = 0;
    this.speedY = 0;
    this.centerX = centerX;
    this.centerY = centerY;
  }
  draw() {
    this.speedX += (Math.random() - 0.5 ) / 0.8;
    this.speedY += (Math.random() - 0.5 ) / 0.8;
    this.x += this.speedX;
    this.y += this.speedY;

    const distanceX = this.x - this.centerX;
    const distanceY = this.y - this.centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    const radius = (-distance / radiusRefer + 2 ) * radiusRefer / 10;

    console.log(radius);
    if(radius > 0) {
      requestAnimationFrame(this.draw.bind(this));
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, radius, 0, Math.PI*2);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.strokeStyle = 'black';
      ctx.stroke();
    }
  }
}
function drawBranch() {
  if( active == true ) {
    const centerX = mouse.x;
    const centerY = mouse.y;
    
    for(let i=0; i<3; i++) {
      const root = new Root(mouse.x, mouse.y, 'white', centerX, centerY);
      root.draw();
      
    }
  }
}
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})
window.addEventListener('mousemove', () => {
  drawBranch();
})
window.addEventListener('mousedown', () => {
  active = true;
})
window.addEventListener('mouseup', () => {
  active = false;
})