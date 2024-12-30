document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.querySelector('.intro-screen');
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.querySelector('.hamburger');
    const menuOverlay = document.querySelector('.menu-overlay');
    const logoLinks = document.querySelectorAll('.logo-link, .intro-logo-link');
    const logo = document.querySelector('.logo');
    const navIcons = document.querySelectorAll('.nav-icons img');
    const navbar = document.querySelector('.navbar');
    const body = document.body;
    const menuInicio = document.querySelector('.menu-overlay .inicio-link');
    let introHidden = false;

    // Carousel variables
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    let currentSlide = 0;

    // Function to hide the intro screen
    function hideIntroScreen() {
        if (introScreen) {
            introScreen.classList.add('hidden');
        }
        if (header) {
            header.classList.add('show');
        }
        navLinks.forEach(link => (link.style.display = 'flex'));
        introHidden = true;
    }

    // Update navbar on scroll
    function updateNavbarOnScroll() {
        const scrollY = window.scrollY;

        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.remove('scrolled');
                navbar.style.backgroundColor = '#fff';
                if (logo) logo.src = 'images/logo-dark.png';
                if (hamburger) {
                    hamburger.querySelectorAll('span').forEach(span => (span.style.background = '#000'));
                }
                navLinks.forEach(link => (link.style.color = '#000'));
                navIcons.forEach(icon => (icon.style.filter = 'invert(0)'));
            } else {
                navbar.classList.add('scrolled');
                navbar.style.backgroundColor = '#002BB5';
                if (logo) logo.src = 'images/logo-white.png';
                if (hamburger) {
                    hamburger.querySelectorAll('span').forEach(span => (span.style.background = '#fff'));
                }
                navLinks.forEach(link => (link.style.color = '#fff'));
                navIcons.forEach(icon => (icon.style.filter = 'invert(1)'));
            }
        }
        if (scrollY > 0.2 && !introHidden) hideIntroScreen();
    }

    // Carousel functions
    function updateCarousel() {
        const offset = -currentSlide * 100; // Calculate the offset for the current slide
        carouselContainer.style.transform = `translateX(${offset}%)`;
    }

    function showNextSlide() {
        currentSlide = (currentSlide + 1) % carouselSlides.length; // Loop back to the first slide
        updateCarousel();
    }

    function showPrevSlide() {
        currentSlide = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length; // Loop back to the last slide
        updateCarousel();
    }

    // Auto-play functionality
    function autoPlayCarousel() {
        setInterval(showNextSlide, 5000); // Change slides every 5 seconds
    }

    // Event listeners for carousel controls
    if (nextButton) nextButton.addEventListener('click', showNextSlide);
    if (prevButton) prevButton.addEventListener('click', showPrevSlide);

    // Start auto-play
    autoPlayCarousel();

    // Hamburger menu toggle
    if (hamburger && menuOverlay) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            body.classList.toggle('no-scroll');
        });
    }

    // Resize event
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 769) {
            navLinks.forEach(link => (link.style.display = 'flex'));
            if (menuOverlay) menuOverlay.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
            body.classList.remove('no-scroll');
        } else {
            navLinks.forEach(link => (link.style.display = 'none'));
        }
    });

    // Initial configuration
    if (window.innerWidth >= 769) {
        navLinks.forEach(link => (link.style.display = 'flex'));
    } else {
        navLinks.forEach(link => (link.style.display = 'none'));
    }

    // Scroll to top on logo click
    if (logo) {
        logo.addEventListener('click', e => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Scroll to top on "Início" link click
    if (menuInicio) {
        menuInicio.addEventListener('click', e => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            menuOverlay.classList.remove('active');
            hamburger.classList.remove('active');
            body.classList.remove('no-scroll');
        });
    }

    // Scroll event
    window.addEventListener('scroll', updateNavbarOnScroll);
});
