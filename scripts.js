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
    let introHidden = false; // Controle para a tela inicial

    // Função para esconder a tela inicial e mostrar o cabeçalho fixo
    function hideIntroScreen() {
        if (introScreen) {
            introScreen.classList.add('hidden'); // Esconde a tela inicial
        }
        if (header) {
            header.classList.add('show'); // Mostra o cabeçalho fixo
        }
        navLinks.forEach(link => link.style.display = 'flex'); // Garante que os links fiquem visíveis
        introHidden = true; // Marca como escondido
    }

    // Função para reiniciar a página ao clicar na logo
    if (logoLinks) {
        logoLinks.forEach(logo => {
            logo.addEventListener('click', (e) => {
                e.preventDefault();
                if (introScreen) {
                    introScreen.classList.remove('hidden'); // Mostra a tela inicial
                }
                if (header) {
                    header.classList.remove('show'); // Esconde o cabeçalho fixo
                }
                navLinks.forEach(link => link.style.display = 'none'); // Esconde os links fixos
                introHidden = false; // Marca como visível novamente
                window.scrollTo({ top: 0, behavior: 'smooth' }); // Volta ao topo da página
            });
        });
    }

    // Evento de scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        if (navbar) {
            if (scrollY > 50) {
                // Quando a página for rolada para baixo
                navbar.classList.add('scrolled'); // Adiciona classe para fundo azul
                if (logo) {
                    logo.src = 'images/logo-white.png'; // Alterar para logo escura
                }
                if (hamburger) {
                    hamburger.querySelectorAll('span').forEach(span => {
                        span.style.background = '#fff'; // Branco
                    });
                }
                navLinks.forEach(link => link.style.color = '#fff'); // Links em branco
                navIcons.forEach(icon => {
                    icon.style.filter = 'invert(1)'; // Ícones claros
                });
            } else {
                // Quando a página volta para o topo
                navbar.classList.remove('scrolled'); // Remove classe para fundo azul
                if (logo) {
                    logo.src = 'images/logo-dark.png'; // Alterar para logo clara
                }
                if (hamburger) {
                    hamburger.querySelectorAll('span').forEach(span => {
                        span.style.background = '#000'; // Preto
                    });
                }
                navLinks.forEach(link => link.style.color = '#000'); // Links em preto
                navIcons.forEach(icon => {
                    icon.style.filter = 'invert(0)'; // Ícones escuros
                });
            }
        }

        // Altere o valor para ajustar a sensibilidade do efeito
        if (scrollY > 0.2 && !introHidden) {
            hideIntroScreen(); // Esconde a tela inicial
        }
    });

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
});
