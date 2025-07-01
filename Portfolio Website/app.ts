// app.ts

document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor jump
            const targetId = (this as HTMLAnchorElement).getAttribute('href')!;
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth' // Smooth scroll effect
                });
            }
        });
    });

    // 2. Project Filtering
    const filterButtons = document.querySelectorAll('#projects .btn[data-filter]');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove 'active' class from all filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' class to the clicked button
            this.classList.add('active');

            const filterValue = (this as HTMLElement).dataset.filter; // Get the filter value (e.g., 'web-dev', 'ui-ux', 'all')

            projectItems.forEach(item => {
                const projectItem = item as HTMLElement;
                // Check if the item matches the filter or if 'all' is selected
                if (filterValue === 'all' || projectItem.classList.contains(filterValue!)) {
                    projectItem.style.display = 'block'; // Show the item
                    // Optional: Add a subtle fade-in animation for displayed items
                    projectItem.style.opacity = '0';
                    projectItem.style.transition = 'opacity 0.3s ease-in-out';
                    setTimeout(() => projectItem.style.opacity = '1', 50); // Small delay for animation
                } else {
                    projectItem.style.display = 'none'; // Hide the item
                }
            });
        });
    });

    // 3. Simple Contact Form Submission (Client-side validation only)
    const contactForm = document.getElementById('contactForm') as HTMLFormElement;
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission (page reload)

            const nameInput = document.getElementById('name') as HTMLInputElement;
            const emailInput = document.getElementById('email') as HTMLInputElement;
            const subjectInput = document.getElementById('subject') as HTMLInputElement;
            const messageInput = document.getElementById('message') as HTMLTextAreaElement;

            // Basic validation
            if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || subjectInput.value.trim() === '' || messageInput.value.trim() === '') {
                alert('Please fill in all fields before sending your message.');
                return;
            }

            // Simple email format validation
            if (!/\S+@\S+\.\S+/.test(emailInput.value)) {
                alert('Please enter a valid email address.');
                return;
            }

            // In a real-world scenario, you would send this form data to a backend server
            // or use a service like Formspree, Netlify Forms, or Web3Forms.
            // For now, we'll just simulate a successful submission.
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset(); // Clear the form fields after submission
        });
    }

    // 4. Update Current Year in Footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear().toString();
    }
});