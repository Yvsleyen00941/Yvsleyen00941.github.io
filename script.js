// Interactive functionality for Yorben's App Portfolio

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Project Filtering
  const filterChips = document.querySelectorAll('.filter-chip');
  const projectContainers = document.querySelectorAll('.project-card-container');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      // Update active chip state
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filterValue = chip.getAttribute('data-filter');

      projectContainers.forEach(container => {
        const category = container.getAttribute('data-category') || '';
        
        if (filterValue === 'all' || category.includes(filterValue)) {
          container.classList.remove('hidden');
          container.style.opacity = '0';
          container.style.transform = 'translateY(10px)';
          setTimeout(() => {
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
          }, 50);
        } else {
          container.classList.add('hidden');
        }
      });
    });
  });

  // 3. Native HTML5 Dialog Modals
  const modalButtons = document.querySelectorAll('.btn-open-modal');
  
  modalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      const dialog = document.getElementById(modalId);
      if (dialog && typeof dialog.showModal === 'function') {
        dialog.showModal();
      }
    });
  });

  // Close modal logic
  const allDialogs = document.querySelectorAll('.project-modal');
  allDialogs.forEach(dialog => {
    // Close on cross or close button
    const closeButtons = dialog.querySelectorAll('.modal-close, .modal-close-btn');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        dialog.close();
      });
    });

    // Close when clicking outside the modal card (on backdrop)
    dialog.addEventListener('click', (event) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        dialog.close();
      }
    });
  });
});
