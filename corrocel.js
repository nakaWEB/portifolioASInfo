// script.js
class MultiRowCarousel {
    constructor() {
        this.rows = document.querySelectorAll('.carousel-row');
        this.animationSpeed = 1;
        this.isPaused = false;
        this.init();
    }

    init() {
        this.createSpeedControls();
        this.addHoverEffects();
        this.adjustAnimationSpeeds();
    }

    createSpeedControls() {
        const container = document.querySelector('.carousel-container');
        const controls = document.createElement('div');
        controls.className = 'speed-control';
        controls.innerHTML = `

        `;
        container.appendChild(controls);
    }

    addHoverEffects() {
        this.rows.forEach(row => {
            row.addEventListener('mouseenter', () => {
                if (!this.isPaused) {
                    this.pauseRow(row);
                }
            });

            row.addEventListener('mouseleave', () => {
                if (!this.isPaused) {
                    this.resumeRow(row);
                }
            });
        });
    }

    pauseRow(row) {
        const track = row.querySelector('.carousel-track');
        track.style.animationPlayState = 'paused';
    }

    resumeRow(row) {
        const track = row.querySelector('.carousel-track');
        track.style.animationPlayState = 'running';
    }

    changeSpeed(multiplier) {
        this.animationSpeed = multiplier;
        this.rows.forEach(row => {
            const track = row.querySelector('.carousel-track');
            const currentDuration = this.getAnimationDuration(row);
            const newDuration = currentDuration / multiplier;
            
            track.style.animationDuration = `${newDuration}s`;
        });
    }

    getAnimationDuration(row) {
        const track = row.querySelector('.carousel-track');
        const computedStyle = window.getComputedStyle(track);
        const duration = computedStyle.animationDuration;
        return parseFloat(duration);
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        
        this.rows.forEach(row => {
            const track = row.querySelector('.carousel-track');
            if (this.isPaused) {
                track.style.animationPlayState = 'paused';
            } else {
                track.style.animationPlayState = 'running';
            }
        });
    }

    adjustAnimationSpeeds() {
        // Ajustar velocidades baseado no conteúdo
        this.rows.forEach((row, index) => {
            const track = row.querySelector('.carousel-track');
            const items = track.querySelectorAll('.carousel-item');
            const totalWidth = Array.from(items).reduce((sum, item) => {
                return sum + item.offsetWidth + 20; // 20px gap
            }, 0);
            
            // Ajustar duração baseada na largura total
            const baseDuration = 25;
            const adjustedDuration = baseDuration * (totalWidth / 1000);
            
            track.style.animationDuration = `${adjustedDuration}s`;
        });
    }
}

// Inicializar o carrossel quando a página carregar
let carousel;
document.addEventListener('DOMContentLoaded', () => {
    carousel = new MultiRowCarousel();
});

// Adicionar efeito de zoom suave ao rolar
window.addEventListener('scroll', () => {
    const rows = document.querySelectorAll('.carousel-row');
    rows.forEach(row => {
        const rect = row.getBoundingClientRect();
        const centerY = window.innerHeight / 2;
        const distance = Math.abs(rect.top + rect.height / 2 - centerY);
        
        if (distance < 300) {
            const scale = 1 + (300 - distance) / 3000;
            row.style.transform = `scale(${Math.min(scale, 1.05)})`;
        } else {
            row.style.transform = 'scale(1)';
        }
    });
});