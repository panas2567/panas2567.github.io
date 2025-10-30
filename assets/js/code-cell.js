/* code-cell.js — split code block and interleave outputs
 * Finds Rouge string spans (span.s) that contain """<cellout>...</cellout>"""
 * Removes the placeholder span (+ its trailing newline)
 * Splits the original <pre><code> into multiple blocks and inserts
 * a non-copyable output box right after each corresponding code segment.
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

  function createOutputEl(text) {
    const out = document.createElement('div');
    out.className = 'code-cell-output';
    out.textContent = text.trim();
    Object.assign(out.style, {
      marginTop: '0.35rem',
      padding: '0.35rem 0.6rem',
      whiteSpace: 'pre-wrap',
      lineHeight: '1.2',
      fontSize: '0.9em',
      fontFamily:
        'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      borderLeft: '3px solid var(--mm-accent, #4caf50)',
      background: 'var(--mm-code-bg, rgba(127,127,127,0.08))',
      borderRadius: '0 0.25rem 0.25rem 0',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      cursor: 'default',
    });
    ['copy', 'cut', 'selectstart', 'mousedown', 'contextmenu'].forEach(ev =>
      out.addEventListener(ev, e => e.preventDefault())
    );
    return out;
  }

  function clonePreCodeShell(origPre, origCode) {
    const pre = document.createElement('pre');
    // copy pre classes/attrs
    pre.className = origPre.className;
    // copy useful attributes if present
    Array.from(origPre.attributes).forEach(a => {
      if (a.name !== 'class') pre.setAttribute(a.name, a.value);
    });

    const code = document.createElement('code');
    code.className = origCode.className;
    Array.from(origCode.attributes).forEach(a => {
      if (a.name !== 'class') code.setAttribute(a.name, a.value);
    });

    pre.appendChild(code);
    return { pre, code };
  }

  onReady(function () {
    // Work only within page content
    const codeBlocks = document.querySelectorAll('.page__content pre > code');

    codeBlocks.forEach(codeEl => {
      const preEl = codeEl.parentElement;

      // Snapshot children so we can safely move nodes
      const children = Array.from(codeEl.childNodes);
      // Quick scan: do we have any relevant placeholders?
      const hasPlaceholder = children.some(node =>
        node.nodeType === Node.ELEMENT_NODE &&
        node.matches?.('span.s') &&
        /"""[\s\S]*?<cellout>[\s\S]*?<\/cellout>[\s\S]*?"""/.test(node.textContent || '')
      );
      if (!hasPlaceholder) return;

      const frag = document.createDocumentFragment();
      let { pre: curPre, code: curCode } = clonePreCodeShell(preEl, codeEl);
      let curHasContent = false;

      const pushCurPreIfContent = () => {
        // Only append non-empty code blocks (some highlighters emit stray whitespace;
        // we consider content if code has any non-empty text after trimming)
        const text = curCode.textContent || '';
        if (text.length > 0) {
          frag.appendChild(curPre);
          curHasContent = false;
        }
      };

      for (let i = 0; i < children.length; i++) {
        const node = children[i];

        // Placeholder lives entirely inside a Rouge string span
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          node.matches?.('span.s')
        ) {
          const txt = node.textContent || '';
          const match = txt.match(/"""\s*<cellout>\s*([\s\S]*?)\s*<\/cellout>\s*"""/);
          if (match) {
            const outputText = match[1];

            // Before inserting output, add everything collected so far as a code block
            pushCurPreIfContent();

            // Remove this placeholder span by skipping it (do not move it to curCode)
            // Also skip ONE trailing newline text node if present
            const next = children[i + 1];
            if (next && next.nodeType === Node.TEXT_NODE && /^\r?\n/.test(next.nodeValue || '')) {
              // consume that newline so it doesn't create a blank line
              children.splice(i + 1, 1);
            }

            // Insert output block right after the preceding code block
            frag.appendChild(createOutputEl(outputText));

            // Start a fresh <pre><code> for the next chunk
            ({ pre: curPre, code: curCode } = clonePreCodeShell(preEl, codeEl));
            curHasContent = false;

            // Do not move the placeholder span; continue with next node
            continue;
          }
        }

        // For all non-placeholder nodes, move them into current code block
        curCode.appendChild(node); // moves node out of original
        if ((node.textContent || '').length) curHasContent = true;
      }

      // Flush the last code chunk
      const remaining = (curCode.textContent || '').length > 0;
      if (remaining) frag.appendChild(curPre);

      // Replace original single pre with the new interleaved sequence
      preEl.replaceWith(frag);
    });
  });
})();
