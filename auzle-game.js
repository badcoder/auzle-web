(function(){
'use strict';
var cfg=window.AUZLE_CONFIG||{};
var DIFF_KEY=cfg.difficulty||'EASY';
var WORD_LEN=cfg.wordLen||3;
var OPT_COUNT=cfg.optCount||3;
var LABEL=cfg.label||'Easy';
var BADGE_COLOR=cfg.color||'#2ecc71';

// Seeded Random
function SR(s){this.s=s|0;if(!this.s)this.s=1}
SR.prototype.next=function(){this.s^=this.s<<13;this.s^=this.s>>17;this.s^=this.s<<5;return(this.s>>>0)/4294967296};
SR.prototype.nextInt=function(m){return Math.floor(this.next()*m)};
SR.prototype.shuffle=function(a){a=[].concat(a);for(var i=a.length-1;i>0;i--){var j=this.nextInt(i+1);var t=a[i];a[i]=a[j];a[j]=t}return a};
function dSeed(s){var h=0;for(var i=0;i<s.length;i++)h=((h<<5)-h+s.charCodeAt(i))|0;return h}

// Words
var W3=["ACE","ACT","ADD","AGE","AID","AIM","AIR","ALE","AND","ANT","APE","ARC","ARK","ARM","ART","ATE","AWE","AXE","BAD","BAG","BAN","BAR","BAT","BED","BET","BIG","BIN","BIT","BOW","BOX","BUD","BUG","BUN","BUS","BUT","BUY","CAB","CAN","CAP","CAR","CAT","COB","COD","COG","COP","COT","COW","CRY","CUB","CUD","CUP","CUR","CUT","DAB","DAD","DAM","DEN","DEW","DID","DIG","DIM","DIP","DOC","DOG","DOT","DRY","DUB","DUG","DUO","DYE","EAR","EAT","EEL","EGG","ELF","ELK","ELM","EMU","END","ERA","EVE","EWE","EYE","FAN","FAR","FAT","FAX","FED","FEW","FIG","FIN","FIT","FIX","FLY","FOB","FOG","FOP","FOR","FOX","FRY","FUN","FUR","GAB","GAG","GAP","GAS","GEM","GET","GIG","GIN","GNU","GOB","GOD","GOT","GUM","GUN","GUT","GUY","GYM","HAD","HAM","HAS","HAT","HAY","HEN","HER","HEW","HID","HIM","HIP","HIT","HOB","HOG","HOP","HOT","HOW","HUB","HUE","HUG","HUM","HUT","ICE","ICY","ILL","IMP","INK","INN","ION","IRE","IRK","IVY","JAB","JAG","JAM","JAR","JAW","JAY","JET","JIG","JOB","JOG","JOT","JOY","JUG","JUT","KEG","KEN","KEY","KID","KIN","KIT","LAB","LAD","LAG","LAP","LAW","LAY","LED","LEG","LET","LID","LIP","LIT","LOG","LOT","LOW","LUG","MAD","MAN","MAP","MAR","MAT","MAW","MEN","MET","MIX","MOB","MOM","MOP","MOW","MUD","MUG","MUM","NAB","NAG","NAP","NET","NEW","NIL","NIT","NOD","NOR","NOT","NOW","NUB","NUN","NUT","OAK","OAR","OAT","ODD","ODE","OFT","OIL","OLD","ONE","OPT","ORB","ORE","OUR","OUT","OWE","OWL","OWN","PAD","PAN","PAT","PAW","PEA","PEG","PEN","PET","PEW","PIE","PIG","PIN","PIT","PLY","POD","POP","POT","PRY","PUB","PUG","PUN","PUP","PUS","PUT","RAG","RAM","RAN","RAP","RAT","RAW","RAY","RED","RIB","RID","RIG","RIM","RIP","ROB","ROD","ROT","ROW","RUB","RUG","RUM","RUN","RUT","SAC","SAD","SAG","SAP","SAT","SAW","SAY","SET","SIN","SIP","SIR","SIS","SIT","SIX","SKI","SKY","SLY","SOB","SOD","SON","SOP","SOT","SOW","SOY","SPA","SPY","STY","SUB","SUM","SUN","SUP","TAB","TAD","TAG","TAN","TAP","TAR","TAT","TAX","TEN","THE","TIN","TIP","TOE","TON","TOO","TOP","TOT","TOW","TOY","TUB","TUG","URN","USE","VAN","VAT","VET","VIA","VIE","VOW","WAD","WAG","WAR","WAX","WAY","WEB","WED","WET","WHO","WIG","WIN","WIT","WOE","WOK","WON","WOO","WOW","YAK","YAM","YAP","YAW","YEN","YES","YET","YEW","YIP","ZAP","ZEN","ZIP","ZIT","ZOO"];
var W4=["ABLE","ACHE","ACID","AGED","AIDE","ARCH","AREA","ARMY","BACK","BAIT","BAKE","BALD","BALE","BAND","BANK","BARN","BASE","BATH","BEAD","BEAM","BEAN","BEAR","BEAT","BELL","BELT","BEND","BEST","BIKE","BIND","BIRD","BITE","BLOW","BLUE","BLUR","BOAT","BOLD","BOLT","BOMB","BOND","BONE","BOOK","BOOT","BORE","BORN","BOWL","BULK","BUMP","BURN","BUSH","BUSY","BUZZ","CAFE","CAGE","CAKE","CALF","CALM","CAME","CAMP","CAPE","CARD","CARE","CART","CASE","CASH","CAST","CAVE","CHIP","CHOP","CITY","CLAD","CLAM","CLAP","CLAY","CLIP","CLUB","CLUE","COAT","CODE","COIL","COIN","COLD","COLT","COMB","COME","CONE","COOK","COOL","COPE","CORD","CORE","CORK","CORN","COST","COZY","CRAB","CREW","CROP","CROW","CUBE","CULT","CURB","CURE","CURL","DALE","DAMP","DARE","DARK","DART","DASH","DAWN","DEAL","DEAR","DECK","DEEP","DEER","DEFT","DEMO","DENT","DESK","DIAL","DICE","DIET","DIME","DIRE","DIRT","DISC","DISH","DOCK","DOME","DONE","DOOR","DOSE","DOVE","DOWN","DRAG","DRAW","DRIP","DROP","DRUM","DUAL","DUCK","DUEL","DUKE","DULL","DUMB","DUMP","DUNE","DUSK","DUST","DUTY","EACH","EARN","EASE","EAST","EASY","ECHO","EDGE","EDIT","ELSE","EMIT","EPIC","EVEN","EVER","EVIL","EXAM","EXIT","FACE","FACT","FADE","FAIL","FAIR","FAKE","FALL","FAME","FANG","FARE","FARM","FAST","FATE","FAWN","FEAR","FEAT","FEED","FEEL","FELT","FERN","FEST","FEUD","FILE","FILL","FILM","FIND","FINE","FIRE","FIRM","FISH","FIST","FLAG","FLAT","FLAW","FLED","FLIP","FLOG","FLOW","FOAM","FOIL","FOLD","FOLK","FOND","FOOD","FOOL","FOOT","FORD","FORE","FORK","FORM","FORT","FOUL","FOUR","FREE","FROG","FROM","FUEL","FULL","FUND","FUSE","FURY","GAIN","GALE","GAME","GANG","GAPE","GARB","GATE","GAVE","GAZE","GEAR","GIFT","GILD","GILT","GLAD","GLOW","GLUE","GOAT","GOLD","GOLF","GONE","GOOD","GRAB","GRAY","GRID","GRIM","GRIN","GRIP","GRIT","GROW","GULF","GUST","HACK","HAIL","HAIR","HALE","HALF","HALL","HALT","HAND","HANG","HARD","HARE","HARM","HARP","HATE","HAUL","HAVE","HAWK","HAZE","HEAD","HEAL","HEAP","HEAR","HEAT","HELD","HELP","HERB","HERD","HERE","HERO","HIDE","HIGH","HIKE","HILL","HINT","HIRE","HOLD","HOLE","HOME","HOOD","HOOK","HOPE","HORN","HOST","HOUR","HOWL","HUGE","HULL","HUNG","HUNT","HURT","ICON","IDEA","IDLE","INCH","INTO","IRON","ITEM","JACK","JADE","JAIL","JAMB","JAZZ","JEST","JOBS","JOIN","JOKE","JOLT","JUMP","JUNE","JURY","JUST","KEEN","KEEP","KELP","KEPT","KICK","KILL","KIND","KING","KITE","KNIT","KNOB","KNOT","KNOW","LACE","LACK","LAID","LAKE","LAMB","LAME","LAMP","LAND","LANE","LARD","LARK","LAST","LATE","LAWN","LAZY","LEAD","LEAF","LEAN","LEAP","LEFT","LEND","LENS","LENT","LESS","LIFT","LIKE","LIMB","LIME","LIMP","LINE","LINK","LION","LIST","LIVE","LOAD","LOAF","LOAN","LOCK","LOFT","LOGO","LONE","LONG","LOOK","LORD","LORE","LOSE","LOSS","LOST","LOUD","LOVE","LUCK","LUMP","LUNG","LURE","LURK","MACE","MADE","MAIL","MAIN","MAKE","MALE","MALT","MANE","MANY","MARE","MARK","MASK","MASS","MAST","MATE","MAZE","MEAL","MEAN","MEAT","MEET","MELT","MENU","MESH","MILD","MILE","MILK","MILL","MIME","MIND","MINE","MINT","MISS","MIST","MOAN","MOAT","MOCK","MODE","MOLD","MOLE","MONK","MOOD","MOON","MOOR","MOPE","MORE","MOSS","MOST","MOTH","MOVE","MUCH","MULE","MUSE","MUST","MUTE","NAIL","NAME","NAVY","NEAR","NEAT","NECK","NEED","NEST","NEWS","NEXT","NICE","NINE","NODE","NONE","NOON","NORM","NOSE","NOTE","NOUN","OATH","OBEY","ODDS","OGRE","OILY","ONCE","ONLY","ONTO","OPEN","ORAL","ORCA","OVEN","OVER","OXEN","PACE","PACK","PAGE","PAID","PAIL","PAIN","PAIR","PALE","PALM","PANE","PARK","PART","PASS","PAST","PATH","PAVE","PEAK","PEAR","PEEL","PEER","PELT","PEST","PICK","PIER","PIKE","PILE","PINE","PIPE","PLAN","PLAY","PLEA","PLOT","PLOW","PLUG","PLUM","PLUS","POEM","POET","POKE","POLE","POLL","POLO","POND","POOL","POOR","PORK","PORT","POSE","POST","POUR","PREY","PROP","PULL","PULP","PUMP","PURE","PUSH","RACE","RACK","RAFT","RAGE","RAID","RAIL","RAIN","RAKE","RAMP","RANG","RANK","RARE","RASH","RATE","RAVE","READ","REAL","REAR","REED","REEF","REEL","RELY","RENT","REST","RICE","RICH","RIDE","RIFT","RING","RIOT","RISE","RISK","ROAD","ROAM","ROAR","ROBE","ROCK","RODE","ROLE","ROLL","ROOF","ROOM","ROOT","ROPE","ROSE","RUDE","RUIN","RULE","RUNG","RUSH","RUST","SACK","SAFE","SAGE","SAID","SAIL","SAKE","SALE","SALT","SAME","SAND","SANE","SANG","SAVE","SEAL","SEAM","SEAT","SEED","SEEK","SELF","SELL","SEND","SHED","SHIP","SHOP","SHOT","SHOW","SHUT","SICK","SIDE","SIFT","SIGH","SIGN","SILK","SILL","SING","SINK","SITE","SIZE","SKIN","SKIP","SLAB","SLAM","SLAP","SLAT","SLED","SLID","SLIM","SLIP","SLIT","SLOT","SLOW","SLUG","SNAP","SNIP","SNOW","SOAK","SOAP","SOAR","SOCK","SOFT","SOIL","SOLD","SOLE","SOME","SONG","SOON","SORT","SOUL","SOUR","SPAN","SPAR","SPIN","SPIT","SPOT","STAR","STAY","STEM","STEP","STEW","STIR","STOP","STUB","STUD","STUN","SUIT","SULK","SUNG","SUNK","SURE","SURF","SWAP","SWIM","TACK","TAIL","TAKE","TALE","TALK","TALL","TAME","TANK","TAPE","TARP","TASK","TEAM","TEAR","TEND","TENT","TERM","TEST","TEXT","THAN","THAT","THEM","THEN","THEY","THIN","THIS","TIDE","TIDY","TIED","TIER","TILE","TILL","TILT","TIME","TINY","TIRE","TOAD","TOIL","TOLD","TOLL","TOMB","TONE","TOOK","TOOL","TOPS","TORE","TORN","TOUR","TOWN","TRAP","TRAY","TREE","TREK","TRIM","TRIO","TRIP","TROT","TRUE","TUBE","TUCK","TUNA","TUNE","TURF","TURN","TWIN","TYPE","UGLY","UNDO","UNIT","UNTO","UPON","URGE","USED","VAIN","VALE","VANE","VARY","VASE","VAST","VEIL","VEIN","VENT","VERB","VERY","VEST","VETO","VIEW","VINE","VOID","VOLT","VOTE","WADE","WAGE","WAIL","WAIT","WAKE","WALK","WALL","WAND","WANT","WARD","WARM","WARN","WARP","WART","WASH","WASP","WAVE","WAVY","WAXY","WEAK","WEAN","WEAR","WEED","WEEK","WELD","WELL","WENT","WERE","WEST","WHAT","WHEN","WHIP","WICK","WIDE","WIFE","WILD","WILL","WILT","WIND","WINE","WING","WINK","WIPE","WIRE","WISE","WISH","WITH","WOKE","WOLF","WOOD","WOOL","WORD","WORE","WORK","WORM","WORN","WRAP","YARD","YARN","YEAR","YELL","YOUR","ZEAL","ZERO","ZINC","ZONE","ZOOM"];
var W5=["ABOUT","ABOVE","ADAPT","ADMIT","ADOPT","AGENT","ALARM","ALIGN","ALIVE","ALLOW","ALONE","ALTER","AMONG","ANGEL","ANGLE","ANGRY","APART","APPLE","ARENA","ARISE","ARMOR","ASIDE","AVOID","AWAKE","AWARD","BADGE","BAKER","BASIC","BASIN","BATCH","BEACH","BEARD","BEAST","BEGIN","BEING","BELOW","BENCH","BIRTH","BLACK","BLADE","BLAME","BLAND","BLANK","BLAST","BLAZE","BLEED","BLEND","BLESS","BLIND","BLISS","BLOCK","BLOOM","BLOWN","BOARD","BOAST","BONUS","BOUND","BRAIN","BRAND","BRAVE","BREAD","BREAK","BRICK","BRIEF","BRING","BROAD","BROKE","BRUSH","BUILD","BURNT","BURST","CABIN","CANDY","CARRY","CATCH","CAUSE","CHAIN","CHAIR","CHALK","CHARM","CHASE","CHEAP","CHEER","CHESS","CHEST","CHIEF","CHILD","CHINA","CHOSE","CIVIL","CLAIM","CLASH","CLASS","CLEAN","CLEAR","CLERK","CLIMB","CLING","CLOCK","CLONE","CLOSE","CLOTH","CLOUD","COACH","COAST","COLOR","COMET","CORAL","COUCH","COUNT","COURT","COVER","CRAFT","CRANE","CRASH","CRAWL","CRAZY","CREAM","CREST","CRIME","CRISP","CROSS","CROWD","CROWN","CRUDE","CRUSH","CURVE","CYCLE","DAILY","DANCE","DEALT","DECAY","DELAY","DELTA","DENSE","DEPTH","DEVIL","DIARY","DIRTY","DOUBT","DOUGH","DRAFT","DRAIN","DRAKE","DRANK","DRAWN","DREAM","DRESS","DRIED","DRIFT","DRILL","DRINK","DRIVE","DROWN","DRUMS","DRUNK","DYING","EAGER","EARTH","EIGHT","ELDER","ELECT","ELITE","EMPTY","ENEMY","ENJOY","ENTER","EQUAL","ERROR","EVENT","EVERY","EXACT","EXIST","EXTRA","FAINT","FAITH","FALSE","FANCY","FATAL","FEAST","FENCE","FETCH","FEVER","FIBER","FIELD","FIFTY","FIGHT","FINAL","FIRST","FIXED","FLAME","FLASH","FLEET","FLESH","FLOAT","FLOCK","FLOOD","FLOOR","FLORA","FLUID","FLUSH","FLUTE","FOCUS","FORCE","FORGE","FORTH","FOUND","FRAME","FRANK","FRAUD","FRESH","FRONT","FROST","FRUIT","FULLY","GAUGE","GHOST","GIANT","GIVEN","GLAND","GLASS","GLEAM","GLIDE","GLOBE","GLOOM","GLORY","GLOVE","GRACE","GRADE","GRAIN","GRAND","GRANT","GRAPH","GRASP","GRASS","GRAVE","GREAT","GREEN","GREET","GRIEF","GRIND","GROSS","GROUP","GROVE","GROWN","GUARD","GUESS","GUEST","GUIDE","GUILT","HORSE","HOTEL","HOUSE","HUMAN","HUMOR","IMAGE","INDEX","INNER","INPUT","ISSUE","JOINT","JUDGE","JUICE","KNIFE","KNOCK","LABEL","LARGE","LASER","LATER","LAUGH","LAYER","LEARN","LEASE","LEAVE","LEGAL","LEVEL","LIGHT","LIMIT","LINEN","LIVER","LOCAL","LODGE","LOGIC","LOOSE","LOVER","LOWER","LUCKY","LUNAR","LUNCH","MAGIC","MAJOR","MAKER","MANOR","MARCH","MATCH","MAYOR","MEANS","MEDAL","MEDIA","MERCY","MERIT","METAL","METER","MIGHT","MINOR","MINUS","MOIST","MODEL","MONTH","MORAL","MOTOR","MOUNT","MOUSE","MOUTH","MOVIE","MUSIC","NAKED","NERVE","NEVER","NIGHT","NOBLE","NOISE","NORTH","NOTED","NOVEL","OCEAN","OFFER","OFTEN","OLIVE","ONSET","OPERA","ORDER","ORGAN","OTHER","OUTER","OWNER","PANEL","PANIC","PAPER","PATCH","PAUSE","PEACE","PEACH","PEARL","PHASE","PHOTO","PIANO","PIECE","PILOT","PITCH","PIXEL","PLACE","PLAIN","PLANE","PLANT","PLATE","PLAZA","PLEAD","PLUMB","PLUME","POINT","POLAR","POUND","POWER","PRESS","PRICE","PRIDE","PRIME","PRINT","PRIOR","PRIZE","PROBE","PROOF","PROUD","PROVE","PULSE","PUNCH","PUPIL","PURSE","QUEEN","QUEST","QUICK","QUIET","QUOTE","RADAR","RADIO","RAISE","RANGE","RAPID","RATIO","REACH","REACT","REALM","REBEL","REIGN","RELAX","REPLY","RIDER","RIDGE","RIGHT","RIGID","RISKY","RIVER","ROBIN","ROBOT","ROCKY","ROMAN","ROUND","ROUTE","ROYAL","RUGBY","RULER","RURAL","SAINT","SALAD","SCALE","SCARE","SCENE","SCOPE","SCORE","SCOUT","SCREW","SENSE","SERVE","SETUP","SEVEN","SHADE","SHAKE","SHALL","SHAME","SHAPE","SHARE","SHARK","SHARP","SHEAR","SHEEP","SHEER","SHEET","SHELF","SHELL","SHIFT","SHINE","SHIRT","SHOCK","SHOOT","SHORE","SHORT","SHOUT","SIGHT","SILLY","SINCE","SKILL","SKULL","SLAVE","SLEEP","SLICE","SLIDE","SLOPE","SMALL","SMART","SMELL","SMILE","SMITH","SMOKE","SNAKE","SOLID","SOLVE","SOUND","SOUTH","SPACE","SPARE","SPARK","SPEAK","SPEED","SPELL","SPEND","SPICE","SPLIT","SPOKE","SPORT","SPRAY","SQUAD","STACK","STAFF","STAGE","STAIN","STAIR","STAKE","STALE","STALL","STAMP","STAND","STARE","START","STATE","STAVE","STAYS","STEAL","STEAM","STEEL","STEEP","STEER","STERN","STICK","STILL","STOCK","STONE","STOOD","STORM","STORY","STOVE","STRAP","STRAW","STRIP","STUCK","STUDY","STUFF","STYLE","SUGAR","SUPER","SURGE","SWAMP","SWEAR","SWEEP","SWEET","SWEPT","SWIFT","SWING","SWORD","TABLE","TASTE","TEACH","TEMPO","THICK","THING","THINK","THORN","THOSE","THREE","THREW","THROW","THUMB","TIGER","TIGHT","TIMER","TIRED","TITLE","TODAY","TOKEN","TOTAL","TOUCH","TOUGH","TOWER","TOXIC","TRACE","TRACK","TRADE","TRAIL","TRAIN","TRAIT","TRASH","TREAT","TREND","TRIAL","TRIBE","TRICK","TRIED","TROOP","TRUCK","TRULY","TRUNK","TRUST","TRUTH","TUMOR","TWICE","ULTRA","UNCLE","UNDER","UNION","UNITE","UNITY","UNTIL","UPPER","UPSET","URBAN","USAGE","USUAL","UTTER","VALID","VALUE","VAULT","VERSE","VIDEO","VIGOR","VIRUS","VISIT","VITAL","VIVID","VOCAL","VOICE","WASTE","WATCH","WATER","WHEAT","WHEEL","WHERE","WHICH","WHILE","WHITE","WHOLE","WHOSE","WIDER","WOMAN","WORLD","WORTH","WOULD","WOUND","WRITE","WRONG","WROTE","YACHT","YOUNG","YOUTH"];
function gW(l){return l===3?W3:l===4?W4:W5}

// Patterns
var TT=['LOW','MID','HIGH'],AP=[];
for(var ti=0;ti<TT.length;ti++)for(var tc=1;tc<=3;tc++)AP.push({tone:TT[ti],taps:tc});

// Generate puzzle
function genPuzzle(ds){
  var di=DIFF_KEY==='EASY'?0:DIFF_KEY==='MEDIUM'?1:2;
  var seed=dSeed(ds)*31+di*7,rng=new SR(seed);
  var words=rng.shuffle(gW(WORD_LEN));
  var ex=[],cov={},covArr=[];
  for(var wi=0;wi<words.length&&ex.length<3;wi++){
    var w=words[wi],hasNew=false;
    for(var ci=0;ci<w.length;ci++)if(!cov[w[ci]])hasNew=true;
    if(hasNew||ex.length<2){ex.push(w);for(var ci=0;ci<w.length;ci++){if(!cov[w[ci]])covArr.push(w[ci]);cov[w[ci]]=true;}}
  }
  var rem=words.filter(function(w){if(ex.indexOf(w)>=0)return false;for(var i=0;i<w.length;i++)if(!cov[w[i]])return false;return true;});
  var tgt=rem.length>0?rem[rng.nextInt(rem.length)]:ex[0];
  var opts=[];
  if(OPT_COUNT>0){
    var dist=rng.shuffle(rem.filter(function(w){return w!==tgt})).slice(0,OPT_COUNT-1);
    opts=rng.shuffle(dist.concat([tgt]));
  }
  var sp=rng.shuffle(AP),map={};
  for(var i=0;i<covArr.length;i++)map[covArr[i]]=sp[i%sp.length];
  var epoch=new Date('2026-05-12'),today=new Date(ds);
  var pn=Math.max(Math.floor((today-epoch)/86400000)+1,1);
  return{id:pn,date:ds,mapping:map,examples:ex,target:tgt,options:opts};
}

// Audio
var actx=null;
var FR={LOW:392,MID:784,HIGH:1318.5};
function eA(){if(!actx)actx=new(window.AudioContext||window.webkitAudioContext)();if(actx.state==='suspended')actx.resume();}
function pW(word,map,cb){
  eA();var t=actx.currentTime+0.02;
  for(var i=0;i<word.length;i++){
    var p=map[word[i]];if(!p)continue;
    for(var tap=0;tap<p.taps;tap++){
      var f=FR[p.tone];
      var o1=actx.createOscillator(),o2=actx.createOscillator(),o3=actx.createOscillator();
      o1.frequency.value=f;o2.frequency.value=f*3;o3.frequency.value=f*5.9;
      o1.type=o2.type=o3.type='sine';
      var g1=actx.createGain(),g2=actx.createGain(),g3=actx.createGain(),gm=actx.createGain();
      g1.gain.value=1;g2.gain.value=0.5;g3.gain.value=0.2;
      o1.connect(g1);g1.connect(gm);o2.connect(g2);g2.connect(gm);o3.connect(g3);g3.connect(gm);gm.connect(actx.destination);
      var D=0.20,dk=8/D;
      gm.gain.setValueAtTime(0,t);gm.gain.linearRampToValueAtTime(0.25,t+0.005);
      for(var s=1;s<=20;s++){var st=(s/20)*D;gm.gain.linearRampToValueAtTime(0.25*Math.exp(-dk*st),t+st);}
      gm.gain.linearRampToValueAtTime(0,t+D);
      g2.gain.setValueAtTime(0.5,t);g2.gain.exponentialRampToValueAtTime(0.01,t+D*0.6);
      g3.gain.setValueAtTime(0.2,t);g3.gain.exponentialRampToValueAtTime(0.01,t+D*0.4);
      o1.start(t);o1.stop(t+D);o2.start(t);o2.stop(t+D);o3.start(t);o3.stop(t+D);
      t+=D;if(tap<p.taps-1)t+=0.12;
    }
    if(i<word.length-1)t+=0.28;
  }
  var dur=(t-actx.currentTime)*1000;
  if(cb)setTimeout(cb,dur+50);
}

// Render
var SVG='<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>';
function ce(tag,cls){var e=document.createElement(tag);if(cls)e.className=cls;return e;}

function init(){
  var c=document.getElementById('auzle-game');
  if(!c)return;
  var now=new Date();
  var ds=now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0')+'-'+String(now.getDate()).padStart(2,'0');
  var pz=genPuzzle(ds);
  var attempts=0,solved=false,timerOn=false,timerIv=null,startT=0,curPlay=null;

  c.innerHTML='';

  // Top bar
  var tb=ce('div','top-bar');
  tb.innerHTML='<h1>\u{1F3A7} Auzle \u00B7 Aurdle #'+pz.id+'</h1><div class="tagline">Listen \u00B7 Match \u00B7 Answer</div><div class="diff-badge" style="background:'+BADGE_COLOR+'">'+LABEL+'</div>';
  c.appendChild(tb);

  // Timer
  var tmr=ce('div','timer');tmr.textContent='0:00';c.appendChild(tmr);

  // Examples
  var el2=ce('div','section-label');el2.textContent='Examples';c.appendChild(el2);
  for(var ei=0;ei<pz.examples.length;ei++){(function(w){
    var row=ce('div','example-row');
    var btn=ce('button','play-btn');btn.innerHTML=SVG;btn.onclick=function(){doPlay(w,btn);};
    var lb=ce('span','word-label');lb.textContent=w;
    row.appendChild(btn);row.appendChild(lb);c.appendChild(row);
  })(pz.examples[ei]);}

  // Target
  var ts=ce('div','target-section');
  ts.innerHTML='<div class="target-icon">\u{1F3AF}</div><div class="target-label">Guess this word</div>';
  var tpb=ce('button','target-play');tpb.innerHTML=SVG;tpb.onclick=function(){doPlay(pz.target,tpb);};
  ts.appendChild(tpb);c.appendChild(ts);

  // Type input (always visible)
  var trow=ce('div','type-input-row');
  var inp=ce('input','type-input');inp.type='text';inp.maxLength=WORD_LEN+2;inp.placeholder=WORD_LEN+' letters...';inp.autocomplete='off';inp.spellcheck=false;
  var sub=ce('button','submit-btn');sub.textContent='Submit';
  sub.onclick=function(){checkTyped(inp);};
  inp.onkeydown=function(e){if(e.key==='Enter')checkTyped(inp);};
  trow.appendChild(inp);trow.appendChild(sub);c.appendChild(trow);

  // Choices behind button
  var ad=ce('div');ad.style.display='none';
  var hb=ce('button','hint-btn');
  if(pz.options.length>0){
    var opts=ce('div','options');
    for(var oi=0;oi<pz.options.length;oi++){(function(opt){
      var btn=ce('button','option-btn');btn.textContent=opt;
      btn.onclick=function(){selAnswer(opt,btn,opts);};
      opts.appendChild(btn);
    })(pz.options[oi]);}
    ad.appendChild(opts);
    c.appendChild(ad);
    hb.textContent='\u{1F4A1} Show Choices';
    hb.onclick=function(){
      if(!timerOn){toast('Play a sound first!');return;}
      var el=(Date.now()-startT)/1000;
      if(el<15){toast('Wait '+Math.ceil(15-el)+'s');return;}
      ad.style.display='block';hb.style.display='none';trow.style.display='none';
    };
    c.appendChild(hb);
  }

  // Result
  var rd=ce('div','result');c.appendChild(rd);

  // Instructions
  var ins=ce('div','instructions');
  ins.textContent='Listen to example patterns. Compare with target. Type or pick the matching word.';
  c.appendChild(ins);

  // Toast
  var toastEl=ce('div','toast');c.appendChild(toastEl);

  function startTimer(){if(timerOn)return;timerOn=true;startT=Date.now();
    timerIv=setInterval(function(){if(solved)return;var s=Math.floor((Date.now()-startT)/1000);
    tmr.textContent=Math.floor(s/60)+':'+String(s%60).padStart(2,'0');},500);}

  var isPlaying=false;
  function setPlayBtnsDisabled(d){var bs=c.querySelectorAll('.play-btn,.target-play');for(var i=0;i<bs.length;i++){bs[i].disabled=d;bs[i].style.opacity=d?'0.5':'1';}}
  function doPlay(w,btn){if(isPlaying)return;isPlaying=true;startTimer();if(curPlay)curPlay.classList.remove('playing');
    btn.classList.add('playing');curPlay=btn;setPlayBtnsDisabled(true);
    pW(w,pz.mapping,function(){btn.classList.remove('playing');if(curPlay===btn)curPlay=null;isPlaying=false;setPlayBtnsDisabled(false);});}

  function onWin(elapsed){solved=true;clearInterval(timerIv);
    rd.className='result correct';
    rd.innerHTML='\u2705 Correct!<div class="stats"><span>\u23F1 '+Math.floor(elapsed/60)+':'+String(elapsed%60).padStart(2,'0')+'</span><span>\u{1F501} '+attempts+'</span></div>';
    var sb=ce('button','share-btn');sb.textContent='\u{1F4CB} Share Result';
    sb.onclick=function(){
      var txt='\u{1F3A7} Auzle \u00B7 Aurdle #'+pz.id+'\nListen \u00B7 Match \u00B7 Answer\n\n'+LABEL+' \u00B7 \u23F1 '+Math.floor(elapsed/60)+':'+String(elapsed%60).padStart(2,'0')+' \u00B7 \u{1F501} '+attempts+'\n\nCan you decode the sound patterns?\nhttps://auzle.blogspot.com/\n#Auzle #Aurdle';
      navigator.clipboard.writeText(txt).then(function(){toast('Copied!');}).catch(function(){toast('Copy failed');});
    };
    rd.appendChild(sb);
  }

  function selAnswer(ans,btn,oc){if(solved)return;attempts++;
    if(ans===pz.target){btn.classList.add('correct');oc.querySelectorAll('.option-btn').forEach(function(b){b.disabled=true;});onWin(Math.floor((Date.now()-startT)/1000));}
    else{btn.classList.add('wrong');rd.className='result wrong';rd.textContent='\u274C Try again';
    setTimeout(function(){btn.classList.remove('wrong');rd.textContent='';},1200);}}

  function checkTyped(inp){if(solved)return;var v=inp.value.trim().toUpperCase();if(!v)return;attempts++;
    if(v===pz.target){inp.classList.add('correct');inp.disabled=true;inp.parentElement.querySelector('.submit-btn').disabled=true;onWin(Math.floor((Date.now()-startT)/1000));}
    else{inp.classList.add('wrong');rd.className='result wrong';rd.textContent='\u274C Try again';
    setTimeout(function(){inp.classList.remove('wrong');rd.textContent='';inp.value='';inp.focus();},1200);}}

  function toast(msg){toastEl.textContent=msg;toastEl.classList.add('show');setTimeout(function(){toastEl.classList.remove('show');},2000);}
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
else init();
})();
