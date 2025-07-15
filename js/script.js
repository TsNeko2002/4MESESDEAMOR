document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('decoration-container');
    const audio = document.getElementById("audioAria");
    const toggleBtn = document.getElementById("togglePlay");
    const volumeSlider = document.getElementById("volumeSlider");
    const btnSurprise = document.getElementById('btnSurprise');
    const modal = document.getElementById('surpriseModal');
    const closeModal = document.getElementById('closeModal');
    const modalHearts = document.getElementById('modalHearts');
    const dateSpan = document.getElementById("current-date");
    const timeSpan = document.getElementById("current-time");

    // Animación de corazones y destellos dorados
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerText = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 2 + 1) + 'rem';
        heart.style.animationDuration = (Math.random() * 5 + 10) + 's';
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 15000);
    }

    function createGoldFlake() {
        const flake = document.createElement('div');
        flake.className = 'gold-flake';
        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.width = flake.style.height = (Math.random() * 10 + 5) + 'px';
        flake.style.animationDuration = (Math.random() * 5 + 15) + 's';
        container.appendChild(flake);
        setTimeout(() => flake.remove(), 20000);
    }

    setInterval(createHeart, 800);
    setInterval(createGoldFlake, 1200);

    // Contador de tiempo desde el aniversario
    const startDate = new Date('2025-03-15T00:00:00');

    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;

        const seconds = Math.floor(diff / 1000) % 60;
        const minutes = Math.floor(diff / 1000 / 60) % 60;
        const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
        const days = Math.floor(diff / 1000 / 60 / 60 / 24);

        const years = Math.floor(days / 365);
        const months = Math.floor((days % 365) / 30);
        const remDays = (days % 365) % 30;

        document.getElementById('years').textContent = years;
        document.getElementById('months').textContent = months;
        document.getElementById('days').textContent = remDays;
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCounter();
    setInterval(updateCounter, 1000);

    // Fecha y hora actual
    function updateDateTime() {
        const now = new Date();
        const dateFormatted = now.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
        const timeFormatted = now.toLocaleTimeString("es-ES", {
            hour12: false
        });
        dateSpan.textContent = dateFormatted;
        timeSpan.textContent = timeFormatted;
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Modal
    btnSurprise.addEventListener('click', () => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        launchModalHearts();
        // Auto play al abrir modal (si aún no se activó)
        if (audio.paused) {
            audio.play().then(() => {
                toggleBtn.textContent = "⏸️";
            }).catch(err => {
                console.warn("El navegador bloqueó el autoplay:", err);
            });
        }
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modalHearts.innerHTML = '';
    });

    function launchModalHearts() {
        for (let i = 0; i < 40; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerText = '❤️';
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.fontSize = `${Math.random() * 2 + 1}rem`;
            heart.style.top = `-${Math.random() * 20 + 10}px`;
            heart.style.animationDuration = `${Math.random() * 10 + 10}s`;
            modalHearts.appendChild(heart);
        }
    }

    // Scroll al contador
    const scrollDown = document.getElementById('scrollDown');
    scrollDown.addEventListener('click', () => {
        const nextSection = document.querySelector('.counter-section');
        nextSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Evitar scroll modal fuera de contenido
    modal.addEventListener('wheel', function(e) {
        const content = this.querySelector('.modal-content');
        const isAtTop = content.scrollTop === 0;
        const isAtBottom = content.scrollTop + content.clientHeight >= content.scrollHeight - 1;

        if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
            e.preventDefault();
        }
    });

    // ▶️ Reproducir música tras primera interacción
    document.body.addEventListener("click", () => {
        if (audio.paused) {
            audio.play().then(() => {
                toggleBtn.textContent = "⏸️";
            }).catch(err => {
                console.warn("El navegador bloqueó el autoplay:", err);
            });
        }
    }, { once: true });

    // Botón Play/Pausa manual
    toggleBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            toggleBtn.textContent = "⏸️";
        } else {
            audio.pause();
            toggleBtn.textContent = "▶️";
        }
    });

    // Volumen
    volumeSlider.addEventListener("input", () => {
        audio.volume = volumeSlider.value;
    });
});
