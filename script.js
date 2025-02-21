let currentSlide = 0;
const totalSlides = document.querySelectorAll('.slide').length;
let slideInterval;

function moveSlide(direction) {
    const slides = document.querySelector('.slides');

    currentSlide += direction;

    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }

    const offset = -currentSlide * 100;
    slides.style.transform = `translateX(${offset}%)`;

    // Сбрасываем интервал при ручном переключении слайдов
    resetSlideInterval();
}

function autoSlide() {
    moveSlide(1);
}

function startSlideInterval() {
    slideInterval = setInterval(autoSlide, 5000); // Автоматическое переключение каждые 5 секунд
}

function resetSlideInterval() {
    clearInterval(slideInterval);
    startSlideInterval(); // Запускаем заново
}

document.getElementById('restart-confetti').addEventListener('click', () => {
    createConfetti(); // Запускаем конфетти заново
});

// Функция createConfetti() остается прежней
function createConfetti() {
    const numConfetti = 100; // Количество конфетти
    const colors = ['#ffd300', '#17d3ff', '#ff4e91'];

    for (let i = 0; i < numConfetti; i++) {
        let confettiPiece = document.createElement('div');
        confettiPiece.className = 'confetti-piece';
        document.querySelector('.confetti').appendChild(confettiPiece);

        // Задаем случайные стили для каждой конфетти
        confettiPiece.style.left = Math.random() * 100 + 'vw';
        confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confettiPiece.style.animationDelay = Math.random() * 2 + 's'; // Случайная задержка

        // Удаление конфетти после завершения анимации
        confettiPiece.addEventListener('animationend', () => {
            confettiPiece.remove();
        });
    }
}
window.addEventListener('DOMContentLoaded', (event) => {
    createConfetti();
    startSlideInterval();
});

const audio = document.getElementById('audio');

// Функция для разблокировки кнопки и запуска музыки
function unlockAndPlay() {
    const toggleButton = document.getElementById('toggle-audio');
    toggleButton.disabled = false; // Разблокировать кнопку

    audio.play().then(() => {
        toggleButton.textContent = '🔊'; // Иконка для включения
    }).catch((error) => {
        console.log("Не удалось воспроизвести аудио:", error);
    });
}

// Запуск функции при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    unlockAndPlay(); // Запускаем музыку и разблокируем кнопку

    // Обработчик события для кнопки, чтобы запустить или остановить музыку
    document.getElementById('toggle-audio').addEventListener('click', () => {
        if (audio.paused) {
            audio.play().then(() => {
                document.getElementById('toggle-audio').textContent = '🔊'; // Иконка для включения
            }).catch((error) => {
                console.log("Не удалось воспроизвести аудио:", error);
            });
        } else {
            audio.pause();
            document.getElementById('toggle-audio').textContent = '🔇'; // Иконка для выключения
        }
    });
});

// При выходе с сайта отключаем музыку
window.addEventListener('beforeunload', () => {
    audio.pause();
    document.getElementById('toggle-audio').disabled = true; // Отключаем кнопку
});
