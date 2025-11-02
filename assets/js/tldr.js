/* tldr.js — TL;DR built from .tldr / .tldr-only
 * - Single toggle button in meta header (styled like the badge)
 * - TL;DR section inserted directly under the meta header
 * - Hidden by default
 * - Uses flow-root + z-index to avoid overlap / click issues
 * - Calls optional window.initCopyButtons($section[0]) once when first shown
 * Requires jQuery.
 */
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

    // Build TL;DR section (no internal button)
    const $section = $(
      '<section id="tldr" class="tldr-section" aria-label="TL;DR">' +
        '<div class="tldr-body"></div>' +
      '</section>'
    );

    // Section styling (inline) — flow-root prevents margin-collapsing with meta
    $section.css({
      position: 'relative',
      display: 'flow-root',                // stop margin-collapsing
      zIndex: 1,                           // below the meta header
      margin: '0.8rem 0 1rem 0',
      padding: '0.9rem',
      borderRadius: '0.6rem',
      background: 'rgba(255, 215, 0, 0.08)', // soft gold tint
      borderLeft: '4px solid rgba(255, 165, 0, 0.6)'
    });

    const $body = $section.find('.tldr-body');

    // Fill TL;DR body
    $tldrKeep.each(function () { $body.append($(this).clone(true, true)); });
    $tldrOnly.each(function () { $body.append($(this).detach()); });

    if ($body.children().length === 0) return;

    // Meta header stays clickable
    const $meta = $('.page__meta').first();
    if ($meta.length) {
      $meta.css({ position: 'relative', zIndex: 2 });
    }

    // Where to insert the section
    const insertSection = () => {
      if ($meta.length) {
        $section.insertAfter($meta);
      } else {
        $content.prepend($section);
      }
    };

    // Create the meta toggle button next to read-time
    let $metaBtn = null;
    if ($meta.length) {
      const $readtime = $meta.find('.page__meta-readtime').first();
      if ($readtime.length) {
        $('<span class="page__meta-sep" aria-hidden="true"> • </span>')
          .css({ opacity: .6, margin: '0 .35em' })
          .insertAfter($readtime);

        const $mount = $('<span class="page__meta-tldr"></span>').insertAfter($readtime.next());
        $metaBtn = $('<button type="button" class="tldr-meta-toggle" aria-pressed="true">Show TL;DR</button>');
        $mount.append($metaBtn);

        // Style the meta button like the badge (inline)
        $metaBtn.css({
          border: 'none',
          padding: '0.35rem 0.65rem',
          margin: '0',
          borderRadius: '0.45rem',
          fontWeight: 700,
          letterSpacing: '0.02em',
          cursor: 'pointer',
          boxShadow: '0 2px 6px rgba(0,0,0,.25)',
          transition: 'all .25s ease'
        });
      }
    }

    // State styles
    function applyShownStyle() {
      if ($metaBtn) {
        $metaBtn.css({
          background: 'gold',
          color: '#000',
          boxShadow: '0 0 10px #FFD700, inset 0 0 18px #FFA500'
        });
      }
    }
    function applyHiddenStyle() {
      if ($metaBtn) {
        $metaBtn.css({
          backgroundColor: 'aqua',
          color: 'darkblue',
          boxShadow: '0 0 6px #ADFF2F, inset 0 0 10px rgba(0,255,0,.25)'
        });
      }
    }

    // One-time enhancer call (for copy buttons etc.)
    let enhanced = false;
    function enhanceOnce() {
      if (enhanced) return;
      if (typeof window.initCopyButtons === 'function') {
        window.initCopyButtons($section[0]); // initialize copy buttons only inside TL;DR
      }
      enhanced = true;
    }

    // Visibility logic — hidden by default
    let visible = false;

    function showTLDR() {
      if (!visible) {
        insertSection();
        enhanceOnce(); // run enhancers the first time we show TL;DR
        if ($metaBtn) {
          $metaBtn.text('Hide TL;DR').attr('aria-pressed', 'false');
          applyShownStyle();
        }
        visible = true;
      }
    }

    function hideTLDR() {
      if (visible) {
        $section.detach(); // remove from layout entirely
        if ($metaBtn) {
          $metaBtn.text('Show TL;DR').attr('aria-pressed', 'true');
          applyHiddenStyle();
        }
        visible = false;
      }
    }

    // Initial state: hidden
    applyHiddenStyle();
    hideTLDR();

    // Bind meta button
    if ($metaBtn) {
      $metaBtn.on('click', function (e) {
        e.preventDefault();
        visible ? hideTLDR() : showTLDR();
      });
    }
  });
})();
