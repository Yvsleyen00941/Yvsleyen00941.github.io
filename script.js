// Mintly Interactive Behavior & Modal Controller for Yorben.me

document.addEventListener('DOMContentLoaded', () => {
  // 1. Toast Notification Helper
  const toast = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message || 'Copied to clipboard!';
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }

  // 2. Clipboard Copy Triggers
  const copyButtons = document.querySelectorAll('[data-clipboard]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent opening modals when clicking copy
      const textToCopy = btn.getAttribute('data-clipboard');
      if (textToCopy && navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(textToCopy.includes('@') ? 'Email address copied!' : 'Clone command copied!');
        }).catch(() => {
          showToast('Copied to clipboard!');
        });
      }
    });
  });

  // 3. Filter Switcher Tabs
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

  // 4. Modal Dialog Handlers
  const modalCards = document.querySelectorAll('[data-modal]');
  modalCards.forEach(card => {
    // Open on card click
    card.addEventListener('click', () => {
      const modalId = card.getAttribute('data-modal');
      const dialog = document.getElementById(modalId);
      if (dialog && typeof dialog.showModal === 'function') {
        dialog.showModal();
      }
    });

    // Keyboard support (Enter or Space to open modal)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const modalId = card.getAttribute('data-modal');
        const dialog = document.getElementById(modalId);
        if (dialog && typeof dialog.showModal === 'function') {
          dialog.showModal();
        }
      }
    });
  });

  // Close modal behavior
  const allDialogs = document.querySelectorAll('.mintly-modal');
  allDialogs.forEach(dialog => {
    const closeTriggers = dialog.querySelectorAll('.modal-close-trigger, .modal-dismiss-btn');
    closeTriggers.forEach(btn => {
      btn.addEventListener('click', () => {
        dialog.close();
      });
    });

    // Close on backdrop click (outside the modal surface)
    dialog.addEventListener('click', (event) => {
      const rect = dialog.getBoundingClientRect();
      const clickedInside = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!clickedInside) {
        dialog.close();
      }
    });
  });

  // 5. Smooth Scroll Navigation Spy
  const navLinks = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[id], main[id]');

  window.addEventListener('scroll', () => {
    let currentId = 'apps';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
});
