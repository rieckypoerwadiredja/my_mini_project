// Bagian awal dari layout kalkulator
const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null, // untuk menyimpan angka pertama, pas operator diklik
    waitingForSecondNumber: false
};

// untuk mengganti angka yang ada di display kalkulator
function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

// untuk menghapus angka yang ada di display kalkulator & reset semua operator
function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}


// buat button number 0 - 9, pas klik button ini maka angka akan ditambahkan ke display kalkulator
function inputDigit(digit) {
    if (calculator.displayNumber === '0') {
        // jika display kalkulator = 0 STRING ganti jd angka yang diklik
        calculator.displayNumber = digit;
    } else {
        // kalo bukan nol tring ditambahin aja
        calculator.displayNumber += digit;
    }
}

// pas klik button ini (0-9) maka operator akan ditambahkan ke display kalkulator
const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
    button.addEventListener('click', function (event) {

        // mendapatkan objek elemen yang diklik
        const target = event.target;

        // jika elemen yang diklik adalah CE,
        //  maka akan dihapus semua angka yang ada di display kalkulator
        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }

        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }

        if (target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }

        if (target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;
        }

        inputDigit(target.innerText);
        updateDisplay()
    });
}

// buat rubah min / positif
function inverseNumber() {
    if (calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}

// angka yang ada di display simpan dlu ke variable firstNumber
function handleOperator(operator) {
    if (!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

        // mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
        calculator.displayNumber = '0';
    } else {
        alert('Operator sudah ditetapkan')
    }
}


// jalankan operator sesuai dengan operator yang ditetapkan
// dengan menggunakan firstNumber dan displayNumber
function performCalculation() {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert("Anda belum menetapkan operator");
        return;
    }

    let result = 0;
    if (calculator.operator === "+") {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
    }

    let history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }

    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
}