const state = JSON.parse(localStorage.getItem('sophia-state') || '{}');
state.mode ||= 'Explorer';
state.progress ||= {discover:'EXPLORING', understand:'NOT STARTED', deeper:'NOT STARTED', research:'NOT STARTED'};
state.questions ||= [];
state.collections ||= ['Common octopus'];
state.walk ||= 'MODERATE';
const save=()=>localStorage.setItem('sophia-state',JSON.stringify(state));
const el=q=>document.querySelector(q);
const all=q=>[...document.querySelectorAll(q)];
const bg=u=>`background-image:url('${u}')`;
const escapeHTML=s=>s.replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

const routes={
  home:'#/home', explore:'#/explore', topics:'#/topics', octopus:'#/topic/octopus', article:'#/topic/octopus/read',
  expeditions:'#/expeditions', field:'#/field', cabinet:'#/cabinet', catalogue:'#/catalogue', about:'#/about'
};
const currentRoute=()=>location.hash.startsWith('#/')?location.hash:'#/home';
const navigate=route=>{ if(location.hash===route){render();window.scrollTo(0,0)} else location.hash=route; };

function nav(){
  const r=currentRoute();
  const active=prefix=>r.startsWith(prefix)?'active':'';
  return `<nav class="nav">
    <button class="brand brand-button" data-route="${routes.home}">SOPHIA D'OR</button>
    <div class="navlinks">
      <button class="navlink ${active('#/explore')}" data-route="${routes.explore}">Explore</button>
      <button class="navlink ${active('#/topic')} ${active('#/topics')}" data-route="${routes.topics}">Topics</button>
      <button class="navlink ${active('#/expeditions')}" data-route="${routes.expeditions}">Expeditions</button>
      <button class="navlink ${active('#/field')}" data-route="${routes.field}">Field</button>
      <button class="navlink ${active('#/cabinet')}" data-route="${routes.cabinet}">Cabinet</button>
      <button class="navlink ${active('#/catalogue')}" data-route="${routes.catalogue}">Catalogue</button>
      <button class="navlink ${active('#/about')}" data-route="${routes.about}">About</button>
    </div>
    <div class="navtools"><button class="iconbtn" id="randomBtn" title="Random Door">↻</button><button class="pill mode-top" id="modeBtn">${state.mode}</button><button class="iconbtn" id="askGlobal">?</button><button class="iconbtn menu-btn" id="menuBtn" aria-label="Open menu">☰</button></div>
  </nav>
  <div class="mobile-menu hidden" id="mobileMenu">
    ${[['Explore',routes.explore],['Topics',routes.topics],['Expeditions',routes.expeditions],['Field',routes.field],['Cabinet',routes.cabinet],['Catalogue',routes.catalogue],['About',routes.about]].map(x=>`<button data-route="${x[1]}">${x[0]}<span>→</span></button>`).join('')}
  </div>`;
}

function homePage(){return `<main class="page page-home">
  <header class="hero">
    <div class="hero-orbit hero-orbit--one"></div><div class="hero-orbit hero-orbit--two"></div>
    <button class="floating-object fo-skull" data-route="${routes.explore}" aria-label="Natural history specimen"><span>specimen</span></button>
    <button class="floating-object fo-jelly" data-route="${routes.octopus}" aria-label="Marine life"><span>marine life</span></button>
    <button class="floating-object fo-fossil" data-route="${routes.catalogue}" aria-label="Fossils"><span>fossils</span></button>
    <button class="floating-object fo-mechanism" data-route="${routes.explore}" aria-label="Mechanisms"><span>mechanisms</span></button>
    <button class="floating-object fo-botany" data-route="${routes.field}" aria-label="Botany"><span>botany</span></button>
    <button class="floating-object fo-classical" data-route="${routes.explore}" aria-label="Human history"><span>human history</span></button>
    <button class="floating-object fo-mineral" data-route="${routes.catalogue}" aria-label="Minerals"><span>minerals</span></button>
    <div class="earth-disc" aria-hidden="true"></div>
    <div class="hero-content"><div class="hero-plaque"><div class="kicker">Look closer</div><h1>SOPHIA D'OR</h1><blockquote>“The world doesn't need more hype.<br>It needs a closer look.”</blockquote></div>
      <div class="question">Where would you like to begin?</div><div class="object-row">
      ${[['♘','Nature',routes.topics],['⌛','History',routes.explore],['⚙','Science',routes.explore],['◉','People',routes.explore],['⌖','Places',routes.expeditions],['✦','Ideas',routes.explore]].map(x=>`<button class="object" data-route="${x[2]}"><span>${x[0]}</span><small>${x[1]}</small></button>`).join('')}
      </div></div><div class="scroll">↓ Your desk is below</div>
  </header>
  <section class="home-desk"><div class="desk-intro"><div class="kicker">Good morning, Gabi.</div><h2>What shall we explore today?</h2></div><div class="desk-grid">
    <button class="desk-card" data-route="${routes.octopus}"><div class="desk-photo" style="${bg('https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=1000&q=86')}"></div><div><small>CONTINUE EXPLORING</small><h3>How does an octopus think?</h3><span>UNDERSTAND →</span></div></button>
    <button class="desk-card" data-route="${routes.explore}"><div class="desk-photo" style="${bg('https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?auto=format&fit=crop&w=900&q=84')}"></div><div><small>SOMETHING WORTH NOTICING TODAY</small><h3>The Moon is in a particularly good phase tonight.</h3><span>LEARN MORE →</span></div></button>
    <button class="desk-card desk-question" id="questionDesk"><div><small>ONE QUESTION YOU LEFT BEHIND</small><h3>Can an octopus arm make a decision before the central brain?</h3><span>OPEN QUESTIONS →</span></div></button>
    <button class="desk-card" id="randomDesk"><div class="desk-photo" style="${bg('https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=84')}"></div><div><small>GO SOMEWHERE UNEXPECTED</small><h3>Random Door</h3><span>OPEN →</span></div></button>
    <button class="desk-card" data-route="${routes.field}"><div class="desk-photo" style="${bg('https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=84')}"></div><div><small>LEAVE THE SCREEN</small><h3>Explore near me</h3><span>30-MINUTE QUEST →</span></div></button>
    <button class="desk-card" data-route="${routes.expeditions}"><div class="desk-photo" style="${bg('https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=84')}"></div><div><small>PLAN AN EXPEDITION</small><h3>Build a route</h3><span>START →</span></div></button>
  </div></section>
</main>`}

function explorePage(){return `<main class="page"><section class="page-hero page-hero-explore"><div class="page-hero-copy"><div class="kicker">Explore</div><h1>The world is not divided into disciplines.</h1><p>We divided it that way so we could study it. Sophia d'Or reconnects organisms, mechanisms, places, history and evidence into trails that widen curiosity rather than trap it.</p></div></section>
<section class="section"><div class="sectionhead"><div><div class="kicker">Choose a door</div><h2>Start with a question, not a syllabus.</h2></div><p>Every route can lead somewhere unexpected. Categories organize the library without becoming intellectual walls.</p></div><div class="grid three">
${card('Nature & Life','Animals, plants, ecology, bodies and behavior.','https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=85',routes.topics)}
${card('History & Objects','Artifacts, civilizations, archives and reconstruction.','https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=1200&q=85',routes.explore)}
${card('Science & Mechanisms','How things work, how we know, and what remains uncertain.','https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=85',routes.explore)}
${card('People & Ideas','Language, culture, thought, creativity and society.','https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1200&q=85',routes.explore)}
${card('Places & Field','Cities, coasts, landscapes, architecture and the night sky.','https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=85',routes.field)}
${card('Grand Expeditions','Interdisciplinary routes through the real world.','https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85',routes.expeditions)}
</div><div class="explore-actions"><button class="goldbtn" id="broadBtn">SHOW ME SOMETHING I DON'T KNOW I CARE ABOUT</button><button class="ghost" id="randomExplore">RANDOM DOOR — TAKE ME SOMEWHERE</button></div></section>
<section class="section section-alt"><div class="sectionhead"><div><div class="kicker">Modes</div><h2>How do you like to explore?</h2></div><p>This changes how you explore, not what is true.</p></div><div class="grid four">${['Explorer','Inventor','Researcher','Archaeologist'].map((m,i)=>`<button class="modecard ${state.mode===m?'selected':''}" data-mode="${m}"><div class="kicker">${['routes · places','mechanisms · experiments','evidence · specimens','traces · reconstruction'][i]}</div><h3>${m}</h3><p>${['Follow routes. Find places. Go outside.','Take things apart. Find out why they work.','Observe. Compare. Test.','Follow traces. Reconstruct what happened.'][i]}</p></button>`).join('')}</div></section></main>`}

function topicsPage(){return `<main class="page"><section class="page-hero page-hero-topics"><div class="page-hero-copy"><div class="kicker">Topics</div><h1>Questions worth following.</h1><p>Each topic has four depth levels: Discover, Understand, Go Deeper and Research Desk. No age gates. No artificial ceiling.</p></div></section><section class="section"><div class="sectionhead"><div><div class="kicker">Featured exploration</div><h2>Marine intelligence</h2></div><p>One complete demo topic is live now; the architecture is ready for a much larger editorial catalogue.</p></div><div class="grid three">${card('Octopus intelligence','What is it like to have eight arms that can act partly on their own?','https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=1200&q=88',routes.octopus)}${card('How do we know dinosaur colors?','Evidence can survive in structures smaller than a grain of sand.','https://images.unsplash.com/photo-1525877442103-5ddb2089b2bb?auto=format&fit=crop&w=1200&q=84',routes.explore)}${card('Could you navigate with only the sky?','Stars, time, latitude, uncertainty and human ingenuity.','https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1200&q=86',routes.expeditions)}</div></section></main>`}

function octopusPage(){return `<main class="page"><section class="octopus-hero"><div class="octopus-copy"><div class="breadcrumb">Nature › Marine Life › Cephalopods</div><h2>What is it like to have eight arms that can act partly on their own?</h2><p>A closer look at one of the most extraordinary nervous systems on Earth — without turning it into myth, hype or a human intelligence contest.</p><div class="topic-actions"><button class="goldbtn" id="beginOctopus">BEGIN EXPLORING →</button><span class="readtime">READ · 12 MIN &nbsp;&nbsp; LISTEN · 14 MIN</span></div><div class="levels">${levelButtons()}</div><div class="octopus-chapters"><button class="chapter active"><span class="chapter-img" style="${bg('https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=500&q=84')}"></span><small>An extraordinary body</small></button><button class="chapter"><span class="chapter-img" style="${bg('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=500&q=84')}"></span><small>How octopus arms work</small></button><button class="chapter"><span class="chapter-img" style="${bg('https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&w=500&q=84')}"></span><small>Intelligence & behavior</small></button><button class="chapter"><span class="chapter-img" style="${bg('https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&w=500&q=84')}"></span><small>In their world</small></button></div></div><div class="octopus-image"><div class="stage-rail"><div class="stage-dot active"></div><span>DISCOVER</span><div class="stage-dot"></div><span>UNDERSTAND</span><div class="stage-dot"></div><span>GO DEEPER</span><div class="stage-dot"></div><span>RESEARCH DESK</span></div></div></section></main>`}

function articlePage(){return `<main class="page"><section class="article-header"><button class="backlink" data-route="${routes.octopus}">← OCTOPUS INTELLIGENCE</button><div><div class="kicker">Discover</div><h1>Distributed intelligence</h1><p>Read the evidence, separate observation from interpretation, then check what you understood.</p></div></section><section class="section tight"><div class="topic-layout"><article class="article"><div class="kicker" style="color:#78633a">DISCOVER · READ 12 MIN · LISTEN · 14 MIN</div><h3 id="idea-neurons">An octopus is not a brain with eight passive limbs.</h3><p>Roughly two-thirds of an octopus's neurons are distributed through its arms rather than concentrated in the central brain. That does not mean each arm is a separate little octopus. It means a great deal of sensing and motor control can be handled locally, while the central brain sets broader goals.</p><div class="evidence"><div class="label">EVIDENCE</div><p>Experiments and anatomical studies show dense neural networks in the arms and highly flexible local control. Researchers can distinguish what is observed from how much autonomy we infer from it.</p></div><h4 id="idea-suckers">Every sucker is part of a sensory world.</h4><p>Octopus suckers can detect chemicals as well as touch. An arm exploring a crevice is not merely obeying a sequence of centrally specified movements; it is continuously sensing and responding.</p><div class="evidence"><div class="label">INTERPRETATION</div><p>Calling an arm “independent” is convenient shorthand, but can overstate the case. A better phrase is <mark>partly decentralized control</mark>: local processing within a coordinated animal.</p></div><h4 id="idea-unknown">What we still don't know</h4><p>Researchers still debate how experience is integrated across this distributed nervous system, and how octopuses coordinate flexible action without a vertebrate-like body map.</p><div class="evidence"><div class="label">UNCERTAINTY</div><p>We have evidence for distributed processing. We do not have direct access to what that organization feels like from the octopus's point of view.</p></div><div class="quiz"><h4>Check what you understood</h4><p>This challenge covers DISCOVER + UNDERSTAND, the levels you've explored.</p><div class="answers"><button class="answer" data-answer="a">Each arm contains a complete, separate brain.</button><button class="answer" data-answer="b">Arms can perform substantial local sensing and control while remaining coordinated by the central nervous system.</button><button class="answer" data-answer="c">The central brain issues every individual muscle command.</button></div><div id="quizFeedback"></div></div></article><aside class="sidepanel"><h4>Current trail</h4>${progressMarkup()}<hr><button class="goldbtn" id="askContext">? ASK ABOUT THIS</button><button class="ghost full" id="explainBtn">EXPLAIN DIFFERENTLY</button><button class="ghost full" data-route="${routes.octopus}">TOPIC OVERVIEW</button></aside></div></section></main>`}

function cabinetPage(){return `<main class="page"><section class="cabinet"><div class="cabinet-topbar"><div><div class="kicker">Personal research room</div><h2>Your Cabinet</h2></div><div class="cabinet-tabs"><span class="active">Collections</span><span>Questions</span><span>Field Notes</span><span>Expeditions</span><span>Achievements</span></div></div><div class="cabinet-room"><div class="cabinet-main cabinet-shelf"><div class="shelf-object fossil-object">◒</div><div class="shelf-object jar-object">◫</div><div class="shelf-object shell-object">◉</div><div class="cabinet-plaque"><small>CURRENT TRAIL</small><h3>How does an octopus think?</h3><p>DISCOVER · EXPLORING</p></div><div class="cabinet-question"><small>MY QUESTIONS</small>${state.questions.length?state.questions.slice(-2).map(q=>`<p>“${escapeHTML(q.text)}”</p>`).join(''):'<p>Can an octopus arm decide before the central brain?</p>'}</div></div><button class="cabinet-tile catalogue-door" data-route="${routes.catalogue}"><div class="tile-illustration">◌</div><h3>The Great Catalogue</h3><p>${state.collections.length} discovery unlocked</p></button><button class="cabinet-tile field-door" data-route="${routes.field}"><div class="tile-illustration">▤</div><h3>Field Notes</h3><p>Observations, dates, places, photographs.</p></button><button class="cabinet-tile expedition-door" data-route="${routes.expeditions}"><div class="tile-illustration">✧</div><h3>Expeditions</h3><p>Târgoviște · draft route</p></button><div class="cabinet-tile passport-door"><div class="tile-illustration">✺</div><h3>Curiosity Passport</h3><p>Oceans explored · 1<br>Questions investigated · ${state.questions.length}<br><strong>WELCOME BACK.</strong></p></div></div></section></main>`}

function cataloguePage(){return `<main class="page"><section class="page-hero page-hero-catalogue"><div class="page-hero-copy"><div class="kicker">Great Catalogue</div><h1>Collect what you actually understand.</h1><p>Opening a page is not enough. Catalogue entries unlock from meaningful exploration, checks and mastery.</p></div></section><section class="section"><div class="catalogue-tabs"><button class="active">Collections</button><button>Explorer's Trunk</button><button>Discovery Gifts</button></div><div class="grid four">${catalogueCards()}</div></section><section class="section section-alt"><div class="sectionhead"><div><div class="kicker">Take this discovery with you</div><h2>Discovery Gifts</h2></div><p>Educational physical rewards attach to a future shop order after meaningful requirements are met. No loot boxes. No paid rarity.</p></div><div class="grid three"><div class="panel"><h3>Geology Discovery Gift</h3><p>Knowledge requirement ✓<br>Field discoveries ✓<br>Collection requirement ✓</p><button class="goldbtn">UNLOCKED FOR NEXT ORDER</button></div><div class="panel"><h3>Field guide</h3><p>Minerals of Europe · pocket edition.</p><button class="ghost">VIEW OBJECT STORY</button></div><div class="panel"><h3>Specimen set</h3><p>Educational rock collection with source and context cards.</p><button class="ghost">ADD TO CART</button></div></div></section></main>`}

function expeditionPage(){return `<main class="page page-expeditions-v2">
  <section class="expv2-hero">
    <div class="expv2-hero__overlay"></div>
    <div class="expv2-hero__content">
      <div class="kicker">Expeditions</div>
      <h1>Turn a place into a question.</h1>
      <p>Build a route around what is actually there: architecture, geology, night sky, engineering, traces of change, and the questions a place can answer if you look closely.</p>
      <div class="expv2-principles">
        <span>LOCAL OR FAR AWAY</span>
        <span>NO FOMO</span>
        <span>EVIDENCE BEFORE INTERPRETATION</span>
      </div>
    </div>
  </section>

  <section class="expv2-shell">
    <div class="expv2-sectionhead">
      <div>
        <div class="kicker">Plan an expedition</div>
        <h2>Start with the practical things.</h2>
      </div>
      <p>Destination, time, interests and walking preference shape the route. The planner should feel like preparing a field notebook, not filling in a travel form.</p>
    </div>

    <div class="expv2-planner-grid">
      <div class="expv2-planner-card">
        <div class="fieldrow">
          <div class="field">
            <label>Destination</label>
            <input id="destination" value="Târgoviște">
          </div>
          <div class="field">
            <label>Dates</label>
            <input id="dates" value="17–19 October">
          </div>
        </div>

        <div class="field expv2-fieldblock">
          <label>How much walking are we doing?</label>
          <div class="choice-row expv2-walk">
            ${['LIGHT','MODERATE','I HAVE LEGS 😤'].map(x=>`<button class="choice ${state.walk===x?'active':''}" data-walk="${x}">${x}</button>`).join('')}
          </div>
        </div>

        <div class="field expv2-fieldblock">
          <label>What sounds interesting?</label>
          <div class="interest-grid expv2-interests">
            ${[
              ['⌛','History'],
              ['❧','Nature'],
              ['⌂','Architecture'],
              ['⚙','Engineering'],
              ['✧','Science'],
              ['?','Surprise me']
            ].map(x=>`<button class="choice interest"><span>${x[0]}</span>${x[1]}</button>`).join('')}
          </div>
        </div>

        <button class="expv2-build" id="buildRoute">BUILD MY EXPEDITION →</button>
        <p class="expv2-note">Built for cities, villages, modest budgets and different mobility levels. Saved routes can later support offline preparation.</p>
      </div>

      <div class="expv2-route-board">
        <div class="expv2-mapwash"></div>
        <div class="expv2-route-line"></div>
        <span class="expv2-pin pin-a">1</span>
        <span class="expv2-pin pin-b">2</span>
        <span class="expv2-pin pin-c">3</span>
        <span class="expv2-pin pin-d">4</span>

        <div class="expv2-route-card">
          <div class="kicker">Your expedition</div>
          <h3>Târgoviște</h3>
          <p class="expv2-route-meta">17–19 October · 6 stops</p>
          <div id="routeStops">
            <div class="route-stop"><b>1 · The Royal Court</b><span>Read the layers of a former capital.</span></div>
            <div class="route-stop"><b>2 · Chindia Tower</b><span>Look for clues from different periods.</span></div>
            <div class="route-stop"><b>3 · Hidden details</b><span>Small things, big stories.</span></div>
          </div>
          <div class="expv2-route-actions">
            <button class="expv2-secondary" data-route="${routes.field}">OPEN FIELD MODE</button>
            <button class="expv2-secondary">VIEW FULL ROUTE</button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="expv2-next">
    <div class="expv2-next__item">
      <small>BEFORE</small>
      <h3>Know just enough.</h3>
      <p>Optional context before you go — never homework for homework's sake.</p>
    </div>
    <div class="expv2-next__item">
      <small>DURING</small>
      <h3>Observe first.</h3>
      <p>Clues, photographs where permitted, field notes and evidence-based questions.</p>
    </div>
    <div class="expv2-next__item">
      <small>AFTER</small>
      <h3>Now understand it.</h3>
      <p>Connect what you saw back to deeper Sophia d'Or content.</p>
    </div>
  </section>

  <section class="expv2-shell expv2-grand-wrap">
    <div class="expv2-sectionhead">
      <div>
        <div class="kicker">Grand Expeditions</div>
        <h2>The world is not divided into disciplines.</h2>
      </div>
      <p>Grand Expeditions connect questions that belong together in reality, even when universities put them in separate departments.</p>
    </div>

    <div class="expv2-grand">
      <div class="expv2-grand__visual">
        <div class="expv2-grand__label">PERMANENT EXPEDITION</div>
        <div class="expv2-grand__title">Across<br>the Atlantic</div>
      </div>
      <div class="expv2-grand__content">
        <p class="expv2-grand__lead">Navigation → astronomy → ocean currents → meteorology → shipbuilding → food preservation → cartography → exploration history → colonialism and consequences → migration → genetics.</p>
        <p>No countdown. No artificial scarcity. Come back when curiosity brings you here.</p>
        <button class="expv2-secondary">EXPLORE THE ROUTE →</button>
      </div>
    </div>
  </section>
</main>`}

function fieldPage(){return `<main class="page"><section class="page-hero page-hero-field"><div class="page-hero-copy"><div class="kicker">Field</div><h1>The world becomes the game board.</h1><p>Observation, evidence and safe real-world quests. Museum rules, wildlife, protected places and mobility needs come first.</p></div></section><section class="section"><div class="sectionhead"><div><div class="kicker">Field Quest demo</div><h2>Look closer. Record what you actually saw.</h2></div><p>My Observation, Suggested Identification and Verified Information remain visibly different.</p></div><div class="mobile-demo"><div class="phone"><img src="https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=700&q=82"><div class="screen"><div class="kicker">Field Quest 02/06</div><h4>Look above the entrance.</h4><p>One architectural detail was added long after the first building phase. Can you find it?</p><button class="goldbtn">I FOUND SOMETHING</button></div></div><div class="phone"><img src="https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=700&q=82"><div class="screen"><div class="kicker">My observation</div><h4>What changed?</h4><p>Record what you observed. This is your field note — not automatically verified fact.</p><textarea class="field-note" placeholder="My observation..."></textarea></div></div><div class="phone"><img src="https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=700&q=82"><div class="screen"><div class="kicker">Then ↔ Now</div><h4>Now look at this.</h4><p>You found a later intervention. Compare it with the earlier structure and ask what evidence would date the change.</p><button class="ghost">CONTINUE →</button></div></div></div></section><section class="section section-alt"><div class="sectionhead"><div><div class="kicker">Explore near home</div><h2>I have 30 minutes.</h2></div><p>Architecture, Moon, clouds, plants, engineering, geology and urban history can all begin within walking distance.</p></div><button class="goldbtn">SHOW ME A 30-MINUTE QUEST</button></section></main>`}

function aboutPage(){return `<main class="page"><section class="page-hero page-hero-about"><div class="page-hero-copy"><div class="kicker">About Sophia d'Or</div><h1>We don't make the world more interesting.</h1><p>We show you how interesting it already is.</p></div></section><section class="section about-grid"><div class="panel"><h3>Evidence first</h3><p>Evidence, interpretation, uncertainty and myth are explicitly distinguished.</p></div><div class="panel"><h3>No intellectual filter bubbles</h3><p>Curiosity Trails deliberately connect distant subjects instead of feeding endless more-of-the-same.</p></div><div class="panel"><h3>No toxic streaks</h3><p>Leave for three months. Come back to WELCOME BACK, not guilt.</p></div><div class="panel"><h3>Maximum curiosity-per-minute</h3><p>If Sophia d'Or convinces you to close the screen and go find Jupiter, the product worked.</p></div></section></main>`}

function footer(){return `<footer class="footer"><div>SOPHIA D'OR · LOOK CLOSER.</div><div>Evidence · Interpretation · Uncertainty · Myth</div><div>© 2026 Sophia d'Or</div></footer>`}
function card(title,copy,img,route){return `<button class="card" data-route="${route}"><div class="card-bg" style="${bg(img)}"></div><div class="cardbody"><h3>${title}</h3><p>${copy}</p></div></button>`}
function levelButtons(){return [['discover','DISCOVER'],['understand','UNDERSTAND'],['deeper','GO DEEPER'],['research','RESEARCH DESK']].map(([k,l],i)=>`<button class="level ${i===0?'active':''}" data-level="${k}">${l}</button>`).join('')}
function progressMarkup(){return Object.entries(state.progress).map(([k,v])=>`<div class="progress-step ${v!=='NOT STARTED'?'done':''}"><span class="dot"></span><span>${k.toUpperCase()} · ${v}</span></div>`).join('')}
function catalogueCards(){const rows=[['Common octopus','Octopus vulgaris','https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=800&q=82',true],['Ammonite','Extinct cephalopod','https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=82',false],['Quartz','SiO₂','https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=82',false],['Lunar chart','Celestial object','https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?auto=format&fit=crop&w=800&q=82',false]];return rows.map(r=>`<div class="catalogue-card"><div class="specimen" style="${bg(r[2])}"></div><h4>${r[0]}</h4><small>${r[1]}</small><p>${r[3]?'Unlocked through Octopus Intelligence.':'Locked · explore and demonstrate understanding.'}</p></div>`).join('')}
function toast(msg){const t=el('#toast');if(!t)return;t.textContent=msg;t.classList.remove('hidden');setTimeout(()=>t.classList.add('hidden'),2600)}
function askModal(context='General exploration'){el('#modalHost').innerHTML=`<div class="modalwrap"><div class="modal"><div class="kicker" style="color:#7b673e">? ASK</div><h3>What are you curious about?</h3><p class="modal-context">Context: ${context}</p><textarea id="questionText" placeholder="Ask the question you don't want to lose..."></textarea><div class="row"><button class="ghost dark" id="closeModal">Cancel</button><button class="goldbtn" id="saveQuestion">Save question</button></div></div></div>`;el('#closeModal').onclick=()=>el('#modalHost').innerHTML='';el('#saveQuestion').onclick=()=>{const text=el('#questionText').value.trim();if(!text)return;state.questions.push({text,article:'Octopus Intelligence',section:'Distributed nervous system',level:'DISCOVER',context});save();el('#modalHost').innerHTML='';toast('Question saved to your Cabinet.')}}

function pageFor(route){
  if(route===routes.home)return homePage();
  if(route===routes.explore)return explorePage();
  if(route===routes.topics)return topicsPage();
  if(route===routes.octopus)return octopusPage();
  if(route===routes.article)return articlePage();
  if(route===routes.expeditions)return expeditionPage();
  if(route===routes.field)return fieldPage();
  if(route===routes.cabinet)return cabinetPage();
  if(route===routes.catalogue)return cataloguePage();
  if(route===routes.about)return aboutPage();
  return homePage();
}

function render(){
  const route=currentRoute();
  document.querySelector('#app').innerHTML=`<div class="shell">${nav()}${pageFor(route)}${footer()}</div><div id="modalHost"></div><div id="toast" class="toast hidden"></div>`;
  bind();
  document.title=`SOPHIA D'OR — ${route===routes.home?'Look closer':route.split('/').filter(Boolean).pop().replace(/-/g,' ')}`;
}

function bind(){
  all('[data-route]').forEach(b=>b.onclick=()=>navigate(b.dataset.route));
  const menuBtn=el('#menuBtn'), mobileMenu=el('#mobileMenu');if(menuBtn&&mobileMenu)menuBtn.onclick=()=>mobileMenu.classList.toggle('hidden');
  const random=()=>{const opts=[routes.octopus,routes.field,routes.catalogue,routes.expeditions];navigate(opts[Math.floor(Math.random()*opts.length)]);setTimeout(()=>toast('Random Door opened — genuinely random among current demo destinations.'),20)};
  if(el('#randomBtn'))el('#randomBtn').onclick=random;if(el('#randomDesk'))el('#randomDesk').onclick=random;if(el('#randomExplore'))el('#randomExplore').onclick=random;
  if(el('#askGlobal'))el('#askGlobal').onclick=()=>askModal('Global ask');
  if(el('#questionDesk'))el('#questionDesk').onclick=()=>navigate(routes.cabinet);
  if(el('#modeBtn'))el('#modeBtn').onclick=()=>navigate(routes.explore);
  if(el('#broadBtn'))el('#broadBtn').onclick=()=>{navigate(routes.field);setTimeout(()=>toast('Breadth recommendation: from cephalopod control to reading architecture in the field.'),20)};
  if(el('#beginOctopus'))el('#beginOctopus').onclick=()=>{state.progress.discover='EXPLORING';save();navigate(routes.article)};
  all('[data-level]').forEach(b=>b.onclick=()=>{all('[data-level]').forEach(x=>x.classList.remove('active'));b.classList.add('active');const key=b.dataset.level;if(key==='understand')state.progress.understand='EXPLORING';if(key==='deeper')state.progress.deeper='EXPLORING';if(key==='research')state.progress.research='EXPLORING';save();toast(`${b.textContent} opened — progress is not completion.`)});
  all('.answer').forEach(b=>b.onclick=()=>{all('.answer').forEach(x=>x.classList.remove('correct','wrong'));const ok=b.dataset.answer==='b';b.classList.add(ok?'correct':'wrong');if(ok){state.progress.discover='CHECKED';state.progress.understand='CHECKED';save();el('#quizFeedback').innerHTML='<p>Good. Local control and central coordination can both be true.</p>';toast('Understanding checked.')}else{el('#quizFeedback').innerHTML='<p>Not quite. The key is distributed processing without pretending each arm is a separate animal.</p><a class="reviewlink" href="#idea-neurons">Review the idea →</a>'}});
  if(el('#askContext'))el('#askContext').onclick=()=>askModal('Selected concept: partly decentralized arm control');
  if(el('#explainBtn'))el('#explainBtn').onclick=()=>{el('#modalHost').innerHTML=`<div class="modalwrap"><div class="modal"><div class="kicker" style="color:#7b673e">Explain differently</div><h3>Think of a jazz ensemble, not a puppet.</h3><p>The central brain is closer to a bandleader setting direction while each arm has enough local processing to respond to what it senses in real time. The analogy is imperfect — but it helps separate coordination from micromanagement.</p><div class="row"><button class="goldbtn" id="closeExplain">Got it</button></div></div></div>`;el('#closeExplain').onclick=()=>el('#modalHost').innerHTML=''};
  all('[data-mode]').forEach(b=>b.onclick=()=>{state.mode=b.dataset.mode;save();render();toast(`${state.mode} mode selected.`)});
  all('[data-walk]').forEach(b=>b.onclick=()=>{state.walk=b.dataset.walk;save();all('[data-walk]').forEach(x=>x.classList.toggle('active',x.dataset.walk===state.walk))});
  all('.interest').forEach(b=>b.onclick=()=>b.classList.toggle('active'));
  if(el('#buildRoute'))el('#buildRoute').onclick=()=>{const d=el('#destination').value||'Your destination';el('#routeStops').innerHTML=`<div class="route-stop"><b>1 · Read the place</b>Find one detail that reveals a different construction period.</div><div class="route-stop"><b>2 · Evidence before interpretation</b>Record what you can actually see before guessing why it is there.</div><div class="route-stop"><b>3 · Then ↔ Now</b>Compare a historical trace with what exists now.</div>`;toast(`${d} expedition rebuilt for ${state.walk}.`)};
}

window.addEventListener('hashchange',()=>{render();window.scrollTo(0,0)});
if(!location.hash)history.replaceState(null,'',routes.home);
render();