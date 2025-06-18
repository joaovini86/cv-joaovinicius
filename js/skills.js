document.addEventListener('DOMContentLoaded', function() {
    // Iniciar barras de progresso de habilidades quando a seção estiver visível
    const skillSection = document.getElementById('habilidades');
    
    if (skillSection) {
        // Função para verificar se um elemento está visível na viewport
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        // Função para animar as barras de progresso
        function animateProgressBars() {
            if (isElementInViewport(skillSection)) {
                const progressBars = document.querySelectorAll('.progress-bar');
                
                progressBars.forEach(bar => {
                    const percent = bar.getAttribute('data-percent');
                    bar.style.width = percent + '%';
                });
                
                // Remover o event listener após a animação ser acionada
                window.removeEventListener('scroll', animateProgressBars);
            }
        }
        
        // Adicionar event listener para o scroll
        window.addEventListener('scroll', animateProgressBars);
        
        // Verificar inicialmente se a seção já está visível
        animateProgressBars();
    }
    
    // Adicionar classes para efeito de hover em itens do portfólio
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        const image = item.querySelector('img');
        const caption = item.querySelector('.portfolio-caption');
        
        if (image && caption) {
            item.addEventListener('mouseenter', () => {
                image.style.transform = 'scale(1.05)';
                image.style.transition = 'transform 0.3s ease';
            });
            
            item.addEventListener('mouseleave', () => {
                image.style.transform = 'scale(1)';
            });
        }
    });
});