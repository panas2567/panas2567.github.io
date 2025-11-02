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
    // keep styling in CSS if you prefer; inline for portability:
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

  // Helper: new empty <pre><code> that clones classes/attrs from originals
  function clonePreCodeShell(origPre, origCode) {
    const pre = document.createElement('pre');
    pre.className = origPre.className;
    Array.from(origPre.attributes).forEach(a => { if (a.name !== 'class') pre.setAttribute(a.name, a.value); });

    const code = document.createElement('code');
    code.className = origCode.className;
    Array.from(origCode.attributes).forEach(a => { if (a.name !== 'class') code.setAttribute(a.name, a.value); });

    pre.appendChild(code);
    return { pre, code };
  }

  // Streaming detection across child nodes
  onReady(function () {
    const codeBlocks = document.querySelectorAll('.page__content pre > code');

    codeBlocks.forEach(codeEl => {
      const preEl = codeEl.parentElement;
      const nodes = Array.from(codeEl.childNodes);
      // quick exit if there’s definitely no placeholder at all
      if (!codeEl.textContent.includes('<cellout>')) return;

      const frag = document.createDocumentFragment();
      let { pre: curPre, code: curCode } = clonePreCodeShell(preEl, codeEl);

      // State machine buffers
      let buffering = false;
      let bufferNodes = [];   // nodes inside placeholder (to remove)
      let bufferText = '';    // concatenated text for extracting inner payload

      const START = '"""<cellout>';
      const END = '</cellout>"""';

      // Helper to append current code chunk if it has non-empty text
      const flushCodeIfAny = () => {
        if ((curCode.textContent || '').trim().length) frag.appendChild(curPre);
      };

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Always work with the textual representation of each node
        const t = n.textContent || '';

        if (!buffering) {
          // Look for start token possibly split across boundaries:
          // We maintain a small rolling window of previous tail to catch split start
          // For simplicity here, we check if the remaining concatenated stream will include START.
          // A practical approach: check if START begins in this node or spans from the end of prev.
          const joined = t;
          if (joined.includes(START)) {
            // Enter buffering: we need to split around the START occurrence
            const idx = joined.indexOf(START);

            // 1) Move any text *before* START into current code block (preserves markup)
            if (idx > 0) {
              // Split this node into left (keep) and right (goes to buffer)
              if (n.nodeType === Node.TEXT_NODE) {
                const leftText = t.slice(0, idx);
                const rightText = t.slice(idx);
                n.nodeValue = leftText;
                // keep the left node by appending it
                curCode.appendChild(n);
                // create a new text node for the right part that we’ll handle below
                const rightNode = document.createTextNode(rightText);
                bufferNodes = [rightNode];
              } else {
                // Element node (e.g., <span>) — clone it and split by wrapping text nodes is complex.
                // Easiest: wrap with a text node to represent the right part
                // We can read it as text and continue buffering at the cost of losing inner spans for the buffered part (we remove it anyway).
                const rightNode = document.createTextNode(joined.slice(idx));
                curCode.appendChild(n); // append the original element as-is (only its pre-START content matters)
                bufferNodes = [rightNode];
              }
            } else {
              // START begins right at the start of this node: don’t move this node into code
              bufferNodes = [n];
            }

            buffering = true;
            bufferText = (bufferNodes[0].textContent || '');

          } else {
            // No START in this node: it belongs to the current visible code chunk
            curCode.appendChild(n);
          }
        } else {
          // We are buffering: accumulate nodes until we consume END
          bufferNodes.push(n);
          bufferText += t;

          if (bufferText.includes(END)) {
            // Extract output text between <cellout>...</cellout>
            const m = bufferText.match(/"""<cellout>\s*([\s\S]*?)\s*<\/cellout>"""/);
            const inner = m ? m[1] : '';

            // Remove buffered nodes from the DOM by NOT appending them to curCode
            // Also eat ONE trailing newline if it’s immediately after the buffer
            const next = nodes[i + 1];
            if (next && next.nodeType === Node.TEXT_NODE && /^\r?\n/.test(next.nodeValue || '')) {
              // consume that newline so it doesn't create a blank line
              nodes.splice(i + 1, 1);
            }

            // Flush the code we already collected (before this placeholder)
            flushCodeIfAny();

            // Insert the output box
            frag.appendChild(createOutputEl(inner));

            // Start a new code chunk after the placeholder
            ({ pre: curPre, code: curCode } = clonePreCodeShell(preEl, codeEl));

            // Reset buffer state
            buffering = false;
            bufferNodes = [];
            bufferText = '';
          }
        }
      }

      // If we ended while buffering (malformed placeholder), just discard bufferNodes silently.

      // Append the remaining code chunk (if any)
      if ((curCode.textContent || '').trim().length) frag.appendChild(curPre);

      // Replace the original <pre> with our interleaved sequence
      preEl.replaceWith(frag);
    });
  });
})();
