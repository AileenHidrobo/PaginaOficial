// ==========================================
// LÓGICA PRINCIPAL - PRESIDENCIA JUVENIL IMBABURA
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // ------------------------------------------
    // 1. MENÚ HAMBURGUESA PARA CELULARES
    // ------------------------------------------
    const navbar = document.querySelector('.navbar');
    const nav = navbar?.querySelector('nav');
    const navLinks = nav?.querySelector('.nav-links');

    if (navbar && nav && navLinks) {
        let menuToggle = navbar.querySelector('.menu-toggle');

        if (!menuToggle) {
            menuToggle = document.createElement('button');
            menuToggle.type = 'button';
            menuToggle.className = 'menu-toggle';
            menuToggle.setAttribute('aria-label', 'Abrir menú');
            menuToggle.setAttribute('aria-expanded', 'false');

            menuToggle.innerHTML = `
                <span></span>
                <span></span>
                <span></span>
            `;

            navbar.insertBefore(menuToggle, nav);
        }

        menuToggle.addEventListener('click', () => {
            const abierto = nav.classList.toggle('menu-open');

            menuToggle.classList.toggle('active', abierto);
            menuToggle.setAttribute('aria-expanded', String(abierto));
            menuToggle.setAttribute(
                'aria-label',
                abierto ? 'Cerrar menú' : 'Abrir menú'
            );
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('menu-open');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-label', 'Abrir menú');
            });
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                nav.classList.remove('menu-open');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-label', 'Abrir menú');
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                nav.classList.remove('menu-open');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }


    // ------------------------------------------
    // 2. FORMULARIO DE CONTACTO POR WHATSAPP
    // ------------------------------------------
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', event => {
            event.preventDefault();

            const obtenerValor = id =>
                document.getElementById(id)?.value?.trim() || '';

            const tipo = obtenerValor('tipoSolicitud');
            const nombre = obtenerValor('nombre');
            const telefono = obtenerValor('telefono');
            const email = obtenerValor('email');
            const mensaje = obtenerValor('mensaje');

            const textoWhatsApp =
                `*NUEVO CONTACTO DESDE LA WEB INSTITUCIONAL*\n\n` +
                `*Tipo de solicitud:* ${tipo}\n` +
                `*Nombre:* ${nombre}\n` +
                `*Teléfono:* ${telefono}\n` +
                `*Correo:* ${email}\n\n` +
                `*Mensaje / Detalle:*\n${mensaje}`;

            const numeroOficial = '593989173974';

            const urlWhatsApp =
                `https://wa.me/${numeroOficial}?text=` +
                encodeURIComponent(textoWhatsApp);

            window.open(urlWhatsApp, '_blank');
        });
    }


    // ------------------------------------------
    // 3. TARJETAS 3D DE LAS CANDIDATAS
    // ------------------------------------------
    const interactiveCards =
        document.querySelectorAll('.interactive-card');

    // En computadoras, el efecto lo controla el CSS con :hover.
    // En celulares, el toque activa o desactiva la tarjeta.
    const dispositivoTactil =
        window.matchMedia('(hover: none), (pointer: coarse)').matches;

    if (dispositivoTactil) {
        interactiveCards.forEach(card => {
            card.addEventListener('click', event => {
                // Evita que un enlace o botón interior active el giro.
                if (event.target.closest('a, button')) return;

                card.classList.toggle('flipped');
            });
        });
    }


    // ------------------------------------------
    // 4. FUNCIÓN GENERAL PARA LOS CARRUSELES
    // ------------------------------------------
    function configurarCarrusel(
        trackId,
        prevBtnId,
        nextBtnId,
        dotsContainerId
    ) {
        const track = document.getElementById(trackId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        const dotsContainer =
            document.getElementById(dotsContainerId);

        if (!track) return;

        const slides = Array.from(track.children);

        if (slides.length === 0) return;

        let indiceActual = Math.max(
            0,
            slides.findIndex(slide => slide.classList.contains('active'))
        );

        let dots = [];

        // Conserva los indicadores del HTML cuando coinciden
        // con el número de diapositivas.
        if (dotsContainer) {
            dots = Array.from(
                dotsContainer.querySelectorAll('.dot')
            );

            if (dots.length !== slides.length) {
                dotsContainer.innerHTML = '';

                slides.forEach((_, index) => {
                    const dot = document.createElement('span');

                    dot.className = 'dot';
                    dot.setAttribute('role', 'button');
                    dot.setAttribute('tabindex', '0');
                    dot.setAttribute(
                        'aria-label',
                        `Ver diapositiva ${index + 1}`
                    );

                    dotsContainer.appendChild(dot);
                });

                dots = Array.from(
                    dotsContainer.querySelectorAll('.dot')
                );
            }
        }

        function mostrarDiapositiva(indice) {
            indiceActual =
                (indice + slides.length) % slides.length;

            track.style.transform =
                `translateX(-${indiceActual * 100}%)`;

            slides.forEach((slide, index) => {
                slide.classList.toggle(
                    'active',
                    index === indiceActual
                );
            });

            dots.forEach((dot, index) => {
                dot.classList.toggle(
                    'active',
                    index === indiceActual
                );

                dot.setAttribute(
                    'aria-pressed',
                    String(index === indiceActual)
                );
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                mostrarDiapositiva(indiceActual + 1);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                mostrarDiapositiva(indiceActual - 1);
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                mostrarDiapositiva(index);
            });

            dot.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    mostrarDiapositiva(index);
                }
            });
        });

        mostrarDiapositiva(indiceActual);

        return {
            siguiente: () => mostrarDiapositiva(indiceActual + 1),
            anterior: () => mostrarDiapositiva(indiceActual - 1),
            mostrar: mostrarDiapositiva
        };
    }


    // ------------------------------------------
    // 5. CARRUSEL DE CONÓCENOS
    //    VICEPRESIDENTES ANTERIORES
    // ------------------------------------------
    configurarCarrusel(
        'directivosTrack',
        'prevDirectivo',
        'nextDirectivo',
        'directivosDots'
    );


    // ------------------------------------------
    // 6. CARRUSEL DE REINADO
    //    REINAS ANTERIORES
    // ------------------------------------------
    configurarCarrusel(
        'reinasTrack',
        'prevReina',
        'nextReina',
        'carouselDots'
    );


    // ------------------------------------------
    // 7. CARRUSEL DE REELS DE INSTAGRAM
    // ------------------------------------------
    const igTrack = document.getElementById('igCarouselTrack');

    if (igTrack) {
        const igSlides = Array.from(igTrack.children);
        const igPrevBtn = document.getElementById('igPrevBtn');
        const igNextBtn = document.getElementById('igNextBtn');
        const igDotsContainer =
            document.getElementById('igDotsContainer');

        if (igSlides.length > 0) {
            let indiceInstagram = 0;
            let igDots = [];

            if (igDotsContainer) {
                igDotsContainer.innerHTML = '';

                igSlides.forEach((_, index) => {
                    const dot = document.createElement('span');

                    dot.className = 'dot';
                    dot.setAttribute('role', 'button');
                    dot.setAttribute('tabindex', '0');
                    dot.setAttribute(
                        'aria-label',
                        `Ver Reel ${index + 1}`
                    );

                    igDotsContainer.appendChild(dot);
                });

                igDots = Array.from(
                    igDotsContainer.querySelectorAll('.dot')
                );
            }

            function mostrarReel(indice) {
                indiceInstagram =
                    (indice + igSlides.length) % igSlides.length;

                igTrack.style.transform =
                    `translateX(-${indiceInstagram * 100}%)`;

                igDots.forEach((dot, index) => {
                    dot.classList.toggle(
                        'active',
                        index === indiceInstagram
                    );
                });

                if (window.instgrm?.Embeds) {
                    window.instgrm.Embeds.process();
                }
            }

            igNextBtn?.addEventListener('click', () => {
                mostrarReel(indiceInstagram + 1);
            });

            igPrevBtn?.addEventListener('click', () => {
                mostrarReel(indiceInstagram - 1);
            });

            igDots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    mostrarReel(index);
                });

                dot.addEventListener('keydown', event => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        mostrarReel(index);
                    }
                });
            });

            mostrarReel(indiceInstagram);
        }
    }

});