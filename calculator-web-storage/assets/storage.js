const CACHE_KEY = "calculation_history";

function checkForStorage() {
    //cek browser support local sotage ga ??
    return typeof (Storage) !== "undefined"
}

function putHistory(data) {
    // klo support jalankan ini
    if (checkForStorage()) {
        let historyData = null;
        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        } else {
            // mengubah nilai objek dalam bentuk string kembali pada bentuk objek JavaScript.
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }

        // unshift(), fungsi ini digunakan untuk menambahkan nilai baru pada array
        //  yang ditempatkan pada awal index.Fungsi ini juga mengembalikan nilai 
        //  panjang array setelah ditambahkan dengan nilai baru.

        // Fungsi pop() di atas merupakan fungsi untuk menghapus nilai index 
        //terakhir pada array, sehingga ukuran array historyData tidak akan 
        //pernah lebih dari 5. Hal ini kita terapkan agar riwayat kalkulasi yang /
        //muncul adalah lima hasil kalkulasi terakhir oleh pengguna.

        historyData.unshift(data);

        if (historyData.length > 5) {
            historyData.pop();
        }

        //Untuk mengubah objek JavaScript ke dalam bentuk String.
        // localStorage hanya dapat menyimpan data primitif seperti string, 
        // sehingga kita perlu mengubah objek ke dalam bentuk string 
        // jika ingin menyimpan ke dalam localStorage.
        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));

    }
}


function showHistory() {
    // mengembalikan nilai array dari localStorage jika sudah memiliki nilai 
    //sebelumnya melalui JSON.parse(). Namun jika localStorage masih kosong, fungsi 
    //ini akan mengembalikan nilai array kosong.
    if (checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
}

function renderHistory() {
    const historyData = showHistory();
    let historyList = document.querySelector("#historyList");


    // selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
    historyList.innerHTML = "";


    for (let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";


        historyList.appendChild(row);
    }
}

renderHistory();