// app.ts
document.addEventListener('DOMContentLoaded', function () {
    // 1. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a.nav-link[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor jump
            var targetId = this.getAttribute('href');
            var targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth' // Smooth scroll effect
                });
            }
        });
    });
    // 2. Project Filtering
    var filterButtons = document.querySelectorAll('#projects .btn[data-filter]');
    var projectItems = document.querySelectorAll('.project-item');
    filterButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Remove 'active' class from all filter buttons
            filterButtons.forEach(function (btn) { return btn.classList.remove('active'); });
            // Add 'active' class to the clicked button
            this.classList.add('active');
            var filterValue = this.dataset.filter; // Get the filter value (e.g., 'web-dev', 'ui-ux', 'all')
            projectItems.forEach(function (item) {
                var projectItem = item;
                // Check if the item matches the filter or if 'all' is selected
                if (filterValue === 'all' || projectItem.classList.contains(filterValue)) {
                    projectItem.style.display = 'block'; // Show the item
                    // Optional: Add a subtle fade-in animation for displayed items
                    projectItem.style.opacity = '0';
                    projectItem.style.transition = 'opacity 0.3s ease-in-out';
                    setTimeout(function () { return projectItem.style.opacity = '1'; }, 50); // Small delay for animation
                }
                else {
                    projectItem.style.display = 'none'; // Hide the item
                }
            });
        });
    });
    // 3. Simple Contact Form Submission (Client-side validation only)
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission (page reload)
            var nameInput = document.getElementById('name');
            var emailInput = document.getElementById('email');
            var subjectInput = document.getElementById('subject');
            var messageInput = document.getElementById('message');
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
    var currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear().toString();
    }
});
