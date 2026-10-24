// Interactive behavior for Yorben's Portfolio (Mintly-inspired architecture)

document.addEventListener('DOMContentLoaded', () => {
  // Category Filtering with Active Underline
  const tabItems = document.querySelectorAll('.tab-item');
  const appCards = document.querySelectorAll('.app-card');

  tabItems.forEach(tab => {
    tab.addEventListener('click', () => {
      tabItems.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      appCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
});
