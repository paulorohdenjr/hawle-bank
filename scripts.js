document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.querySelector('.intro-screen'); // Tela inicial
    const header = document.querySelector('header'); // Cabeçalho fixo
    const navLinks = document.querySelectorAll('.nav-links a'); // Links do menu fixo
    const hamburger = document.querySelector('.hamburger'); // Botão hambúrguer (mobile)
    const menuOverlay = document.querySelector('.menu-overlay'); // Overlay do menu (mobile)
    const logoLinks = document.querySelectorAll('.logo-link, .intro-logo-link'); // Links da logo
    const logo = document.querySelector('.logo'); // Logo principal
    const navIcons = document.querySelectorAll('.nav-icons img'); // Ícones da navbar
    const navbar = document.querySelector('.navbar'); // Navbar principal
    const body = document.body; // Corpo da página
    const menuInicio = document.querySelector('.menu-overlay .inicio-link'); // Link do menu hambúrguer "Início"
    const carouselContainer = document.querySelector('.carousel-container'); // Container do carrossel
    const carouselSlides = document.querySelectorAll('.carousel-slide'); // Slides do carrossel
    const prevButton = document.querySelector('.prev-slide'); // Botão anterior
    const nextButton = document.querySelector('.next-slide'); // Botão próximo
    let currentSlide = 0; // Slide atual
    let introHidden = false; // Controle para a tela inicial

    // Função para esconder a tela inicial e mostrar o cabeçalho fixo
    function hideIntroScreen() {
        if (introScreen) {
            introScreen.classList.add('hidden'); // Esconde a tela inicial
        }
        if (header) {
            header.classList.add('show'); // Mostra o cabeçalho fixo
        }
        navLinks.forEach(link => (link.style.display = 'flex')); // Garante que os links fiquem visíveis
        introHidden = true; // Marca como escondido
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

    // Atualiza o carrossel
    function updateCarousel() {
        const offset = -currentSlide * 100;
        carouselContainer.style.transform = `translateX(${offset}%)`;
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
        setInterval(showNextSlide, 5000); // Altera slides a cada 5 segundos
    }

    // Botão hambúrguer no mobile
    if (hamburger && menuOverlay) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            body.classList.toggle('no-scroll'); // Adiciona ou remove a classe no-scroll

            // Garante visibilidade dos links no menu mobile
            if (menuOverlay.classList.contains('active')) {
                navLinks.forEach(link => link.style.display = 'block'); // Exibe os links no menu mobile
            } else {
                navLinks.forEach(link => link.style.display = 'none'); // Esconde os links quando o menu é fechado
            }
        });
    }

    // Garantir visibilidade do menu correto ao redimensionar
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 769) {
            navLinks.forEach(link => link.style.display = 'flex'); // Exibe os links no desktop
            if (menuOverlay) {
                menuOverlay.classList.remove('active'); // Reseta o overlay
            }
            if (hamburger) {
                hamburger.classList.remove('active'); // Reseta o botão hambúrguer
            }
            body.classList.remove('no-scroll'); // Reativa o scroll
        } else {
            navLinks.forEach(link => link.style.display = 'none'); // Esconde os links no mobile
        }
    });

    // Configuração inicial para garantir que o menu está correto na primeira carga
    if (window.innerWidth >= 769) {
        navLinks.forEach(link => link.style.display = 'flex'); // Exibe os links no desktop
    } else {
        navLinks.forEach(link => link.style.display = 'none'); // Esconde os links no mobile
    }

    // Evento para logo principal levar ao topo da página
    if (logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Volta ao topo da página
        });
    }

    // Evento para link "Início" no menu mobile
    if (menuInicio) {
        menuInicio.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Volta ao topo da página
            menuOverlay.classList.remove('active'); // Fecha o menu hambúrguer
            hamburger.classList.remove('active'); // Reseta o botão hambúrguer
            body.classList.remove('no-scroll'); // Reativa o scroll
        });
    }

    // Eventos de controle do carrossel
    if (nextButton) nextButton.addEventListener('click', showNextSlide);
    if (prevButton) prevButton.addEventListener('click', showPrevSlide);

    // Inicia o autoplay do carrossel
    autoPlayCarousel();

    // Evento de scroll
    window.addEventListener('scroll', updateNavbarOnScroll);
});
