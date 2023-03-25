var modal = document.querySelector(".modal"); // Ambil modal box
var btn = document.querySelector("#bantuan"); // Ambil tombol "Bantuan"
var span = document.querySelector(".close"); // Ambil tombol "Close"

btn.onclick = function () {
    modal.style.display = "block"; // Tampilkan modal box saat tombol "Bantuan" ditekan
};

span.onclick = function () {
    modal.style.display = "none"; // Sembunyikan modal box saat tombol "Close" ditekan
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none"; // Sembunyikan modal box saat pengguna mengklik di luar kotak modal
    }
};
