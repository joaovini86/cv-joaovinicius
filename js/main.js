// Inicializar AOS (Animate on Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

document.addEventListener('DOMContentLoaded', function() {
    // Configuração do EmailJS
    emailjs.init("YOUR_USER_ID"); // Substitua pelo seu User ID do EmailJS
    
    // Verificar preferência de tema no localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-theme');
        document.getElementById('theme-toggle').checked = true;
    }
    
    // Navbar transparente/sólida ao rolar
    const mainNav = document.getElementById('mainNav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            mainNav.classList.add('navbar-shrink');
        } else {
            mainNav.classList.remove('navbar-shrink');
        }
    });
    
    // Rolagem suave para as âncoras
    document.querySelectorAll('a.nav-link, .btn[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Ajuste para o tamanho da navbar
                        behavior: 'smooth'
                    });
                    
                    // Fechar o menu mobile quando clicar em um link
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        navbarCollapse.classList.remove('show');
                    }
                }
            }
        });
    });
    
    // Alternar tema claro/escuro
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-mode i');
    
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-theme');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-theme');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    // Gerenciar botão de voltar ao topo
    const scrollToTopButton = document.querySelector('.scroll-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopButton.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });
    
    scrollToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Formulário de contato com EmailJS
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formStatus = document.getElementById('form-status');
            const submitButton = contactForm.querySelector('button[type="submit"]');
            
            // Bloquear botão durante o envio
            submitButton.disabled = true;
            submitButton.innerHTML = 'Enviando...';
            
            const templateParams = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            emailjs.send('default_service', 'template_id', templateParams)
                .then(function() {
                    formStatus.innerHTML = 'Mensagem enviada com sucesso!';
                    formStatus.className = 'mt-3 success';
                    contactForm.reset();
                    
                    // Restaurar botão
                    submitButton.disabled = false;
                    submitButton.innerHTML = 'Enviar Mensagem';
                    
                    // Limpar status após 5 segundos
                    setTimeout(() => {
                        formStatus.innerHTML = '';
                        formStatus.className = 'mt-3';
                    }, 5000);
                })
                .catch(function(error) {
                    formStatus.innerHTML = 'Erro ao enviar mensagem. Tente novamente.';
                    formStatus.className = 'mt-3 error';
                    console.error('Error:', error);
                    
                    // Restaurar botão
                    submitButton.disabled = false;
                    submitButton.innerHTML = 'Enviar Mensagem';
                });
        });
    }
});