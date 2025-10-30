/* hide-output.js — minimal, no spacing/positioning logic */
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
      if (!$output.length) return; // only add when this code cell has an output

      const $toggleBtn = $(
        '<button type="button" class="btn btn--secondary hide-output-btn" title="Hide output" aria-expanded="true">' +
          '<i class="far fa-eye-slash"></i>' +
        '</button>'
      )
      .css('position', 'absolute')
      .css('right', '4.5em')
      .on('click', function (e) {
        e.preventDefault();
        const isHidden = $output.is(':hidden');
        if (isHidden) {
          $output.slideDown(120);
          $toggleBtn.attr('title', 'Hide output').attr('aria-expanded', 'true');
          $toggleBtn.find('i').attr('class', 'far fa-eye-slash');
        } else {
          $output.slideUp(120);
          $toggleBtn.attr('title', 'Show output').attr('aria-expanded', 'false');
          $toggleBtn.find('i').attr('class', 'far fa-eye');
        }
      });

      // Just add it; no spacing/positioning here
      $pre.prepend($toggleBtn);
    });
  });
})();
