// Ausaw (Audio Jigsaw) - Embeddable Game Engine
(function(){
var style=document.createElement('style');
style.textContent="*{box-sizing:border-box;margin:0;padding:0}\nbody{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8f9fa;display:flex;justify-content:center;min-height:100vh}\n#app{max-width:520px;width:100%;padding:16px;background:#fff;min-height:100vh}\n.top-bar{text-align:center;padding:12px 0;border-bottom:1px solid #eee;margin-bottom:12px}\n.top-bar h1{font-size:18px;color:#1a1a2e;letter-spacing:1px}\n.top-bar .subtitle{font-size:11px;color:#888;margin-top:2px}\n.top-bar .day-info{font-size:12px;color:#4361ee;margin-top:4px;font-weight:600}\n.diff-tabs{display:flex;justify-content:center;gap:8px;margin-bottom:12px}\n.diff-tab{padding:6px 18px;border-radius:20px;border:2px solid #e0e0e0;background:#fff;font-size:12px;font-weight:600;cursor:pointer;transition:all .15s;color:#666}\n.diff-tab:hover{border-color:#4361ee;color:#4361ee}\n.diff-tab.active{border-color:#4361ee;background:#4361ee;color:#fff}\n.timer{text-align:center;font-size:15px;color:#666;margin-bottom:10px;font-variant-numeric:tabular-nums;font-weight:500}\n.timer span{background:#f0f4ff;padding:4px 12px;border-radius:6px}\n.section-label{font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#999;margin:12px 0 8px;font-weight:600}\n.melody-info{text-align:center;padding:10px;background:#f0f4ff;border-radius:10px;margin-bottom:12px}\n.melody-info .name{font-size:14px;font-weight:600;color:#333}\n.melody-info .lang{font-size:11px;color:#4361ee;margin-top:2px}\n.play-melody-btn{display:flex;align-items:center;justify-content:center;gap:8px;margin:0 auto;padding:8px 20px;border-radius:8px;border:2px solid #4361ee;background:#fff;color:#4361ee;font-size:13px;font-weight:600;cursor:pointer;transition:all .15s;margin-top:8px}\n.play-melody-btn:hover{background:#4361ee;color:#fff}\n.play-melody-btn.playing{background:#4361ee;color:#fff;animation:pulse 1s infinite}\n@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(67,97,238,.3)}50%{box-shadow:0 0 0 8px rgba(67,97,238,0)}}\n\n/* Jigsaw Frame */\n.frame-wrap{margin:16px 0}\n.jigsaw-frame{display:grid;gap:3px;margin:0 auto;padding:8px;background:#f0f4ff;border-radius:12px;border:2px solid #e0e0e0;width:fit-content}\n.frame-slot{border-radius:4px;background:#e8ecf4;border:2px dashed #ccc;display:flex;align-items:center;justify-content:center;font-size:10px;color:#aaa;transition:all .2s;cursor:pointer;position:relative;font-weight:700}\n.frame-slot.filled{border:2px solid #4361ee;background:#dce4ff;color:#4361ee}\n.frame-slot.highlight{border-color:#ffd700;background:#fff8e1;animation:glow .5s}\n.frame-slot.awaiting{border-color:#2ecc71;background:#e8f8f0;animation:pulse-slot 1s infinite}\n@keyframes glow{0%,100%{box-shadow:0 0 4px rgba(255,215,0,.3)}50%{box-shadow:0 0 12px rgba(255,215,0,.6)}}\n@keyframes pulse-slot{0%,100%{box-shadow:inset 0 0 4px rgba(46,204,113,.2)}50%{box-shadow:inset 0 0 8px rgba(46,204,113,.4)}}\n\n/* Piece Pool */\n.pool-label{font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#999;margin:12px 0 8px;font-weight:600;text-align:center}\n.pool-label.active{color:#4361ee}\n.piece-pool{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;padding:10px;background:#fafafa;border-radius:10px;min-height:50px}\n.piece{width:42px;height:42px;border-radius:8px;background:#fff;border:2px solid #4361ee;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .15s;user-select:none;font-size:16px}\n.piece:hover{transform:scale(1.08);box-shadow:0 2px 8px rgba(67,97,238,.3)}\n.piece.selected{background:#4361ee;color:#fff;transform:scale(1.1);box-shadow:0 0 10px rgba(67,97,238,.4)}\n\n/* Result */\n.result{text-align:center;padding:16px 0;font-size:18px;font-weight:600}\n.result.win{color:#27ae60}\n.stats{display:flex;justify-content:center;gap:24px;padding:8px 0;color:#666;font-size:13px}\n.share-btn{display:block;margin:12px auto;padding:10px 28px;border-radius:8px;border:none;background:#4361ee;color:#fff;font-size:14px;font-weight:600;cursor:pointer;transition:background .15s}\n.share-btn:hover{background:#3a56d4}\n.board-hint-btn{display:block;margin:8px auto;padding:6px 16px;border-radius:16px;border:1px solid #ddd;background:#fafafa;font-size:11px;color:#888;cursor:pointer}\n.board-hint-btn:hover{background:#f0f0f0}\n.instructions{text-align:center;padding:12px 0;font-size:11px;color:#bbb;border-top:1px solid #f0f0f0;margin-top:16px}\n.toast{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#333;color:#fff;padding:8px 20px;border-radius:20px;font-size:13px;opacity:0;transition:opacity .3s;pointer-events:none;z-index:100}\n.toast.show{opacity:1}";
document.head.appendChild(style);
if(!document.getElementById('app')){
  var c=document.createElement('div');c.id='app';
  var target=document.getElementById('ausaw-game');
  if(target){target.appendChild(c);}else{document.body.appendChild(c);}
}
})();
(function(){
'use strict';

// === MELODIES (Public Domain, multilingual) ===
var MELODIES = [
  {name:'Twinkle Twinkle', lang:'English', bpm:120, notes:[[262,1],[262,1],[392,1],[392,1],[440,1],[440,1],[392,2],[349,1],[349,1],[330,1],[330,1],[294,1],[294,1],[262,2],[392,1],[392,1],[349,1],[349,1],[330,1],[330,1],[294,2],[392,1],[392,1],[349,1],[349,1],[330,1],[330,1],[294,2],[262,1],[262,1],[392,1],[392,1],[440,1],[440,1],[392,2],[349,1],[349,1],[330,1],[330,1],[294,1],[294,1],[262,2]]},
  {name:'Mary Had a Little Lamb', lang:'English', bpm:140, notes:[[330,1],[294,1],[262,1],[294,1],[330,1],[330,1],[330,2],[294,1],[294,1],[294,2],[330,1],[392,1],[392,2],[330,1],[294,1],[262,1],[294,1],[330,1],[330,1],[330,1],[330,1],[294,1],[294,1],[330,1],[294,1],[262,2]]},
  {name:'Ode to Joy', lang:'German', bpm:120, notes:[[330,1],[330,1],[349,1],[392,1],[392,1],[349,1],[330,1],[294,1],[262,1],[262,1],[294,1],[330,1],[330,1.5],[294,0.5],[294,2],[330,1],[330,1],[349,1],[392,1],[392,1],[349,1],[330,1],[294,1],[262,1],[262,1],[294,1],[330,1],[294,1.5],[262,0.5],[262,2]]},
  {name:'Happy Birthday', lang:'English', bpm:100, notes:[[262,0.75],[262,0.25],[294,1],[262,1],[349,1],[330,2],[262,0.75],[262,0.25],[294,1],[262,1],[392,1],[349,2],[262,0.75],[262,0.25],[523,1],[440,1],[349,1],[330,1],[294,2],[466,0.75],[466,0.25],[440,1],[349,1],[392,1],[349,2]]},
  {name:'Frère Jacques', lang:'French', bpm:120, notes:[[262,1],[294,1],[330,1],[262,1],[262,1],[294,1],[330,1],[262,1],[330,1],[349,1],[392,2],[330,1],[349,1],[392,2],[392,0.75],[440,0.25],[392,0.5],[349,0.5],[330,1],[262,1],[392,0.75],[440,0.25],[392,0.5],[349,0.5],[330,1],[262,1],[262,1],[196,1],[262,2],[262,1],[196,1],[262,2]]},
  {name:'Au Clair de la Lune', lang:'French', bpm:100, notes:[[262,1],[262,1],[262,1],[294,1],[330,2],[294,2],[262,1],[330,1],[294,1],[294,1],[262,2],[262,2],[262,1],[262,1],[262,1],[294,1],[330,2],[294,2],[262,1],[330,1],[294,1],[294,1],[262,2],[262,2]]},
  {name:'Alle Meine Entchen', lang:'German', bpm:130, notes:[[262,1],[294,1],[330,1],[349,1],[392,2],[392,2],[440,1],[440,1],[440,1],[440,1],[392,2],[392,2],[440,1],[440,1],[440,1],[440,1],[392,2],[392,2],[349,1],[349,1],[349,1],[349,1],[330,2],[330,2],[294,1],[294,1],[294,1],[294,1],[262,2],[262,2]]},
  {name:'Lakdi Ki Kathi', lang:'Hindi', bpm:130, notes:[[330,1],[330,1],[392,1],[392,1],[440,1],[392,1],[330,2],[294,1],[294,1],[330,1],[330,1],[262,2],[262,2],[330,1],[330,1],[392,1],[392,1],[440,1],[392,1],[330,2],[294,1],[330,1],[294,1],[262,1],[262,2],[262,2]]},
  {name:'Machhli Jal Ki Rani', lang:'Hindi', bpm:120, notes:[[330,1],[330,1],[294,1],[330,1],[392,2],[392,2],[440,1],[392,1],[349,1],[330,1],[294,2],[294,2],[330,1],[330,1],[294,1],[330,1],[392,2],[392,2],[349,1],[330,1],[294,1],[262,1],[262,2],[262,2]]},
  {name:'Sakura Sakura', lang:'Japanese', bpm:80, notes:[[330,2],[330,2],[349,2],[330,2],[330,2],[349,2],[330,1],[349,1],[392,2],[440,2],[392,1],[349,1],[330,1],[349,1],[294,2],[330,2],[330,2],[349,2],[330,2],[330,2],[349,2],[330,1],[349,1],[392,2],[440,2],[392,1],[349,1],[330,1],[294,1],[262,2]]},
  {name:'Los Pollitos Dicen', lang:'Spanish', bpm:120, notes:[[330,1],[330,1],[330,1],[294,1],[262,2],[262,2],[294,1],[294,1],[294,1],[262,1],[247,2],[247,2],[262,1],[294,1],[330,1],[349,1],[330,1],[294,1],[262,2],[262,2]]},
  {name:'De Colores', lang:'Spanish', bpm:120, notes:[[262,1],[330,1],[392,1],[392,1],[392,1],[440,1],[392,2],[330,1],[392,1],[440,1],[440,1],[440,1],[494,1],[440,2],[392,1],[440,1],[494,1],[494,1],[494,1],[523,1],[494,1],[440,1],[392,2],[392,2]]},
  {name:'Jasmine Flower', lang:'Chinese', bpm:90, notes:[[330,2],[330,1],[392,1],[440,2],[523,2],[523,1],[440,1],[392,2],[440,2],[392,1],[330,1],[294,2],[262,2],[294,1],[330,1],[392,1],[330,1],[294,2],[262,2]]},
  {name:'Santa Lucia', lang:'Italian', bpm:100, notes:[[330,2],[349,1],[330,1],[294,2],[330,2],[392,2],[440,1],[392,1],[349,2],[330,2],[330,2],[349,1],[330,1],[294,2],[330,2],[392,2],[440,1],[392,1],[349,1],[330,1],[294,2],[262,2]]},
  {name:'Katyusha', lang:'Russian', bpm:120, notes:[[330,1],[294,1],[330,1],[392,1],[349,1],[330,1],[294,2],[294,1],[262,1],[294,1],[330,1],[294,1],[262,1],[247,2],[330,1],[294,1],[330,1],[392,1],[349,1],[330,1],[294,2],[262,1],[294,1],[262,1],[247,1],[262,2],[262,2]]},
  {name:'Arirang', lang:'Korean', bpm:90, notes:[[330,2],[392,1],[440,1],[523,2],[440,2],[392,1],[440,1],[523,2],[440,2],[392,2],[330,2],[294,2],[262,2],[294,1],[330,1],[392,2],[330,2],[294,2],[262,2],[262,2]]},
  {name:'London Bridge', lang:'English', bpm:130, notes:[[392,1.5],[440,0.5],[392,1],[349,1],[330,1],[349,1],[392,2],[294,1],[330,1],[349,2],[330,1],[349,1],[392,2],[392,1.5],[440,0.5],[392,1],[349,1],[330,1],[349,1],[392,2],[294,2],[392,2],[330,2],[262,2],[262,2]]},
  {name:'Row Row Row Your Boat', lang:'English', bpm:110, notes:[[262,1.5],[262,0.5],[262,1],[294,0.5],[330,1.5],[330,1],[294,0.5],[330,1],[349,0.5],[392,2],[523,0.5],[523,0.5],[523,0.5],[392,0.5],[392,0.5],[392,0.5],[330,0.5],[330,0.5],[330,0.5],[262,0.5],[262,0.5],[262,0.5],[392,1],[349,0.5],[330,1],[294,0.5],[262,2]]},
  {name:'Jingle Bells', lang:'English', bpm:140, notes:[[330,1],[330,1],[330,2],[330,1],[330,1],[330,2],[330,1],[392,1],[262,1],[294,1],[330,2],[330,2],[349,1],[349,1],[349,1],[349,1],[349,1],[330,1],[330,1],[330,0.5],[330,0.5],[330,1],[294,1],[294,1],[330,1],[294,2],[392,2]]},
  {name:'Baa Baa Black Sheep', lang:'English', bpm:120, notes:[[262,1],[262,1],[392,1],[392,1],[440,0.5],[440,0.5],[440,0.5],[440,0.5],[392,2],[349,1],[349,1],[330,1],[330,1],[294,1],[294,1],[262,2]]},
  {name:'Tala al-Badru Alayna', lang:'Arabic', bpm:90, notes:[[294,2],[330,1],[349,1],[392,2],[392,2],[440,1],[392,1],[349,2],[330,2],[294,2],[330,1],[349,1],[392,2],[349,2],[330,1],[294,1],[262,2],[262,2]]},
  {name:'Nila Nila Odi Va', lang:'Tamil', bpm:120, notes:[[392,1],[392,1],[440,1],[392,1],[330,2],[330,2],[349,1],[349,1],[392,1],[349,1],[294,2],[294,2],[330,1],[349,1],[392,1],[440,1],[392,1],[349,1],[330,2],[330,2]]},
  {name:'Ciranda Cirandinha', lang:'Portuguese', bpm:130, notes:[[262,1],[330,1],[392,1],[392,1],[440,1],[392,1],[330,2],[262,1],[330,1],[392,1],[392,1],[349,1],[330,1],[294,2],[262,1],[294,1],[330,1],[349,1],[330,1],[294,1],[262,2],[262,2]]},
  {name:'Malaika', lang:'Swahili', bpm:100, notes:[[330,2],[392,1],[440,1],[523,2],[440,2],[392,1],[440,1],[392,2],[330,2],[294,1],[330,1],[392,2],[330,2],[294,2],[262,2],[262,2]]}
];

var DIFFICULTIES = {Easy:9, Medium:16, Hard:32};
var GRID_LAYOUTS = {9:[3,3], 16:[4,4], 32:[8,4]};
var EPOCH = new Date('2026-05-12');

// === DAILY PUZZLE ===
function getDayNum(){
  var today = new Date(); today.setHours(0,0,0,0);
  var ep = new Date(EPOCH); ep.setHours(0,0,0,0);
  return Math.floor((today - ep) / 86400000) + 1;
}
function getDailyMelody(){
  var dayNum = getDayNum();
  var idx = ((dayNum - 1) % MELODIES.length + MELODIES.length) % MELODIES.length;
  return MELODIES[idx];
}

// === AUDIO ENGINE ===
var actx = null;
function ensureAudio(){
  if(!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
  if(actx.state==='suspended') actx.resume();
}
function playNotes(notes, bpm, onNote, onDone){
  ensureAudio();
  var beatDur = 60 / bpm;
  var t = actx.currentTime + 0.02;
  var totalDur = 0;
  for(var i=0; i<notes.length; i++){
    var freq = notes[i][0], dur = notes[i][1] * beatDur;
    var osc = actx.createOscillator();
    var gain = actx.createGain();
    osc.type = 'sine'; osc.frequency.value = freq;
    osc.connect(gain); gain.connect(actx.destination);
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.3, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.01, t + dur * 0.95);
    gain.gain.linearRampToValueAtTime(0, t + dur);
    osc.start(t); osc.stop(t + dur);
    if(onNote)(function(idx,time){setTimeout(function(){onNote(idx)},(time-actx.currentTime)*1000)})(i,t);
    t += dur; totalDur = t - actx.currentTime;
  }
  if(onDone) setTimeout(onDone, totalDur * 1000 + 100);
}

// === GAME STATE ===
var state = {
  melody: null,
  difficulty: 'Easy',
  pieceCount: 9,
  pieces: [],
  frame: [],
  pool: [],
  selectedPiece: null,
  solved: false,
  moves: 0,
  startTime: 0,
  elapsed: 0,
  timerStarted: false,
  timerInterval: null,
  isPlaying: false,
  showBoardHints: false,
  cols: 3,
  rows: 3,
  edgeMap: []
};

// === JIGSAW SHAPE GENERATOR ===
function generateEdgeMap(cols, rows, count){
  var edges = [];
  for(var r=0; r<rows; r++){
    for(var c=0; c<cols; c++){
      var idx = r * cols + c;
      if(idx >= count) break;
      var top=0, right=0, bottom=0, left=0;
      if(r>0) top = -(edges[(r-1)*cols+c].bottom);
      if(c>0) left = -(edges[r*cols+c-1].right);
      if(c<cols-1) right = Math.random()>0.5?1:-1;
      if(r<rows-1 && (r+1)*cols+c<count) bottom = Math.random()>0.5?1:-1;
      edges.push({top:top,right:right,bottom:bottom,left:left});
    }
  }
  return edges;
}

function jigsawPath(size, edges){
  var s=size, tab=s*0.2, ox=tab, oy=tab;
  var d='M '+ox+' '+oy+' ';
  // Top
  if(edges.top===0) d+='L '+(ox+s)+' '+oy+' ';
  else{var dir=edges.top;d+='L '+(ox+s*0.35)+' '+oy+' C '+(ox+s*0.35)+' '+(oy-dir*tab*0.1)+' '+(ox+s*0.4)+' '+(oy-dir*tab*0.8)+' '+(ox+s*0.5)+' '+(oy-dir*tab)+' C '+(ox+s*0.6)+' '+(oy-dir*tab*0.8)+' '+(ox+s*0.65)+' '+(oy-dir*tab*0.1)+' '+(ox+s*0.65)+' '+oy+' L '+(ox+s)+' '+oy+' ';}
  // Right
  if(edges.right===0) d+='L '+(ox+s)+' '+(oy+s)+' ';
  else{var dir=edges.right;d+='L '+(ox+s)+' '+(oy+s*0.35)+' C '+(ox+s+dir*tab*0.1)+' '+(oy+s*0.35)+' '+(ox+s+dir*tab*0.8)+' '+(oy+s*0.4)+' '+(ox+s+dir*tab)+' '+(oy+s*0.5)+' C '+(ox+s+dir*tab*0.8)+' '+(oy+s*0.6)+' '+(ox+s+dir*tab*0.1)+' '+(oy+s*0.65)+' '+(ox+s)+' '+(oy+s*0.65)+' L '+(ox+s)+' '+(oy+s)+' ';}
  // Bottom
  if(edges.bottom===0) d+='L '+ox+' '+(oy+s)+' ';
  else{var dir=edges.bottom;d+='L '+(ox+s*0.65)+' '+(oy+s)+' C '+(ox+s*0.65)+' '+(oy+s+dir*tab*0.1)+' '+(ox+s*0.6)+' '+(oy+s+dir*tab*0.8)+' '+(ox+s*0.5)+' '+(oy+s+dir*tab)+' C '+(ox+s*0.4)+' '+(oy+s+dir*tab*0.8)+' '+(ox+s*0.35)+' '+(oy+s+dir*tab*0.1)+' '+(ox+s*0.35)+' '+(oy+s)+' L '+ox+' '+(oy+s)+' ';}
  // Left
  if(edges.left===0) d+='L '+ox+' '+oy+' ';
  else{var dir=edges.left;d+='L '+ox+' '+(oy+s*0.65)+' C '+(ox-dir*tab*0.1)+' '+(oy+s*0.65)+' '+(ox-dir*tab*0.8)+' '+(oy+s*0.6)+' '+(ox-dir*tab)+' '+(oy+s*0.5)+' C '+(ox-dir*tab*0.8)+' '+(oy+s*0.4)+' '+(ox-dir*tab*0.1)+' '+(oy+s*0.35)+' '+ox+' '+(oy+s*0.35)+' L '+ox+' '+oy+' ';}
  return d+'Z';
}

function createPieceSVG(size, edges, fill, stroke){
  var total=size+size*0.4;
  var svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('width',total);svg.setAttribute('height',total);
  svg.setAttribute('viewBox','0 0 '+total+' '+total);svg.style.display='block';
  var path=document.createElementNS('http://www.w3.org/2000/svg','path');
  path.setAttribute('d',jigsawPath(size,edges));
  path.setAttribute('fill',fill);path.setAttribute('stroke',stroke);path.setAttribute('stroke-width','1.5');
  svg.appendChild(path);return svg;
}

// === MELODY SPLIT ===
function splitMelody(notes, count){
  var pieces=[],totalBeats=0;
  for(var i=0;i<notes.length;i++) totalBeats+=notes[i][1];
  var bpp=totalBeats/count, cur=[], cb=0, pi=0;
  for(var i=0;i<notes.length;i++){
    cur.push(notes[i]); cb+=notes[i][1];
    if(cb>=bpp*(pi+1)-0.01||i===notes.length-1){
      pieces.push({id:pi,notes:cur.slice(),correctIndex:pi}); cur=[]; pi++;
      if(pi>=count-1&&i<notes.length-1){pieces.push({id:pi,notes:notes.slice(i+1),correctIndex:pi});break;}
    }
  }
  while(pieces.length<count) pieces.push({id:pieces.length,notes:[[262,0.5]],correctIndex:pieces.length});
  return pieces.slice(0,count);
}

function shuffle(arr){
  arr=arr.slice();
  for(var i=arr.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=arr[i];arr[i]=arr[j];arr[j]=t;}
  return arr;
}

// === TIMER ===
function startTimer(){
  if(state.timerStarted) return;
  state.timerStarted=true; state.startTime=Date.now();
  state.timerInterval=setInterval(function(){
    state.elapsed=Math.floor((Date.now()-state.startTime)/1000);
    var el=document.getElementById('timer-display');
    if(el) el.textContent=formatTime(state.elapsed);
  },500);
}
function stopTimer(){if(state.timerInterval){clearInterval(state.timerInterval);state.timerInterval=null;}}
function formatTime(s){return Math.floor(s/60)+':'+String(s%60).padStart(2,'0');}

// === RENDER ===
function ce(tag,cls){var e=document.createElement(tag);if(cls)e.className=cls;return e;}

function render(){
  var app=document.getElementById('app');
  app.innerHTML='';
  var melody=state.melody;
  var dayNum=getDayNum();

  // Top bar
  var tb=ce('div','top-bar');
  tb.innerHTML='<h1>\uD83E\uDDE9 Ausaw</h1><div class="subtitle">Audio Jigsaw by Auzle</div><div class="day-info">Day #'+dayNum+' \u00B7 '+melody.name+'</div>';
  app.appendChild(tb);

  // Difficulty tabs
  var tabs=ce('div','diff-tabs');
  ['Easy','Medium','Hard'].forEach(function(d){
    var tab=ce('div','diff-tab'+(state.difficulty===d?' active':''));
    tab.textContent=d+' ('+DIFFICULTIES[d]+'pc)';
    tab.onclick=function(){switchDifficulty(d);};
    tabs.appendChild(tab);
  });
  app.appendChild(tabs);

  // Timer
  var timer=ce('div','timer');
  timer.innerHTML='<span id="timer-display">'+formatTime(state.elapsed)+'</span>';
  app.appendChild(timer);

  // Melody info + play button
  var mi=ce('div','melody-info');
  mi.innerHTML='<div class="name">\uD83C\uDFB5 '+melody.name+'</div><div class="lang">'+melody.lang+' \u00B7 Listen to the full melody first!</div>';
  var playBtn=ce('button','play-melody-btn');
  playBtn.innerHTML='\u25B6 Play Full Melody';
  playBtn.onclick=function(){
    if(state.isPlaying) return;
    state.isPlaying=true; startTimer();
    playBtn.classList.add('playing'); playBtn.innerHTML='\u23F9 Playing...';
    playNotes(melody.notes, melody.bpm, null, function(){
      state.isPlaying=false;
      playBtn.classList.remove('playing'); playBtn.innerHTML='\u25B6 Play Full Melody';
    });
  };
  mi.appendChild(playBtn);
  app.appendChild(mi);

  // Frame
  var cols=state.cols, rows=state.rows;
  var maxW=Math.min(460,window.innerWidth-48);
  var pieceSize=Math.floor((maxW-16-cols*3)/cols);
  pieceSize=Math.max(28,Math.min(pieceSize,56));

  var fw=ce('div','frame-wrap');
  var fl=ce('div','section-label');fl.textContent='Jigsaw Board';
  fw.appendChild(fl);

  var frame=ce('div','jigsaw-frame');
  frame.style.gridTemplateColumns='repeat('+cols+', '+pieceSize+'px)';

  for(var i=0;i<state.pieceCount;i++){
    (function(si){
      var slot=ce('div','frame-slot');
      slot.style.width=pieceSize+'px';slot.style.height=pieceSize+'px';

      if(state.frame[si]!==null){
        slot.classList.add('filled');
        slot.textContent='\uD83C\uDFB5';
        slot.style.fontSize=(pieceSize*0.35)+'px';
        // Undo on click
        slot.onclick=function(){
          if(state.solved||state.isPlaying) return;
          var pid=state.frame[si]; state.frame[si]=null;
          state.pool.push(pid); state.moves++;
          toast('\u21A9 Piece returned'); render();
        };
      } else {
        slot.style.position='relative';
        if(state.showBoardHints && state.edgeMap[si]){
          var svg=createPieceSVG(pieceSize*0.7,state.edgeMap[si],'rgba(67,97,238,0.1)','#bbb');
          svg.style.position='absolute';svg.style.top='50%';svg.style.left='50%';
          svg.style.transform='translate(-50%,-50%)';
          slot.appendChild(svg);
        }
        if(state.selectedPiece!==null) slot.classList.add('awaiting');
        slot.onclick=function(){
          if(state.solved||state.isPlaying) return;
          if(state.selectedPiece!==null) placePiece(si);
        };
        // Drag support
        slot.ondragover=function(e){e.preventDefault();slot.classList.add('awaiting');};
        slot.ondragleave=function(){if(state.selectedPiece===null)slot.classList.remove('awaiting');};
        slot.ondrop=function(e){e.preventDefault();var pid=parseInt(e.dataTransfer.getData('text/plain'));if(!isNaN(pid)){state.selectedPiece=pid;placePiece(si);}};
      }
      slot.dataset.slot=si;
      frame.appendChild(slot);
    })(i);
  }
  fw.appendChild(frame);

  // Board hints toggle
  var hintBtn=ce('button','board-hint-btn');
  hintBtn.textContent=state.showBoardHints?'\uD83E\uDDE9 Board Hints: ON':'\u25A2 Board Hints: OFF';
  hintBtn.onclick=function(){state.showBoardHints=!state.showBoardHints;render();};
  fw.appendChild(hintBtn);
  app.appendChild(fw);

  // Piece Pool
  if(state.pool.length>0&&!state.solved){
    var pl=ce('div','pool-label'+(state.selectedPiece!==null?' active':''));
    pl.textContent=state.selectedPiece!==null?'\u261D Tap a slot above to place':'Tap a piece to hear & select';
    app.appendChild(pl);

    var pool=ce('div','piece-pool');
    state.pool.forEach(function(pid){
      var pc=ce('div','piece');
      if(state.selectedPiece===pid) pc.classList.add('selected');
      pc.textContent='\uD83C\uDFB5';
      pc.draggable=true;
      pc.ondragstart=function(e){e.dataTransfer.setData('text/plain',pid.toString());state.selectedPiece=pid;};
      pc.onclick=function(e){
        e.stopPropagation();
        if(state.isPlaying) return;
        if(state.selectedPiece===pid){state.selectedPiece=null;render();}
        else{state.selectedPiece=pid;render();playPieceAudio(pid);}
      };
      pool.appendChild(pc);
    });
    app.appendChild(pool);
  }

  // Result
  if(state.solved){
    var rd=ce('div','result win');
    rd.innerHTML='\u2705 Melody Complete!';
    app.appendChild(rd);
    var stats=ce('div','stats');
    stats.innerHTML='<span>\u23F1 '+formatTime(state.elapsed)+'</span><span>\uD83D\uDD00 '+state.moves+' moves</span>';
    app.appendChild(stats);

    // Share button
    var shareBtn=ce('button','share-btn');
    shareBtn.textContent='\uD83D\uDCE4 Share Result';
    shareBtn.onclick=function(){shareResult();};
    app.appendChild(shareBtn);

    // Play again
    var playFullBtn=ce('button','play-melody-btn');
    playFullBtn.textContent='\u25B6 Play Completed Melody';
    playFullBtn.style.marginTop='12px';
    playFullBtn.onclick=function(){playFullMelody();};
    app.appendChild(playFullBtn);
  }

  // Instructions
  var ins=ce('div','instructions');
  ins.textContent='Listen to the melody, then arrange pieces in order. Tap piece \u2192 tap slot. Tap filled slot to undo.';
  app.appendChild(ins);

  if(!document.getElementById('toast-el')){var t=ce('div','toast');t.id='toast-el';document.body.appendChild(t);}
}

function toast(msg){var el=document.getElementById('toast-el');if(!el)return;el.textContent=msg;el.classList.add('show');setTimeout(function(){el.classList.remove('show');},2000);}

function playPieceAudio(pid){
  if(state.isPlaying) return;
  var piece=state.pieces[pid];
  if(!piece||!piece.notes.length) return;
  state.isPlaying=true; startTimer();
  playNotes(piece.notes, state.melody.bpm, null, function(){state.isPlaying=false;});
}

function placePiece(si){
  if(state.selectedPiece===null) return;
  if(state.frame[si]!==null){toast('Slot filled!');return;}
  state.moves++;startTimer();
  var pid=state.selectedPiece, piece=state.pieces[pid];
  if(piece.correctIndex===si){
    state.frame[si]=pid;
    state.pool=state.pool.filter(function(id){return id!==pid;});
    state.selectedPiece=null;
    if(state.pool.length===0){state.solved=true;stopTimer();}
    render();
    if(state.solved) setTimeout(function(){playFullMelody();},500);
  } else {
    toast('\u274C Wrong slot! Listen again.');
    state.selectedPiece=null; render();
  }
}

function playFullMelody(){
  if(state.isPlaying) return;
  state.isPlaying=true;
  var noteTopiece=[];
  for(var p=0;p<state.pieces.length;p++) for(var n=0;n<state.pieces[p].notes.length;n++) noteTopiece.push(p);
  var slots=document.querySelectorAll('.frame-slot');
  playNotes(state.melody.notes, state.melody.bpm, function(idx){
    var pid=noteTopiece[idx];
    if(pid!==undefined){slots.forEach(function(s){s.classList.remove('highlight');});
      for(var i=0;i<state.frame.length;i++){if(state.frame[i]===pid){if(slots[i])slots[i].classList.add('highlight');break;}}}
  }, function(){state.isPlaying=false;document.querySelectorAll('.frame-slot').forEach(function(s){s.classList.remove('highlight');});});
}

function shareResult(){
  var dayNum=getDayNum();
  var diffEmoji={Easy:'\uD83D\uDFE2',Medium:'\uD83D\uDFE1',Hard:'\uD83D\uDD34'};
  var filled=state.frame.filter(function(f){return f!==null;}).length;
  var grid='';
  for(var i=0;i<state.pieceCount;i++){
    grid+=(state.frame[i]!==null)?'\uD83E\uDDE9':'\u2B1C';
    if((i+1)%state.cols===0&&i<state.pieceCount-1) grid+='\n';
  }
  var text='Auzle.Ausaw Day #'+dayNum+' '+diffEmoji[state.difficulty]+'\n'+state.melody.name+' ('+state.melody.lang+')\n'+formatTime(state.elapsed)+' \u00B7 '+state.moves+' moves\n\n'+grid+'\n\nhttps://auzle.blogspot.com';
  if(navigator.share){navigator.share({text:text}).catch(function(){});}
  else if(navigator.clipboard){navigator.clipboard.writeText(text).then(function(){toast('Copied!');});}
  else{toast('Share not available');}
}

function switchDifficulty(diff){
  stopTimer();
  state.difficulty=diff;
  state.pieceCount=DIFFICULTIES[diff];
  startNewGame();
}

function startNewGame(){
  stopTimer(); // ensure any running timer is cleared
  var melody=getDailyMelody();
  var pc=state.pieceCount;
  var layout=GRID_LAYOUTS[pc]||[Math.ceil(Math.sqrt(pc)),Math.ceil(pc/Math.ceil(Math.sqrt(pc)))];

  state.melody=melody;
  state.pieces=splitMelody(melody.notes,pc);
  state.frame=new Array(pc).fill(null);
  state.pool=shuffle(state.pieces.map(function(p){return p.id;}));
  state.selectedPiece=null;
  state.solved=false;
  state.moves=0;
  state.startTime=0;
  state.elapsed=0;
  state.timerStarted=false;
  state.isPlaying=false;
  state.cols=layout[0];
  state.rows=layout[1];
  state.edgeMap=generateEdgeMap(layout[0],layout[1],pc);
  render();
}

// Config: window.AUSAW_CONFIG can lock difficulty for embeds
// e.g. window.AUSAW_CONFIG = {difficulty: 'Easy'}
var cfg = window.AUSAW_CONFIG || {};
if(cfg.difficulty && DIFFICULTIES[cfg.difficulty]){
  state.difficulty = cfg.difficulty;
  state.pieceCount = DIFFICULTIES[cfg.difficulty];
}
startNewGame();
})();
