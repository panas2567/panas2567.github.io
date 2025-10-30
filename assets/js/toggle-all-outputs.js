/* toggle-all-outputs.js — global Hide/Show control with inline styling */
(function () {
  'use strict';

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  function anyVisible($items) {
    let vis = false;
    $items.each(function () {
      if ($(this).is(':visible')) { vis = true; return false; }
    });
    return vis;
  }

  function syncPerCellButtons(show) {
    $('.page__content pre').each(function () {
      const $btn = $(this).find('.hide-output-btn');
      const $out = $(this).next('.code-cell-output');
      if (!$btn.length || !$out.length) return;
      if (show) {
        $btn.attr('title', 'Hide output').attr('aria-expanded', 'true');
        $btn.find('i').attr('class', 'far fa-eye-slash');
      } else {
        $btn.attr('title', 'Show output').attr('aria-expanded', 'false');
        $btn.find('i').attr('class', 'far fa-eye');
      }
    });
  }

  onReady(function () {
    const $content = $('.page__content').first();
    const $outputs = $content.find('.code-cell-output');
    if ($outputs.length === 0) return;

    const $meta = $('.page__meta').first();
    const $readtime = $meta.find('.page__meta-readtime').first();

    let $mountTarget;

    if ($readtime.length) {
      const $sep = $('<span class="page__meta-sep" aria-hidden="true"> • </span>');
      $sep.insertAfter($readtime);

      $mountTarget = $('<span class="page__meta-outputs"></span>');
      $mountTarget.insertAfter($sep);
    } else if ($meta.length) {
      $mountTarget = $('<span class="page__meta-outputs"></span>');
      $meta.append($mountTarget);
    } else {
      $mountTarget = $('<div class="code-outputs-global"></div>');
      $content.prepend($mountTarget);
    }

    const $btn = $('<button type="button" class="code-outputs-toggle" aria-pressed="false">Let me guess the output</button>');
    $mountTarget.append($btn);

    // --- Inline style base (shared look) ---
    $btn.css({
      border: 'none',
      padding: '0.25em 0.6em',
      marginLeft: '0.4em',
      borderRadius: '0.25em',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    });

    function applyShownStyle() {
      // code-like lime green on black
      $btn.css({
        backgroundColor: 'black',
        color: '#ADFF2F', // limegreen-ish
        boxShadow: '0 0 6px #ADFF2F, 0 0 10px #00FF00 inset',
      });
    }

    function applyHiddenStyle() {
      // gold and glowing like the sun
      $btn.css({
        background: 'gold',
        color: '#000',
        boxShadow: '0 0 10px #FFD700, 0 0 20px #FFA500 inset',
      });
    }

    function setAll(show) {
      if (show) {
        $outputs.filter(':hidden').slideDown(120);
        $btn.text('Let me guess the output').attr('aria-pressed', 'false');
        applyShownStyle();
      } else {
        $outputs.filter(':visible').slideUp(120);
        $btn.text('Show me all outputs').attr('aria-pressed', 'true');
        applyHiddenStyle();
      }
      syncPerCellButtons(show);
    }

    // Initialize style & label based on current state
    const visible = anyVisible($outputs);
    setAll(visible);

    // Toggle on click
    $btn.on('click', function (e) {
      e.preventDefault();
      setAll(!anyVisible($outputs));
    });
  });
})();
