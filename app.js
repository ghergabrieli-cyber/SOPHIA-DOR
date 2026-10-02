const state = JSON.parse(localStorage.getItem('sophia-state') || '{}');
state.mode ||= 'Explorer';
state.progress ||= {discover:'EXPLORING', understand:'NOT STARTED', deeper:'NOT STARTED', research:'NOT STARTED'};
state.questions ||= [];
state.collections ||= ['Common octopus'];
state.walk ||= 'MODERATE';
const save=()=>localStorage.setItem('sophia-state',JSON.stringify(state));
const el=(q)=>document.querySelector(q);
const all=(q)=>[...document.querySelectorAll(q)];
const go=id=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'});
const bg=(u)=>`background-image:url('${u}')`;

function render(){
 document.querySelector('#app').innerHTML=`<div class="shell">
  <nav class="nav"><a class="brand" href="#home">SOPHIA D'OR</a><div class="navlinks"><a href="#explore">Explore</a><a href="#octopus">Expeditions</a><a href="#cabinet">Cabinet</a><a href="#field">Field</a><a href="#about">About</a></div><div class="navtools"><button class="iconbtn" id="randomBtn" title="Random Door">↻</button><button class="pill" id="modeBtn">${state.mode}</button><button class="iconbtn" id="askGlobal">?</button></div></nav>
  <header class="hero" id="home">
    <div class="hero-orbit hero-orbit--one"></div><div class="hero-orbit hero-orbit--two"></div>
    <button class="floating-object fo-skull" data-target="explore" aria-label="Natural history specimen"><span>specimen</span></button>
    <button class="floating-object fo-jelly" data-target="octopus" aria-label="Marine life"><span>marine life</span></button>
    <button class="floating-object fo-fossil" data-target="catalogue" aria-label="Fossils"><span>fossils</span></button>
    <button class="floating-object fo-mechanism" data-target="explore" aria-label="Mechanisms"><span>mechanisms</span></button>
    <button class="floating-object fo-botany" data-target="field" aria-label="Botany"><span>botany</span></button>
    <button class="floating-object fo-classical" data-target="explore" aria-label="Human history"><span>human history</span></button>
    <button class="floating-object fo-mineral" data-target="catalogue" aria-label="Minerals"><span>minerals</span></button>
    <div class="earth-disc" aria-hidden="true"></div>
    <div class="hero-content">
      <div class="hero-plaque">
        <div class="kicker">Look closer</div><h1>SOPHIA D'OR</h1>
        <blockquote>“The world doesn't need more hype.<br>It needs a closer look.”</blockquote>
      </div>
      <div class="question">Where would you like to begin?</div>
      <div class="object-row">
        ${[['♘','Nature','octopus'],['⌛','History','explore'],['⚙','Science','explore'],['◉','People','explore'],['⌖','Places','expedition'],['✦','Ideas','explore'],['✺','Random Door','random']].map(x=>`<button class="object" ${x[2]==='random'?'id="randomHero"':`data-target="${x[2]}"`}><span>${x[0]}</span><small>${x[1]}</small></button>`).join('')}
      </div>
    </div><div class="scroll">↓ Scroll to explore</div>
  </header>
  <section class="home-desk">
    <div class="desk-intro"><div class="kicker">Good morning, Gabi.</div><h2>What shall we explore today?</h2></div>
    <div class="desk-grid">
      <button class="desk-card desk-card--wide" data-target="octopus"><div class="desk-photo" style="${bg('https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=1000&q=86')}"></div><div><small>CONTINUE EXPLORING</small><h3>How does an octopus think?</h3><span>UNDERSTAND →</span></div></button>
      <button class="desk-card" data-target="explore"><div class="desk-photo moon" style="${bg('https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?auto=format&fit=crop&w=900&q=84')}"></div><div><small>SOMETHING WORTH NOTICING TODAY</small><h3>The Moon is in a particularly good phase tonight.</h3><span>LEARN MORE →</span></div></button>
      <button class="desk-card"><div><small>ONE QUESTION YOU LEFT BEHIND</small><h3>Can an octopus arm make a decision before the central brain?</h3><span>Your editor queue · saved</span></div></button>
      <button class="desk-card" id="randomDesk"><div class="desk-photo" style="${bg('https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=84')}"></div><div><small>GO SOMEWHERE UNEXPECTED</small><h3>Random Door</h3><span>OPEN →</span></div></button>
      <button class="desk-card" data-target="field"><div class="desk-photo" style="${bg('https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=84')}"></div><div><small>LEAVE THE SCREEN</small><h3>Explore near me</h3><span>30-MINUTE QUEST →</span></div></button>
      <button class="desk-card" data-target="expedition"><div class="desk-photo" style="${bg('https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=84')}"></div><div><small>PLAN AN EXPEDITION</small><h3>Build a route</h3><span>START →</span></div></button>
    </div>
  </section>
  <section class="section" id="explore"><div class="sectionhead"><div><div class="kicker">Explore</div><h2>The world is not divided into disciplines.</h2></div><p>We divided it that way so we could study it. Sophia d'Or reconnects mechanisms, histories, places, organisms and evidence into trails that widen curiosity rather than trap it.</p></div><div class="grid three">
    ${card('Octopus intelligence','Can an arm act partly on its own?','https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=1200&q=85','octopus')}
    ${card('Across the Atlantic','Navigation → astronomy → currents → weather → consequences','https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85','expedition')}
    ${card('The night sky near home','Thirty minutes. No plane ticket required.','https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1200&q=85','field')}
  </div><div style="margin-top:18px;display:flex;gap:10px;flex-wrap:wrap"><button class="goldbtn" id="broadBtn">SHOW ME SOMETHING I DON'T KNOW I CARE ABOUT</button><button class="ghost" id="randomBtn2">RANDOM DOOR — TAKE ME SOMEWHERE</button></div></section>
  <section class="octopus-hero" id="octopus">
    <div class="octopus-copy">
      <div class="breadcrumb">Nature › Marine Life › Cephalopods</div>
      <h2>What is it like to have eight arms that can act partly on their own?</h2>
      <p>A closer look at one of the most extraordinary nervous systems on Earth — without turning it into myth, hype or a human intelligence contest.</p>
      <div class="topic-actions"><button class="goldbtn" id="beginOctopus">BEGIN EXPLORING →</button><span class="readtime">READ · 12 MIN &nbsp;&nbsp; LISTEN · 14 MIN</span></div>
      <div class="levels">${levelButtons()}</div>
      <div class="octopus-chapters">
        <button class="chapter active"><span class="chapter-img" style="${bg('https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=500&q=84')}"></span><small>An extraordinary body</small></button>
        <button class="chapter"><span class="chapter-img" style="${bg('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=500&q=84')}"></span><small>How octopus arms work</small></button>
        <button class="chapter"><span class="chapter-img" style="${bg('https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&w=500&q=84')}"></span><small>Intelligence & behavior</small></button>
        <button class="chapter"><span class="chapter-img" style="${bg('https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&w=500&q=84')}"></span><small>In their world</small></button>
      </div>
    </div>
    <div class="octopus-image">
      <div class="stage-rail"><div class="stage-dot active"></div><span>DISCOVER</span><div class="stage-dot"></div><span>UNDERSTAND</span><div class="stage-dot"></div><span>GO DEEPER</span><div class="stage-dot"></div><span>RESEARCH DESK</span></div>
    </div>
  </section>
  <section class="section tight" id="topic"><div class="topic-layout"><article class="article"><div class="kicker" style="color:#78633a">DISCOVER · READ 12 MIN · LISTEN architecture ready</div><h3 id="idea-neurons">An octopus is not a brain with eight passive limbs.</h3><p>Roughly two-thirds of an octopus's neurons are distributed through its arms rather than concentrated in the central brain. That does not mean each arm is a separate little octopus. It means a great deal of sensing and motor control can be handled locally, while the central brain sets broader goals.</p><div class="evidence"><div class="label">EVIDENCE</div><p>Experiments and anatomical studies show dense neural networks in the arms and highly flexible local control. Researchers can distinguish what is observed from how much autonomy we infer from it.</p></div><h4 id="idea-suckers">Every sucker is part of a sensory world.</h4><p>Octopus suckers can detect chemicals as well as touch. An arm exploring a crevice is not merely obeying a sequence of centrally specified movements; it is continuously sensing and responding.</p><div class="evidence"><div class="label">INTERPRETATION</div><p>Calling an arm “independent” is convenient shorthand, but can overstate the case. A better phrase is <mark>partly decentralized control</mark>: local processing within a coordinated animal.</p></div><h4 id="idea-unknown">What we still don't know</h4><p>Researchers still debate how experience is integrated across this distributed nervous system, and how octopuses coordinate flexible action without a vertebrate-like body map.</p><div class="evidence"><div class="label">UNCERTAINTY</div><p>We have evidence for distributed processing. We do not have direct access to what that organization feels like from the octopus's point of view.</p></div><div class="quiz"><h4>Check what you understood</h4><p style="color:#bbb">This challenge covers DISCOVER + UNDERSTAND, the levels you've explored.</p><div class="answers" id="answers"><button class="answer" data-answer="a">Each arm contains a complete, separate brain.</button><button class="answer" data-answer="b">Arms can perform substantial local sensing and control while remaining coordinated by the central nervous system.</button><button class="answer" data-answer="c">The central brain issues every individual muscle command.</button></div><div id="quizFeedback"></div></div></article><aside class="sidepanel"><h4>Current trail</h4>${progressMarkup()}<hr style="border-color:rgba(255,255,255,.08)"><button class="goldbtn" id="askContext">? ASK ABOUT THIS</button><button class="ghost" id="explainBtn" style="margin-top:10px;width:100%">EXPLAIN DIFFERENTLY</button><p style="font-size:11px;color:#8f897f;line-height:1.5;margin-top:14px">Questions are stored with article, section, passage and level context. Human editor workflow can plug into the same record later.</p></aside></div></section>
  <section class="section" id="modes"><div class="sectionhead"><div><div class="kicker">Modes</div><h2>There are many ways to look at the world.</h2></div><p>This changes how you explore, not what is true.</p></div><div class="grid four">${['Explorer','Inventor','Researcher','Archaeologist'].map((m,i)=>`<button class="modecard ${state.mode===m?'selected':''}" data-mode="${m}"><div class="kicker">${['routes · places','mechanisms · experiments','evidence · specimens','traces · reconstruction'][i]}</div><h3>${m}</h3><p>${['Follow routes. Find places. Go outside.','Take things apart. Find out why they work.','Observe. Compare. Test.','Follow traces. Reconstruct what happened.'][i]}</p></button>`).join('')}</div></section>
  <section class="cabinet" id="cabinet">
    <div class="cabinet-topbar"><div><div class="kicker">Personal research room</div><h2>Your Cabinet</h2></div><div class="cabinet-tabs"><span class="active">Collections</span><span>Questions</span><span>Field Notes</span><span>Expeditions</span><span>Achievements</span></div></div>
    <div class="cabinet-room">
      <div class="cabinet-main cabinet-shelf">
        <div class="shelf-object fossil-object">◒</div><div class="shelf-object jar-object">◫</div><div class="shelf-object shell-object">◉</div>
        <div class="cabinet-plaque"><small>CURRENT TRAIL</small><h3>How does an octopus think?</h3><p>DISCOVER · EXPLORING</p></div>
        <div class="cabinet-question"><small>MY QUESTIONS</small>${state.questions.length?state.questions.slice(-2).map(q=>`<p>“${escapeHTML(q.text)}”</p>`).join(''):'<p>Can an octopus arm decide before the central brain?</p>'}</div>
      </div>
      <button class="cabinet-tile catalogue-door" data-target="catalogue"><div class="tile-illustration globe-illu">◌</div><h3>The Great Catalogue</h3><p>${state.collections.length} discovery unlocked</p></button>
      <button class="cabinet-tile field-door" data-target="field"><div class="tile-illustration notebook-illu">▤</div><h3>Field Notes</h3><p>Observations, dates, places, photographs.</p></button>
      <button class="cabinet-tile expedition-door" data-target="expedition"><div class="tile-illustration compass-illu">✧</div><h3>Expeditions</h3><p>Târgoviște · draft route</p></button>
      <div class="cabinet-tile passport-door"><div class="tile-illustration passport-illu">✺</div><h3>Curiosity Passport</h3><p>Oceans explored · 1<br>Questions investigated · ${state.questions.length}<br><strong>WELCOME BACK.</strong></p></div>
    </div>
  </section>
  <section class="section" id="catalogue"><div class="sectionhead"><div><div class="kicker">Great Catalogue</div><h2>Collect what you actually understand.</h2></div><p>Opening a page is not enough. Catalogue entries unlock from meaningful exploration, checks and mastery.</p></div><div class="grid four">${catalogueCards()}</div></section>
  <section class="expedition" id="expedition">
    <div class="planner"><div class="kicker" style="color:#7d673d">Plan an expedition</div><h2>Turn a place into a question.</h2>
      <div class="fieldrow"><div class="field"><label>Destination</label><input id="destination" value="Târgoviște" /></div><div class="field"><label>Dates</label><input id="dates" value="17–19 October" /></div></div>
      <div class="field"><label>How much walking are we doing?</label><div class="choice-row">${['LIGHT','MODERATE','I HAVE LEGS 😤'].map(x=>`<button class="choice ${state.walk===x?'active':''}" data-walk="${x}">${x}</button>`).join('')}</div></div>
      <div class="field"><label>What sounds interesting?</label><div class="interest-grid">${['History','Nature','Architecture','Engineering','Science','Surprise me'].map((x,i)=>`<button class="choice interest"><span>${['⌛','❧','⌂','⚙','✧','?'][i]}</span>${x}</button>`).join('')}</div></div>
      <button class="goldbtn expedition-build" id="buildRoute">BUILD MY EXPEDITION</button>
      <p class="planner-note">Designed for cities, villages, limited budgets and different mobility levels. Offline preparation can be added to saved expeditions.</p>
    </div>
    <div class="mapmock">
      <div class="map-route-line"></div><span class="map-pin p1">1</span><span class="map-pin p2">2</span><span class="map-pin p3">3</span><span class="map-pin p4">4</span>
      <div class="route-card"><div class="kicker" style="color:#7d673d">Your expedition</div><h3>Târgoviște</h3><small>17–19 October · 6 stops</small><div id="routeStops"><div class="route-stop"><b>1 · The Royal Court</b>How to read the layers of a capital city.</div><div class="route-stop"><b>2 · Chindia Tower</b>Look for clues from different periods.</div><div class="route-stop"><b>3 · Hidden details</b>Small things, big stories.</div></div><button class="route-full">VIEW FULL ROUTE →</button></div>
    </div>
  </section>
  <section class="section" id="field"><div class="sectionhead"><div><div class="kicker">Field mode</div><h2>The world becomes the game board.</h2></div><p>Safe, observational quests that respect museum rules, wildlife, protected places and mobility differences.</p></div><div class="mobile-demo"><div class="phone"><img src="https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=700&q=82"><div class="screen"><div class="kicker">Field Quest 02/06</div><h4>Look above the entrance.</h4><p>One architectural detail was added long after the first building phase. Can you find it?</p><button class="goldbtn">I FOUND SOMETHING</button></div></div><div class="phone"><img src="https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=700&q=82"><div class="screen"><div class="kicker">Your answer</div><h4>What changed?</h4><p>Record what you observed. This is your field note — not automatically verified fact.</p><textarea style="width:100%;min-height:100px;background:#161b1a;border:1px solid #333;color:white;padding:10px" placeholder="My observation..."></textarea></div></div><div class="phone"><img src="https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=700&q=82"><div class="screen"><div class="kicker">Then ↔ Now</div><h4>Now look at this.</h4><p>You found a later intervention. Compare it with the earlier structure and ask what evidence would date the change.</p><button class="ghost">CONTINUE →</button></div></div></div></section>
  <section class="section" id="shop"><div class="sectionhead"><div><div class="kicker">Discovery gift</div><h2>Take this discovery with you.</h2></div><p>Physical rewards attach to the next shop order only after meaningful learning requirements are met — never as paid random rarity.</p></div><div class="grid three"><div class="panel"><h3>Geology Discovery Gift</h3><p>Knowledge requirement ✓<br>Field discoveries ✓<br>Collection requirement ✓</p><button class="goldbtn">UNLOCKED FOR NEXT ORDER</button></div><div class="panel"><h3>Field guide</h3><p>Minerals of Europe · pocket edition.</p><button class="ghost">VIEW OBJECT STORY</button></div><div class="panel"><h3>Specimen set</h3><p>Educational rock collection with source and context cards.</p><button class="ghost">ADD TO CART</button></div></div></section>
  <footer class="footer" id="about"><div>SOPHIA D'OR · LOOK CLOSER.</div><div>Evidence · Interpretation · Uncertainty · Myth</div><div>© 2026 Sophia d'Or</div></footer>
 </div><div id="modalHost"></div><div id="toast" class="toast hidden"></div>`;
 bind();
}
function card(title,copy,img,target){return `<button class="card" data-target="${target}"><div class="card-bg" style="${bg(img)}"></div><div class="cardbody"><h3>${title}</h3><p>${copy}</p></div></button>`}
function levelButtons(){return [['discover','DISCOVER'],['understand','UNDERSTAND'],['deeper','GO DEEPER'],['research','RESEARCH DESK']].map(([k,l],i)=>`<button class="level ${i===0?'active':''}" data-level="${k}">${l}</button>`).join('')}
function progressMarkup(){return Object.entries(state.progress).map(([k,v])=>`<div class="progress-step ${v!=='NOT STARTED'?'done':''}"><span class="dot"></span><span>${k.toUpperCase()} · ${v}</span></div>`).join('')}
function catalogueCards(){const rows=[['Common octopus','Octopus vulgaris','https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=800&q=82',true],['Ammonite','Extinct cephalopod','https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=82',false],['Quartz','SiO₂','https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=82',false],['Lunar chart','Celestial object','https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?auto=format&fit=crop&w=800&q=82',false]];return rows.map(r=>`<div class="catalogue-card"><div class="specimen" style="${bg(r[2])}"></div><h4>${r[0]}</h4><small>${r[1]}</small><p>${r[3]?'Unlocked through Octopus Intelligence.':'Locked · explore and demonstrate understanding.'}</p></div>`).join('')}
function escapeHTML(s){return s.replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function toast(msg){const t=el('#toast');t.textContent=msg;t.classList.remove('hidden');setTimeout(()=>t.classList.add('hidden'),2600)}
function askModal(context='General exploration'){el('#modalHost').innerHTML=`<div class="modalwrap"><div class="modal"><div class="kicker" style="color:#7b673e">? ASK</div><h3>What are you curious about?</h3><p style="font-size:12px;color:#6a655b">Context: ${context}</p><textarea id="questionText" placeholder="Ask the question you don't want to lose..."></textarea><div class="row"><button class="ghost" id="closeModal" style="color:#222">Cancel</button><button class="goldbtn" id="saveQuestion">Save question</button></div></div></div>`;el('#closeModal').onclick=()=>el('#modalHost').innerHTML='';el('#saveQuestion').onclick=()=>{const text=el('#questionText').value.trim();if(!text)return;state.questions.push({text,article:'Octopus Intelligence',section:'Distributed nervous system',level:'DISCOVER',context});save();el('#modalHost').innerHTML='';toast('Question saved to your Cabinet.');render();go('cabinet')}}
function bind(){
 all('[data-target]').forEach(b=>b.onclick=()=>go(b.dataset.target));
 el('#beginOctopus').onclick=()=>{state.progress.discover='EXPLORING';save();go('topic')};
 all('[data-level]').forEach(b=>b.onclick=()=>{all('[data-level]').forEach(x=>x.classList.remove('active'));b.classList.add('active');const key=b.dataset.level;if(key==='understand')state.progress.understand='EXPLORING';if(key==='deeper')state.progress.deeper='EXPLORING';if(key==='research')state.progress.research='EXPLORING';save();toast(`${b.textContent} opened — progress is not completion.`)});
 all('.answer').forEach(b=>b.onclick=()=>{all('.answer').forEach(x=>x.classList.remove('correct','wrong'));const ok=b.dataset.answer==='b';b.classList.add(ok?'correct':'wrong');if(ok){state.progress.discover='CHECKED';state.progress.understand='CHECKED';save();el('#quizFeedback').innerHTML='<p>Good. Local control and central coordination can both be true.</p>';toast('Understanding checked.')}else{el('#quizFeedback').innerHTML='<p>Not quite. The key is distributed processing without pretending each arm is a separate animal.</p><a class="reviewlink" href="#idea-neurons">Review the idea →</a>'}});
 el('#askContext').onclick=()=>askModal('Selected concept: partly decentralized arm control');el('#askGlobal').onclick=()=>askModal('Global ask');
 el('#explainBtn').onclick=()=>{el('#modalHost').innerHTML=`<div class="modalwrap"><div class="modal"><div class="kicker" style="color:#7b673e">Explain differently</div><h3>Think of a jazz ensemble, not a puppet.</h3><p>The central brain is closer to a bandleader setting direction while each arm has enough local processing to respond to what it senses in real time. The analogy is imperfect — but it helps separate coordination from micromanagement.</p><div class="row"><button class="goldbtn" id="closeExplain">Got it</button></div></div></div>`;el('#closeExplain').onclick=()=>el('#modalHost').innerHTML=''};
 all('[data-mode]').forEach(b=>b.onclick=()=>{state.mode=b.dataset.mode;save();render();go('modes');toast(`${state.mode} mode selected.`)});
 all('[data-walk]').forEach(b=>b.onclick=()=>{state.walk=b.dataset.walk;save();all('[data-walk]').forEach(x=>x.classList.toggle('active',x.dataset.walk===state.walk))});
 all('.interest').forEach(b=>b.onclick=()=>b.classList.toggle('active'));
 el('#buildRoute').onclick=()=>{const d=el('#destination').value||'Your destination';el('#routeStops').innerHTML=`<div class="route-stop"><b>1 · Read the place</b>Find one detail that reveals a different construction period.</div><div class="route-stop"><b>2 · Evidence before interpretation</b>Record what you can actually see before guessing why it is there.</div><div class="route-stop"><b>3 · Then ↔ Now</b>Compare a historical trace with what exists now.</div>`;toast(`${d} expedition rebuilt for ${state.walk}.`)};
 const random=()=>{const opts=['octopus','field','catalogue','expedition'];go(opts[Math.floor(Math.random()*opts.length)]);toast('Random Door opened — genuinely random among current demo destinations.')};
 el('#randomBtn').onclick=random;el('#randomBtn2').onclick=random;if(el('#randomHero'))el('#randomHero').onclick=random;if(el('#randomDesk'))el('#randomDesk').onclick=random;el('#broadBtn').onclick=()=>{go('field');toast('Breadth recommendation: from cephalopod control to reading architecture in the field.')};
 el('#modeBtn').onclick=()=>go('modes');
}
render();