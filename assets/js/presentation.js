// Slaydları seçirik
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

// Slaydları göstərmək funksiyası
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
            dots[i].classList.add('active');
        }
    });
}

// Next / Previous slayd funksiyası
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Dots click funksiyası
dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        currentSlide = i;
        showSlide(currentSlide);
    });
});

// Auto slayd keçidi (opsional)
setInterval(() => {
    nextSlide();
}, 8000); // Hər 8 saniyədən bir

// Stat counter animasiyası
function animateCounter(element, target) {
    let count = 0;
    const step = target / 100;
    const interval = setInterval(() => {
        count += step;
        if (count >= target) {
            count = target;
            clearInterval(interval);
        }
        element.textContent = Math.floor(count);
    }, 20);
}

// Misal üçün bütün counter-ları animasiya etmək
document.querySelectorAll('.stat-counter').forEach(counter => {
    const target = +counter.getAttribute('data-target');
    animateCounter(counter, target);
});

// İlk slaydı göstəririk
showSlide(currentSlide);






function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove("active");
        // animasiyanı sıfırla
        slide.querySelectorAll("line").forEach(line => {
            line.style.strokeDashoffset = line.getTotalLength();
        });
    });

    const currentSlide = slides[index];
    currentSlide.classList.add("active");

    // animasiyanı başlat
    currentSlide.querySelectorAll("line").forEach(line => {
        line.style.strokeDashoffset = 0;
    });
}
