/* hide-output.js — pin Hide/Show output button next to the Copy button
 * Exposes: window.initHideOutputButtons(scopeElement?)
 * Requires jQuery.
 */
(function () {
  'use strict';

  window.initHideOutputButtons = function initHideOutputButtons(scope = document) {
    $(scope).querySelectorAll ? null : (scope = document); // soft guard

    $(scope).find('pre > code').each(function () {
      const $pre = $(this).parent();
      // Output is the immediate sibling after the <pre>
      const $output = $pre.next('.code-cell-output');
      if (!$output.length) return; // only add when this code cell has an output

      // Wrapper created by clipboard.js: <div class="codeframe">[button][pre]</div>
      let $wrap = $pre.parent('.codeframe');
      if (!$wrap.length) {
        // In case copy buttons weren't initialized yet, create a wrapper like clipboard.js does.
        // IMPORTANT: Find output BEFORE wrapping, so we keep the reference.
        $wrap = $('<div class="codeframe"></div>');
        $pre.before($wrap);
        $wrap.append($pre);
        $wrap.css({ position: 'relative' });
      }

      // Avoid duplicates
      const already = $wrap.children('button.hide-output-btn').length > 0;
      if (already) return;

      // Create the Hide/Show button (no visual spacing here; positional calc is below)
      const $btn = $(
        '<button type="button" class="btn btn--secondary hide-output-btn" title="Hide output" aria-expanded="true">' +
          '<i class="far fa-eye-slash"></i>' +
        '</button>'
      ).css({
        position: 'absolute',
        top: '0.05em',
        zIndex: 2
      }).on('click', function (e) {
        e.preventDefault();
        const isHidden = $output.is(':hidden');
        if (isHidden) {
          $output.slideDown(120);
          $btn.attr('title', 'Hide output').attr('aria-expanded', 'true');
          $btn.find('i').attr('class', 'far fa-eye-slash');
        } else {
          $output.slideUp(120);
          $btn.attr('title', 'Show output').attr('aria-expanded', 'false');
          $btn.find('i').attr('class', 'far fa-eye');
        }
      });

      // Append overlay button
      $wrap.append($btn);

      // Position it to the LEFT of the Copy button
      // Find the copy button inside this wrapper
      const $copyBtn = $wrap.children('button').filter(function () {
        const $b = $(this);
        const titleMatch = ($b.attr('title') || '').toLowerCase() === 'copy to clipboard';
        const iconMatch  = $b.find('i.fa-copy, i.far.fa-copy, i.fas.fa-copy').length > 0;
        return titleMatch || iconMatch;
      }).first();

      // Compute right offset:
      // right(hide) = right(copy) + width(copy) + gap
      const gapPx = 8;
      let rightPx = 45; // default for 1em if copy's right can't be read
      if ($copyBtn.length) {
        const cs = window.getComputedStyle($copyBtn.get(0));
        const copyRightPx = parseFloat(cs.right) || 16;
        const copyWidthPx = Math.ceil($copyBtn.outerWidth());
        rightPx = copyRightPx + copyWidthPx + gapPx;
        // Align vertical top to copy if different
        const copyTop = parseFloat(cs.top);
        if (!Number.isNaN(copyTop)) $btn.css('top', cs.top);
      }
      $btn.css('right', `${rightPx}px`);
    });
  };

  // Initialize on full document once DOM is ready
  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }
  onReady(function () {
    window.initHideOutputButtons(document);
  });
})();
