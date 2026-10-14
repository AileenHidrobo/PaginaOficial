// ==========================================
// LÓGICA PRINCIPAL - PRESIDENCIA JUVENIL IMBABURA
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // ------------------------------------------
    // 1. ENVÍO DEL FORMULARIO A WHATSAPP
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

            // Formato de texto con soporte de negritas para WhatsApp
            const textoWhatsApp = 
                `*NUEVO CONTACTO DESDE LA WEB INSTITUCIONAL*\n\n` +
                `*Tipo de Solicitud:* ${tipo}\n` +
                `*Nombre:* ${nombre}\n` +
                `*Teléfono:* ${telefono}\n` +
                `*Correo:* ${email}\n\n` +
                `*Mensaje / Detalle:*\n${mensaje}`;

            // Número oficial de la Presidencia Juvenil de Imbabura (+593 98 917 3974)
            const numeroOficial = '593989173974';
            const urlWhatsApp = `https://wa.me/${numeroOficial}?text=${encodeURIComponent(textoWhatsApp)}`;

            // Abre el chat directamente
            window.open(urlWhatsApp, '_blank');
        });
    }

    // ------------------------------------------
    // 2. INTERACTIVIDAD DE TARJETAS 3D (CANDIDATAS)
    // ------------------------------------------
    const interactiveCards = document.querySelectorAll('.interactive-card');
    interactiveCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // ------------------------------------------
    // 3. CARRUSEL DE REINAS ANTERIORES
    // ------------------------------------------
    const reinaTrack = document.getElementById('carouselTrack');
    const reinaSlides = reinaTrack ? Array.from(reinaTrack.children) : [];
    const reinaPrevBtn = document.getElementById('prevBtn');
    const reinaNextBtn = document.getElementById('nextBtn');
    const reinaDotsContainer = document.getElementById('carouselDots');

    if (reinaTrack && reinaSlides.length > 0) {
        let currentReinaIndex = 0;

        reinaSlides.forEach((_, idx) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (idx === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToReinaSlide(idx));
            reinaDotsContainer.appendChild(dot);
        });

        const reinaDots = Array.from(reinaDotsContainer.children);

        function updateReinaCarousel() {
            reinaTrack.style.transform = `translateX(-${currentReinaIndex * 100}%)`;
            reinaDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentReinaIndex);
            });
        }

        function goToReinaSlide(index) {
            currentReinaIndex = index;
            updateReinaCarousel();
        }

        if (reinaNextBtn) {
            reinaNextBtn.addEventListener('click', () => {
                currentReinaIndex = (currentReinaIndex + 1) % reinaSlides.length;
                updateReinaCarousel();
            });
        }

        if (reinaPrevBtn) {
            reinaPrevBtn.addEventListener('click', () => {
                currentReinaIndex = (currentReinaIndex - 1 + reinaSlides.length) % reinaSlides.length;
                updateReinaCarousel();
            });
        }
    }

    // ------------------------------------------
    // 4. CARRUSEL RULETA DE REELS DE INSTAGRAM
    // ------------------------------------------
    const igTrack = document.getElementById('igCarouselTrack');
    const igSlides = igTrack ? Array.from(igTrack.children) : [];
    const igPrevBtn = document.getElementById('igPrevBtn');
    const igNextBtn = document.getElementById('igNextBtn');
    const igDotsContainer = document.getElementById('igDotsContainer');

    if (igTrack && igSlides.length > 0) {
        let currentIgIndex = 0;

        igSlides.forEach((_, idx) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (idx === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToIgSlide(idx));
            igDotsContainer.appendChild(dot);
        });

        const igDots = Array.from(igDotsContainer.children);

        function updateIgCarousel() {
            igTrack.style.transform = `translateX(-${currentIgIndex * 100}%)`;
            igDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIgIndex);
            });

            // Forzar renderizado del reproductor de Instagram al cambiar de diapositiva
            if (window.instgrm) {
                window.instgrm.Embeds.process();
            }
        }

        function goToIgSlide(index) {
            currentIgIndex = index;
            updateIgCarousel();
        }

        if (igNextBtn) {
            igNextBtn.addEventListener('click', () => {
                currentIgIndex = (currentIgIndex + 1) % igSlides.length;
                updateIgCarousel();
            });
        }

        if (igPrevBtn) {
            igPrevBtn.addEventListener('click', () => {
                currentIgIndex = (currentIgIndex - 1 + igSlides.length) % igSlides.length;
                updateIgCarousel();
            });
        }
    }

});