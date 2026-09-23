/* SiteResolve website behaviour: navigation, waitlist panel, forms, cookie consent and toasts.
   No dependencies. Everything degrades to plain links and native controls without JavaScript. */
(function () {
  'use strict';

  var CONFIG = window.SR_CONFIG || {};
  var CONSENT_KEY = 'sr-consent';
  var CONSENT_VERSION = 1;
  var PREVIEW_KEY = 'sr-preview-waitlist';
  var ICON = {
    alert: 'M12 4l9 16H3zM12 10v4M12 17h.01',
    info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 11v5M12 8h.01',
    check: 'M5 12.5l4.5 4.5L19 7.5',
    close: 'M6 6l12 12M18 6L6 18'
  };

  var MESSAGES = {
    waitlist: {
      duplicate: { tone: 'info', title: 'This email address is already on the waitlist.' },
      error: { tone: 'bad', title: 'We could not add you to the waitlist. Check your connection and try again.' }
    },
    contact: {
      success: { tone: 'ok', title: 'Your enquiry has been sent.', body: 'Thank you. We will respond using the email address you provided.' },
      error: { tone: 'bad', title: 'Your enquiry could not be sent.', body: 'Check your connection and try again. If the problem continues, contact ' + (CONFIG.contactEmail || '[GENERAL CONTACT EMAIL]') + '.' }
    },
    careers: {
      success: { tone: 'ok', title: 'Your interest has been registered.', body: 'Thank you. We will keep your details for future consideration.' },
      error: { tone: 'bad', title: 'Your details could not be sent.', body: 'Check your connection and try again.' }
    }
  };

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function svg(name) {
    return '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="' + ICON[name] + '"/></svg>';
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }
  function storageGet(key) { try { return window.localStorage.getItem(key); } catch (e) { return null; } }
  function storageSet(key, value) { try { window.localStorage.setItem(key, value); return true; } catch (e) { return false; } }

  /* ---------- Toast ---------- */
  var toastTimer = null;
  function toast(title, body) {
    var region = $('[data-toast-region]');
    if (!region) return;
    region.innerHTML = '<div class="toast"><span class="toast-dot"></span><div class="toast-x"><p class="toast-t">' + escapeHtml(title) + '</p>' +
      (body ? '<p class="toast-m">' + escapeHtml(body) + '</p>' : '') +
      '</div><button type="button" class="icon-btn" aria-label="Dismiss message">' + svg('close') + '</button></div>';
    $('button', region).addEventListener('click', function () { region.innerHTML = ''; });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { region.innerHTML = ''; }, 6000);
  }

  /* ---------- Dialog helpers (waitlist panel and cookie settings) ---------- */
  var lastFocus = null;
  function openDialog(dialog) {
    if (!dialog || dialog.open) return;
    lastFocus = document.activeElement;
    if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
    document.body.classList.add('is-locked');
    var first = $('input:not([type=hidden]):not([tabindex="-1"]), select, textarea', dialog) || $('button', dialog);
    if (first) setTimeout(function () { first.focus(); }, 30);
  }
  function closeDialog(dialog) {
    if (!dialog || !dialog.open) return;
    if (typeof dialog.close === 'function') dialog.close(); else dialog.removeAttribute('open');
  }
  $all('dialog').forEach(function (dialog) {
    dialog.addEventListener('close', function () {
      document.body.classList.remove('is-locked');
      if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
      lastFocus = null;
    });
    // A click on the backdrop lands on the dialog element itself.
    dialog.addEventListener('click', function (e) {
      if (e.target !== dialog) return;
      var r = dialog.getBoundingClientRect();
      var inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (!inside) closeDialog(dialog);
    });
    $all('[data-close-dialog]', dialog).forEach(function (btn) {
      btn.addEventListener('click', function () { closeDialog(dialog); });
    });
  });

  /* ---------- Mobile menu ---------- */
  var menuBtn = $('.menu-btn');
  var menu = $('#mobile-menu');
  function setMenu(open) {
    if (!menuBtn || !menu) return;
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menu.hidden = !open;
  }
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () { setMenu(menu.hidden); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) { setMenu(false); menuBtn.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (!menu.hidden && !menu.contains(e.target) && !menuBtn.contains(e.target)) setMenu(false);
    });
    $all('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  }

  /* ---------- Waitlist panel ---------- */
  var waitlistDialog = $('#waitlist-dialog');
  $all('[data-open-waitlist]').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      if (!waitlistDialog) return;
      e.preventDefault();
      setMenu(false);
      openDialog(waitlistDialog);
    });
  });

  /* ---------- Form validation ---------- */
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function fieldValid(el) {
    var rule = el.getAttribute('data-validate');
    var value = el.type === 'checkbox' ? el.checked : String(el.value || '').trim();
    if (rule === 'checked') return !!value;
    if (rule === 'required') return value.length > 0;
    if (rule === 'email') return EMAIL.test(value);
    if (rule === 'url') return value === '' || /^https?:\/\/[^\s.]+\.[^\s]{2,}/i.test(value);
    return true;
  }
  function errorHost(el) { return el.closest('.field') || el.parentNode; }
  function setError(el, message) {
    var id = el.id + '-err';
    var existing = document.getElementById(id);
    if (!message) {
      el.removeAttribute('aria-invalid');
      el.removeAttribute('aria-describedby');
      if (existing) existing.remove();
      return;
    }
    el.setAttribute('aria-invalid', 'true');
    el.setAttribute('aria-describedby', id);
    if (!existing) {
      existing = document.createElement('p');
      existing.className = 'err';
      existing.id = id;
      errorHost(el).appendChild(existing);
    }
    existing.innerHTML = svg('alert') + '<span>' + escapeHtml(message) + '</span>';
  }
  function validate(form) {
    var firstInvalid = null;
    $all('[data-validate]', form).forEach(function (el) {
      var ok = fieldValid(el);
      setError(el, ok ? '' : el.getAttribute('data-error'));
      if (!ok && !firstInvalid) firstInvalid = el;
    });
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  }
  function showStatus(form, msg) {
    var host = $('[data-status]', form);
    if (!host) return;
    if (!msg) { host.innerHTML = ''; return; }
    var icon = msg.tone === 'ok' ? 'check' : msg.tone === 'bad' ? 'alert' : 'info';
    var cls = msg.tone === 'ok' ? 'alert alert-ok' : msg.tone === 'bad' ? 'alert alert-bad' : 'alert';
    host.innerHTML = '<div class="' + cls + '" role="' + (msg.tone === 'bad' ? 'alert' : 'status') + '">' + svg(icon) +
      '<div><p class="alert-t">' + escapeHtml(msg.title) + '</p>' + (msg.body ? '<p class="alert-m">' + escapeHtml(msg.body) + '</p>' : '') + '</div></div>';
  }

  /* ---------- Submission ---------- */
  function collect(form, kind) {
    var data = {};
    $all('input, select, textarea', form).forEach(function (el) {
      if (!el.name || el.name === 'website') return;
      data[el.name] = el.type === 'checkbox' ? el.checked : String(el.value || '').trim();
    });
    var consent = $('[name=consent]', form);
    if (consent) {
      var label = consent.closest('label');
      data.consentText = label ? label.textContent.replace(/\s+/g, ' ').trim() : '';
    }
    data.form = kind;
    data.page = window.location.pathname;
    data.submittedAt = new Date().toISOString();
    return data;
  }
  function wait(ms) { return new Promise(function (resolve) { setTimeout(resolve, ms); }); }
  function submit(kind, data) {
    var endpoint = CONFIG.endpoints && CONFIG.endpoints[kind];
    if (!endpoint) {
      // Preview mode: nothing leaves the browser.
      if (window.console) console.info('[SiteResolve] Preview mode: the ' + kind + ' form has no endpoint configured, so nothing was sent.');
      return wait(800).then(function () {
        if (kind !== 'waitlist') return 'success';
        var list = [];
        try { list = JSON.parse(storageGet(PREVIEW_KEY) || '[]'); } catch (e) { list = []; }
        var email = String(data.email).toLowerCase();
        if (list.indexOf(email) > -1) return 'duplicate';
        list.push(email);
        storageSet(PREVIEW_KEY, JSON.stringify(list));
        return 'success';
      });
    }
    return fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data)
    }).then(function (res) {
      if (res.ok) return 'success';
      if (res.status === 409) return 'duplicate';
      return 'error';
    }, function () { return 'error'; });
  }

  $all('form[data-form]').forEach(function (form) {
    var kind = form.getAttribute('data-form');
    var button = $('button[type=submit]', form);
    var idleLabel = button ? button.textContent : '';
    var busy = false;

    $all('[data-validate]', form).forEach(function (el) {
      var evt = el.type === 'checkbox' || el.tagName === 'SELECT' ? 'change' : 'input';
      el.addEventListener(evt, function () { if (el.getAttribute('aria-invalid') === 'true' && fieldValid(el)) setError(el, ''); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (busy) return;
      showStatus(form, null);
      if (!validate(form)) return;
      var honeypot = $('[name=website]', form);
      var data = collect(form, kind);
      busy = true;
      if (button) { button.setAttribute('aria-busy', 'true'); button.textContent = button.getAttribute('data-loading-label') || idleLabel; }
      var result = honeypot && honeypot.value ? wait(600).then(function () { return 'success'; }) : submit(kind, data);
      result.then(function (outcome) {
        busy = false;
        if (button) { button.removeAttribute('aria-busy'); button.textContent = idleLabel; }
        var messages = MESSAGES[kind] || {};
        if (outcome === 'success' && form.getAttribute('data-success') === 'redirect') {
          window.location.href = (document.body.getAttribute('data-base') || '') + 'waitlist-confirmation.html';
          return;
        }
        if (outcome === 'success') { form.reset(); showStatus(form, messages.success); }
        else if (outcome === 'duplicate') showStatus(form, messages.duplicate || messages.error);
        else showStatus(form, messages.error);
        var status = $('[data-status]', form);
        if (status && status.scrollIntoView) status.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      });
    });
  });

  /* ---------- Contact reason from the address, for example contact.html?reason=pricing ---------- */
  var reasonSelect = $('#ct-reason');
  if (reasonSelect && window.URLSearchParams) {
    var wanted = new URLSearchParams(window.location.search).get('reason');
    if (wanted) {
      $all('option', reasonSelect).forEach(function (opt) {
        if (opt.value && opt.value.toLowerCase() === wanted.toLowerCase()) reasonSelect.value = opt.value;
      });
    }
  }

  /* ---------- Cookie consent ---------- */
  var banner = $('#cookie-banner');
  var cookieDialog = $('#cookie-dialog');
  var analyticsLoaded = false;
  function readConsent() {
    try {
      var c = JSON.parse(storageGet(CONSENT_KEY) || 'null');
      return c && c.version === CONSENT_VERSION ? c : null;
    } catch (e) { return null; }
  }
  function applyConsent(c) {
    if (c && c.analytics && !analyticsLoaded && typeof CONFIG.loadAnalytics === 'function') {
      analyticsLoaded = true;
      try { CONFIG.loadAnalytics(); } catch (e) { if (window.console) console.error(e); }
    }
    document.dispatchEvent(new CustomEvent('sr:consent', { detail: c }));
  }
  function saveConsent(preferences, analytics) {
    var c = { version: CONSENT_VERSION, preferences: !!preferences, analytics: !!analytics, updated: new Date().toISOString() };
    storageSet(CONSENT_KEY, JSON.stringify(c));
    if (banner) banner.hidden = true;
    closeDialog(cookieDialog);
    applyConsent(c);
    toast('Changes saved.', 'Your update has been recorded.');
    return c;
  }
  function syncDialog() {
    if (!cookieDialog) return;
    var c = readConsent() || { preferences: false, analytics: false };
    $('[name=preferences]', cookieDialog).checked = !!c.preferences;
    $('[name=analytics]', cookieDialog).checked = !!c.analytics;
  }
  $all('[data-consent]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var action = btn.getAttribute('data-consent');
      if (action === 'accept') saveConsent(true, true);
      else if (action === 'reject') saveConsent(false, false);
      else if (action === 'save' && cookieDialog) saveConsent($('[name=preferences]', cookieDialog).checked, $('[name=analytics]', cookieDialog).checked);
    });
  });
  $all('[data-open-cookies]').forEach(function (btn) {
    btn.addEventListener('click', function () { syncDialog(); openDialog(cookieDialog); });
  });
  var stored = readConsent();
  if (stored) applyConsent(stored);
  else if (banner) banner.hidden = false;

  /* ---------- Solutions index: mark the section in view ---------- */
  var indexLinks = $all('.sol-index a');
  if (indexLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    indexLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        indexLinks.forEach(function (a) { a.removeAttribute('aria-current'); });
        var link = byId[entry.target.id];
        if (link) link.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    $all('.sol-sec').forEach(function (sec) { observer.observe(sec); });
  }
})();
