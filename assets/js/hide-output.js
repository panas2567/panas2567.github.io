/* hide-output.js
 * Adds a "Hide output" button to each code cell that has a following .code-cell-output.
 * It does NOT modify your copy button code. If a copy button is present, the hide button
 * is positioned to its left by measuring the copy button's width.
 * Requires jQuery (Minimal Mistakes includes it).
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
    $('.page__content pre > code').each(function () {
      const $pre = $(this).parent();
      const $output = $pre.next('.code-cell-output');
      if (!$output.length) return; // no output for this cell

      // Ensure <pre> can host absolutely positioned buttons (like your copy button)
      if ($pre.css('position') === 'static') {
        $pre.css('position', 'relative');
      }

      // Create the Hide/Show button
      const $toggleBtn = $(
        '<button type="button" class="btn btn--secondary" title="Hide output" aria-expanded="true">' +
          '<i class="far fa-eye-slash"></i>' +
        '</button>'
      )
        .on('click', function (e) {
          e.preventDefault();
          const isHidden = $output.is(':hidden');
          if (isHidden) {
            // Show
            $output.slideDown(120);
            $toggleBtn.attr('title', 'Hide output').attr('aria-expanded', 'true');
            $toggleBtn.find('i').attr('class', 'far fa-eye-slash');
          } else {
            // Hide
            $output.slideUp(120);
            $toggleBtn.attr('title', 'Show output').attr('aria-expanded', 'false');
            $toggleBtn.find('i').attr('class', 'far fa-eye');
          }
        });

      // Insert the button first so we can measure/layout
      $pre.prepend($toggleBtn);

      // If a Copy button exists, place our button just to its LEFT (no changes to the Copy button).
      // Heuristics: look for a button directly under <pre> with title "Copy to clipboard"
      // or containing an <i class="fa-copy"> icon.
      const $copyBtn = $pre.children('button').filter(function () {
        const $b = $(this);
        if ($b.is($toggleBtn)) return false;
        const titleMatch = ($b.attr('title') || '').toLowerCase() === 'copy to clipboard';
        const iconMatch = $b.find('i.fa-copy, i.far.fa-copy, i.fas.fa-copy').length > 0;
        return titleMatch || iconMatch;
      }).first();

      if ($copyBtn.length) {
        // Compute our right offset = copy.right + copy.width + small gap
        const gapPx = 6; // space between buttons
        // Read copy button's computed "right" (fallback to 16px ≈ 1em if not set)
        const copyRight = parseFloat($copyBtn.css('right')) || 16;
        const copyWidth = Math.ceil($copyBtn.outerWidth()); // includes padding/border

        const newRight = copyRight + copyWidth + gapPx;
        $toggleBtn.css('right', `${newRight}px`);

        // Align vertically with copy button if it uses a different top
        const copyTop = $copyBtn.css('top');
        if (copyTop && copyTop !== 'auto') {
          $toggleBtn.css('top', copyTop);
        }
      }
      // else: no copy button found; keep default position (top-right).
    });
  });
})();
