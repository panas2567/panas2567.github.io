/* tldr.js — TL;DR section with top-left badge + meta toggle (inline-styled) */
(function () {
  'use strict';

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  onReady(function () {
    const $content = $('.page__content').first();
    if (!$content.length) return;

    // Collect sources
    const $tldrKeep = $content.find('.tldr');       // clone into TL;DR, keep in article
    const $tldrOnly = $content.find('.tldr-only');  // move into TL;DR, remove from article
    if ($tldrKeep.length === 0 && $tldrOnly.length === 0) return;

    // --- Build section (no title element; badge acts as title+toggle) ---
    const $section = $(
      '<section id="tldr" class="tldr-section" aria-label="TL;DR">' +
        '<button type="button" class="tldr-badge" aria-expanded="true" title="Hide TL;DR">TL;DR</button>' +
        '<div class="tldr-body"></div>' +
      '</section>'
    );

    // Section styling (inline, minimal)
    $section.css({
      position: 'relative',
      margin: '0 0 1rem 0',
      padding: '2.1rem 0.9rem 0.9rem 0.9rem', // top padding so badge doesn't overlap content
      borderRadius: '0.6rem',
      background: 'rgba(255, 215, 0, 0.08)', // soft gold tint
      borderLeft: '4px solid rgba(255, 165, 0, 0.6)'
    });

    const $badge = $section.find('.tldr-badge');

    // Badge styling (top-left corner)
    $badge.css({
      position: 'absolute',
      top: '0.6rem',
      left: '0.6rem',
      padding: '0.35rem 0.65rem',
      border: 'none',
      borderRadius: '0.45rem',
      fontWeight: 700,
      letterSpacing: '0.02em',
      cursor: 'pointer',
      boxShadow: '0 2px 6px rgba(0,0,0,.25)',
      transition: 'all .25s ease',
      // visible state colors applied below by applyShownStyle/applyHiddenStyle
    });

    const $body = $section.find('.tldr-body');

    // Fill TL;DR body
    $tldrKeep.each(function () { $body.append($(this).clone(true, true)); });
    $tldrOnly.each(function () { $body.append($(this).detach()); });

    if ($body.children().length === 0) return;

    // Mount TL;DR right after page meta if present; else at top
    const $meta = $('.page__meta').first();
    if ($meta.length) $section.insertAfter($meta);
    else $content.prepend($section);

    // --- Meta toggle (right next to read-time) ---
    let $metaBtn = null;
    if ($meta.length) {
      const $readtime = $meta.find('.page__meta-readtime').first();
      if ($readtime.length) {
        $('<span class="page__meta-sep" aria-hidden="true"> • </span>').css({
          opacity: .6, margin: '0 .35em'
        }).insertAfter($readtime);

        const $mount = $('<span class="page__meta-tldr"></span>').insertAfter($readtime.next());
        $metaBtn = $('<button type="button" class="tldr-meta-toggle" aria-pressed="false">Hide TL;DR</button>').css({
          background: 'none',
          border: '0',
          padding: '0',
          margin: '0',
          font: 'inherit',
          color: 'inherit',
          textDecoration: 'underline',
          cursor: 'pointer',
        });
        $mount.append($metaBtn);
      }
    }

    // --- Styles for states ---
    function applyShownStyle() {
      // badge golden like sun (section visible)
      $badge.css({
        background: 'linear-gradient(135deg, #FFD700, #FFA500)',
        color: '#000',
        boxShadow: '0 0 10px #FFD700, 0 0 18px #FFA500 inset'
      });
    }
    function applyHiddenStyle() {
      // badge code-like lime/black (section hidden)
      $badge.css({
        backgroundColor: '#000',
        color: '#ADFF2F',
        boxShadow: '0 0 6px #ADFF2F, inset 0 0 10px rgba(0,255,0,.25)'
      });
    }

    function setVisible(show) {
      if (show) {
        $body.slideDown(140);
        $badge.attr('aria-expanded', 'true').attr('title', 'Hide TL;DR');
        applyShownStyle();
        if ($metaBtn) $metaBtn.text('Hide TL;DR').attr('aria-pressed', 'false');
      } else {
        $body.slideUp(140);
        $badge.attr('aria-expanded', 'false').attr('title', 'Show TL;DR');
        applyHiddenStyle();
        if ($metaBtn) $metaBtn.text('Show TL;DR').attr('aria-pressed', 'true');
      }
    }

    // Initial state: visible
    setVisible(true);

    // Sync interactions
    $badge.on('click', function (e) {
      e.preventDefault();
      setVisible(!$body.is(':visible'));
    });
    if ($metaBtn) {
      $metaBtn.on('click', function (e) {
        e.preventDefault();
        setVisible(!$body.is(':visible'));
      });
    }
  });
})();
