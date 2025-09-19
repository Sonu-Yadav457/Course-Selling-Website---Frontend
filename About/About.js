document.addEventListener("DOMContentLoaded", () => {
  // Scroll Animation using IntersectionObserver
  const faders = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  faders.forEach(fade => observer.observe(fade));

  // Counter Animation
  const counters = document.querySelectorAll('.stat-number');
  let hasCounted = false;

  const runCounters = () => {
    if (hasCounted) return;
    hasCounted = true;
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const increment = target / 100;

      const updateCount = () => {
        count += increment;
        if (count < target) {
          counter.innerText = Math.ceil(count);
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  const statsSection = document.querySelector('.stats-section');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runCounters();
        statsObserver.unobserve(statsSection);
      }
    });
  }, { threshold: 0.5 });

  statsObserver.observe(statsSection);

  // Show More / Show Less Toggle
  const toggleBtn = document.getElementById('toggleVision');
  const extraText = document.querySelector('.extra-text');

  if (toggleBtn && extraText) {
    toggleBtn.addEventListener('click', () => {
      extraText.classList.toggle('hidden');
      toggleBtn.textContent = extraText.classList.contains('hidden') ? 'Show More' : 'Show Less';
    });
  }
});
