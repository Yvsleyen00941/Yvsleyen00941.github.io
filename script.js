// Mintly Interactive Filter Behavior

document.addEventListener('DOMContentLoaded', () => {
  const switcherTabs = document.querySelectorAll('.switcher-tab');
  const cards = document.querySelectorAll('.mintly-card');

  switcherTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      switcherTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(6px)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
});
