// Elementləri seçirik
const salaryLow = document.getElementById('salaryLow');
const salaryFixed = document.getElementById('salaryFixed');
const salaryHigh = document.getElementById('salaryHigh');
const inflationRate = document.getElementById('inflationRate');

const realLow = document.getElementById('realLow');
const realFixed = document.getElementById('realFixed');
const realHigh = document.getElementById('realHigh');

const calculateBtn = document.getElementById('calculateBtn');

// Yeni elementlər (borclar və kreditorlar)
const debtorsProfit = document.getElementById('debtorsProfit');
const creditorsLoss = document.getElementById('creditorsLoss');

// Hesablama funksiyası
function calculateRealIncome() {
    const low = parseFloat(salaryLow.value);
    const fixed = parseFloat(salaryFixed.value);
    const high = parseFloat(salaryHigh.value);
    const inflation = parseFloat(inflationRate.value);

    if (isNaN(low) || isNaN(fixed) || isNaN(high) || isNaN(inflation)) {
        alert('Zəhmət olmasa bütün sahələri düzgün doldurun!');
        return;
    }

    // Real gəlir hesablaması
    const realLowIncome = (low / (1 + inflation / 100)).toFixed(2);
    const realFixedIncome = (fixed / (1 + inflation / 100)).toFixed(2);
    const realHighIncome = (high / (1 + inflation / 100)).toFixed(2);

    realLow.textContent = realLowIncome;
    realFixed.textContent = realFixedIncome;
    realHigh.textContent = realHighIncome;

    // Borclar / kreditorlar üçün daha real model
    const totalIncome = low + fixed + high;

    // Borclar qazancını inflyasiya ilə artırır (1.05 = 5% əlavə qazanc)
    const debtorsGain = (totalIncome * (inflation / 100) * 1.05).toFixed(2);

    // Kreditorlar inflyasiya səbəbindən zərər görür (0.95 = 5% az zərər)
    const creditorsLossVal = (totalIncome * (inflation / 100) * 0.95).toFixed(2);

    if(debtorsProfit && creditorsLoss) {
        debtorsProfit.textContent = debtorsGain;
        creditorsLoss.textContent = creditorsLossVal;
    }

    console.log(`Borcların qazancı: ${debtorsGain}`);
    console.log(`Kreditorların zərəri: ${creditorsLossVal}`);
}

// Düyməyə klikləyəndə funksiyanı çağırırıq
calculateBtn.addEventListener('click', calculateRealIncome);
