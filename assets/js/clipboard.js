/* clipboard.js — copy button fixed at top-right regardless of horizontal scroll
 * Exposes: window.initCopyButtons(scopeElement?)
 * Requires jQuery.
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function onClickEffect(btn, style) {
  btn.removeClass("btn-light");
  btn.addClass(style);
  await sleep(250);
  btn.removeClass(style);
  btn.addClass("btn-light");
}

window.initCopyButtons = function initCopyButtons(scope = document) {
  $(scope).find('pre > code').each(function () {
    const $pre = $(this).parent();

    // Ensure a non-scrolling positioned wrapper around the <pre>
    let $wrap = $pre.parent('.codeframe');
    if (!$wrap.length) {
      $wrap = $('<div class="codeframe"></div>');
      // Wrap <pre> WITHOUT breaking existing layout
      $pre.before($wrap);
      $wrap.append($pre);
      // Make wrapper the positioning context; do not change overflow here
      $wrap.css({ position: 'relative' });
    }

    // Skip if this wrapper already has a copy button
    const hasCopy =
      $wrap.children('button[title="Copy to clipboard"]').length > 0 ||
      $wrap.children('button').find('i.fa-copy, i.far.fa-copy, i.fas.fa-copy').length > 0;

    if (hasCopy) return;

    // Create and insert the Copy button as an OVERLAY inside the wrapper (not inside <pre>)
    const $btn = $(document.createElement('button'))
      .prop({
        type: 'button',
        innerHTML: '<i class="far fa-copy"></i>',
      })
      .attr('title', 'Copy to clipboard')
      .addClass('btn')
      .addClass('btn--primary')
      // Overlay placement: pinned to wrapper's top-right
      .css({
        position: 'absolute',
        top: '0.45em',
        right: '1em',
        zIndex: 2,           // above code content
        pointerEvents: 'auto'
      })
      .on('click', function () {
        const codeElement = $pre.children('code').first().get(0);
        if (!codeElement) {
          throw new Error("Unexpected error! No corresponding code block was found for this button.");
        }
        onClickEffect($(this), "btn--success");
        navigator.clipboard.writeText(codeElement.textContent || "").then(() => true, () => true);
        return true;
      });

    // Add overlay button to wrapper
    $wrap.append($btn);
  });
};

// Initialize on full document once DOM is ready
$(document).ready(function () {
  window.initCopyButtons(document);
});
