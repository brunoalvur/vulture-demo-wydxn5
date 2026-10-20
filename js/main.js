(() => {
  'use strict';
  const D = window.VULTURE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const el = (tag, attrs = {}, html = '') => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
    if (html) n.innerHTML = html;
    return n;
  };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  document.documentElement.classList.add('js');

  /* ---------- Enlaces e imágenes ---------- */
  const LINKS = {
    registro: D.site.registro,
    login: D.site.login,
    reinscripcion: D.site.reinscripcion,
    whatsapp: D.site.whatsapp,
    mapa: D.site.mapa,
    instagram: D.site.instagram,
    instagramDentro: D.site.instagramDentro,
    facebook: D.site.facebook,
    tiktok: D.site.tiktok,
    youtube: D.site.youtube,
    trabaja: D.site.trabaja,
    imagen: D.site.imagen
  };
  $$('[data-link]').forEach((a) => { a.href = LINKS[a.dataset.link] || '#'; });

  const imgUrl = (key) => (D.img[key] ? D.imgBase + D.img[key] : '');
  // Carga la foto y solo entonces la pinta: si falla, queda el degradado de fondo.
  const paint = (node, key) => {
    const url = imgUrl(key);
    if (!url) return;
    const im = new Image();
    im.onload = () => { node.style.backgroundImage = `url("${url}")`; };
    im.src = url;
  };
  $$('[data-img]').forEach((n) => paint(n, n.dataset.img));
  $$('[data-bg]').forEach((n) => paint(n, n.dataset.bg));

  /* ---------- Menú móvil ---------- */
  const burger = $('#burger');
  const nav = $('#nav');
  const setMenu = (open) => {
    nav.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  };
  burger.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  /* ---------- Formato ---------- */
  const euro = (n) => {
    const whole = Math.abs(n - Math.round(n)) < 0.005;
    return n.toLocaleString('es-ES', { minimumFractionDigits: whole ? 0 : 2, maximumFractionDigits: 2 }) + ' €';
  };

  /* ---------- Pestañas con teclado ---------- */
  const arrowNav = (container) => {
    container.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const tabs = $$('[role="tab"]', container);
      const i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
      next.focus();
      next.click();
    });
  };

  /* ---------- Tarifas ---------- */
  const T = D.tarifas;
  const tState = { team: 'villains', period: 'mensual' };
  const teamTabs = $('#team-tabs');
  const periodTabs = $('#period-tabs');
  const grid = $('#tarifas-grid');

  T.periodos.forEach((p) => {
    const b = el('button', { type: 'button', 'data-period': p.id, 'aria-pressed': String(p.id === tState.period) }, p.label);
    periodTabs.appendChild(b);
  });

  const priceCard = (t, team) => {
    const p = T.periodos.find((x) => x.id === tState.period);
    let big;
    let totalLine = '';
    if (p.id === 'mensual' || t.soloMensual) {
      big = t.mensual;
      if (t.soloMensual && p.id !== 'mensual') totalLine = 'Periodos de 3, 6 y 12 meses: a confirmar.';
      else totalLine = 'Pago mensual';
    } else {
      const d = t[p.id];
      big = d.total / p.meses;
      totalLine = `${euro(d.total)} cada ${p.meses} meses` + (d.dto ? `<span class="dto">−${d.dto}%</span>` : '');
    }
    const card = el('article', { class: `price ${team === 'villains' ? 'v' : 'h'}` });
    card.innerHTML = `
      <p class="lema">${esc(t.lema)}</p>
      <h3>${esc(t.nombre)}${t.nueva ? '<span class="badge">Nueva</span>' : ''}</h3>
      <div class="amount"><span class="big">${euro(big)}</span><span class="per">/mes</span></div>
      <p class="total">${totalLine}</p>
      <ul>${t.incluye.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
      ${t.matricula ? `<p class="matricula">Matrícula: ${esc(t.matricula)}</p>` : ''}
      <a class="btn" href="${esc(D.site.registro)}" rel="noopener" aria-label="Únete con la tarifa ${esc(t.nombre)}">Únete</a>`;
    return card;
  };

  const renderTarifas = () => {
    const team = tState.team;
    grid.innerHTML = '';
    T[team].forEach((t) => grid.appendChild(priceCard(t, team)));
    $$('button', teamTabs).forEach((b) => {
      const on = b.dataset.team === team;
      b.setAttribute('aria-selected', String(on));
      b.tabIndex = on ? 0 : -1;
    });
    teamTabs.classList.toggle('is-v', team === 'villains');
    teamTabs.classList.toggle('is-h', team === 'heroes');
    periodTabs.classList.toggle('is-v', team === 'villains');
    periodTabs.classList.toggle('is-h', team === 'heroes');
    $$('button', periodTabs).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.period === tState.period)));
    grid.setAttribute('aria-labelledby', 'tab-' + team);
    $('#tarifas-note').innerHTML = team === 'villains'
      ? `Sin matrícula en ninguna tarifa Villains. Pase de 1 día: ${euro(T.paseDia.villains)}.`
      : `Pase de 1 día: ${euro(T.paseDia.heroes)}. La Vulture Señal y V-Student ya no incluyen clases presenciales. Matrícula y periodos largos de V-Student: pendientes de confirmar con el gimnasio.`;
  };

  teamTabs.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-team]');
    if (!b) return;
    tState.team = b.dataset.team;
    renderTarifas();
  });
  arrowNav(teamTabs);
  periodTabs.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-period]');
    if (!b) return;
    tState.period = b.dataset.period;
    renderTarifas();
  });
  // Botones "Tarifas Villains/Heroes" de las tarjetas de equipo
  $$('a[data-team]').forEach((a) => a.addEventListener('click', () => { tState.team = a.dataset.team; renderTarifas(); }));
  renderTarifas();

  /* ---------- Horarios ---------- */
  const H = D.horarios;
  const COLORS = {
    // Heroes: familias de clase
    fuerza: '#3d8bff', intensidad: '#ff4d7d', mente: '#34d3b0', ritmo: '#ffa14a', virtual: '#9aa3b8',
    // Villains
    'WOD': '#d62bd0', 'HYROX': '#f5b82e', 'MEGA WOD': '#3fd8e8', 'CrossKids': '#4ade80', 'Open Box': '#e8e8f0'
  };
  const FAMILY_LABEL = { fuerza: 'Fuerza y tono', intensidad: 'Alta intensidad', mente: 'Cuerpo y mente', ritmo: 'Ritmo', virtual: 'Virtual' };
  const familyOf = (name) => {
    if (/virtual/i.test(name)) return 'virtual';
    if (/pilates|yoga|balance/i.test(name)) return 'mente';
    if (/zumba/i.test(name)) return 'ritmo';
    if (/fitboxing|combat|hiit|gotham/i.test(name)) return 'intensidad';
    return 'fuerza'; // BodyPump, Body Vulture, Body Tone, GAP, Glute Pump
  };

  const dayIds = H.dias.map((d) => d.id);
  const todayId = (() => {
    try {
      const en = new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: 'Europe/Madrid' }).format(new Date());
      return { Monday: 'lunes', Tuesday: 'martes', Wednesday: 'miercoles', Thursday: 'jueves', Friday: 'viernes', Saturday: 'sabado', Sunday: 'domingo' }[en] || 'lunes';
    } catch (e) { return 'lunes'; }
  })();
  const sState = { team: 'heroes', day: todayId, filter: 'todos' };

  const schedTeam = $('#sched-team');
  const schedDays = $('#sched-days');
  const schedFilters = $('#sched-filters');
  const schedList = $('#sched-list');

  H.dias.forEach((d) => {
    const b = el('button', { type: 'button', class: 'day' + (d.id === todayId ? ' is-today' : ''), 'data-day': d.id }, `${d.corto}<small>${d.largo}</small>`);
    schedDays.appendChild(b);
  });

  const parseHeroes = (name) => {
    let n = name;
    let sub = '';
    const dur = n.match(/\s(\d+)'$/);
    if (dur) { n = n.replace(/\s\d+'$/, ''); sub = `${dur[1]} minutos`; }
    if (/\sLM$/.test(n)) { n = n.replace(/\sLM$/, ''); sub = 'Les Mills' + (sub ? ' · ' + sub : ''); }
    const fam = familyOf(name);
    if (fam === 'virtual' && !sub) sub = 'Por la app';
    return { n, sub, fam };
  };

  const heroesSlots = (day) => H.heroes[day].map(([t, name]) => {
    const { n, sub, fam } = parseHeroes(name);
    return { time: t, title: n, sub, tag: FAMILY_LABEL[fam], key: fam, color: COLORS[fam] };
  });

  // Une los Open Box consecutivos y calcula hasta cuándo dura cada bloque.
  const villainsSlots = (day) => {
    const raw = H.villains[day];
    const weekend = day === 'sabado' || day === 'domingo';
    const out = [];
    for (let i = 0; i < raw.length; i++) {
      const [t, type, coach, focus] = raw[i];
      if (type === 'Open Box') {
        let j = i;
        while (j + 1 < raw.length && raw[j + 1][1] === 'Open Box') j++;
        const next = raw[j + 1];
        const end = next ? next[0] : (weekend ? null : '23:00');
        out.push({ time: end ? `${t}–${end}` : `${t} →`, title: 'Open Box', sub: 'Entrenamiento libre', tag: '', key: 'Open Box', color: COLORS['Open Box'], open: true });
        i = j;
      } else if (type === 'MEGA WOD') {
        out.push({ time: t, title: type, sub: focus || '', tag: '', key: type, color: COLORS[type] });
      } else {
        out.push({ time: t, title: type, sub: focus || '', tag: coach || '', key: type, color: COLORS[type] });
      }
    }
    return out;
  };

  const renderFilters = () => {
    const keys = sState.team === 'heroes'
      ? Object.keys(FAMILY_LABEL).map((k) => [k, FAMILY_LABEL[k]])
      : [['WOD', 'WOD'], ['HYROX', 'HYROX'], ['MEGA WOD', 'MEGA WOD'], ['CrossKids', 'CrossKids'], ['Open Box', 'Open Box']];
    schedFilters.innerHTML = '';
    schedFilters.appendChild(el('button', { type: 'button', class: 'chip', 'data-f': 'todos', style: '--c:#fff', 'aria-pressed': String(sState.filter === 'todos') }, 'Todo'));
    keys.forEach(([k, label]) => {
      schedFilters.appendChild(el('button', { type: 'button', class: 'chip', 'data-f': k, style: `--c:${COLORS[k]}`, 'aria-pressed': String(sState.filter === k) }, `<i></i>${esc(label)}`));
    });
  };

  const renderSched = () => {
    const isH = sState.team === 'heroes';
    const accent = isH ? 'var(--h)' : 'var(--v)';
    schedDays.style.setProperty('--accent', accent);
    $$('button', schedTeam).forEach((b) => {
      const on = b.dataset.team === sState.team;
      b.setAttribute('aria-selected', String(on));
      b.tabIndex = on ? 0 : -1;
    });
    schedTeam.classList.toggle('is-h', isH);
    schedTeam.classList.toggle('is-v', !isH);
    $$('button', schedDays).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.day === sState.day)));
    renderFilters();

    let slots = isH ? heroesSlots(sState.day) : villainsSlots(sState.day);
    if (sState.filter !== 'todos') slots = slots.filter((s) => s.key === sState.filter);
    schedList.innerHTML = '';
    if (!slots.length) {
      schedList.appendChild(el('li', { class: 'empty' }, 'No hay sesiones de este tipo este día. Prueba con otro día o quita el filtro.'));
    }
    slots.forEach((s, i) => {
      const li = el('li', { class: 'slot' + (s.open ? ' open' : ''), style: `--c:${s.color};animation-delay:${Math.min(i, 12) * 25}ms` });
      li.innerHTML = `<time>${esc(s.time)}</time>
        <div class="what"><b>${esc(s.title)}</b>${s.sub ? `<span>${esc(s.sub)}</span>` : ''}</div>
        ${s.tag ? `<span class="kind">${esc(s.tag)}</span>` : ''}`;
      schedList.appendChild(li);
    });
    $('#sched-note').textContent = isH
      ? 'LM = Les Mills. Las clases «Virtual» se emiten por la app.'
      : `WOD = entrenamiento del día, 1 hora con coach · HYROX = fuerza + resistencia · MEGA WOD ≈ 90 minutos · Open Box = entrenamiento libre. Coaches: Eros, Thais y Dani.${(sState.day === 'sabado' || sState.day === 'domingo') ? ' El cartel no indica la hora de fin del Open Box de fin de semana.' : ''}`;
  };

  schedTeam.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-team]');
    if (!b) return;
    sState.team = b.dataset.team;
    sState.filter = 'todos';
    renderSched();
  });
  arrowNav(schedTeam);
  schedDays.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-day]');
    if (!b) return;
    sState.day = b.dataset.day;
    renderSched();
  });
  schedFilters.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-f]');
    if (!b) return;
    sState.filter = b.dataset.f;
    renderSched();
  });
  renderSched();

  /* ---------- Tarjetas de actividades ---------- */
  const fillCards = (id, items) => {
    const box = $(id);
    items.forEach((c) => {
      box.appendChild(el('article', { class: 'card reveal' }, `<h4>${esc(c.nombre)}</h4><p>${esc(c.texto)}</p><span class="level">${esc(c.nivel)}</span>`));
    });
  };
  fillCards('#cards-programas', D.programas);
  fillCards('#cards-clases', D.clases);

  /* ---------- Formulario de demostración ---------- */
  const form = $('#contact-form');
  const showErr = (id, msg) => {
    const input = $('#' + id);
    const err = $(`.err[data-for="${id}"]`);
    err.textContent = msg;
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (msg) input.setAttribute('aria-describedby', err.id || (err.id = 'e-' + id));
    return !msg;
  };
  const validate = () => {
    const name = $('#f-name').value.trim();
    const mail = $('#f-mail').value.trim();
    const tel = $('#f-tel').value.trim();
    const results = [
      showErr('f-name', name.length < 2 ? 'Escribe tu nombre.' : ''),
      showErr('f-mail', /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail) ? '' : 'Escribe un email válido.'),
      showErr('f-tel', tel && !/^[+0-9 ]{9,16}$/.test(tel) ? 'Revisa el teléfono (9 a 16 dígitos).' : ''),
      showErr('f-priv', $('#f-priv').checked ? '' : 'Necesitamos que aceptes la política de privacidad.')
    ];
    return results.every(Boolean);
  };
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const ok = $('#form-ok');
    ok.hidden = true;
    if (!validate()) {
      const first = $('[aria-invalid="true"]', form);
      if (first) first.focus();
      return;
    }
    // Demo: no se envía nada a ningún sitio.
    form.reset();
    ok.hidden = false;
  });
  $$('input, textarea', form).forEach((i) => i.addEventListener('input', () => {
    if (i.getAttribute('aria-invalid') === 'true') validate();
  }));

  /* ---------- Aparición al hacer scroll ---------- */
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach((n) => io.observe(n));
  } else {
    revealEls.forEach((n) => n.classList.add('in'));
  }
})();
