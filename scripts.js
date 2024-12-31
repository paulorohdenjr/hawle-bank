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
    const indicators = document.querySelectorAll('.carousel-indicators button');
    const prevButton = document.querySelector('.prev-slide'); // Botão anterior
    const nextButton = document.querySelector('.next-slide'); // Botão próximo
    const footerLogo = document.querySelector('.footer-logo-animated');
    const phoneInput = document.getElementById('phone');
    const form = document.querySelector('.contact-form');
    const modal = document.getElementById('confirmation-modal');
    const closeModalButton = document.getElementById('close-modal');
    const faqItems = document.querySelectorAll('.faq-item');
    const elements = document.querySelectorAll("[data-animation]");
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

    if (hamburger && menuOverlay) {
        hamburger.addEventListener('click', () => {
            const isActive = menuOverlay.classList.toggle('active');
            hamburger.classList.toggle('active');
            body.classList.toggle('no-scroll', isActive); // Adiciona ou remove a classe no-scroll
            hamburger.setAttribute('aria-expanded', isActive); // Atualiza o estado ARIA
        });
    
        // Fecha o menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (menuOverlay.classList.contains('active') && !menuOverlay.contains(e.target) && !hamburger.contains(e.target)) {
                menuOverlay.classList.remove('active');
                hamburger.classList.remove('active');
                body.classList.remove('no-scroll');
                hamburger.setAttribute('aria-expanded', 'false');
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

    if (footerLogo) {
        // Adiciona o efeito ao passar o mouse
        footerLogo.addEventListener('mouseenter', () => {
            footerLogo.style.transform = 'scale(1.1) rotate(5deg)';
            footerLogo.style.filter = 'brightness(1.5)';
            footerLogo.style.opacity = '0.9';
        });

        // Remove o efeito ao sair do mouse
        footerLogo.addEventListener('mouseleave', () => {
            footerLogo.style.transform = 'scale(1) rotate(0deg)';
            footerLogo.style.filter = 'brightness(1)';
            footerLogo.style.opacity = '1';
        });
    }

    // Máscara para o telefone
    phoneInput.addEventListener('input', (event) => {
        let value = event.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        }
        event.target.value = value;
    });

    // Exibe o modal ao enviar o formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        modal.style.display = 'flex';
    });

    // Fecha o modal ao clicar no botão "Fechar"
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
        form.reset(); // Reseta o formulário
    });

    // Fecha o modal ao clicar fora do conteúdo
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            form.reset();
        }
    });

    // Função para resetar a transformação após o clique
    function resetButtonState(button) {
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 200); // Tempo para resetar o estado (0.2s)
        }

    // Eventos de controle do carrossel
    prevButton?.addEventListener('click', () => {
        showPrevSlide();
        prevButton.style.transform = 'scale(0.9)';
        setTimeout(() => prevButton.style.transform = 'scale(1)', 150);
    });

    nextButton?.addEventListener('click', () => {
        showNextSlide();
        nextButton.style.transform = 'scale(0.9)';
        setTimeout(() => nextButton.style.transform = 'scale(1)', 150);
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            updateCarousel(index);
        });
    })   
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Fecha outras respostas abertas
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Alterna a visibilidade da resposta clicada
            item.classList.toggle('active');
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animated");
                observer.unobserve(entry.target); // Para evitar reativação
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));

    // Inicializa o autoplay
    autoPlayCarousel();

    // Evento de scroll
    window.addEventListener('scroll', updateNavbarOnScroll);
});
