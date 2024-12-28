document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carousel-slide'); // Seleciona todos os slides
    const prevButton = document.querySelector('.prev-slide'); // Botão anterior
    const nextButton = document.querySelector('.next-slide'); // Botão próximo
    const carouselContainer = document.querySelector('.carousel-container'); // Contêiner do carrossel
    let currentIndex = 0; // Índice atual do slide

    // Função para exibir o slide atual
    function showSlide(index) {
        const totalSlides = slides.length;
        if (index >= totalSlides) {
            currentIndex = 0; // Volta ao primeiro slide
        } else if (index < 0) {
            currentIndex = totalSlides - 1; // Vai para o último slide
        } else {
            currentIndex = index;
        }
        const offset = -currentIndex * 100;
        carouselContainer.style.transform = `translateX(${offset}%)`;
    }

    // Adiciona evento ao botão "Anterior"
    prevButton.addEventListener('click', () => {
        showSlide(currentIndex - 1);
    });

    // Adiciona evento ao botão "Próximo"
    nextButton.addEventListener('click', () => {
        showSlide(currentIndex + 1);
    });

    // Auto-play (troca de slides automaticamente a cada 5 segundos)
    setInterval(() => {
        showSlide(currentIndex + 1);
    }, 5000);
});
