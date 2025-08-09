(function(){
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let w=canvas.width=innerWidth, h=canvas.height=innerHeight;
window.addEventListener('resize',()=>{w=canvas.width=innerWidth;h=canvas.height=innerHeight;});

const waves = [];
for(let i=0;i<4;i++){
  waves.push({amp:30+20*i, freq:0.002+0.001*i, speed:0.2+0.1*i, hue:180+30*i, phase:0});
}

function draw(){
  ctx.clearRect(0,0,w,h);
  const g=ctx.createLinearGradient(0,0,0,h);
  g.addColorStop(0,'#020202'); g.addColorStop(1,'#05050b');
  ctx.fillStyle=g; ctx.fillRect(0,0,w,h);

  waves.forEach((wave,idx)=>{
    wave.phase += wave.speed * 0.01;
    ctx.beginPath();
    const opacity = 0.08 + idx*0.04;
    for(let x=0;x<w;x+=2){
      const y = h*0.5 + Math.sin((x*wave.freq) + wave.phase) * wave.amp + Math.sin(wave.phase*0.6 + idx)*10;
      if(x===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    }
    ctx.lineTo(w,h); ctx.lineTo(0,h); ctx.closePath();
    ctx.fillStyle = `hsla(${wave.hue},90%,55%,${opacity})`;
    ctx.fill();
  });

  for(let i=0;i<6;i++){
    const radius = 120 + Math.sin(Date.now()/1000 + i)*40;
    ctx.beginPath();
    ctx.fillStyle = `hsla(${200 + i*10},80%,50%,0.03)`;
    ctx.arc(w*(0.1+i*0.16), h*0.2 + Math.sin(Date.now()/1300 + i)*40, radius, 0, Math.PI*2);
    ctx.fill();
  }
  requestAnimationFrame(draw);
}
draw();
})();