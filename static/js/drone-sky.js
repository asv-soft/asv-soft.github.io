(() => {
  'use strict';
  const canvas = document.querySelector('#drone-sky');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let width = 0, height = 0, frame = 0, time = 0, previous = 0;
  const pointer = { x: 0, y: 0 };
  const camera = { x: 0, y: 0 };
  const drones = Array.from({ length: 9 }, (_, i) => ({
    type: ['plane', 'quad', 'vtol'][i % 3],
    phase: i * 2.399, depth: 340 + (i % 4) * 260,
    speed: .035 + (i % 3) * .013, size: i % 3 === 0 ? 1.2 : 1,
  }));
  const rotate = (p, yaw, bank, pitch) => {
    let [x, y, z] = p;
    [y, z] = [y * Math.cos(pitch) - z * Math.sin(pitch), y * Math.sin(pitch) + z * Math.cos(pitch)];
    [x, y] = [x * Math.cos(bank) - y * Math.sin(bank), x * Math.sin(bank) + y * Math.cos(bank)];
    return [x * Math.cos(yaw) + z * Math.sin(yaw), y, -x * Math.sin(yaw) + z * Math.cos(yaw)];
  };
  function drawDrone(drone, t) {
    const a = t * drone.speed + drone.phase;
    const x = Math.sin(a) * 750;
    const y = Math.cos(a * .71 + drone.phase) * 240 - 35;
    const z = drone.depth + Math.cos(a) * 160;
    const yaw = Math.atan2(Math.cos(a), -.5 * Math.sin(a));
    const bank = Math.sin(a + drone.phase) * .30;
    const pitch = .20 + Math.sin(a * .71) * .12;
    const project = p => {
      const r = rotate(p.map(v => v * drone.size), yaw, bank, pitch);
      const scale = 730 / (z + r[2] + 650);
      return [width * .66 + (x + r[0] + camera.x * 45) * scale, height * .44 + (y + r[1] + camera.y * 28) * scale, r[2]];
    };
    const faces = [];
    function box(cx, cy, cz, sx, sy, sz, color) {
      const v = [[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]].map(p => project([cx+p[0]*sx/2,cy+p[1]*sy/2,cz+p[2]*sz/2]));
      [[0,1,2,3],[4,7,6,5],[0,4,5,1],[3,2,6,7],[0,3,7,4],[1,5,6,2]].forEach((f,i) => faces.push({points:f.map(j=>v[j]), color:color[i%color.length], depth:f.reduce((s,j)=>s+v[j][2],0)/4}));
    }
    const hull = ['#9caec7','#dce6f4','#eef4fc','#aebed4','#c4d2e5','#b4c5dd'];
    const wing = ['#8c9fbc','#cfdbed','#e6effc','#a0b5d3'];
    const blue = ['#466faa','#6591cd','#88aee0'];
    const rotors = [];
    if (drone.type !== 'quad') {
      box(0,0,0,17,15,112,hull);
      box(0,-1,2,150,5,29,wing);
      box(0,-5,43,56,4,17,wing);
      box(0,-15,44,4,25,18,blue);
      box(0,-9,-23,12,8,28,blue);
      if (drone.type === 'vtol') {
        [-47,47].forEach(s => { box(s,-6,0,6,8,87,hull); [-34,34].forEach(q => rotors.push([s,-13,q,21])); });
      } else rotors.push([0,0,-59,22]);
    } else {
      box(0,0,0,28,13,40,hull);
      box(0,-8,-9,19,4,16,blue);
      [-1,1].forEach(s => [-1,1].forEach(q => {
        box(s*23,2,q*23,49,5,6,wing);
        box(s*43,-2,q*23,10,11,10,hull);
        rotors.push([s*43,-9,q*23,25]);
      }));
      box(0,11,-20,12,12,12,blue);
    }
    ctx.globalAlpha = .72 - drone.depth / 4000;
    faces.sort((a,b)=>b.depth-a.depth).forEach(f => {
      ctx.beginPath(); f.points.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();ctx.fillStyle=f.color;ctx.fill();ctx.strokeStyle='#59779d25';ctx.lineWidth=.6;ctx.stroke();
    });
    rotors.forEach(([rx,ry,rz,r]) => {
      const vertical = drone.type === 'plane';
      ctx.beginPath();
      for(let i=0;i<=32;i++) {
        const angle=i/32*Math.PI*2;
        const p=project([rx+Math.cos(angle)*r,ry+(vertical?Math.sin(angle)*r:0),rz+(vertical?0:Math.sin(angle)*r)]);
        i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]);
      }
      ctx.fillStyle='#7196c325';ctx.fill();ctx.strokeStyle='#527ba94a';ctx.lineWidth=1;ctx.stroke();
      for(let i=0;i<2;i++) {
        const angle=t*26+i*Math.PI;
        const p=project([rx+Math.cos(angle)*r,ry+(vertical?Math.sin(angle)*r:0),rz+(vertical?0:Math.sin(angle)*r)]),c=project([rx,ry,rz]);
        ctx.beginPath();ctx.moveTo(c[0],c[1]);ctx.lineTo(p[0],p[1]);ctx.strokeStyle='#54749b60';ctx.lineWidth=2;ctx.stroke();
      }
    });
    ctx.globalAlpha = 1;
  }
  function render(now) {
    if (previous) time += Math.min((now-previous)/1000,.05);
    previous=now;
    camera.x += (pointer.x-camera.x)*.035;camera.y += (pointer.y-camera.y)*.035;
    ctx.clearRect(0,0,width,height);
    // Soft atmospheric clouds move more slowly than the foreground aircraft.
    for(let i=0;i<6;i++) {
      const x=((i*317+time*3)%(width+500))-250,y=height*(.14+(i%3)*.3);
      const g=ctx.createRadialGradient(x,y,0,x,y,230);g.addColorStop(0,'#ffffffb0');g.addColorStop(1,'#ffffff00');ctx.fillStyle=g;ctx.fillRect(x-230,y-230,460,460);
    }
    [...drones].sort((a,b)=>b.depth-a.depth).forEach(d=>drawDrone(d,time));
    if (!reduced.matches && !document.hidden) frame=requestAnimationFrame(render);
  }
  function resize() {
    width=innerWidth;height=innerHeight;
    const dpr=Math.min(devicePixelRatio||1,2);
    canvas.width=width*dpr;canvas.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
    if(reduced.matches) render(0);
  }
  function start() {cancelAnimationFrame(frame);previous=0;if(!document.hidden)frame=requestAnimationFrame(render);}
  addEventListener('resize',resize,{passive:true});
  addEventListener('pointermove',e=>{pointer.x=e.clientX/width-.5;pointer.y=e.clientY/height-.5;},{passive:true});
  document.addEventListener('visibilitychange',start);reduced.addEventListener('change',start);
  resize();start();
})();
