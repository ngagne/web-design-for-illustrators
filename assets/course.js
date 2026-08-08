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
