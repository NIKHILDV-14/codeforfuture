/* CodeForFuture — WOW JS v3.0  |  Faster · Snappier · More wow */
(function () {
  'use strict';

  /* ══════════════════════════════════════
     1. CURSOR
  ══════════════════════════════════════ */
  var dot  = document.createElement('div'); dot.id  = 'cff-cursor-dot';
  var ring = document.createElement('div'); ring.id = 'cff-cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  var mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });
  (function loopRing() {
    rx += (mx - rx) * 0.14; ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(loopRing);
  })();
  document.querySelectorAll('a,button').forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      dot.style.width = dot.style.height = '14px';
      ring.style.width = ring.style.height = '48px';
      ring.style.borderColor = 'rgba(99,102,241,.85)';
    });
    el.addEventListener('mouseleave', function () {
      dot.style.width = dot.style.height = '8px';
      ring.style.width = ring.style.height = '30px';
      ring.style.borderColor = 'rgba(99,102,241,.55)';
    });
  });

  /* ══════════════════════════════════════
     2. AURORA CANVAS
  ══════════════════════════════════════ */
  var canvas = document.createElement('canvas');
  canvas.id = 'cff-aurora';
  document.body.insertBefore(canvas, document.body.firstChild);
  var ctx = canvas.getContext('2d');
  function resz() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resz(); window.addEventListener('resize', resz, {passive:true});

  var T = 0;
  var orbs = [
    {x:.18, y:.35, r:.38, h:230, s:.00038},
    {x:.82, y:.62, r:.32, h:268, s:.00028},
    {x:.50, y:.82, r:.28, h:190, s:.00048}
  ];
  function drawAurora() {
    T++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    orbs.forEach(function(o) {
      var cx = (o.x + Math.sin(T*o.s*1.4)*.16)*canvas.width;
      var cy = (o.y + Math.cos(T*o.s)*.12)*canvas.height;
      var r  = o.r * Math.max(canvas.width, canvas.height);
      var g  = ctx.createRadialGradient(cx,cy,0,cx,cy,r);
      g.addColorStop(0,   'hsla('+o.h+',80%,58%,.55)');
      g.addColorStop(.45, 'hsla('+o.h+',70%,45%,.16)');
      g.addColorStop(1,   'hsla('+o.h+',60%,35%,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(cx,cy,r,r*.55,T*o.s*.4,0,Math.PI*2);
      ctx.fill();
    });
    requestAnimationFrame(drawAurora);
  }
  drawAurora();

  /* ══════════════════════════════════════
     3. NAVBAR GLASS
  ══════════════════════════════════════ */
  var nav = document.querySelector('header.sticky');
  if (nav) window.addEventListener('scroll', function () {
    nav.classList.toggle('cff-scrolled', window.scrollY > 40);
  }, {passive:true});

  /* ══════════════════════════════════════
     4. HERO PARALLAX
  ══════════════════════════════════════ */
  var hero  = document.querySelector('section.relative.overflow-hidden');
  var bgImg = hero && hero.querySelector('.absolute.inset-0 img');
  if (bgImg && hero) {
    window.addEventListener('scroll', function () {
      var s = window.scrollY;
      if (s < window.innerHeight * 1.4)
        bgImg.style.transform = 'translateY(' + (s * 0.28) + 'px) scale(1.08)';
    }, {passive:true});
    hero.addEventListener('mousemove', function (e) {
      var r  = hero.getBoundingClientRect();
      var dx = ((e.clientX-r.left)/r.width  - .5) * 16;
      var dy = ((e.clientY-r.top) /r.height - .5) * 9;
      bgImg.style.transform = 'translate('+dx+'px,'+dy+'px) scale(1.08)';
    });
    hero.addEventListener('mouseleave', function () {
      bgImg.style.transform = 'translateY(0) scale(1.08)';
    });
  }

  /* ══════════════════════════════════════
     5. PARTICLES
  ══════════════════════════════════════ */
  if (hero) {
    var pc = document.createElement('div'); pc.id = 'cff-particles';
    hero.appendChild(pc);
    var cols = ['rgba(99,102,241,.7)','rgba(59,130,246,.6)','rgba(139,92,246,.55)',
                'rgba(6,182,212,.45)','rgba(255,255,255,.22)'];
    for (var p = 0; p < 32; p++) {
      var dot2 = document.createElement('div');
      dot2.className = 'cff-particle';
      var sz = 1.5 + Math.random() * 4.5;
      dot2.style.cssText = 'width:'+sz+'px;height:'+sz+'px;left:'+(Math.random()*100)+'%;bottom:0;'
        +'background:'+cols[~~(Math.random()*cols.length)]+';'
        +'--dur:'+(7+Math.random()*12)+'s;--delay:-'+(Math.random()*16)+'s';
      pc.appendChild(dot2);
    }
  }

  /* ══════════════════════════════════════
     6. SCROLL REVEAL — faster threshold
  ══════════════════════════════════════ */
  var SELS = [
    'section h1','section h2','section h3',
    'section p.text-center',
    'div.h-full.bg-gray-100','div.h-full.dark\\:bg-zinc-800',
    'div.flex.flex-col.p-3.gap-6',
    'div.rounded-lg.overflow-hidden',
    'div.text-center',
    'div.flex.items-center.justify-center.bg-white',
    '.cff-feature-card'
  ];
  var revEls = [];
  SELS.forEach(function(sel){
    try{document.querySelectorAll(sel).forEach(function(el){
      if(!el.classList.contains('cff-reveal')){el.classList.add('cff-reveal'); revEls.push(el);}
    });}catch(e){}
  });
  document.querySelectorAll('.grid').forEach(function(g){
    var kids = g.children;
    for(var i=0;i<kids.length;i++){
      if(!kids[i].classList.contains('cff-reveal')) continue;
      if(i%3===1) kids[i].classList.add('cff-reveal-delay-1');
      if(i%3===2) kids[i].classList.add('cff-reveal-delay-2');
    }
  });
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){e.target.classList.add('cff-visible');obs.unobserve(e.target);}
    });
  },{threshold:.06, rootMargin:'0px 0px -24px 0px'});
  revEls.forEach(function(el){obs.observe(el);});

  /* ══════════════════════════════════════
     7. STAT COUNTER — eased
  ══════════════════════════════════════ */
  function counter(el, target, suffix) {
    var orig = el.textContent, t0 = performance.now();
    el.classList.add('cff-stat-animated');
    (function tick(now){
      var p = Math.min((now-t0)/1600, 1);
      var e2 = 1-Math.pow(1-p,3);
      var v = Math.floor(e2*target);
      el.textContent = suffix==='+'? v.toLocaleString()+'+' : suffix==='%'? v+'%' : v.toLocaleString();
      if(p<1) requestAnimationFrame(tick); else el.textContent=orig;
    })(t0);
  }
  var sObs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting) return;
      var el=e.target, raw=el.textContent.trim();
      var n=parseFloat(raw.replace(/[^0-9.]/g,''));
      if(n>0){
        counter(el,n,raw.includes('+')? '+':raw.includes('%')? '%':'');
        sObs.unobserve(el);
      }
    });
  },{threshold:.5});
  document.querySelectorAll('.text-5xl.font-semibold').forEach(function(el){sObs.observe(el);});

  /* ══════════════════════════════════════
     8. 3D CARD TILT — snappier
  ══════════════════════════════════════ */
  var tiltSel = [
    'div.h-full.bg-gray-100.rounded',
    'div.rounded-lg.overflow-hidden.shadow-md',
    'div.flex.flex-col.p-3.gap-6.rounded-lg',
    '.cff-feature-card'
  ].join(',');
  document.querySelectorAll(tiltSel).forEach(function(card){
    card.addEventListener('mousemove', function(e){
      var r=card.getBoundingClientRect();
      var x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      card.style.transition='transform .06s ease,box-shadow .06s ease';
      card.style.transform='translateY(-8px) rotateY('+(x*9)+'deg) rotateX('+(-y*9)+'deg) scale(1.02)';
      card.style.boxShadow=(x*14)+'px '+(y*14)+'px 40px rgba(99,102,241,.2),0 20px 50px rgba(0,0,0,.35)';
    });
    card.addEventListener('mouseleave', function(){
      card.style.transition='transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s ease';
      card.style.transform=''; card.style.boxShadow='';
    });
  });

  /* ══════════════════════════════════════
     9. LOGO CARDS — class + stagger
  ══════════════════════════════════════ */
  document.querySelectorAll('div.flex.items-center.justify-center.bg-white, div.flex.items-center.justify-center.dark\\:bg-zinc-800').forEach(function(el){
    el.classList.add('cff-logo-card');
  });

  var logoObs = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(!entry.isIntersecting) return;
      var kids = entry.target.querySelectorAll('.cff-logo-card');
      kids.forEach(function(el,i){
        setTimeout(function(){
          el.style.animation='logoIn .4s cubic-bezier(.34,1.56,.64,1) both';
        }, i*50);
      });
      logoObs.unobserve(entry.target);
    });
  },{threshold:.15});

  /* Inject logo animation */
  var ls=document.createElement('style'); ls.id='cff-logo-style';
  ls.textContent='@keyframes logoIn{from{opacity:0;transform:scale(.7) translateY(16px)}to{opacity:1;transform:none}}';
  document.head.appendChild(ls);

  var logoGrid = document.querySelector('.grid.grid-cols-2');
  if(logoGrid) logoObs.observe(logoGrid.parentElement || logoGrid);

  /* ══════════════════════════════════════
     10. RIPPLE on buttons
  ══════════════════════════════════════ */
  var rs=document.createElement('style'); rs.id='cff-rip';
  rs.textContent='@keyframes rip{to{transform:scale(3.5);opacity:0}}';
  document.head.appendChild(rs);
  document.querySelectorAll('button').forEach(function(btn){
    btn.addEventListener('click',function(e){
      var r=btn.getBoundingClientRect(), sz=Math.max(r.width,r.height);
      var rip=document.createElement('span');
      rip.style.cssText='position:absolute;width:'+sz+'px;height:'+sz+'px;left:'+(e.clientX-r.left-sz/2)+'px;top:'+(e.clientY-r.top-sz/2)+'px;background:rgba(255,255,255,.3);border-radius:50%;transform:scale(0);animation:rip .5s ease;pointer-events:none';
      btn.style.position='relative'; btn.style.overflow='hidden';
      btn.appendChild(rip);
      rip.addEventListener('animationend',function(){rip.remove();});
    });
  });

  /* ══════════════════════════════════════
     11. TYPING EFFECT
  ══════════════════════════════════════ */
  var typEl = document.getElementById('typing-text');
  if(typEl && !typEl.textContent.trim()){
    var phrases = ['Master DSA & Algorithms','Crack Tech Interviews','Land Your Dream Job','Build Real-World Projects','Learn from the Best'];
    var pi=0,ci=0,del=false;
    function typer(){
      var ph=phrases[pi];
      if(!del){typEl.textContent=ph.slice(0,++ci); if(ci===ph.length){del=true;return setTimeout(typer,1600);}}
      else{typEl.textContent=ph.slice(0,--ci); if(ci===0){del=false;pi=(pi+1)%phrases.length;return setTimeout(typer,350);}}
      setTimeout(typer,del?40:75);
    }
    typer();
  }

  /* ══════════════════════════════════════
     12. SECTION PARALLAX (mid-page)
  ══════════════════════════════════════ */
  var secList = Array.prototype.slice.call(document.querySelectorAll('section')).slice(1);
  window.addEventListener('scroll', function(){
    var sy = window.scrollY;
    secList.forEach(function(sec){
      var bg = sec.querySelector('.absolute');
      if(!bg) return;
      var r = sec.getBoundingClientRect();
      var c = r.top + r.height/2 - window.innerHeight/2;
      bg.style.transform = 'translateY('+(c*.05)+'px)';
    });
  },{passive:true});

  /* ══════════════════════════════════════
     13. ACTIVE NAV
  ══════════════════════════════════════ */
  var path = window.location.pathname;
  document.querySelectorAll('header ul li a').forEach(function(a){
    if(a.getAttribute('href')===path){a.style.color='#a5b4fc';a.style.fontWeight='600';}
  });

})();
