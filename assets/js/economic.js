// Elementləri seçirik
const salaryLow = document.getElementById('salaryLow');
const salaryFixed = document.getElementById('salaryFixed');
const salaryHigh = document.getElementById('salaryHigh');
const inflationRate = document.getElementById('inflationRate');

const realLow = document.getElementById('realLow');
const realFixed = document.getElementById('realFixed');
const realHigh = document.getElementById('realHigh');

const calculateBtn = document.getElementById('calculateBtn');

// Hesablama funksiyası
function calculateRealIncome() {
    const low = parseFloat(salaryLow.value);
    const fixed = parseFloat(salaryFixed.value);
    const high = parseFloat(salaryHigh.value);
    const inflation = parseFloat(inflationRate.value);

    if (isNaN(low) || isNaN(fixed) || isNaN(high) || isNaN(inflation)) {
        alert("Zəhmət olmasa bütün sahələri düzgün doldurun!");
        return;
    }

    // Real gəlirin hesablanması: real = nominal / (1 + inflyasiya)
    const realLowValue = (low / (1 + inflation / 100)).toFixed(2);
    const realFixedValue = (fixed / (1 + inflation / 100)).toFixed(2);
    const realHighValue = (high / (1 + inflation / 100)).toFixed(2);

    // Nəticələri ekrana yazdırırıq
    realLow.textContent = realLowValue;
    realFixed.textContent = realFixedValue;
    realHigh.textContent = realHighValue;
}

// Düyməyə kliklə funksiyanı çağırırıq
calculateBtn.addEventListener('click', calculateRealIncome);
