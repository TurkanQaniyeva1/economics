// DOM elementlərini seçirik
const form = document.getElementById('inflation-form');
const oldPriceInput = document.getElementById('oldPrice');
const newPriceInput = document.getElementById('newPrice');
const incomeGroupSelect = document.getElementById('incomeGroup');
const inflationResult = document.getElementById('inflationResult');
const incomeImpact = document.getElementById('incomeImpact');
const ctx = document.getElementById('priceChart').getContext('2d');

let priceChart; // Chart.js instance

// Hesablama funksiyası
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const oldPrice = parseFloat(oldPriceInput.value);
    const newPrice = parseFloat(newPriceInput.value);
    const incomeGroup = incomeGroupSelect.value;

    if(isNaN(oldPrice) || isNaN(newPrice) || oldPrice <= 0){
        alert('Zəhmət olmasa düzgün qiymət daxil edin!');
        return;
    }

    // İnflyasiya faizini hesabla
    const inflationPercent = ((newPrice - oldPrice) / oldPrice) * 100;
    inflationResult.textContent = `İnflyasiya faizi: ${inflationPercent.toFixed(2)} %`;

    // Gəlir qrupu təsiri
    let impactText = '';
    switch(incomeGroup) {
        case 'low':
            impactText = 'Aşağı gəlirlilər inflyasiyadan daha çox zərər görür. Real alıcılıq qabiliyyəti azalır.';
            break;
        case 'middle':
            impactText = 'Orta gəlir qrupu inflyasiyanın orta səviyyədə təsirini yaşayır. Alıcılıq qabiliyyəti zəifləyir.';
            break;
        case 'high':
            impactText = 'Yüksək gəlir qrupu aktiv sahibləri üçün inflyasiya qazancla nəticələnə bilər.';
            break;
        default:
            impactText = '--';
    }
    incomeImpact.textContent = `Gəlir qrupuna təsir: ${impactText}`;

    // Chart.js üçün məlumat
    const data = {
        labels: ['Əvvəlki Qiymət', 'Yeni Qiymət'],
        datasets: [{
            label: 'Qiymət (AZN)',
            data: [oldPrice, newPrice],
            backgroundColor: ['#1e3c72', '#2a5298']
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: true }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    };

    // Əgər chart artıq varsa, sil və yenisini çək
    if(priceChart) priceChart.destroy();
    priceChart = new Chart(ctx, config);
});
