(function () {
  const D = window.WAMIMS_DATA;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  const state = {
    balance: Number(localStorage.getItem("wamims_cnotes") || 250),
    backed: JSON.parse(localStorage.getItem("wamims_backed") || "[]"),
    posts: JSON.parse(localStorage.getItem("wamims_user_posts") || "[]"),
    votes: JSON.parse(localStorage.getItem("wamims_votes") || "{}"),
    chat: JSON.parse(localStorage.getItem("wamims_chat") || "[]"),
    notifOpen: false
  };

  function save() {
    localStorage.setItem("wamims_cnotes", String(state.balance));
    localStorage.setItem("wamims_backed", JSON.stringify(state.backed));
    localStorage.setItem("wamims_user_posts", JSON.stringify(state.posts));
    localStorage.setItem("wamims_votes", JSON.stringify(state.votes));
    localStorage.setItem("wamims_chat", JSON.stringify(state.chat));
  }

  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove("show"), 2600);
  }

  function userById(id) {
    return D.users.find((u) => u.id === id) || D.users[0];
  }
  function hostById(id) {
    return D.hosts.find((h) => h.id === id);
  }
  function hubById(id) {
    return D.hubs.find((h) => h.id === id) || { id, name: id, icon: "📌" };
  }

  function setActiveNav(route) {
    $$(".nav-btn").forEach((b) => b.classList.toggle("active", b.dataset.route === route));
    $$(".side-item").forEach((b) => {
      const r = b.dataset.route;
      b.classList.toggle("active", r === route || (route.startsWith("hub/") && r === route.split("/")[1]));
    });
  }

  function aiHostBlock(host) {
    return `
      <div class="host-row">
        <img src="${host.avatar}" alt="${host.name}">
        <div>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
            <strong>${host.name}</strong>
            <span class="ai-badge">AI host</span>
          </div>
          <div class="muted" style="font-size:12px">${host.nationality} · ${host.voice}</div>
          <p class="ai-note">AI-generated presenter for WAMIMS Concept Lab. Not a real human inventor. Concepts owned by <strong>WAMIMS Concept Lab</strong>.</p>
        </div>
      </div>`;
  }

  function renderHome() {
    const hubs = D.hubs.map((h) => `
      <button class="hub-tile" data-go="#/hub/${h.id}">
        <div class="ico">${h.icon}</div>
        <div class="label">${h.name}</div>
      </button>`).join("");

    const trending = D.trending.map((t) => `
      <div class="trend-item" data-go="${t.href}">
        <img src="${t.img}" alt="">
        <div><div class="t">${t.title}</div><div class="s">${t.sub}</div></div>
      </div>`).join("");

    return `
      <section class="hero">
        <div class="hero-sign">
          <img src="assets/chalkboard-hero.jpg" alt="Walk A Mile In My Shoes chalkboard">
          <h1 class="brush-title">WAMIMS</h1>
          <p class="tagline">A Community Platform for Real People, Real Struggles &amp; Real Change</p>
        </div>
        <ul class="checklist">
          <li>Mental Health</li>
          <li>Creativity</li>
          <li>Opportunity</li>
          <li>Support</li>
          <li>Community</li>
          <li>A Better World</li>
        </ul>
      </section>

      <div class="hub-grid">${hubs}</div>

      <section class="banner">
        <img src="assets/podcast-banner.jpg" alt="Podcast studio mic and headphones">
        <div>
          <h2>PODCASTS &amp; LIVE TALKS</h2>
          <ul class="checklist">
            <li>Spiritual Talks</li>
            <li>Mental Health Conversations</li>
            <li>Real Life Stories</li>
            <li>Self Development</li>
            <li>Community Issues</li>
            <li>World &amp; Culture Talks</li>
          </ul>
          <button class="btn" data-go="#/hub/podcast" style="margin-top:10px">LISTEN NOW ▶</button>
          <div class="dots"><span class="dot on"></span><span class="dot"></span><span class="dot"></span></div>
        </div>
      </section>

      <div class="bottom-strip">
        <div class="pill">Support Each Other</div>
        <div class="pill">Showcase Your Talent</div>
        <div class="pill">Find Opportunities</div>
        <div class="pill">Get Involved</div>
        <div class="pill">Make a Difference</div>
      </div>

      <div class="card" style="margin-top:8px">
        <h3>Quick links</h3>
        <div class="post-actions">
          <button class="btn" data-go="#/concepts">Concept Lab</button>
          <button class="btn" data-go="#/battles">VS Battles</button>
          <button class="btn" data-go="#/wallet">C-Notes Wallet</button>
          <button class="btn" data-go="#/hub/mental-health">Mental Health</button>
        </div>
      </div>

      <!-- mobile right-col mirror -->
      <div class="card mobile-only-block" style="display:none" id="mobile-side-mirror">
        <h3>Trending on WAMIMS</h3>
        ${trending}
      </div>`;
  }

  function renderRight() {
    const trending = D.trending.map((t) => `
      <div class="trend-item" data-go="${t.href}">
        <img src="${t.img}" alt="">
        <div><div class="t">${t.title}</div><div class="s">${t.sub}</div></div>
      </div>`).join("");
    $(".rightcol").innerHTML = `
      <div class="card" style="padding:0;border:none;background:transparent;box-shadow:none">
        <h3>Create a Post</h3>
        <textarea class="textarea" id="create-post" placeholder="Share your thoughts, music, video, project or story..."></textarea>
        <div class="post-actions">
          <span class="chip">📷 Photo</span>
          <span class="chip">🎥 Video</span>
          <span class="chip">🎧 Audio</span>
          <button class="btn primary" id="btn-post" style="margin-left:auto">Post</button>
        </div>
        <p class="muted" style="font-size:11px;margin:8px 0 0">Demo posts stay on this device (localStorage).</p>
      </div>
      <div>
        <h3>Trending on WAMIMS</h3>
        ${trending}
      </div>
      <div>
        <h3>Upcoming Events</h3>
        <div class="event-item" data-go="#/hub/events">
          <div class="thumb" style="display:flex;align-items:center;justify-content:center;background:#111;border:1px solid var(--border);border-radius:8px;width:56px;height:56px">📅</div>
          <div>
            <div class="t">WAMIMS Community Meet Up</div>
            <div class="s">Creative Showcase &amp; Live Podcast</div>
          </div>
        </div>
      </div>
      <button class="btn join-btn" data-go="#/profile/you">JOIN THE WAMIMS COMMUNITY</button>
      <div class="post-actions" style="justify-content:space-between">
        <button class="btn ghost" data-go="#/wallet">💎 ${state.balance} C-Notes</button>
        <button class="btn ghost" data-go="#/battles">⚔️ VS</button>
      </div>`;
  }

  function renderHub(id) {
    if (id === "mental-health" || id === "support") return renderMentalHealth(id);
    const hub = hubById(id);
    const posts = [...(D.posts[id] || []), ...state.posts.filter((p) => p.hub === id)];
    const list = posts.map((p) => {
      const u = userById(p.userId || "you");
      return `<article class="post">
        <div class="post-meta">
          <img src="${u.avatar}" alt="">
          <div>
            <div class="name">${u.name} <span class="muted">${u.handle}</span></div>
            <div class="when">${p.when || "just now"}</div>
          </div>
        </div>
        <p>${escapeHtml(p.text)}</p>
      </article>`;
    }).join("") || `<p class="muted">No posts yet in this hub.</p>`;

    return `
      <div class="page-head">
        <h1>${hub.icon || ""} ${hub.name || hub.short || id}</h1>
        <button class="btn ghost" data-go="#/">← Home</button>
      </div>
      <p class="muted">Demo hub feed. Be kind. No hate.</p>
      <div style="margin:12px 0">${list}</div>`;
  }

  function renderMentalHealth(id) {
    const posts = (D.posts[id] || []).map((p) => {
      const u = userById(p.userId);
      return `<article class="post">
        <div class="post-meta"><img src="${u.avatar}" alt=""><div>
          <div class="name">${u.name}</div><div class="when">${p.when}</div>
        </div></div><p>${escapeHtml(p.text)}</p></article>`;
    }).join("");
    return `
      <div class="page-head">
        <h1>🧠 Mental Health &amp; Support</h1>
        <button class="btn ghost" data-go="#/">← Home</button>
      </div>
      <div class="disclaimer">
        <strong>Important:</strong> WAMIMS is a peer community. It is <strong>not a substitute for professional help</strong>, diagnosis or emergency care.
        If you or someone else is in immediate danger, call <strong>999</strong> (UK) or go to A&amp;E.
      </div>
      <div class="card" style="margin-top:12px">
        <h3>UK helplines (verified)</h3>
        <div class="helpline"><div><strong>Samaritans</strong><div class="muted">24/7 listening</div></div><a href="tel:116123">116 123</a></div>
        <div class="helpline"><div><strong>Shout</strong><div class="muted">Crisis text line</div></div><span>Text <strong>SHOUT</strong> to <a href="sms:85258">85258</a></span></div>
        <div class="helpline"><div><strong>NHS 111</strong><div class="muted">Urgent mental health option</div></div><a href="tel:111">111</a></div>
        <p class="muted" style="font-size:12px;margin-top:8px">Sources: NHS and Samaritans public pages. Numbers checked for this preview.</p>
      </div>
      <div style="margin-top:12px">${posts}</div>`;
  }

  function renderConcepts() {
    const cards = D.concepts.map((c) => {
      const host = hostById(c.hostId);
      const backed = state.backed.includes(c.id);
      return `<article class="concept-card">
        <div>
          <img class="proto" src="${c.image}" alt="${c.title}">
          <div class="video-slot">▶ Prototype video slot (demo placeholder)</div>
        </div>
        <div>
          ${aiHostBlock(host)}
          <div class="muted" style="font-size:12px;margin-bottom:4px">${c.type}</div>
          <h2 style="margin:0 0 8px;font-family:var(--brush)">${c.title}</h2>
          <p>${c.blurb}</p>
          <p class="muted" style="font-size:12px">Ownership: <strong>${c.ownership}</strong></p>
          <button class="btn ${backed ? "coming" : "primary"}" data-back="${c.id}" ${backed ? "disabled" : ""}>
            ${backed ? "✓ Backed (demo)" : "Back this idea (demo)"}
          </button>
        </div>
      </article>`;
    }).join("");
    return `
      <div class="page-head">
        <h1>💡 Concept Lab</h1>
        <button class="btn ghost" data-go="#/">← Home</button>
      </div>
      <p class="muted">Invention, music and art concepts presented by labelled AI hosts. Demo backing only – no real payments.</p>
      ${cards}`;
  }

  function renderBattles(battleId) {
    if (battleId) return renderBattleRoom(battleId);
    const list = D.battles.map((b) => `
      <div class="battle-card">
        <div>
          <div style="font-weight:900">${b.type}</div>
          <div class="muted">${b.a} vs ${b.b} · ${b.status}</div>
        </div>
        <button class="btn" data-go="#/battles/${b.id}">Enter room</button>
      </div>`).join("");
    return `
      <div class="page-head">
        <h1>⚔️ VS Battles</h1>
        <button class="btn ghost" data-go="#/">← Home</button>
      </div>
      <div class="rules-note">
        <strong>Community rules:</strong> Talent vs talent only — rap, art, hair, fashion, debate, podcast clash, dance, beat-making, gaming.
        <strong>No beef, no hate, no harassment.</strong> Gifts support creators. Bad behaviour gets you removed (demo rule).
      </div>
      <div class="battle-list" style="margin-top:12px">${list}</div>`;
  }

  function renderBattleRoom(id) {
    const b = D.battles.find((x) => x.id === id) || D.battles[0];
    const v = state.votes[b.id] || { a: 58, b: 42 };
    const total = Math.max(1, v.a + v.b);
    const aPct = Math.round((v.a / total) * 100);
    const bPct = 100 - aPct;
    const chat = (state.chat.length ? state.chat : [
      { n: "System", t: "Welcome to the demo battle room." },
      { n: "Jay", t: "Talent only – keep it clean." }
    ]).map((c) => `<div class="chat-line"><strong>${escapeHtml(c.n)}:</strong> ${escapeHtml(c.t)}</div>`).join("");

    return `
      <div class="page-head">
        <h1>${b.type}</h1>
        <button class="btn ghost" data-go="#/battles">← All battles</button>
      </div>
      <div class="rules-note">Talent vs talent. No beef / hate. Demo room – gifts use local C-Notes only.</div>
      <div class="battle-room" style="margin-top:12px">
        <div class="stage">
          <div class="video-tiles">
            <div class="vtile" style="background-image:linear-gradient(180deg,rgba(0,0,0,.2),rgba(0,0,0,.75)),url('${b.imgA}')"><span class="tag">${b.a}</span></div>
            <div class="vtile" style="background-image:linear-gradient(180deg,rgba(0,0,0,.2),rgba(0,0,0,.75)),url('${b.imgB}')"><span class="tag">${b.b}</span></div>
          </div>
          <div class="timer" id="battle-timer">02:59</div>
          <div class="muted" style="text-align:center;margin-bottom:6px">Live voice / video mockup · Vote bar</div>
          <div class="vote-bar"><div class="a" style="width:${aPct}%"></div><div class="b" style="width:${bPct}%"></div></div>
          <div style="display:flex;justify-content:space-between;font-size:12px;margin-top:4px">
            <span>${b.a} ${aPct}%</span><span>${b.b} ${bPct}%</span>
          </div>
          <div class="post-actions" style="margin-top:10px">
            <button class="btn" data-vote="${b.id}:a">Vote ${b.a}</button>
            <button class="btn" data-vote="${b.id}:b">Vote ${b.b}</button>
          </div>
          <div class="gift-row">
            <button class="gift" data-gift="5">🎁 5</button>
            <button class="gift" data-gift="20">💎 20</button>
            <button class="gift" data-gift="50">👑 50</button>
            <span class="muted">Balance: <strong id="live-bal">${state.balance}</strong> C-Notes</span>
          </div>
        </div>
        <div class="chat">
          <h3 style="margin-top:0">Live chat</h3>
          <div class="chat-log" id="chat-log">${chat}</div>
          <div class="chat-input">
            <input id="chat-in" placeholder="Say something supportive..." maxlength="140">
            <button class="btn" id="chat-send">Send</button>
          </div>
        </div>
      </div>`;
  }

  function renderWallet() {
    return `
      <div class="page-head">
        <h1>💎 C-Notes Wallet</h1>
        <button class="btn ghost" data-go="#/">← Home</button>
      </div>
      <div class="card">
        <div class="muted">Demo balance (stored on this device)</div>
        <div class="wallet-balance">${state.balance} <span style="font-size:18px">C-Notes</span></div>
        <p class="muted">C-Notes are a preview currency. No real money moves in this build.</p>
      </div>
      <div class="card" style="margin-top:12px">
        <h3>Buy C-Notes packs</h3>
        <div class="pack-grid">
          <div class="pack"><div style="font-size:22px;font-weight:900">100</div><div class="muted">Starter</div><button class="btn coming" disabled>Coming soon</button></div>
          <div class="pack"><div style="font-size:22px;font-weight:900">500</div><div class="muted">Creator</div><button class="btn coming" disabled>Coming soon</button></div>
          <div class="pack"><div style="font-size:22px;font-weight:900">1200</div><div class="muted">Community</div><button class="btn coming" disabled>Coming soon</button></div>
        </div>
        <p class="muted" style="font-size:12px;margin-top:10px">Payments / PayPal are not connected. Buttons are labelled Coming soon on purpose.</p>
        <button class="btn" id="demo-topup" style="margin-top:8px">Add 50 demo C-Notes</button>
      </div>
      <div class="card" style="margin-top:12px">
        <h3>Creator withdrawal</h3>
        <p>Future payouts will go to creators via PayPal after ID checks. Planned platform fee: <strong>6%</strong>. Creators must be <strong>18+</strong>.</p>
        <button class="btn coming" disabled>Withdraw via PayPal — Coming soon</button>
        <p class="muted" style="font-size:12px;margin-top:8px">This page is a preview only. No payouts, no PayPal API, no card capture.</p>
      </div>`;
  }

  function renderProfile(id) {
    const u = userById(id || "you");
    return `
      <div class="page-head">
        <h1>Profile</h1>
        <button class="btn ghost" data-go="#/">← Home</button>
      </div>
      <div class="profile-card">
        <img src="${u.avatar}" alt="${u.name}">
        <div>
          <h2 style="margin:0">${u.name}</h2>
          <div class="muted">${u.handle} · ${u.location}</div>
          <p>${u.bio}</p>
          <div class="post-actions">
            <button class="btn" data-go="#/wallet">Wallet</button>
            <button class="btn" data-go="#/concepts">Concept Lab</button>
            <button class="btn" data-go="#/battles">VS Battles</button>
          </div>
        </div>
      </div>
      <p class="muted" style="margin-top:12px">Human community profiles. AI presenters only appear in Concept Lab with an AI host badge.</p>`;
  }

  function renderExplore() {
    return `
      <div class="page-head"><h1>Explore</h1></div>
      <div class="hub-grid">${D.hubs.map((h) => `
        <button class="hub-tile" data-go="#/hub/${h.id}"><div class="ico">${h.icon}</div><div class="label">${h.name}</div></button>`).join("")}
      </div>
      <div class="post-actions" style="margin-top:16px">
        <button class="btn" data-go="#/concepts">Concept Lab</button>
        <button class="btn" data-go="#/battles">VS Battles</button>
        <button class="btn" data-go="#/hub/events">Events</button>
      </div>`;
  }

  function renderCreate() {
    return `
      <div class="page-head"><h1>Create</h1></div>
      <div class="card">
        <textarea class="textarea" id="create-post-page" placeholder="Share your thoughts, music, video, project or story..."></textarea>
        <div class="post-actions">
          <span class="chip">📷 Photo</span><span class="chip">🎥 Video</span><span class="chip">🎧 Audio</span>
          <select id="post-hub" style="background:#111;color:#fff;border:1px solid var(--border);border-radius:8px;padding:6px">
            ${D.hubs.map((h) => `<option value="${h.id}">${h.name}</option>`).join("")}
          </select>
          <button class="btn primary" id="btn-post-page">Post</button>
        </div>
      </div>`;
  }

  function renderMessages() {
    return `
      <div class="page-head"><h1>Messages</h1></div>
      <div class="card"><p class="muted">Demo inbox – no real messaging backend.</p>
        <article class="post"><div class="post-meta"><img src="assets/host-amara.jpg"><div>
          <div class="name">WAMIMS Concept Lab <span class="ai-badge">system</span></div>
          <div class="when">demo</div></div></div>
          <p>Thanks for previewing Concept Lab. AI hosts are labelled on purpose.</p>
        </article>
      </div>`;
  }

  function renderNotifications() {
    return `
      <div class="page-head"><h1>Notifications</h1></div>
      <div class="card">
        <div class="trend-item"><div class="thumb" style="display:flex;align-items:center;justify-content:center">⚔️</div>
          <div><div class="t">VS Battle starting soon</div><div class="s">Rap Battle · demo</div></div></div>
        <div class="trend-item"><div class="thumb" style="display:flex;align-items:center;justify-content:center">💡</div>
          <div><div class="t">New concept in Concept Lab</div><div class="s">MileLight Solar Daypack</div></div></div>
        <div class="trend-item"><div class="thumb" style="display:flex;align-items:center;justify-content:center">💎</div>
          <div><div class="t">You received demo C-Notes</div><div class="s">Preview wallet top-up</div></div></div>
      </div>`;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function route() {
    const hash = location.hash.replace(/^#\/?/, "") || "home";
    const [root, a, b] = hash.split("/");
    let html = "";
    let active = root;

    if (root === "home" || root === "") { html = renderHome(); active = "home"; }
    else if (root === "explore") html = renderExplore();
    else if (root === "create") html = renderCreate();
    else if (root === "messages") html = renderMessages();
    else if (root === "notifications") html = renderNotifications();
    else if (root === "hub") { html = renderHub(a); active = a || "home"; }
    else if (root === "concepts") html = renderConcepts();
    else if (root === "battles") { html = renderBattles(a); active = "battles"; }
    else if (root === "wallet") html = renderWallet();
    else if (root === "profile") html = renderProfile(a);
    else if (root === "community") html = renderHub("community");
    else html = renderHome();

    $("#main").innerHTML = html;
    renderRight();
    setActiveNav(active === "home" ? "home" : (root === "hub" ? a : root));
    bindDynamic();
    if (root === "battles" && a) startTimer();
    window.scrollTo(0, 0);
  }

  let timerIv;
  function startTimer() {
    clearInterval(timerIv);
    let sec = 179;
    const el = $("#battle-timer");
    if (!el) return;
    timerIv = setInterval(() => {
      sec = Math.max(0, sec - 1);
      const m = String(Math.floor(sec / 60)).padStart(2, "0");
      const s = String(sec % 60).padStart(2, "0");
      el.textContent = `${m}:${s}`;
    }, 1000);
  }

  function floatGift(emoji, x, y) {
    const n = document.createElement("div");
    n.className = "gift-float";
    n.textContent = emoji;
    n.style.left = x + "px";
    n.style.top = y + "px";
    document.body.appendChild(n);
    setTimeout(() => n.remove(), 1400);
  }

  function bindDynamic() {
    $$("[data-go]").forEach((el) => el.addEventListener("click", () => { location.hash = el.dataset.go.replace(/^#/, "#"); if (!el.dataset.go.startsWith("#")) location.hash = "#/" + el.dataset.go; }));
    // fix: data-go already includes #/
    $$("[data-go]").forEach((el) => {
      el.onclick = () => { location.hash = el.getAttribute("data-go"); };
    });

    const postBtn = $("#btn-post");
    if (postBtn) postBtn.onclick = () => doPost($("#create-post")?.value, "community");
    const postBtn2 = $("#btn-post-page");
    if (postBtn2) postBtn2.onclick = () => doPost($("#create-post-page")?.value, $("#post-hub")?.value || "community");

    $$("[data-back]").forEach((btn) => {
      btn.onclick = () => {
        const id = btn.dataset.back;
        if (!state.backed.includes(id)) {
          state.backed.push(id);
          save();
          toast("Thanks – idea backed in this demo (no payment).");
          route();
        }
      };
    });

    $$("[data-vote]").forEach((btn) => {
      btn.onclick = () => {
        const [id, side] = btn.dataset.vote.split(":");
        state.votes[id] = state.votes[id] || { a: 50, b: 50 };
        state.votes[id][side] += 1;
        save();
        route();
        toast("Vote counted (demo)");
      };
    });

    $$("[data-gift]").forEach((btn) => {
      btn.onclick = (e) => {
        const cost = Number(btn.dataset.gift);
        if (state.balance < cost) { toast("Not enough demo C-Notes"); return; }
        state.balance -= cost;
        save();
        const bal = $("#live-bal");
        if (bal) bal.textContent = state.balance;
        floatGift(cost >= 50 ? "👑" : cost >= 20 ? "💎" : "🎁", e.clientX, e.clientY);
        toast(`Gifted ${cost} C-Notes (demo)`);
        renderRight();
      };
    });

    const send = $("#chat-send");
    if (send) send.onclick = () => {
      const inp = $("#chat-in");
      const t = (inp.value || "").trim();
      if (!t) return;
      state.chat.push({ n: "You", t });
      if (state.chat.length > 40) state.chat = state.chat.slice(-40);
      save();
      inp.value = "";
      route();
    };

    const topup = $("#demo-topup");
    if (topup) topup.onclick = () => {
      state.balance += 50;
      save();
      toast("+50 demo C-Notes");
      route();
    };
  }

  function doPost(text, hub) {
    text = (text || "").trim();
    if (!text) { toast("Write something first"); return; }
    state.posts.unshift({ userId: "you", text, hub, when: "just now" });
    save();
    toast("Posted to " + hub + " (demo)");
    location.hash = "#/hub/" + hub;
  }

  function buildSidebar() {
    $(".sidebar").innerHTML = D.sidebar.map((s) => {
      const route = s.id === "home" ? "home" : (s.id === "community" || s.id === "support" || D.hubs.some((h) => h.id === s.id) ? s.id : s.id);
      const href = s.id === "home" ? "#/" : (s.id === "community" ? "#/community" : `#/hub/${s.id}`);
      return `<button class="side-item" data-route="${s.id}" data-go="${href}"><span class="side-ico">${s.icon}</span>${s.label}</button>`;
    }).join("");
  }

  // nav
  $$(".nav-btn").forEach((b) => {
    b.addEventListener("click", () => {
      const r = b.dataset.route;
      if (r === "home") location.hash = "#/";
      else if (r === "explore") location.hash = "#/explore";
      else if (r === "create") location.hash = "#/create";
      else if (r === "messages") location.hash = "#/messages";
      else if (r === "notifications") location.hash = "#/notifications";
      else if (r === "profile") location.hash = "#/profile/you";
    });
  });
  $(".logo").addEventListener("click", () => location.hash = "#/");
  $("#hamburger").addEventListener("click", () => {
    $(".sidebar").classList.toggle("open");
    $(".nav-links").classList.toggle("open");
  });

  buildSidebar();
  window.addEventListener("hashchange", route);
  route();
})();
