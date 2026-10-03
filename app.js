const state = JSON.parse(localStorage.getItem('sophia-dor-state') || '{}');
state.mode ||= 'Explorer';
state.walk ||= 'MODERATE';
state.questions ||= [
  'Can an octopus arm decide before the central brain?'
];
state.progress ||= {
  discover: 'EXPLORING',
  understand: 'NOT STARTED',
  deeper: 'NOT STARTED',
  research: 'NOT STARTED'
};
state.collections ||= ['Common octopus'];

const save = () => localStorage.setItem('sophia-dor-state', JSON.stringify(state));
const routes = {
  home: '#/home',
  explore: '#/explore',
  topics: '#/topics',
  octopus: '#/topic/octopus',
  article: '#/topic/octopus/article',
  expeditions: '#/expeditions',
  field: '#/field',
  cabinet: '#/cabinet',
  catalogue: '#/catalogue',
  about: '#/about'
};

const currentRoute = () => location.hash.startsWith('#/') ? location.hash : routes.home;
const navigate = (route) => {
  if (location.hash === route) {
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  location.hash = route;
};

const el = (q) => document.querySelector(q);
const all = (q) => [...document.querySelectorAll(q)];
const bg = (url) => `background-image:url('${url}')`;

function escapeHTML(str = '') {
  return str.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

function nav() {
  const route = currentRoute();
  const isActive = (prefix) => route.startsWith(prefix) ? 'active' : '';
  return `
    <header class="topbar">
      <button class="brand" data-route="${routes.home}">SOPHIA D'OR</button>
      <nav class="navlinks" aria-label="Primary navigation">
        <button class="navlink ${isActive('#/explore')}" data-route="${routes.explore}">Explore</button>
        <button class="navlink ${isActive('#/topic') || isActive('#/topics') ? 'active' : ''}" data-route="${routes.topics}">Topics</button>
        <button class="navlink ${isActive('#/expeditions')}" data-route="${routes.expeditions}">Expeditions</button>
        <button class="navlink ${isActive('#/field')}" data-route="${routes.field}">Field</button>
        <button class="navlink ${isActive('#/cabinet')}" data-route="${routes.cabinet}">Cabinet</button>
        <button class="navlink ${isActive('#/catalogue')}" data-route="${routes.catalogue}">Catalogue</button>
        <button class="navlink ${isActive('#/about')}" data-route="${routes.about}">About</button>
      </nav>
      <div class="toptools">
        <button class="circle-btn" id="randomBtn" aria-label="Random door">↻</button>
        <button class="circle-btn menu-btn" id="menuBtn" aria-label="Open menu">☰</button>
      </div>
    </header>
    <div class="mobile-menu hidden" id="mobileMenu">
      ${[
        ['Explore', routes.explore],
        ['Topics', routes.topics],
        ['Expeditions', routes.expeditions],
        ['Field', routes.field],
        ['Cabinet', routes.cabinet],
        ['Catalogue', routes.catalogue],
        ['About', routes.about]
      ].map(([label, route]) => `<button data-route="${route}"><span>${label}</span><strong>→</strong></button>`).join('')}
    </div>
  `;
}

function footer() {
  return `
    <footer class="site-footer">
      <div>SOPHIA D'OR · LOOK CLOSER.</div>
      <div>Evidence · Interpretation · Uncertainty · Myth</div>
      <div>© 2026 Sophia d'Or</div>
    </footer>
  `;
}

function homePage() {
  return `
    <main class="page page-home tone-home">
      <section class="hero hero-home">
        <div class="hero-globe"></div>
        <div class="hero-copy">
          <div class="eyebrow">Look closer</div>
          <h1>SOPHIA D'OR</h1>
          <p class="hero-manifesto">“The world doesn't need more hype.<br>It needs a closer look.”</p>
          <p class="hero-question">Where would you like to begin?</p>
          <div class="hero-doors">
            ${[
              ['Nature', routes.topics],
              ['History', routes.explore],
              ['Science', routes.explore],
              ['People', routes.explore],
              ['Places', routes.expeditions],
              ['Ideas', routes.explore],
            ].map(([label, route]) => `<button class="door" data-route="${route}">${label}</button>`).join('')}
          </div>
        </div>
      </section>

      <section class="section desk-section">
        <div class="section-heading">
          <div>
            <div class="eyebrow">Good morning, Gabi.</div>
            <h2>What shall we explore today?</h2>
          </div>
          <p>A clearer starting desk: not the whole platform stacked into one page, just the most relevant doors back into Sophia d'Or.</p>
        </div>
        <div class="desk-grid">
          ${homeCard('Continue exploring', 'How does an octopus think?', 'UNDERSTAND →', 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=1200&q=86', routes.octopus)}
          ${homeCard('Something worth noticing today', 'The Moon is in a particularly good phase tonight.', 'LEARN MORE →', 'https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?auto=format&fit=crop&w=1200&q=86', routes.explore)}
          ${homeTextCard('One question you left behind', state.questions[state.questions.length - 1], 'OPEN QUESTIONS →', routes.cabinet)}
          ${homeCard('Go somewhere unexpected', 'Random Door', 'OPEN →', 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=84', 'random')}
          ${homeCard('Leave the screen', 'Explore near me', '30-MINUTE QUEST →', 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=84', routes.field)}
          ${homeCard('Plan an expedition', 'Build a route', 'START →', 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=86', routes.expeditions)}
        </div>
      </section>
    </main>
  `;
}

function homeCard(eyebrow, title, cta, image, route) {
  const attrs = route === 'random' ? 'id="randomDesk"' : `data-route="${route}"`;
  return `
    <button class="desk-card" ${attrs}>
      <div class="desk-photo" style="${bg(image)}"></div>
      <div class="desk-copy">
        <small>${eyebrow}</small>
        <h3>${title}</h3>
        <span>${cta}</span>
      </div>
    </button>
  `;
}

function homeTextCard(eyebrow, title, cta, route) {
  return `
    <button class="desk-card desk-card--text" data-route="${route}">
      <div class="desk-copy">
        <small>${eyebrow}</small>
        <h3>${escapeHTML(title)}</h3>
        <span>${cta}</span>
      </div>
    </button>
  `;
}

function pageHero(toneClass, eyebrow, title, text) {
  return `
    <section class="page-hero ${toneClass}">
      <div class="page-hero-copy">
        <div class="eyebrow">${eyebrow}</div>
        <h1>${title}</h1>
        <p>${text}</p>
      </div>
    </section>
  `;
}

function explorePage() {
  return `
    <main class="page tone-explore">
      ${pageHero('hero-explore', 'Explore', 'Start with a question, not a syllabus.', 'Organize the world without flattening it. Explore is the front door into subjects, trails and modes — with room to wander beyond your usual interests.')}
      <section class="section">
        <div class="section-heading">
          <div>
            <div class="eyebrow">Explore sections</div>
            <h2>Clear areas, not a giant scroll.</h2>
          </div>
          <p>Each section gets its own space so the product feels structured, navigable and editorial rather than like a single endless page.</p>
        </div>
        <div class="card-grid card-grid--3">
          ${featureCard('Nature & Life', 'Animals, plants, ecology, bodies and behavior.', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=86', routes.topics)}
          ${featureCard('History & Objects', 'Artifacts, civilizations, archives and reconstruction.', 'https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=1400&q=86', routes.explore)}
          ${featureCard('Science & Mechanisms', 'How things work, how we know, and what remains uncertain.', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1400&q=86', routes.explore)}
          ${featureCard('People & Ideas', 'Language, society, stories and ways of thinking.', 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1400&q=86', routes.explore)}
          ${featureCard('Places & Field', 'Cities, coasts, architecture, geology and the night sky.', 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1400&q=86', routes.field)}
          ${featureCard('Grand Expeditions', 'Interdisciplinary routes through the real world.', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=86', routes.expeditions)}
        </div>
      </section>
      <section class="section section-subtle">
        <div class="section-heading">
          <div>
            <div class="eyebrow">Modes</div>
            <h2>How do you like to explore?</h2>
          </div>
          <p>This changes how you explore, not what is true.</p>
        </div>
        <div class="card-grid card-grid--4">
          ${modeCard('Explorer', 'Maps, routes, field journal and navigation.', 'Follow routes. Find places. Go outside.')}
          ${modeCard('Inventor', 'Blueprints, mechanisms and experiments.', 'Take things apart. Find out why they work.')}
          ${modeCard('Researcher', 'Specimens, notebooks and evidence.', 'Observe. Compare. Test.')}
          ${modeCard('Archaeologist', 'Artifacts, traces and reconstruction.', 'Follow traces. Reconstruct what happened.')}
        </div>
        <div class="action-row">
          <button class="goldbtn" id="broadBtn">SHOW ME SOMETHING I DON'T KNOW I CARE ABOUT</button>
          <button class="ghostbtn" id="randomExplore">RANDOM DOOR</button>
        </div>
      </section>
    </main>
  `;
}

function topicsPage() {
  return `
    <main class="page tone-ocean">
      ${pageHero('hero-topics', 'Topics', 'Questions worth following.', 'Every major subject can hold four depth levels: Discover, Understand, Go Deeper and Research Desk — without artificial age gates.')}
      <section class="section">
        <div class="section-heading">
          <div>
            <div class="eyebrow">Featured topic</div>
            <h2>Octopus Intelligence</h2>
          </div>
          <p>One complete demo topic is live now. From here, the topic system can expand into biology, paleontology, astronomy, archaeology and more.</p>
        </div>
        <div class="topic-feature">
          <div class="topic-feature__image" style="${bg('https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=1600&q=88')}"></div>
          <div class="topic-feature__copy">
            <div class="eyebrow">Nature · Marine Life · Cephalopods</div>
            <h3>What is it like to have eight arms that can act partly on their own?</h3>
            <p>A closer look at one of the most extraordinary nervous systems on Earth.</p>
            <div class="levels">${levelButtons()}</div>
            <div class="action-row"><button class="goldbtn" data-route="${routes.octopus}">OPEN TOPIC →</button></div>
          </div>
        </div>
      </section>
    </main>
  `;
}

function octopusPage() {
  return `
    <main class="page tone-ocean">
      <section class="topic-hero ocean-panel">
        <div class="topic-hero__copy">
          <div class="breadcrumb">Nature › Marine Life › Cephalopods</div>
          <h1>What is it like to have eight arms that can act partly on their own?</h1>
          <p>A closer look at one of the most extraordinary nervous systems on Earth — without hype, pseudo-mysticism or false comparisons.</p>
          <div class="topic-meta">READ · 12 MIN &nbsp;&nbsp; LISTEN · 14 MIN</div>
          <div class="levels">${levelButtons()}</div>
          <button class="goldbtn" id="beginOctopus">BEGIN EXPLORING →</button>
        </div>
        <div class="topic-hero__art" style="${bg('https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=1600&q=88')}">
          <div class="topic-rail">
            <span class="active">DISCOVER</span>
            <span>UNDERSTAND</span>
            <span>GO DEEPER</span>
            <span>RESEARCH DESK</span>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-heading">
          <div>
            <div class="eyebrow">What's inside</div>
            <h2>Follow the topic through clear chapters.</h2>
          </div>
          <p>Structured, not sprawling: a clear progression from accessible introduction to deeper reasoning and sources.</p>
        </div>
        <div class="card-grid card-grid--4 compact-grid">
          ${chapterCard('An extraordinary body', 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=1200&q=82')}
          ${chapterCard('How octopus arms work', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=82')}
          ${chapterCard('Intelligence & behavior', 'https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&w=1200&q=82')}
          ${chapterCard('In their world', 'https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&w=1200&q=82')}
        </div>
      </section>
    </main>
  `;
}

function chapterCard(title, image) {
  return `<article class="chapter-card"><div class="chapter-card__img" style="${bg(image)}"></div><h3>${title}</h3></article>`;
}

function articlePage() {
  return `
    <main class="page tone-ocean">
      <section class="article-hero">
        <button class="backlink" data-route="${routes.octopus}">← OCTOPUS INTELLIGENCE</button>
        <div>
          <div class="eyebrow">Discover</div>
          <h1>Distributed intelligence</h1>
          <p>Read the evidence, separate observation from interpretation, then check what you understood.</p>
        </div>
      </section>

      <section class="section article-layout">
        <article class="panel article-panel">
          <div class="article-meta">DISCOVER · READ 12 MIN · LISTEN 14 MIN</div>
          <p>Octopuses do not control every action from a single command center in the way people often imagine. A large portion of their neurons are located in the arms themselves. That means sensory processing and certain local responses can happen close to where information arrives.</p>
          <p><strong>Evidence:</strong> arm nerves and local circuitry can continue coordinating certain movements. <strong>Interpretation:</strong> the central brain is still important for larger goals and coordination. Those two ideas are not contradictions.</p>
          <div class="evidence-box">
            <h3>Evidence · Interpretation · Uncertainty · Myth</h3>
            <ul>
              <li><strong>Evidence:</strong> local neural processing exists in the arms.</li>
              <li><strong>Interpretation:</strong> control is distributed, not absent.</li>
              <li><strong>Uncertainty:</strong> we are still refining exactly how decision layers interact.</li>
              <li><strong>Myth:</strong> “Each arm has its own mind” is catchy, but misleading.</li>
            </ul>
          </div>
          <div class="review-block">
            <div class="eyebrow">Check what you understood</div>
            <h3>This challenge covers DISCOVER + UNDERSTAND, the levels you've explored.</h3>
            <p>Which statement best matches the current understanding?</p>
            <div class="answers">
              <button class="answer" data-answer="a">Each arm has a fully independent mind and the brain is almost unnecessary.</button>
              <button class="answer" data-answer="b">Arms have local neural processing, but the central brain still matters for coordination and larger goals.</button>
              <button class="answer" data-answer="c">All octopus behavior is centrally micromanaged the way finger movements are in a robot arm.</button>
            </div>
            <div id="quizFeedback" class="quiz-feedback"></div>
            <div class="action-row left">
              <button class="ghostbtn" id="askContext">? ASK</button>
              <button class="ghostbtn" id="explainBtn">EXPLAIN DIFFERENTLY</button>
            </div>
          </div>
        </article>

        <aside class="panel side-panel">
          <h3>Progress</h3>
          <div class="progress-stack">${progressMarkup()}</div>
          <hr>
          <h3>What next?</h3>
          <div class="stack-actions">
            <button class="list-link" data-route="${routes.cabinet}">My Cabinet of Curiosities →</button>
            <button class="list-link" data-route="${routes.catalogue}">Great Catalogue →</button>
            <button class="list-link" data-route="${routes.field}">Field Quest demo →</button>
          </div>
        </aside>
      </section>
    </main>
  `;
}

function progressMarkup() {
  return Object.entries(state.progress).map(([key, value]) => `
    <div class="progress-item ${value !== 'NOT STARTED' ? 'done' : ''}">
      <span class="dot"></span>
      <div><strong>${key.toUpperCase()}</strong><small>${value}</small></div>
    </div>
  `).join('');
}

function expeditionsPage() {
  return `
    <main class="page tone-expedition">
      ${pageHero('hero-expeditions', 'Expeditions', 'Turn a place into a question.', 'Expeditions now have a clearer structure: intro, planner, route result and next actions — with a more navigational palette instead of the old brown wash.')}

      <section class="section section-grid section-grid--2">
        <div class="panel planner-panel">
          <div class="eyebrow">Plan an expedition</div>
          <h2>Build your route.</h2>
          <div class="field-grid field-grid--2">
            <label class="field">
              <span>Destination</span>
              <input id="destination" value="Târgoviște">
            </label>
            <label class="field">
              <span>Dates</span>
              <input id="dates" value="17–19 October">
            </label>
          </div>
          <div class="field">
            <span>How much walking are we doing?</span>
            <div class="choice-row">
              ${['LIGHT', 'MODERATE', 'I HAVE LEGS 😤'].map(w => `<button class="choice ${state.walk === w ? 'active' : ''}" data-walk="${w}">${w}</button>`).join('')}
            </div>
          </div>
          <div class="field">
            <span>What sounds interesting?</span>
            <div class="interest-grid">
              ${['History', 'Nature', 'Architecture', 'Engineering', 'Science', 'Surprise me'].map(label => `<button class="interest">${label}</button>`).join('')}
            </div>
          </div>
          <button class="goldbtn full" id="buildRoute">BUILD MY EXPEDITION</button>
          <p class="supporting-copy">Designed for cities, villages, limited budgets and different mobility levels.</p>
        </div>

        <div class="panel route-panel route-panel--map">
          <div class="route-panel__overlay"></div>
          <div class="route-summary">
            <div class="eyebrow">Your expedition</div>
            <h2>Târgoviște</h2>
            <p>17–19 October · 6 stops</p>
            <div id="routeStops">
              <div class="route-stop"><strong>1 · The Royal Court</strong><span>How to read the layers of a capital city.</span></div>
              <div class="route-stop"><strong>2 · Chindia Tower</strong><span>Look for clues from different periods.</span></div>
              <div class="route-stop"><strong>3 · Hidden details</strong><span>Small things, big stories.</span></div>
            </div>
            <div class="action-row left wrap">
              <button class="ghostbtn" data-route="${routes.field}">OPEN FIELD MODE →</button>
              <button class="ghostbtn">VIEW FULL ROUTE →</button>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-heading">
          <div>
            <div class="eyebrow">Grand expeditions</div>
            <h2>Across the Atlantic</h2>
          </div>
          <p>Instead of text floating awkwardly, Grand Expeditions now sit in a clearer editorial block with readable structure.</p>
        </div>
        <div class="grand-expedition panel">
          <div>
            <div class="eyebrow">Interdisciplinary route</div>
            <h3>Across the Atlantic</h3>
          </div>
          <div class="grand-links">
            <span>Navigation → astronomy</span>
            <span>ocean currents → meteorology</span>
            <span>shipbuilding → cartography</span>
            <span>history → colonialism and consequences</span>
            <span>migration → genetics</span>
          </div>
        </div>
      </section>
    </main>
  `;
}

function fieldPage() {
  return `
    <main class="page tone-field">
      ${pageHero('hero-field', 'Field', 'The world becomes the game board.', 'Observation, evidence and safe real-world quests. Museum rules, wildlife, protected places and mobility needs come first.')}
      <section class="section">
        <div class="section-heading">
          <div>
            <div class="eyebrow">Field Quest demo</div>
            <h2>Look closer. Record what you actually saw.</h2>
          </div>
          <p>My Observation, Suggested Identification and Verified Information stay clearly separated.</p>
        </div>
        <div class="section-grid section-grid--2">
          <div class="panel phone-mock">
            <div class="phone-ui">
              <div class="phone-title">Field Quest 02/06</div>
              <h3>Look above the entrance.</h3>
              <p>One architectural detail tells you something about when this building changed. Can you find it?</p>
              <button class="goldbtn full">I FOUND SOMETHING</button>
              <button class="ghostbtn full">Hint</button>
            </div>
          </div>
          <div class="panel then-now-panel">
            <div class="eyebrow">Then ↔ Now</div>
            <h3>This place changed. Evidence comes first.</h3>
            <p>After a successful discovery, reveal historical context and connect the observation back to deeper Sophia d'Or content.</p>
            <div class="mini-grid">
              <div class="mini-card"><strong>My Observation</strong><p>An arch detail appears different from the rest of the facade.</p></div>
              <div class="mini-card"><strong>Suggested Identification</strong><p>Possible later renovation or repair.</p></div>
              <div class="mini-card"><strong>Verified Information</strong><p>Historical documentation confirms a 1930s intervention.</p></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  `;
}

function cabinetPage() {
  return `
    <main class="page tone-cabinet">
      ${pageHero('hero-cabinet', 'Personal research room', 'Your Cabinet', 'More organized, less chaotic: clear zones for trails, questions, field notes and collections, while keeping the cabinet atmosphere.')}
      <section class="section section-grid section-grid--2 section-grid--mobile-1">
        <div class="panel tall-panel">
          <div class="eyebrow">Current trail</div>
          <h2>How does an octopus think?</h2>
          <p>DISCOVER · EXPLORING</p>
          <button class="ghostbtn" data-route="${routes.article}">CONTINUE TOPIC →</button>
        </div>
        <div class="panel tall-panel">
          <div class="eyebrow">My questions</div>
          <div class="question-stack">
            ${state.questions.map(q => `<article class="question-card">${escapeHTML(q)}</article>`).join('')}
          </div>
          <button class="ghostbtn" id="askFromCabinet">ADD QUESTION →</button>
        </div>
      </section>
      <section class="section">
        <div class="card-grid card-grid--4 card-grid--cabinet">
          ${cabinetCard('The Great Catalogue', `${state.collections.length} discovery unlocked`, routes.catalogue)}
          ${cabinetCard('Field Notes', 'Observations, dates, places, photographs.', routes.field)}
          ${cabinetCard('Expeditions', 'Saved routes and planned journeys.', routes.expeditions)}
          ${cabinetCard('Curiosity Passport', 'Oceans explored · Questions investigated · WELCOME BACK.', routes.explore)}
        </div>
      </section>
    </main>
  `;
}

function cabinetCard(title, copy, route) {
  return `<button class="panel cabinet-card" data-route="${route}"><h3>${title}</h3><p>${copy}</p></button>`;
}

function cataloguePage() {
  return `
    <main class="page tone-catalogue">
      ${pageHero('hero-catalogue', 'Great Catalogue', 'Collect what you actually understand.', 'Opening a page is not enough. Entries unlock from meaningful exploration, checks and mastery.')}
      <section class="section">
        <div class="catalogue-tabs">
          <button class="active">Collections</button>
          <button>Explorer's Trunk</button>
          <button>Discovery Gifts</button>
        </div>
        <div class="card-grid card-grid--4">
          ${catalogueCard('Common octopus', 'Octopus vulgaris', true, 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=1200&q=84')}
          ${catalogueCard('Ammonite', 'Extinct cephalopod', false, 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=84')}
          ${catalogueCard('Quartz', 'SiO₂', false, 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=84')}
          ${catalogueCard('Lunar chart', 'Celestial object', false, 'https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?auto=format&fit=crop&w=1200&q=84')}
        </div>
      </section>
    </main>
  `;
}

function catalogueCard(title, subtitle, unlocked, image) {
  return `
    <article class="panel catalogue-card ${unlocked ? 'unlocked' : 'locked'}">
      <div class="catalogue-card__img" style="${bg(image)}"></div>
      <div class="catalogue-card__body">
        <small>${unlocked ? 'UNLOCKED' : 'LOCKED'}</small>
        <h3>${title}</h3>
        <p>${subtitle}</p>
      </div>
    </article>
  `;
}

function aboutPage() {
  return `
    <main class="page tone-about">
      ${pageHero('hero-about', 'About Sophia d\'Or', 'We don\'t make the world more interesting.', 'We show you how interesting it already is.')}
      <section class="section">
        <div class="card-grid card-grid--2">
          <article class="panel"><h3>Evidence first</h3><p>Evidence, interpretation, uncertainty and myth are explicitly distinguished.</p></article>
          <article class="panel"><h3>No intellectual filter bubbles</h3><p>Curiosity trails are designed to broaden interests rather than trap users inside one topic forever.</p></article>
          <article class="panel"><h3>Field exploration matters</h3><p>Sophia d'Or should not imply that knowledge belongs only to people who can travel far or spend heavily.</p></article>
          <article class="panel"><h3>No manipulative gamification</h3><p>No pay-to-win learning, no streak guilt and no fake rarity systems.</p></article>
        </div>
      </section>
    </main>
  `;
}

function featureCard(title, copy, image, route) {
  return `
    <button class="feature-card" data-route="${route}">
      <div class="feature-card__img" style="${bg(image)}"></div>
      <div class="feature-card__body">
        <h3>${title}</h3>
        <p>${copy}</p>
      </div>
    </button>
  `;
}

function modeCard(title, eyebrow, copy) {
  return `
    <button class="panel mode-card ${state.mode === title ? 'selected' : ''}" data-mode="${title}">
      <div class="eyebrow">${eyebrow}</div>
      <h3>${title}</h3>
      <p>${copy}</p>
    </button>
  `;
}

function levelButtons() {
  return [
    ['discover', 'DISCOVER'],
    ['understand', 'UNDERSTAND'],
    ['deeper', 'GO DEEPER'],
    ['research', 'RESEARCH DESK']
  ].map(([key, label]) => `<button class="level ${key === 'discover' ? 'active' : ''}" data-level="${key}">${label}</button>`).join('');
}

function askModal(context = 'General exploration') {
  el('#modalHost').innerHTML = `
    <div class="modal-wrap">
      <div class="modal-card">
        <div class="eyebrow">? ASK</div>
        <h3>What are you curious about?</h3>
        <p class="modal-context">Context: ${escapeHTML(context)}</p>
        <textarea id="questionText" placeholder="Ask the question you don't want to lose..."></textarea>
        <div class="action-row right wrap">
          <button class="ghostbtn" id="closeModal">Cancel</button>
          <button class="goldbtn" id="saveQuestion">Save question</button>
        </div>
      </div>
    </div>
  `;
  bindModal();
}

function explainModal() {
  el('#modalHost').innerHTML = `
    <div class="modal-wrap">
      <div class="modal-card">
        <div class="eyebrow">Explain differently</div>
        <h3>Think of a jazz ensemble, not a puppet.</h3>
        <p>The central brain is closer to a bandleader setting direction while each arm has enough local processing to respond to what it senses in real time. The analogy is imperfect — but it helps separate coordination from micromanagement.</p>
        <div class="action-row right"><button class="goldbtn" id="closeModal">Close</button></div>
      </div>
    </div>
  `;
  bindModal();
}

function bindModal() {
  if (el('#closeModal')) el('#closeModal').onclick = () => el('#modalHost').innerHTML = '';
  if (el('#saveQuestion')) {
    el('#saveQuestion').onclick = () => {
      const text = el('#questionText').value.trim();
      if (!text) return;
      state.questions.push(text);
      save();
      el('#modalHost').innerHTML = '';
      toast('Question saved to your Cabinet.');
      render();
    };
  }
}

function toast(message) {
  const node = el('#toast');
  if (!node) return;
  node.textContent = message;
  node.classList.remove('hidden');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => node.classList.add('hidden'), 2600);
}

function pageFor(route) {
  if (route === routes.home) return homePage();
  if (route === routes.explore) return explorePage();
  if (route === routes.topics) return topicsPage();
  if (route === routes.octopus) return octopusPage();
  if (route === routes.article) return articlePage();
  if (route === routes.expeditions) return expeditionsPage();
  if (route === routes.field) return fieldPage();
  if (route === routes.cabinet) return cabinetPage();
  if (route === routes.catalogue) return cataloguePage();
  if (route === routes.about) return aboutPage();
  return homePage();
}

function render() {
  const route = currentRoute();
  const app = document.querySelector('#app');
  app.innerHTML = `<div class="shell">${nav()}${pageFor(route)}${footer()}</div><div id="modalHost"></div><div id="toast" class="toast hidden"></div>`;
  document.title = `SOPHIA D'OR — ${route.replace('#/', '').replaceAll('/', ' · ') || 'Look closer'}`;
  bind();
}

function bind() {
  all('[data-route]').forEach(btn => btn.onclick = () => navigate(btn.dataset.route));
  if (el('#menuBtn')) el('#menuBtn').onclick = () => el('#mobileMenu').classList.toggle('hidden');
  const random = () => {
    const options = [routes.octopus, routes.field, routes.catalogue, routes.expeditions];
    navigate(options[Math.floor(Math.random() * options.length)]);
    setTimeout(() => toast('Random Door opened — genuinely random among the current demo destinations.'), 30);
  };
  if (el('#randomBtn')) el('#randomBtn').onclick = random;
  if (el('#randomDesk')) el('#randomDesk').onclick = random;
  if (el('#randomExplore')) el('#randomExplore').onclick = random;
  if (el('#beginOctopus')) {
    el('#beginOctopus').onclick = () => {
      state.progress.discover = 'EXPLORING';
      save();
      navigate(routes.article);
    };
  }
  if (el('#broadBtn')) el('#broadBtn').onclick = () => { navigate(routes.field); toast('Breadth recommendation: from cephalopod control to reading architecture in the field.'); };

  all('[data-mode]').forEach(btn => btn.onclick = () => { state.mode = btn.dataset.mode; save(); render(); toast(`${state.mode} mode selected.`); });
  all('[data-walk]').forEach(btn => btn.onclick = () => { state.walk = btn.dataset.walk; save(); render(); });
  all('.interest').forEach(btn => btn.onclick = () => btn.classList.toggle('active'));

  all('.answer').forEach(btn => btn.onclick = () => {
    all('.answer').forEach(x => x.classList.remove('correct', 'wrong'));
    const correct = btn.dataset.answer === 'b';
    btn.classList.add(correct ? 'correct' : 'wrong');
    if (correct) {
      state.progress.discover = 'CHECKED';
      state.progress.understand = 'CHECKED';
      save();
      el('#quizFeedback').innerHTML = '<p>Good. Local processing and central coordination can both be true at the same time.</p>';
      toast('Understanding checked.');
    } else {
      el('#quizFeedback').innerHTML = '<p>Not quite. Review the idea: local arm processing does not mean the central brain stops mattering.</p><button class="inline-link" id="reviewIdea">Review the idea →</button>';
      const review = () => window.scrollTo({ top: 240, behavior: 'smooth' });
      setTimeout(() => { if (el('#reviewIdea')) el('#reviewIdea').onclick = review; }, 0);
    }
  });

  if (el('#askContext')) el('#askContext').onclick = () => askModal('Selected concept: partly decentralized arm control');
  if (el('#explainBtn')) el('#explainBtn').onclick = explainModal;
  if (el('#askFromCabinet')) el('#askFromCabinet').onclick = () => askModal('Cabinet question list');
  if (el('#buildRoute')) {
    el('#buildRoute').onclick = () => {
      const destination = el('#destination')?.value?.trim() || 'Your destination';
      const dates = el('#dates')?.value?.trim() || 'Dates';
      el('#routeStops').innerHTML = `
        <div class="route-stop"><strong>1 · Read the place</strong><span>Find one detail that reveals a different construction period.</span></div>
        <div class="route-stop"><strong>2 · Evidence before interpretation</strong><span>Record what you can actually see before guessing why it is there.</span></div>
        <div class="route-stop"><strong>3 · Then ↔ Now</strong><span>Compare a historical trace with what exists now.</span></div>
      `;
      const heading = document.querySelector('.route-summary h2');
      const meta = document.querySelector('.route-summary p');
      if (heading) heading.textContent = destination;
      if (meta) meta.textContent = `${dates} · 6 stops`;
      toast(`${destination} expedition prepared.`);
    };
  }
}

window.addEventListener('hashchange', () => {
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

if (!location.hash) history.replaceState(null, '', routes.home);
render();
