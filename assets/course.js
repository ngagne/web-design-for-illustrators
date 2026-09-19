document.querySelectorAll('[data-quiz]').forEach((quiz) => {
  const feedback = quiz.querySelector('.feedback');
  quiz.querySelectorAll('.choice').forEach((choice) => {
    choice.addEventListener('click', () => {
      quiz.querySelectorAll('.choice').forEach((item) => item.setAttribute('aria-pressed', 'false'));
      choice.setAttribute('aria-pressed', 'true');
      const correct = choice.dataset.correct === 'true';
      feedback.textContent = correct ? choice.dataset.good : choice.dataset.try;
      feedback.className = `feedback ${correct ? 'good' : 'try'}`;
    });
  });
});

document.querySelectorAll('[data-space-lab]').forEach((lab) => {
  const slider = lab.querySelector('input');
  const demo = lab.querySelector('.space-demo');
  const feedback = lab.querySelector('.feedback');
  const update = () => {
    const value = Number(slider.value);
    demo.style.setProperty('--gap', `${value / 10}rem`);
    feedback.textContent = value < 24
      ? 'These panels are competing. Separate unrelated groups more decisively.'
      : value < 55
        ? 'A usable middle ground. Notice that the grouping is beginning to read.'
        : 'Strong grouping: the gap makes the two ideas distinct before you read a word.';
  };
  slider.addEventListener('input', update);
  update();
});

document.querySelectorAll('[data-hierarchy-lab]').forEach((lab) => {
  const feedback = lab.querySelector('.feedback');
  const messages = { title: 'The title has the strongest claim, so the visitor understands the page before deciding what to do.', detail: 'The detail is first now. Useful for an announcement, but the purpose needs support.', action: 'The action jumps forward. It is clear, but the visitor may not yet know why to take it.' };
  lab.querySelectorAll('[data-focus]').forEach((button) => button.addEventListener('click', () => {
    const focus = button.dataset.focus;
    lab.dataset.focus = focus;
    lab.querySelectorAll('[data-focus]').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    feedback.textContent = messages[focus];
  }));
});

document.querySelectorAll('[data-grid-lab]').forEach((lab) => {
  const stage = lab.querySelector('.grid-stage');
  const feedback = lab.querySelector('.feedback');
  lab.querySelector('[data-guides]').addEventListener('click', (event) => {
    const hidden = stage.classList.toggle('guides-hidden');
    const visible = !hidden;
    event.currentTarget.setAttribute('aria-pressed', String(visible));
    event.currentTarget.textContent = visible ? 'Hide grid' : 'Show grid';
    feedback.textContent = visible ? 'Four columns and baseline rows make the available structure visible.' : 'The guides are hidden, but the elements can still retain their shared relationships.';
  });
  lab.querySelector('[data-snap]').addEventListener('click', () => {
    stage.classList.add('snapped');
    stage.classList.remove('guides-hidden');
    lab.querySelector('[data-guides]').setAttribute('aria-pressed', 'true');
    lab.querySelector('[data-guides]').textContent = 'Hide grid';
    feedback.textContent = 'Now every element deliberately starts on a column and spans only the space it needs.';
  });
});

document.querySelectorAll('[data-type-lab]').forEach((lab) => {
  const slider = lab.querySelector('input'); const stage = lab.querySelector('.type-stage'); const output = lab.querySelector('output'); const feedback = lab.querySelector('.feedback');
  const update = () => { const value = Number(slider.value); const width = 28 + ((value - 30) / 52) * 72; stage.style.setProperty('--measure-width', `${width}%`); output.value = `${value} characters`; feedback.textContent = value < 45 ? 'Very narrow: easy to scan, but the frequent line breaks interrupt the thought.' : value > 70 ? 'Very wide: the eye has a longer trip to find the next line.' : 'This is a comfortable reading width for longer text.'; };
  slider.addEventListener('input', update); update();
});

document.querySelectorAll('[data-contrast-lab]').forEach((lab) => {
  const stage = lab.querySelector('.contrast-stage'); const feedback = lab.querySelector('.feedback');
  const messages = { ink: 'Ink on coral: strong enough for normal text.', paper: 'Paper on coral: readable at a large scale, but not a dependable body-text pair.', muted: 'Muted on coral: too quiet for body text. Use a stronger value contrast.' };
  lab.querySelectorAll('[data-contrast]').forEach((button) => button.addEventListener('click', () => { const value = button.dataset.contrast; stage.dataset.text = value; lab.querySelectorAll('[data-contrast]').forEach((item) => item.setAttribute('aria-pressed', String(item === button))); feedback.textContent = messages[value]; }));
});

document.querySelectorAll('[data-rhythm-lab]').forEach((lab) => {
  const slider = lab.querySelector('input'); const stage = lab.querySelector('.rhythm-stage'); const output = lab.querySelector('output'); const feedback = lab.querySelector('.feedback');
  const update = () => { const value = Number(slider.value); stage.style.setProperty('--group-gap', `${value}px`); output.value = `${value} px`; feedback.textContent = value < 24 ? 'The groups are merging. Give unrelated ideas more air.' : value < 48 ? 'The groups begin to read as separate ideas while retaining a steady rhythm.' : 'Clear separation: proximity now makes each group easy to recognize.'; };
  slider.addEventListener('input', update); update();
});

document.querySelectorAll('[data-responsive-lab]').forEach((lab) => {
  const slider = lab.querySelector('input'); const canvas = lab.querySelector('.responsive-canvas'); const output = lab.querySelector('output'); const feedback = lab.querySelector('.feedback');
  const update = () => {
    const value = Number(slider.value); const wide = value >= 430; const changesLayout = canvas.classList.contains('wide') !== wide;
    const tiles = [...canvas.querySelectorAll('.tile')];
    const before = changesLayout ? new Map(tiles.map((tile) => { tile.getAnimations().forEach((animation) => animation.cancel()); return [tile, tile.getBoundingClientRect()]; })) : null;
    canvas.style.setProperty('--canvas-width', `${value}px`); canvas.classList.toggle('wide', wide);
    output.value = `${value} px · ${wide ? 'two columns' : 'stacked'}`;
    feedback.textContent = wide ? 'There is room for two columns now. The content can sit side by side without becoming cramped.' : 'At this width, stacking gives every idea room to breathe.';
    if (changesLayout && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) requestAnimationFrame(() => tiles.forEach((tile) => {
      const from = before.get(tile); const to = tile.getBoundingClientRect();
      const animation = tile.animate([{ transform: `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width}, ${from.height / to.height})` }, { transform: 'translate(0, 0) scale(1, 1)' }], { duration: 420, easing: 'cubic-bezier(.16, 1, .3, 1)' });
      animation.finished.then(() => { tile.style.willChange = ''; }); tile.style.willChange = 'transform';
    }));
  };
  slider.addEventListener('input', update); update();
});

document.querySelectorAll('[data-interaction-lab]').forEach((lab) => {
  const control = lab.querySelector('.save-control'); const note = lab.querySelector('.interaction-note');
  control.addEventListener('click', () => { const saved = control.getAttribute('aria-pressed') !== 'true'; control.setAttribute('aria-pressed', String(saved)); control.innerHTML = saved ? '<span aria-hidden="true">✓</span> Saved to your collection' : '<span aria-hidden="true">＋</span> Save sketch'; note.textContent = saved ? 'Saved. You can find this sketch in your collection.' : 'Removed from your collection.'; });
});

document.querySelectorAll('[data-system-lab]').forEach((lab) => {
  const stage = lab.querySelector('.system-stage'); const feedback = lab.querySelector('.feedback');
  lab.querySelectorAll('[data-format]').forEach((button) => button.addEventListener('click', () => { const format = button.dataset.format; stage.dataset.format = format; lab.querySelectorAll('[data-format]').forEach((item) => item.setAttribute('aria-pressed', String(item === button))); feedback.textContent = format === 'poster' ? 'The wide format has more breathing room, but the visual rules remain the same.' : 'The square layout changes the crop and order, while the palette, type role, and motif stay intact.'; }));
});

document.querySelectorAll('[data-critique-lab]').forEach((lab) => {
  const result = lab.querySelector('.critique-result span'); const messages = { purpose: 'Clarify the purpose first: strengthen the title or opening image, then test again.', action: 'Strengthen the action: give it a clear label, stronger placement, and enough contrast.', type: 'Improve the smallest text: increase its size or contrast before making another visual change.', grouping: 'Strengthen the grouping: bring related items closer, then add more space before the next idea.', responsive: 'Rework the narrow layout: stack the competing content and keep the primary action visible.' };
  lab.querySelectorAll('input').forEach((input) => input.addEventListener('change', () => { const active = [...lab.querySelectorAll('input:checked')]; result.textContent = active.length ? messages[active[0].dataset.issue] : 'Choose an observation to turn feedback into a focused change.'; }));
});
