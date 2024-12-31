document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.querySelector('.intro-screen');
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.querySelector('.hamburger');
    const menuOverlay = document.querySelector('.menu-overlay');
    const logo = document.querySelector('.logo');
    const navIcons = document.querySelectorAll('.nav-icons img');
    const navbar = document.querySelector('.navbar');
    const body = document.body;
    const menuInicio = document.querySelector('.menu-overlay .inicio-link');
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicators button');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    const footerLogo = document.querySelector('.footer-logo-animated');
    const phoneInput = document.getElementById('phone');
    const form = document.querySelector('.contact-form');
    const modal = document.getElementById('confirmation-modal');
    const closeModalButton = document.getElementById('close-modal');
    const faqItems = document.querySelectorAll('.faq-item');
    const elements = document.querySelectorAll("[data-animation]");
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const closeWelcomeButton = document.getElementById('close-welcome-overlay');
    let currentSlide = 0;
    let introHidden = false;

    // Função para esconder a tela inicial e mostrar o cabeçalho fixo
    function hideIntroScreen() {
        if (introScreen) introScreen.classList.add('hidden');
        if (header) header.classList.add('show');
        navLinks.forEach(link => (link.style.display = 'flex'));
        introHidden = true;
    }

    // Atualiza a navegação com base no scroll
    function updateNavbarOnScroll() {
        const scrollY = window.scrollY;
        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
                navbar.style.backgroundColor = '#002BB5';
                if (logo) logo.src = 'images/logo-white.png';
                if (hamburger) {
                    hamburger.querySelectorAll('span').forEach(span => (span.style.background = '#fff'));
                }
                navLinks.forEach(link => (link.style.color = '#fff'));
                navIcons.forEach(icon => (icon.style.filter = 'invert(1)'));
            } else {
                navbar.classList.remove('scrolled');
                navbar.style.backgroundColor = '#fff';
                if (logo) logo.src = 'images/logo-dark.png';
                if (hamburger) {
                    hamburger.querySelectorAll('span').forEach(span => (span.style.background = '#000'));
                }
                navLinks.forEach(link => (link.style.color = '#000'));
                navIcons.forEach(icon => (icon.style.filter = 'invert(0)'));
            }
        }
        if (scrollY > 0.2 && !introHidden) hideIntroScreen();
    }

    // Ativa o modal toda vez que a página é recarregada
    welcomeOverlay.classList.add('active');

    // Fecha o modal ao clicar no botão
    closeWelcomeButton.addEventListener('click', () => {
        welcomeOverlay.classList.remove('active');
    });

    // Atualiza o carrossel e os indicadores
    function updateCarousel() {
        const offset = -currentSlide * 100;
        carouselContainer.style.transform = `translateX(${offset}%)`;
        updateIndicators();
    }

    // Atualiza os indicadores com base no slide atual
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }

    // Mostra o próximo slide
    function showNextSlide() {
        currentSlide = (currentSlide + 1) % carouselSlides.length;
        updateCarousel();
    }

    // Mostra o slide anterior
    function showPrevSlide() {
        currentSlide = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
        updateCarousel();
    }

    // Inicia o autoplay do carrossel
    function autoPlayCarousel() {
        setInterval(showNextSlide, 5000);
    }

    // Controle do menu hambúrguer
    if (hamburger && menuOverlay) {
        hamburger.addEventListener('click', () => {
            const isActive = menuOverlay.classList.toggle('active');
            hamburger.classList.toggle('active');
            body.classList.toggle('no-scroll', isActive);
        });

        document.addEventListener('click', (e) => {
            if (menuOverlay.classList.contains('active') && !menuOverlay.contains(e.target) && !hamburger.contains(e.target)) {
                menuOverlay.classList.remove('active');
                hamburger.classList.remove('active');
                body.classList.remove('no-scroll');
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                menuOverlay.classList.remove('active');
                hamburger.classList.remove('active');
                body.classList.remove('no-scroll');
            }
        });
    }

    // Evento para logo principal levar ao topo da página
    if (logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Evento para link "Início" no menu mobile
    if (menuInicio) {
        menuInicio.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            menuOverlay.classList.remove('active');
            hamburger.classList.remove('active');
            body.classList.remove('no-scroll');
        });
    }

    // Máscara para o telefone
    if (phoneInput) {
        phoneInput.addEventListener('input', (event) => {
            let value = event.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
            }
            event.target.value = value;
        });
    }

    // FAQ - Alternar respostas
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) otherItem.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });

    // Animação com IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animated");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));

    // Inicializa o autoplay e atualiza os indicadores inicialmente
    autoPlayCarousel();
    updateIndicators();

    // Evento de scroll
    window.addEventListener('scroll', updateNavbarOnScroll);

    // Eventos de controle do carrossel
    prevButton?.addEventListener('click', () => {
        showPrevSlide();
    });

    nextButton?.addEventListener('click', () => {
        showNextSlide();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });
});
