document.addEventListener('DOMContentLoaded', () => {
  // 1. Smooth Scrolling for Navigation Links
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('a.nav-link[href^="#"]');
  navLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e: MouseEvent) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (!targetId) return;

      const targetElement = document.querySelector<HTMLElement>(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 2. Project Filtering
  const filterButtons = document.querySelectorAll<HTMLButtonElement>('#projects .btn[data-filter]');
  const projectItems = document.querySelectorAll<HTMLElement>('.project-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
     
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      const filterValue = this.dataset.filter;
      if (!filterValue) return;

      projectItems.forEach(item => {
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          item.style.display = 'block';
          item.style.opacity = '0';
          item.style.transition = 'opacity 0.3s ease-in-out';
          setTimeout(() => (item.style.opacity = '1'), 50);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 3. Simple Contact Form Submission (Client-side validation only)
  const contactForm = document.getElementById('contactForm') as HTMLFormElement | null;
  if (contactForm) {
    contactForm.addEventListener('submit', function (event: Event) {
      event.preventDefault();

      const nameInput = document.getElementById('name') as HTMLInputElement | null;
      const emailInput = document.getElementById('email') as HTMLInputElement | null;
      const subjectInput = document.getElementById('subject') as HTMLInputElement | null;
      const messageInput = document.getElementById('message') as HTMLTextAreaElement | null;

      if (!nameInput || !emailInput || !subjectInput || !messageInput) {
        alert('Form elements missing.');
        return;
      }

      if (
        nameInput.value.trim() === '' ||
        emailInput.value.trim() === '' ||
        subjectInput.value.trim() === '' ||
        messageInput.value.trim() === ''
      ) {
        alert('Please fill in all fields before sending your message.');
        return;
      }

      if (!/\S+@\S+\.\S+/.test(emailInput.value)) {
        alert('Please enter a valid email address.');
        return;
      }

      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    });
  }

  // 4. Update Current Year in Footer
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear().toString();
  }
});
