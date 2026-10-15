
// ==========================================
// LÓGICA PRINCIPAL - PRESIDENCIA JUVENIL IMBABURA
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // ------------------------------------------
    // 1. MENÚ DE HAMBURGUESA PARA CELULARES
    // ------------------------------------------
    const navbar = document.querySelector('.navbar');
    const nav = navbar ? navbar.querySelector('nav') : null;
    const navLinks = nav ? nav.querySelector('.nav-links') : null;

    // El botón se crea desde JavaScript para evitar
    // tener que modificar el HTML en este paso.
    if (navbar && nav && navLinks) {

        let menuToggle = navbar.querySelector('.menu-toggle');

        if (!menuToggle) {
            menuToggle = document.createElement('button');
            menuToggle.type = 'button';
            menuToggle.className = 'menu-toggle';
            menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-controls', 'menu-principal');

            menuToggle.innerHTML = `
                <span></span>
                <span></span>
                <span></span>
            `;

            navbar.insertBefore(menuToggle, nav);
        }

        // Identificador del menú
        if (!navLinks.id) {
            navLinks.id = 'menu-principal';
        }

        // Abre y cierra el menú al tocar el botón
        menuToggle.addEventListener('click', () => {
            const menuAbierto = nav.classList.toggle('menu-open');

            menuToggle.classList.toggle('active', menuAbierto);
            menuToggle.setAttribute('aria-expanded', String(menuAbierto));
            menuToggle.setAttribute(
                'aria-label',
                menuAbierto
                    ? 'Cerrar menú de navegación'
                    : 'Abrir menú de navegación'
            );
        });

        // Cierra el menú al seleccionar una página
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('menu-open');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute(
                    'aria-label',
                    'Abrir menú de navegación'
                );
            });
        });

        // Cierra el menú al pulsar Escape
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                nav.classList.remove('menu-open');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute(
                    'aria-label',
                    'Abrir menú de navegación'
                );
            }
        });

        // Si se vuelve al formato de escritorio,
        // restablece el estado del menú móvil.
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                nav.classList.remove('menu-open');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute(
                    'aria-label',
                    'Abrir menú de navegación'
                );
            }
        });
    }

    // ------------------------------------------
    // 2. ENVÍO DEL FORMULARIO A WHATSAPP
    // ------------------------------------------
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const tipo = document.getElementById('tipoSolicitud').value;
            const nombre = document.getElementById('nombre').value;
            const telefono = document.getElementById('telefono').value;
            const email = document.getElementById('email').value;
            const mensaje = document.getElementById('mensaje').value;

            // Formato de texto para WhatsApp
            const textoWhatsApp =
                `*NUEVO CONTACTO DESDE LA WEB INSTITUCIONAL*\n\n` +
                `*Tipo de Solicitud:* ${tipo}\n` +
                `*Nombre:* ${nombre}\n` +
                `*Teléfono:* ${telefono}\n` +
                `*Correo:* ${email}\n\n` +
                `*Mensaje / Detalle:*\n${mensaje}`;

            // Número oficial de la Presidencia Juvenil de Imbabura
            const numeroOficial = '593989173974';

            const urlWhatsApp =
                `https://wa.me/${numeroOficial}?text=${encodeURIComponent(textoWhatsApp)}`;

            // Abre el chat de WhatsApp
            window.open(urlWhatsApp, '_blank');
        });
    }

    // ------------------------------------------
    // 3. INTERACTIVIDAD DE TARJETAS 3D (CANDIDATAS)
    // ------------------------------------------
    const interactiveCards = document.querySelectorAll('.interactive-card');

    interactiveCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // ------------------------------------------
    // 4. CARRUSEL DE REINAS ANTERIORES
    // ------------------------------------------
    const reinaTrack = document.getElementById('carouselTrack');
    const reinaSlides = reinaTrack
        ? Array.from(reinaTrack.children)
        : [];

    const reinaPrevBtn = document.getElementById('prevBtn');
    const reinaNextBtn = document.getElementById('nextBtn');
    const reinaDotsContainer = document.getElementById('carouselDots');

    if (reinaTrack && reinaSlides.length > 0) {
        let currentReinaIndex = 0;

        if (reinaDotsContainer) {
            reinaDotsContainer.innerHTML = '';

            reinaSlides.forEach((_, idx) => {
                const dot = document.createElement('span');

                dot.classList.add('dot');
                dot.setAttribute('role', 'button');
                dot.setAttribute('tabindex', '0');
                dot.setAttribute(
                    'aria-label',
                    `Ver diapositiva ${idx + 1}`
                );

                if (idx === 0) {
                    dot.classList.add('active');
                }

                dot.addEventListener('click', () => {
                    goToReinaSlide(idx);
                });

                dot.addEventListener('keydown', event => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        goToReinaSlide(idx);
                    }
                });

                reinaDotsContainer.appendChild(dot);
            });
        }

        const reinaDots = reinaDotsContainer
            ? Array.from(reinaDotsContainer.children)
            : [];

        function updateReinaCarousel() {
            reinaTrack.style.transform =
                `translateX(-${currentReinaIndex * 100}%)`;

            reinaDots.forEach((dot, index) => {
                dot.classList.toggle(
                    'active',
                    index === currentReinaIndex
                );
            });
        }

        function goToReinaSlide(index) {
            currentReinaIndex = index;
            updateReinaCarousel();
        }

        if (reinaNextBtn) {
            reinaNextBtn.addEventListener('click', () => {
                currentReinaIndex =
                    (currentReinaIndex + 1) % reinaSlides.length;

                updateReinaCarousel();
            });
        }

        if (reinaPrevBtn) {
            reinaPrevBtn.addEventListener('click', () => {
                currentReinaIndex =
                    (currentReinaIndex - 1 + reinaSlides.length) %
                    reinaSlides.length;

                updateReinaCarousel();
            });
        }
    }

    // ------------------------------------------
    // 5. CARRUSEL DE REELS DE INSTAGRAM
    // ------------------------------------------
    const igTrack = document.getElementById('igCarouselTrack');
    const igSlides = igTrack
        ? Array.from(igTrack.children)
        : [];

    const igPrevBtn = document.getElementById('igPrevBtn');
    const igNextBtn = document.getElementById('igNextBtn');
    const igDotsContainer = document.getElementById('igDotsContainer');

    if (igTrack && igSlides.length > 0) {
        let currentIgIndex = 0;

        if (igDotsContainer) {
            igDotsContainer.innerHTML = '';

            igSlides.forEach((_, idx) => {
                const dot = document.createElement('span');

                dot.classList.add('dot');
                dot.setAttribute('role', 'button');
                dot.setAttribute('tabindex', '0');
                dot.setAttribute(
                    'aria-label',
                    `Ver Reel ${idx + 1}`
                );

                if (idx === 0) {
                    dot.classList.add('active');
                }

                dot.addEventListener('click', () => {
                    goToIgSlide(idx);
                });

                dot.addEventListener('keydown', event => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        goToIgSlide(idx);
                    }
                });

                igDotsContainer.appendChild(dot);
            });
        }

        const igDots = igDotsContainer
            ? Array.from(igDotsContainer.children)
            : [];

        function updateIgCarousel() {
            igTrack.style.transform =
                `translateX(-${currentIgIndex * 100}%)`;

            igDots.forEach((dot, index) => {
                dot.classList.toggle(
                    'active',
                    index === currentIgIndex
                );
            });

            // Actualiza los reproductores de Instagram
            if (window.instgrm && window.instgrm.Embeds) {
                window.instgrm.Embeds.process();
            }
        }

        function goToIgSlide(index) {
            currentIgIndex = index;
            updateIgCarousel();
        }

        if (igNextBtn) {
            igNextBtn.addEventListener('click', () => {
                currentIgIndex =
                    (currentIgIndex + 1) % igSlides.length;

                updateIgCarousel();
            });
        }

        if (igPrevBtn) {
            igPrevBtn.addEventListener('click', () => {
                currentIgIndex =
                    (currentIgIndex - 1 + igSlides.length) %
                    igSlides.length;

                updateIgCarousel();
            });
        }
    }

});
